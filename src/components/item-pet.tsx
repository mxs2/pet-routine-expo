// ============================================================
// Prática 3 — Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Envolve o CardPet num Pressable para toque curto e longo.
// A ação vai em onPress, feedback visual vai no `pressed`.
// Nunca onPressIn.
// ============================================================
import { Pressable, StyleSheet } from "react-native";

import type { Pet } from "../types/pet";
import { espaco, opacidade } from "../theme";
import { CardPet } from "./card-pet";

// hitSlop: o card já é grande, então só um respiro de 4px em volta para
// toques que pegam na borda não se perderem no gap entre os itens (8px);
// maior que metade do gap invadiria a área do vizinho.
const AREA_EXTRA_TOQUE = espaco.xs;

// unstable_pressDelay: 100ms segura o feedback `pressed` enquanto o gesto
// ainda pode virar rolagem; sem isso, todo card que o dedo cruza ao rolar
// pisca. Mais que isso o toque começa a parecer lento.
const ATRASO_FEEDBACK_MS = 100;

type ItemPetProps = {
  pet: Pet;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onRegistrar: (id: string) => void;
};

export function ItemPet({
  pet,
  onAlternar,
  onRemover,
  onRegistrar,
}: ItemPetProps) {
  return (
    <Pressable
      onPress={() => onAlternar(pet.id)}
      onLongPress={() => onRemover(pet.id)}
      accessibilityRole="button"
      accessibilityLabel={`${pet.nome}, toque para alternar o passeio`}
      accessibilityHint="Toque longo remove o pet da lista"
      hitSlop={AREA_EXTRA_TOQUE}
      unstable_pressDelay={ATRASO_FEEDBACK_MS}
      style={({ pressed }) => [styles.item, pressed && styles.pressionado]}
    >
      <CardPet pet={pet} aoRegistrarPasseio={() => onRegistrar(pet.id)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    // Sem margin: o espaço entre itens vem do gap do contentContainerStyle.
    borderRadius: espaco.md,
  },
  pressionado: {
    opacity: opacidade.pressionado,
  },
});
