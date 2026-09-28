// ============================================================
// Prática 2 — Componente Card reutilizável
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Este componente é genérico — ele não sabe nada sobre Pet.
// Props tipadas, children: ReactNode, prop opcional `destacado`.
//
// Restrições:
//   • Sombra com `boxShadow` (uma string), não com shadow*/elevation
//   • Espaçamento interno com `gap`
//   • Nenhum hex ou número mágico — tudo vem do theme.ts
// ============================================================
import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espaco } from '../theme';

type CardProps = {
  children: ReactNode;
  // TODO P2.5: prop opcional `destacado?: boolean` que muda a aparência
};

export function Card({ children /* TODO P2.6: desestruture destacado */ }: CardProps) {
  // TODO P2.7: use array de estilos — base sempre, variante só quando destacado.
  //   Exemplo: style={[styles.card, destacado && styles.cardDestacado]}
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // TODO P2.8: padding, borderRadius e backgroundColor — vindos dos tokens.
    //   Nenhum hex e nenhum número solto neste arquivo.
    // TODO P2.9: sombra com `boxShadow` (uma string, ex: '0 1px 3px rgba(0,0,0,0.12)')
    //   e espaçamento entre filhos com `gap`
  },
  cardDestacado: {
    // TODO P2.10: o que muda quando o card é destacado?
    //   Borda colorida? Fundo diferente? Escolha e justifique no README.
  },
});
