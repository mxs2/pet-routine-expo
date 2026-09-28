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
import { Image } from 'expo-image';

import { type Pet, rotuloEspecie, rotuloStatusPasseio } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';
import { Card } from './card';

// TODO P2.11: tipe as props. O card recebe:
//   - pet: Pet
//   - aoRegistrarPasseio: () => void
type CardPetProps = {
  /* ... */
  pet: Pet;
  aoRegistrarPasseio: () => void;
};

export function CardPet({ /* TODO P2.12: desestruture as props */ pet, aoRegistrarPasseio }: CardPetProps) {
  return (
    <Card>
      {/* TODO P3.25: quando pet.fotoUri existir, mostre a miniatura com expo-image.
                Quando não existir, mostre um placeholder (View com cor de fundo).
                Exemplo:
                  pet.fotoUri
                    ? <Image source={{ uri: pet.fotoUri }} style={styles.miniatura}
                        contentFit="cover" recyclingKey={pet.id} transition={200} />
                    : <View style={[styles.miniatura, styles.miniaturaVazia]} />
                TODO P3.26: contentFit explícito — por que "cover" e não "contain"?
                  Confira o import: expo-image, NÃO react-native. */}

      <Text style={tipografia.titulo}>{pet.nome}</Text>

      {/* TODO P2.14: uma View com flexDirection 'row' e justifyContent 'space-between'.
            Dentro dela, dois Text:
              - espécie à esquerda: rotuloEspecie(pet.especie)
              - status à direita: rotuloStatusPasseio(pet.statusPasseio) */}
      <View style={styles.linha}>
        <Text style={tipografia.corpo}>{rotuloEspecie(pet.especie)}</Text>
        <Text style={tipografia.corpo}>{rotuloStatusPasseio(pet.statusPasseio)}</Text>
      </View>

      {/* TODO P2.15: idade em meses (Text com estilo de legenda).
            Ex: "24 meses" */}
      <Text style={tipografia.legenda}>{pet.idadeMeses} meses</Text>

      {/* TODO P3.27: quando pet.local existir, mostre latitude e longitude de forma
                legível para HUMANOS, com o raio de precisão em metros.
                Coordenada crua com 14 casas decimais não é informação para o usuário.
                Exemplo: "Local: -8.054, -34.871 (±12m)"
                Quando pet.local for undefined, não mostre nada (nem placeholder). */}

      {/* TODO P2.16: um Text com onPress que chame aoRegistrarPasseio.
            Texto: "Registrar passeio".
            A ação vem das props — o card não sabe O QUE fazer,
            só avisa que o toque aconteceu. */}
      <Text style={styles.botao} onPress={aoRegistrarPasseio}>Registrar passeio</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // TODO P2.17: use espaco para o marginTop
    marginTop: espaco.sm,
  },
  botao: {
    // TODO P2.18: marginTop, fontWeight e color — tudo dos tokens.
    //   Dica: a cor do botão pode ser cores.primaria.
    marginTop: espaco.md,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  miniatura: {
    // TODO P3.25: dimensões da miniatura.
    //   Ex: width: '100%', height: 120, borderRadius: espaco.sm
    width: '100%' as const,
    height: 120,
    borderRadius: espaco.sm,
  },
  miniaturaVazia: {
    // TODO P3.25: estilo do placeholder quando não há foto.
    //   Ex: backgroundColor: cores.fundo (ou um cinza claro)
    backgroundColor: cores.fundo,
  },
});
