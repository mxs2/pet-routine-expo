// ============================================================
// Prática 3.4 (bônus) — O comedouro nivelado
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Ferramenta de nível: com o telefone apoiado sobre o comedouro,
// a bolha só fica verde e centralizada quando ele está plano.
//
// Por que acelerômetro e não giroscópio: parado, o acelerômetro mede
// a gravidade, ou seja, a INCLINAÇÃO absoluta do aparelho (plano ⇒
// x ≈ 0, y ≈ 0, z ≈ ±1 g). O giroscópio mede VELOCIDADE de rotação:
// parado ele lê zero em qualquer ângulo, então não sabe se está torto.
//
// CONTRATO DE TRÊS TEMPOS:
//   1. PEDIR   → Accelerometer.isAvailableAsync() (não exige permissão
//                no Android/iOS; sem hardware, mostra mensagem)
//   2. LER     → Accelerometer.addListener(), a cada INTERVALO_MS
//   3. PARAR   → assinatura.remove() no botão "Desligar" e no "Voltar"
// ============================================================
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";

import {
  borda,
  cores,
  dimensao,
  espaco,
  opacidade,
  raio,
  tipografia,
} from "../theme";

// 100 ms (10 Hz): cada leitura vira um setState e um render da tela.
// A 16 ms (60 Hz) seriam 60 renders por segundo para uma bolha que o
// olho acompanha bem a 10 Hz, e a tela engasga em aparelho fraco. Acima
// de ~200 ms a bolha passa a "pular" e fica difícil ajustar o comedouro
// com a mão.
const INTERVALO_MS = 100;

// 0,02 g ≈ 1,1° de inclinação: abaixo disso a água não escorre para um
// lado, e um limite menor faria a bolha piscar entre verde e laranja só
// com o ruído do sensor.
const TOLERANCIA_G = 0.02;

type Leitura = { x: number; y: number };
type Assinatura = ReturnType<typeof Accelerometer.addListener>;

type ComedouroProps = {
  onVoltar: () => void;
};

function limitar(valor: number): number {
  return Math.max(-1, Math.min(1, valor));
}

export function Comedouro({ onVoltar }: ComedouroProps) {
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [leitura, setLeitura] = useState<Leitura>({ x: 0, y: 0 });
  const [indisponivel, setIndisponivel] = useState(false);

  async function ligar() {
    if (assinatura) return; // nunca abrir duas torneiras
    const disponivel = await Accelerometer.isAvailableAsync();
    if (!disponivel) {
      setIndisponivel(true);
      return;
    }
    Accelerometer.setUpdateInterval(INTERVALO_MS);
    setAssinatura(
      Accelerometer.addListener(({ x, y }) => setLeitura({ x, y })),
    );
  }

  function desligar() {
    assinatura?.remove();
    setAssinatura(null);
  }

  function voltar() {
    desligar();
    onVoltar();
  }

  const ligado = assinatura !== null;
  const nivelado =
    ligado &&
    Math.abs(leitura.x) < TOLERANCIA_G &&
    Math.abs(leitura.y) < TOLERANCIA_G;

  // A bolha vai para o lado MAIS ALTO, contra a gravidade, como num nível
  // de pedreiro. ±1 g leva a bolha até a borda do círculo.
  const curso = (dimensao.nivel - dimensao.bolha) / 2;
  const deslocamento = {
    transform: [
      { translateX: -limitar(leitura.x) * curso },
      { translateY: limitar(leitura.y) * curso },
    ],
  };

  return (
    <View style={styles.tela}>
      <Text style={tipografia.titulo}>Nível do comedouro</Text>
      <Text style={tipografia.legenda}>
        Apoie o telefone deitado sobre o comedouro e ajuste até a bolha ficar
        verde.
      </Text>

      <View style={styles.areaNivel}>
        <View style={styles.nivel}>
          <View style={styles.alvo} />
          <View
            style={[
              styles.bolha,
              nivelado && styles.bolhaNivelada,
              deslocamento,
            ]}
          />
        </View>
        <Text style={[tipografia.corpo, nivelado && styles.textoNivelado]}>
          {!ligado
            ? "Sensor desligado"
            : nivelado
              ? "Nivelado!"
              : `x ${leitura.x.toFixed(2)} g · y ${leitura.y.toFixed(2)} g`}
        </Text>
      </View>

      {indisponivel && (
        <Text style={styles.erro}>
          Este aparelho não tem acelerômetro disponível. Use outro celular ou um
          nível de bolha comum.
        </Text>
      )}

      <View style={styles.acoes}>
        <Pressable
          onPress={ligar}
          disabled={ligado}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoPrimario,
            (pressed || ligado) && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>Ligar</Text>
        </Pressable>
        <Pressable
          onPress={desligar}
          disabled={!ligado}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoNeutro,
            (pressed || !ligado) && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>Desligar</Text>
        </Pressable>
      </View>

      <Pressable onPress={voltar} accessibilityRole="button">
        <Text style={tipografia.acao}>Voltar para a lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: espaco.md,
    paddingTop: espaco.xl + espaco.md,
    backgroundColor: cores.fundo,
    gap: espaco.md,
  },
  areaNivel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: espaco.md,
  },
  nivel: {
    width: dimensao.nivel,
    height: dimensao.nivel,
    borderRadius: dimensao.nivel / 2,
    borderWidth: borda.destaque,
    borderColor: cores.borda,
    backgroundColor: cores.cartao,
    alignItems: "center",
    justifyContent: "center",
  },
  alvo: {
    position: "absolute",
    width: dimensao.bolha + espaco.sm,
    height: dimensao.bolha + espaco.sm,
    borderRadius: (dimensao.bolha + espaco.sm) / 2,
    borderWidth: borda.fina,
    borderColor: cores.textoFraco,
  },
  bolha: {
    width: dimensao.bolha,
    height: dimensao.bolha,
    borderRadius: dimensao.bolha / 2,
    backgroundColor: cores.primaria,
  },
  bolhaNivelada: { backgroundColor: cores.sucesso },
  textoNivelado: { color: cores.sucesso },
  erro: { ...tipografia.corpo, color: cores.erro },
  acoes: { flexDirection: "row", gap: espaco.md },
  botao: {
    flex: 1,
    padding: espaco.md,
    borderRadius: raio.sm,
    alignItems: "center",
  },
  botaoPrimario: { backgroundColor: cores.primaria },
  botaoNeutro: { backgroundColor: cores.neutra },
  pressionado: { opacity: opacidade.pressionado },
  textoBotao: { ...tipografia.acao, color: cores.textoSobrePrimaria },
});
