// ============================================================
// Prática 3 — Estado vazio da lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem ListEmptyComponent. Sem exceção.
// E o texto do estado vazio precisa AJUDAR o usuário:
//   - primeiro acesso → o que ele pode fazer
//   - busca sem resultado → o que ele pode tentar
// ============================================================
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

type ListaVaziaProps = {
  // TODO P3.12: uma prop que permita distinguir "primeiro acesso" de "busca sem resultado".
  //   Sugestão: termoBusca?: string
  //   Se termoBusca está definido e não-vazio → "busca sem resultado"
  //   Senão → "primeiro acesso" (a lista está vazia de verdade)
};

export function ListaVazia(/* TODO P3.12: desestruture a prop */) {
  // TODO P3.13: dois textos diferentes, conforme o cenário.
  //   Primeiro acesso: "Nenhum pet cadastrado. Que tal adicionar um?"
  //   Busca sem resultado: "Nenhum pet encontrado para '${termoBusca}'."
  //   A frase da busca MENCIONA o termo procurado.
  //   As duas frases são DIFERENTES — repetir a mesma é erro.
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {/* TODO P3.13 */}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO P3.14: centralize e use padding generoso (espaco.lg ou xl)
    alignItems: 'center' as const,
  },
  texto: {
    ...tipografia.corpo,
    color: cores.textoFraco,
    textAlign: 'center' as const,
  },
});
