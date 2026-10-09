// ============================================================
// Prática 3 — Tela de registro de passeio (sensores)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Captura o CONTEXTO do passeio: onde aconteceu (GPS) e como ele
// se parecia (câmera). Navegação por condicional com useState —
// navegação real chega na Aula 7.
//
// CONTRATO DE TRÊS TEMPOS:
//   Localização
//     1. PEDIR   → hasServicesEnabledAsync() + requestForegroundPermissionsAsync()
//     2. LER     → getCurrentPositionAsync({ accuracy: Balanced }), uma vez
//     3. PARAR   → não se aplica, porque é leitura única: não há
//                  watchPositionAsync nem subscription aberta
//   Câmera
//     1. PEDIR   → requestPermission() do useCameraPermissions()
//     2. LER     → cameraRef.takePictureAsync({ base64: false })
//     3. PARAR   → setMostrarCamera(false): desmontar a CameraView
//                  libera o hardware
//
// Restrições:
//   • Sem useEffect, useRef — apenas useState + hooks das bibliotecas
//   • Sem navegação — a tela aparece por condicional em App.tsx
//   • Sem mapa — coordenada é texto
//   • Sem salvar na galeria e sem escolher do rolo
//   • Sem rede — foto vive no cache
// ============================================================
import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
// Image do expo-image, NÃO do react-native: precisa de contentFit e cache.
import { Image } from "expo-image";
import * as Location from "expo-location";
import { CameraView, useCameraPermissions } from "expo-camera";

import type { Pet } from "../types/pet";
import { cores, dimensao, espaco, opacidade, raio, tipografia } from "../theme";

type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: Pet["local"], fotoUri?: string) => void;
  onCancelar: () => void;
};

type Falha =
  | "localizacaoNegada"
  | "localizacaoBloqueada"
  | "servicoDesligado"
  | "cameraNegada"
  | "cameraBloqueada"
  | "hardwareIndisponivel";

// Cada falha tem a própria mensagem, e cada mensagem diz o que fazer.
function mensagemFalha(falha: Falha): string {
  switch (falha) {
    case "localizacaoNegada":
      return 'Você não permitiu o acesso à localização. Toque em "Obter localização" para tentar de novo, ou salve sem o local.';
    case "localizacaoBloqueada":
      return "O acesso à localização está bloqueado para este app. Libere em Configurações > Permissões > Localização.";
    case "servicoDesligado":
      return 'A localização do aparelho está desligada. Ative o GPS nas configurações rápidas e toque em "Obter localização".';
    case "cameraNegada":
      return 'Você não permitiu o acesso à câmera. Toque em "Tirar foto" para tentar de novo, ou salve sem foto.';
    case "cameraBloqueada":
      return "O acesso à câmera está bloqueado para este app. Libere em Configurações > Permissões > Câmera.";
    case "hardwareIndisponivel":
      return "Não foi possível usar o sensor deste aparelho agora. Tente de novo, ou salve o passeio sem essa informação.";
  }
}

function precisaConfiguracoes(falha: Falha): boolean {
  return falha === "localizacaoBloqueada" || falha === "cameraBloqueada";
}

export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const [local, setLocal] = useState<Pet["local"] | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [lendoLocal, setLendoLocal] = useState(false);

  const [, pedirPermissaoCamera] = useCameraPermissions();

  // Callback ref via useState (useRef não faz parte desta prática).
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  // ----- Localização -----
  async function obterLocalizacao() {
    setLendoLocal(true);
    try {
      const servico = await Location.hasServicesEnabledAsync();
      if (!servico) {
        setFalha("servicoDesligado");
        return;
      }

      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setFalha(canAskAgain ? "localizacaoNegada" : "localizacaoBloqueada");
        return;
      }

      // Balanced (~100 m): o registro só precisa dizer em que bairro ou praça
      // foi o passeio. High/BestForNavigation ligam o GPS puro, demoram mais
      // para fixar e gastam bateria por uma precisão que a tela nem mostra
      // (exibimos 3 casas decimais).
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocal({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        precisaoMetros: posicao.coords.accuracy ?? 0,
      });
      setFalha(null);
    } catch {
      // Sem fix, timeout ou aparelho sem provedor de localização.
      setFalha("hardwareIndisponivel");
    } finally {
      setLendoLocal(false);
    }
  }

  // ----- Câmera -----
  async function abrirCamera() {
    const { status, canAskAgain } = await pedirPermissaoCamera();
    if (status !== "granted") {
      setFalha(canAskAgain ? "cameraNegada" : "cameraBloqueada");
      return;
    }
    setFalha(null);
    setMostrarCamera(true);
  }

  async function tirarFoto() {
    if (!cameraRef) return;
    try {
      // base64: false, porque para exibir basta o uri. A foto fica no cache
      // do app e não vai para a galeria.
      const foto = await cameraRef.takePictureAsync({ base64: false });
      setFotoUri(foto.uri);
    } catch {
      setFalha("hardwareIndisponivel");
    } finally {
      setMostrarCamera(false);
    }
  }

  function falhaAoMontarCamera() {
    // Emulador sem câmera, câmera em uso por outro app, etc.
    setMostrarCamera(false);
    setFalha("hardwareIndisponivel");
  }

  function salvar() {
    // Salvar fica sempre habilitado: um pet sem foto e sem local ainda é um pet.
    onSalvar(local ?? undefined, fotoUri ?? undefined);
  }

  // ----- Renderização: câmera ativa -----
  if (mostrarCamera) {
    return (
      <View style={styles.tela}>
        <CameraView
          ref={setCameraRef}
          style={styles.camera}
          facing="back"
          onMountError={falhaAoMontarCamera}
        />
        <View style={styles.acoes}>
          <Pressable
            onPress={tirarFoto}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.botao,
              styles.botaoLinha,
              styles.botaoPrimario,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={styles.textoBotao}>Tirar foto</Text>
          </Pressable>
          <Pressable
            onPress={() => setMostrarCamera(false)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.botao,
              styles.botaoLinha,
              styles.botaoNeutro,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ----- Renderização: tela principal de registro -----
  return (
    <View style={styles.tela}>
      <Text style={tipografia.titulo}>Registrar passeio de {pet.nome}</Text>

      {falha && (
        <View style={styles.secao}>
          <Text style={styles.erro}>{mensagemFalha(falha)}</Text>
          {precisaConfiguracoes(falha) && (
            <Pressable
              onPress={() => Linking.openSettings()}
              accessibilityRole="button"
            >
              <Text style={tipografia.acao}>Abrir configurações</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Localização */}
      {local ? (
        <View style={styles.secao}>
          <Text style={tipografia.corpo}>
            Local: {local.latitude.toFixed(3)}, {local.longitude.toFixed(3)} (±
            {Math.round(local.precisaoMetros)} m)
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={obterLocalizacao}
          disabled={lendoLocal}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoPrimario,
            (pressed || lendoLocal) && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>
            {lendoLocal ? "Obtendo localização…" : "Obter localização"}
          </Text>
        </Pressable>
      )}

      {/* Foto */}
      {fotoUri ? (
        // "cover" preenche a prévia inteira e corta o excesso; "contain"
        // deixaria tarjas, porque a foto da câmera é mais alta que a prévia.
        <Image
          source={{ uri: fotoUri }}
          style={styles.previa}
          contentFit="cover"
          accessibilityLabel={`Foto do passeio de ${pet.nome}`}
        />
      ) : (
        <Pressable
          onPress={abrirCamera}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoPrimario,
            pressed && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>Tirar foto</Text>
        </Pressable>
      )}

      {/* Ações */}
      <View style={styles.acoes}>
        <Pressable
          onPress={salvar}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoLinha,
            styles.botaoSucesso,
            pressed && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
        <Pressable
          onPress={onCancelar}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botao,
            styles.botaoLinha,
            styles.botaoNeutro,
            pressed && styles.pressionado,
          ]}
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
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
  erro: { ...tipografia.corpo, color: cores.erro },
  secao: { gap: espaco.sm },
  camera: { flex: 1, borderRadius: raio.sm, overflow: "hidden" },
  previa: { width: "100%", height: dimensao.previa, borderRadius: raio.sm },
  botao: {
    padding: espaco.md,
    borderRadius: raio.sm,
    alignItems: "center",
  },
  botaoLinha: { flex: 1 },
  botaoPrimario: { backgroundColor: cores.primaria },
  botaoSucesso: { backgroundColor: cores.sucesso },
  botaoNeutro: { backgroundColor: cores.neutra },
  pressionado: { opacity: opacidade.pressionado },
  textoBotao: { ...tipografia.acao, color: cores.textoSobrePrimaria },
  acoes: { flexDirection: "row", gap: espaco.md },
});
