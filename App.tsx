// ============================================================
// Prática 2 — Tela do pet em destaque
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Esta tela mostra UMA única entidade em destaque, não uma lista.
// Usa a união discriminada EstadoTela<Pet> para garantir que cada
// estado (carregando, sucesso, erro) seja tratado de forma exaustiva.
//
// Restrições:
//   • Nenhum `any` ou `as` desnecessário
//   • switch sem `default` — a exaustividade é o ponto
//   • Cores e espaçamentos vindos do theme.ts — nenhum hex solto
// ============================================================
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { CardPet } from "./src/components/card-pet";
import { buscarPetEmDestaque } from "./src/services/pet-service";
import { type EstadoTela, type Pet } from "./src/types/pet";
import { cores, espaco, tipografia } from "./src/theme";

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Pet>>({ tipo: "carregando" });

  const carregar = useCallback(async () => {
    setEstado({ tipo: "carregando" });
    try {
      const pet = await buscarPetEmDestaque();
      setEstado({ tipo: "sucesso", dados: pet });
    } catch (erro: unknown) {
      const mensagem =
        erro instanceof Error ? erro.message : "Erro desconhecido";
      setEstado({ tipo: "erro", mensagem });
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function registrarPasseio() {
    if (estado.tipo !== "sucesso") return;
    setEstado({
      tipo: "sucesso",
      dados: { ...estado.dados, statusPasseio: "concluido" },
    });
  }

  // Cada case retorna a tela inteira — sem `default`, sem break.
  switch (estado.tipo) {
    case "carregando":
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={cores.primaria} />
        </View>
      );

    case "sucesso":
      return (
        <View style={styles.container}>
          <Text style={tipografia.legenda}>Pet em destaque</Text>
          <CardPet pet={estado.dados} aoRegistrarPasseio={registrarPasseio} />
        </View>
      );

    case "erro":
      return (
        <View style={styles.centro}>
          <Text style={[tipografia.corpo, styles.mensagemErro]}>
            {estado.mensagem}
          </Text>
          <Text
            style={tipografia.acao}
            onPress={carregar}
            accessibilityRole="button"
          >
            Tentar novamente
          </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: espaco.xl + espaco.md,
    padding: espaco.md,
    gap: espaco.sm,
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: espaco.lg,
    gap: espaco.md,
    backgroundColor: cores.fundo,
  },
  mensagemErro: {
    color: cores.erro,
    textAlign: "center",
  },
});
