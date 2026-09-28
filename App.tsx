// ============================================================
// Prática 2 — Tela do pet em destaque
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Esta tela mostra UMA única entidade em destaque, não uma lista.
// Usa a união discriminada EstadoTela<Pet> para garantir que cada
// estado (carregando, sucesso, erro) seja tratado de forma exaustiva.
//
// Restrições:
//   • Nenhum `any` ou `as` desnecessário
//   • switch sem `default` — a exaustividade é o ponto
//   • Cores e espaçamentos vindos do theme.ts — nenhum hex solto
// ============================================================
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { CardPet } from './src/components/card-pet';
import { buscarPetEmDestaque } from './src/services/pet-service';
import { type EstadoTela, type Pet } from './src/types/pet';
import { cores, espaco } from './src/theme';

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Pet>>({ tipo: 'carregando' });

  const carregar = useCallback(async () => {
    // TODO P2.19: implemente o carregamento do pet em destaque.
    //   1. Volte para o estado 'carregando': setEstado({ tipo: 'carregando' })
    //   2. Chame buscarPetEmDestaque() dentro de um try/catch
    //   3. Sucesso → setEstado({ tipo: 'sucesso', dados: pet })
    //   4. Erro → setEstado({ tipo: 'erro', mensagem: ... })
    //   Lembre: o catch recebe `unknown`, não `Error`.
    //   Use: erro instanceof Error ? erro.message : 'Erro desconhecido'
    setEstado({ tipo: 'carregando' });
    try {
      const pet = await buscarPetEmDestaque();
      setEstado({ tipo: 'sucesso', dados: pet });
    } catch (erro) {
      setEstado({ tipo: 'erro', mensagem: erro instanceof Error ? erro.message : 'Erro desconhecido' });
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function registrarPasseio() {
    // TODO P2.20: só faz sentido se estado.tipo for 'sucesso'.
    //   Cheque o tipo ANTES de acessar estado.dados.
    //   Atualize o statusPasseio para 'concluido' (só em memória):
    //     setEstado({
    //       tipo: 'sucesso',
    //       dados: { ...estado.dados, statusPasseio: 'concluido' },
    //     });
    if (estado.tipo === 'sucesso') {
      setEstado({
        tipo: 'sucesso',
        dados: { ...estado.dados, statusPasseio: 'concluido' },
      });
    }
  }

  // Cada case retorna a tela inteira — sem `default`, sem break.
  switch (estado.tipo) {
    case 'carregando':
      return (
        <View style={styles.centro}>
          {/* TODO P2.21: use cores.primaria como color do ActivityIndicator */}
          <ActivityIndicator size="large" color={cores.primaria} />
        </View>
      );

    case 'sucesso':
      return (
        <View style={styles.container}>
          {/* TODO P2.22: renderize o CardPet com:
                - pet={estado.dados}
                - aoRegistrarPasseio={registrarPasseio} */}
          <CardPet pet={estado.dados} aoRegistrarPasseio={registrarPasseio} />
        </View>
      );

    case 'erro':
      return (
        <View style={styles.centro}>
          {/* TODO P2.23: mostre a mensagem de erro e um botão para tentar de novo.
                - Um Text com estado.mensagem
                - Um Text com onPress={carregar}: "Tentar novamente" */}
          <Text style={{ color: cores.erro, marginBottom: espaco.md }}>{estado.mensagem}</Text>
          <Text style={{ color: cores.primaria, fontWeight: 'bold' }} onPress={carregar}>Tentar novamente</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    // TODO: padding e backgroundColor dos tokens (espaco e cores)
    paddingHorizontal: espaco.md,
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // TODO: backgroundColor dos tokens (cores.fundo)
    backgroundColor: cores.fundo,
  },
});
