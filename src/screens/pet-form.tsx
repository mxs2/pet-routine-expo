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
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [alertaVacina, setAlertaVacina] = useState(false);

  // TODO P2.24: substitua `true` pela condição correta.
  //   O nome está vazio quando nome.trim() === ''.
  const nomeVazio = true;

  return (
    <ScrollView
      style={styles.tela}
      // TODO P2.25: por que o padding fica em contentContainerStyle e não em style?
      //   Responda em um comentário e confirme que está na prop certa.
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.rotulo}>Nome do pet</Text>
      {/* TODO P2.26: adicione value={nome} e onChangeText={setNome} ao TextInput.
          TODO P2.27: troque style por array de estilos com inputInvalido quando nomeVazio.
            Exemplo: style={[styles.input, nomeVazio && styles.inputInvalido]} */}
      <TextInput style={styles.input} placeholder="Ex: Rex" />

      <Text style={styles.rotulo}>Raça</Text>
      {/* TODO P2.28: segundo TextInput controlado (value={raca} + onChangeText={setRaca}) */}
      <TextInput style={styles.input} placeholder="Ex: Golden Retriever" />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Alerta de vacina</Text>
        {/* TODO P2.29: Switch controlado (value={alertaVacina} + onValueChange={setAlertaVacina}) */}
        <Switch />
      </View>

      {/* O Button não aceita style — a View estilizada ao redor controla a aparência */}
      <View style={styles.areaBotao}>
        {/* TODO P2.30: adicione disabled={nomeVazio} ao Button.
            TODO P2.31: adicione color={cores.primaria} ao Button. */}
        <Button title="Salvar" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    // TODO P2.32: backgroundColor dos tokens (cores.fundo)
  },
  conteudo: {
    // TODO P2.33: padding e gap — daqui saem TODOS os espaçamentos do formulário.
    //   Se você precisar de margin em algum filho, algo está errado.
    //   Use espaco.md para padding e espaco.md para gap (ou a escala que escolheu).
  },
  input: {
    borderWidth: 1,
    // TODO P2.34: borderColor, borderRadius, padding e fontSize — tudo dos tokens.
    //   Exemplo: borderColor: cores.textoFraco, padding: espaco.sm
  },
  inputInvalido: {
    // TODO P2.35: só o que MUDA em relação ao input normal.
    //   Não repita borderWidth, padding etc. — o array de estilos já herda.
    //   Exemplo: borderColor: cores.erro
  },
  linha: {
    // TODO P2.36: flexDirection 'row', justifyContent 'space-between',
    //   alignItems 'center' — os dois filhos ficam nas pontas, alinhados.
  },
  rotulo: {
    // TODO P2.37: use um estilo de tipografia (ex: tipografia.corpo ou equivalente)
  },
  areaBotao: {
    borderRadius: 8,
    overflow: 'hidden',
    // TODO P2.38: marginTop AQUI é legítima — é espaço extra em volta do grupo,
    //   não espaço entre irmãos. Use um token de espaco (ex: espaco.lg).
  },
});
