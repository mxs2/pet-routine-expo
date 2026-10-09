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
import { StyleSheet, Text, View } from "react-native";

import { type Pet, rotuloEspecie, rotuloStatusPasseio } from "../types/pet";
import { cores, espaco, tipografia } from "../theme";
import { Card } from "./card";

type CardPetProps = {
  pet: Pet;
  aoRegistrarPasseio: () => void;
};

export function CardPet({ pet, aoRegistrarPasseio }: CardPetProps) {
  const concluido = pet.statusPasseio === "concluido";

  return (
    <Card destacado>
      <Text style={tipografia.titulo}>{pet.nome}</Text>

      <View style={styles.linha}>
        <Text style={tipografia.corpo}>{rotuloEspecie(pet.especie)}</Text>
        <Text style={[tipografia.corpo, concluido && styles.statusConcluido]}>
          {rotuloStatusPasseio(pet.statusPasseio)}
        </Text>
      </View>

      <Text style={tipografia.legenda}>{pet.idadeMeses} meses</Text>

      <Text
        style={styles.botao}
        onPress={aoRegistrarPasseio}
        accessibilityRole="button"
      >
        Registrar passeio
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: espaco.xs,
  },
  statusConcluido: {
    color: cores.sucesso,
  },
  botao: {
    ...tipografia.acao,
    marginTop: espaco.sm,
  },
});
