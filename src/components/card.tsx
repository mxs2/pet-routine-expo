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
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { borda, cores, espaco, raio, sombra } from "../theme";

type CardProps = {
  children: ReactNode;
  destacado?: boolean;
};

export function Card({ children, destacado = false }: CardProps) {
  return (
    <View style={[styles.card, destacado && styles.cardDestacado]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: espaco.md,
    borderRadius: raio.md,
    backgroundColor: cores.cartao,
    boxShadow: sombra.cartao,
    gap: espaco.sm,
  },
  cardDestacado: {
    borderWidth: borda.destaque,
    borderColor: cores.primaria,
    boxShadow: sombra.destaque,
  },
});
