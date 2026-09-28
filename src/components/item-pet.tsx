// ============================================================
// Prática 3 — Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Envolve o CardPet num Pressable para toque curto e longo.
// A ação vai em onPress, feedback visual vai no `pressed`.
// Nunca onPressIn.
// ============================================================
import { Pressable, StyleSheet } from 'react-native';

import type { Pet } from '../types/pet';
import { CardPet } from './card-pet';

type ItemPetProps = {
  pet: Pet;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onRegistrar: (id: string) => void;
};

export function ItemPet({ pet, onAlternar, onRemover, onRegistrar }: ItemPetProps) {
  return (
    <Pressable
      // TODO P3.6: toque curto alterna o status do passeio; toque longo remove.
      //   onPress={() => onAlternar(pet.id)}
      //   onLongPress={() => onRemover(pet.id)}
      //
      // TODO P3.7: acessibilidade — papel e rótulo.
      //   accessibilityRole="button"
      //   accessibilityLabel={`${pet.nome}, toque para alternar passeio`}
      //
      // TODO P3.8: hitSlop e unstable_pressDelay.
      //   hitSlop amplia a área de toque sem mudar o visual — útil em itens pequenos.
      //   unstable_pressDelay evita feedback visual ao rolar a lista.
      //   Justifique cada valor num comentário.
      style={({ pressed }) => [
        styles.item,
        // TODO P3.9: feedback visual quando pressed.
        //   Ex: pressed && { opacity: 0.7 }
      ]}
    >
      {/* TODO P3.10: reaproveite o CardPet aqui dentro.
                Passe pet e aoRegistrarPasseio={() => onRegistrar(pet.id)}.
                O Text onPress do CardPet NÃO conflita com o Pressable:
                eventos de Text não borbulham para o Pressable pai. */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    // TODO P3.11: SEM margin aqui.
    //   O espaço entre itens vem de gap no contentContainerStyle
    //   ou de ItemSeparatorComponent. Margin num item de lista
    //   é o antipadrão que esta prática ensina a evitar.
  },
});
