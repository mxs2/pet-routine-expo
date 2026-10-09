// ============================================================
// Prática 3 — Tela principal: lista de pets + registro de passeio
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Na Prática 2 esta tela mostrava um pet em destaque.
// Agora mostra uma lista de verdade com SectionList, toque
// interativo e registro de passeio com sensores.
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo
//   • Agrupamento e filtro moram em src/lib/, não aqui
//   • Sem useEffect para sensores (cleanup é assunto da Aula 6)
// ============================================================
import { useState } from "react";
import {
  SectionList,
  type SectionListData,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { Pet } from "./src/types/pet";
import { PETS } from "./src/data/pets";
import { agrupar, filtrarPorNome, type Secao } from "./src/lib/agrupar";
import { ItemPet } from "./src/components/item-pet";
import { ListaVazia } from "./src/components/lista-vazia";
import { TelaRegistro } from "./src/screens/tela-registro";
import { borda, cores, espaco, raio, tipografia } from "./src/theme";

const ATRASO_RECARGA_MS = 800; // simula a ida ao servidor no pull-to-refresh

// Não depende de estado local, então fica fora do componente e não é
// recriado a cada render.
function renderCabecalhoSecao({
  section,
}: {
  section: SectionListData<Pet, Secao>;
}) {
  return (
    <Text style={styles.cabecalhoSecao}>
      {section.title} ({section.data.length})
    </Text>
  );
}

export default function App() {
  const [pets, setPets] = useState<Pet[]>(PETS);
  const [busca, setBusca] = useState("");
  const [atualizando, setAtualizando] = useState(false);
  // ID do pet sendo registrado, ou null para mostrar a lista.
  const [petRegistrando, setPetRegistrando] = useState<string | null>(null);

  function alternarStatus(id: string) {
    setPets((anteriores) =>
      anteriores.map((p) =>
        p.id === id
          ? {
              ...p,
              statusPasseio:
                p.statusPasseio === "concluido" ? "pendente" : "concluido",
            }
          : p,
      ),
    );
  }

  function removerPet(id: string) {
    setPets((anteriores) => anteriores.filter((p) => p.id !== id));
  }

  async function recarregar() {
    setAtualizando(true);
    await new Promise((r) => setTimeout(r, ATRASO_RECARGA_MS));
    setPets(PETS);
    setBusca("");
    setAtualizando(false);
  }

  function handleRegistro(local?: Pet["local"], fotoUri?: string) {
    if (!petRegistrando) return;
    setPets((anteriores) =>
      anteriores.map((p) =>
        p.id === petRegistrando
          ? {
              ...p,
              statusPasseio: "concluido",
              // Sem permissão, mantém o que o pet já tinha em vez de apagar.
              local: local ?? p.local,
              fotoUri: fotoUri ?? p.fotoUri,
            }
          : p,
      ),
    );
    setPetRegistrando(null);
  }

  const petAlvo = pets.find((p) => p.id === petRegistrando);
  if (petAlvo) {
    return (
      <TelaRegistro
        pet={petAlvo}
        onSalvar={handleRegistro}
        onCancelar={() => setPetRegistrando(null)}
      />
    );
  }

  // Filtra antes de agrupar: assim o agrupamento já descarta as seções que
  // ficaram vazias depois da busca, e nenhum cabeçalho aparece sem itens.
  const secoes = agrupar(filtrarPorNome(pets, busca));

  return (
    <View style={styles.tela}>
      <SectionList<Pet, Secao>
        sections={secoes}
        keyExtractor={(item) => item.id}
        // Depende dos handlers deste componente, então fica inline.
        renderItem={({ item }) => (
          <ItemPet
            pet={item}
            onAlternar={alternarStatus}
            onRemover={removerPet}
            onRegistrar={setPetRegistrando}
          />
        )}
        renderSectionHeader={renderCabecalhoSecao}
        stickySectionHeadersEnabled
        ListEmptyComponent={<ListaVazia termoBusca={busca} />}
        refreshing={atualizando}
        onRefresh={recarregar}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.cabecalho}>
            <Text style={tipografia.titulo}>Meus pets</Text>
            <Text style={tipografia.legenda}>
              Toque para alternar o passeio · toque longo para remover
            </Text>
            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar pet por nome..."
              placeholderTextColor={cores.textoFraco}
              style={styles.busca}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
          </View>
        }
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: espaco.xl + espaco.md,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    gap: espaco.sm,
    paddingBottom: espaco.sm,
  },
  conteudo: {
    gap: espaco.sm,
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.lg,
  },
  cabecalhoSecao: {
    ...tipografia.legenda,
    fontWeight: tipografia.acao.fontWeight,
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
  },
  busca: {
    borderWidth: borda.fina,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    padding: espaco.sm,
    fontSize: tipografia.corpo.fontSize,
    color: cores.texto,
    backgroundColor: cores.cartao,
  },
});
