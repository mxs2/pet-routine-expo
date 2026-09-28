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
import { useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Pet } from './src/types/pet';
import { PETS } from './src/data/pets';
import { agrupar, filtrarPorNome, type Secao } from './src/lib/agrupar';
import { ItemPet } from './src/components/item-pet';
import { ListaVazia } from './src/components/lista-vazia';
import { TelaRegistro } from './src/screens/tela-registro';
import { cores, espaco, tipografia } from './src/theme';

export default function App() {
  // TODO P3.28: declare os quatro estados da tela:
  //   const [pets, setPets] = useState<Pet[]>(PETS);
  //   const [busca, setBusca] = useState('');
  //   const [atualizando, setAtualizando] = useState(false);
  //   const [petRegistrando, setPetRegistrando] = useState<string | null>(null);
  //   petRegistrando guarda o ID do pet sendo registrado, ou null para a lista.

  // TODO P3.29: alternar status do passeio — array novo, objeto novo. Nada de mutação.
  //   function alternarStatus(id: string) {
  //     setPets(anteriores =>
  //       anteriores.map(p =>
  //         p.id === id
  //           ? { ...p, statusPasseio: p.statusPasseio === 'concluido' ? 'pendente' : 'concluido' }
  //           : p
  //       )
  //     );
  //   }

  // TODO P3.30: remover pet — array novo via filter.
  //   function removerPet(id: string) {
  //     setPets(anteriores => anteriores.filter(p => p.id !== id));
  //   }

  // TODO P3.31: recarregar — simula refresh, volta ao mock e limpa a busca.
  //   async function recarregar() {
  //     setAtualizando(true);
  //     await new Promise(r => setTimeout(r, 800));
  //     setPets(PETS);
  //     setBusca('');
  //     setAtualizando(false);
  //   }

  // TODO P3.32: receber o registro de passeio da TelaRegistro.
  //   function handleRegistro(local?: Pet['local'], fotoUri?: string) {
  //     if (!petRegistrando) return;
  //     setPets(anteriores =>
  //       anteriores.map(p =>
  //         p.id === petRegistrando
  //           ? { ...p, statusPasseio: 'concluido' as const, local, fotoUri }
  //           : p
  //       )
  //     );
  //     setPetRegistrando(null);
  //   }

  // TODO P3.33: renderização condicional — quando petRegistrando não é null,
  //   mostre a TelaRegistro em vez da lista.
  //   const petAlvo = pets.find(p => p.id === petRegistrando);
  //   if (petAlvo) {
  //     return (
  //       <TelaRegistro
  //         pet={petAlvo}
  //         onSalvar={handleRegistro}
  //         onCancelar={() => setPetRegistrando(null)}
  //       />
  //     );
  //   }

  // TODO P3.34: seções da lista — filtrar E DEPOIS agrupar. A ordem importa.
  //   const secoes = agrupar(filtrarPorNome(pets, busca));
  //   Explique no README por que filtrar antes de agrupar.

  return (
    <View style={styles.tela}>
      <SectionList<Pet, Secao>
        sections={/* TODO P3.34 */ [] as Secao[]}
        keyExtractor={(item) => item.id}
        // TODO P3.35: configure o SectionList completo:
        //
        //   renderItem — use ItemPet com as callbacks:
        //     renderItem={({ item }) => (
        //       <ItemPet
        //         pet={item}
        //         onAlternar={alternarStatus}
        //         onRemover={removerPet}
        //         onRegistrar={(id) => setPetRegistrando(id)}
        //       />
        //     )}
        //     Nota: depende de estado local, então pode ficar inline.
        //
        //   renderSectionHeader — Text com o título da seção:
        //     renderSectionHeader={({ section }) => (
        //       <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        //     )}
        //
        //   ItemSeparatorComponent ou contentContainerStyle com gap
        //
        //   ListEmptyComponent — ListaVazia com o termo de busca:
        //     ListEmptyComponent={<ListaVazia termoBusca={busca} />}
        //
        //   stickySectionHeadersEnabled={true}
        //
        //   refreshing={atualizando}
        //   onRefresh={recarregar}
        ListHeaderComponent={
          <View style={styles.cabecalho}>
            {/* TODO P3.36: TextInput de busca.
                  value={busca}
                  onChangeText={setBusca}
                  placeholder="Buscar pet por nome..."
                  style={styles.busca} */}
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
    paddingTop: 48,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.sm,
  },
  conteudo: {
    gap: espaco.sm,
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.lg,
  },
  cabecalhoSecao: {
    ...tipografia.titulo,
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
    paddingHorizontal: espaco.md,
  },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    fontSize: tipografia.corpo.fontSize,
    backgroundColor: cores.cartao,
  },
});
