// ============================================================
// Prática 2 — Formulário de cadastro/edição de Pet
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Dentro de um ScrollView, com padding no contentContainerStyle.
// Componentes permitidos: View, ScrollView, Text, TextInput,
//   Image, Button, Switch + StyleSheet.
//
// Restrições:
//   • Inputs controlados (value + onChangeText)
//   • Switch controlado (value + onValueChange)
//   • Button desabilitado quando o nome estiver vazio
//   • Pelo menos um estilo condicional (ex: borda vermelha no input vazio)
//   • Nenhuma cor ou espaçamento mágico — tudo vem do theme.ts
//   • Espaçamento entre irmãos com `gap`, não com `margin`
//
// Para testar: importe este componente em App.tsx temporariamente.
// ============================================================
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { borda, cores, espaco, raio, tipografia } from "../theme";

export default function PetForm() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [alertaVacina, setAlertaVacina] = useState(false);

  const nomeVazio = nome.trim() === "";

  return (
    <ScrollView
      style={styles.tela}
      // O padding vai no contentContainerStyle porque é o conteúdo que rola;
      // em `style` ele encolheria a janela do ScrollView e o fim do conteúdo ficaria cortado.
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.rotulo}>Nome do pet</Text>
      <TextInput
        style={[styles.input, nomeVazio && styles.inputInvalido]}
        placeholder="Ex: Rex"
        placeholderTextColor={cores.textoFraco}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.rotulo}>Raça</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Golden Retriever"
        placeholderTextColor={cores.textoFraco}
        value={raca}
        onChangeText={setRaca}
      />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Alerta de vacina</Text>
        <Switch
          value={alertaVacina}
          onValueChange={setAlertaVacina}
          trackColor={{ true: cores.primaria }}
        />
      </View>

      {/* O Button não aceita style — a View estilizada ao redor controla a aparência */}
      <View style={styles.areaBotao}>
        <Button
          title="Salvar"
          onPress={() => {}}
          disabled={nomeVazio}
          color={cores.primaria}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espaco.md,
    gap: espaco.md,
  },
  input: {
    borderWidth: borda.fina,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    padding: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: tipografia.corpo.fontSize,
    color: cores.texto,
  },
  inputInvalido: {
    borderColor: cores.erro,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rotulo: {
    ...tipografia.corpo,
  },
  areaBotao: {
    borderRadius: raio.sm,
    overflow: "hidden",
    marginTop: espaco.lg,
  },
});
