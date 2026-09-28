// ============================================================
// Prática 2 — Card do pet em destaque
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Usa o Card reutilizável e os tipos do domínio.
// Mostra: nome, espécie + status do passeio (um em cada ponta), idade.
// Oferece uma ação "Registrar passeio".
//
// Componentes permitidos: View, Text (dos 7 da aula).
//   Ação de toque via onPress do Text, não Touchable*.
// ============================================================
import { StyleSheet, Text, View } from 'react-native';

import { type Pet, rotuloEspecie, rotuloStatusPasseio } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';
import { Card } from './card';

// TODO P2.11: tipe as props. O card recebe:
//   - pet: Pet
//   - aoRegistrarPasseio: () => void
type CardPetProps = {
  /* ... */
};

export function CardPet({ /* TODO P2.12: desestruture as props */ }: CardPetProps) {
  return (
    <Card>
      {/* TODO P2.13: nome do pet (Text com estilo de título) */}

      {/* TODO P2.14: uma View com flexDirection 'row' e justifyContent 'space-between'.
            Dentro dela, dois Text:
              - espécie à esquerda: rotuloEspecie(pet.especie)
              - status à direita: rotuloStatusPasseio(pet.statusPasseio) */}

      {/* TODO P2.15: idade em meses (Text com estilo de legenda).
            Ex: "24 meses" */}

      {/* TODO P2.16: um Text com onPress que chame aoRegistrarPasseio.
            Texto: "Registrar passeio".
            A ação vem das props — o card não sabe O QUE fazer,
            só avisa que o toque aconteceu. */}
    </Card>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // TODO P2.17: use espaco para o marginTop
  },
  botao: {
    // TODO P2.18: marginTop, fontWeight e color — tudo dos tokens.
    //   Dica: a cor do botão pode ser cores.primaria.
  },
});
