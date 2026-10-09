// ============================================================
// Prática 2 — Card do pet em destaque
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Usa o Card reutilizável e os tipos do domínio.
// Mostra: nome, espécie + status do passeio (um em cada ponta), idade.
// Oferece uma ação "Registrar passeio".
//
// Prática 3: mostra a miniatura da foto (expo-image) e o local do
// último passeio, quando existirem.
// ============================================================
import { Pressable, StyleSheet, Text, View } from "react-native";
// Image do expo-image, NÃO do react-native: precisa de contentFit e cache.
import { Image } from "expo-image";

import { type Pet, rotuloEspecie, rotuloStatusPasseio } from "../types/pet";
import { cores, dimensao, espaco, opacidade, raio, tipografia } from "../theme";
import { Card } from "./card";

type CardPetProps = {
  pet: Pet;
  aoRegistrarPasseio: () => void;
};

// Três casas decimais ≈ 110 m: suficiente para reconhecer o lugar, sem
// fingir uma precisão que o GPS não tem.
function formatarLocal(local: NonNullable<Pet["local"]>): string {
  const lat = local.latitude.toFixed(3);
  const lon = local.longitude.toFixed(3);
  return `Local: ${lat}, ${lon} (±${Math.round(local.precisaoMetros)} m)`;
}

export function CardPet({ pet, aoRegistrarPasseio }: CardPetProps) {
  const concluido = pet.statusPasseio === "concluido";

  return (
    <Card>
      {pet.fotoUri ? (
        // "cover" preenche a faixa inteira e corta o excesso; "contain"
        // deixaria tarjas vazias, já que a foto da câmera não tem a
        // proporção da miniatura.
        <Image
          source={{ uri: pet.fotoUri }}
          style={styles.miniatura}
          contentFit="cover"
          recyclingKey={pet.id}
          accessibilityLabel={`Foto do passeio de ${pet.nome}`}
        />
      ) : (
        <View style={[styles.miniatura, styles.miniaturaVazia]} />
      )}

      <Text style={tipografia.titulo}>{pet.nome}</Text>

      <View style={styles.linha}>
        <Text style={tipografia.corpo}>{rotuloEspecie(pet.especie)}</Text>
        <Text style={[tipografia.corpo, concluido && styles.statusConcluido]}>
          {rotuloStatusPasseio(pet.statusPasseio)}
        </Text>
      </View>

      <Text style={tipografia.legenda}>{pet.idadeMeses} meses</Text>

      {pet.local && (
        <Text style={tipografia.legenda}>{formatarLocal(pet.local)}</Text>
      )}

      {/* Pressable (e não Text onPress) para o toque não chegar ao Pressable do item. */}
      <Pressable
        onPress={aoRegistrarPasseio}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
      >
        <Text style={tipografia.acao}>Registrar passeio</Text>
      </Pressable>
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
    alignSelf: "flex-start",
    marginTop: espaco.sm,
    paddingVertical: espaco.xs,
  },
  botaoPressionado: {
    opacity: opacidade.pressionado,
  },
  miniatura: {
    width: "100%",
    height: dimensao.miniatura,
    borderRadius: raio.sm,
  },
  miniaturaVazia: {
    backgroundColor: cores.fundo,
  },
});
