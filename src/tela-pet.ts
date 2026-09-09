// ------------------------------------------------------------
//   1. Qual estado impossível a união discriminada torna não representável?
//      R: carregando com dados. Cada campo só existe na variante que o declara.
//   2. Por que `carregar()` captura a exceção em vez de deixá-la subir?
//      R: exceção não é estado de tela. A falha vira `{ tipo: 'erro' }` para a
//         tela sempre ter o que renderizar.
//   3. Uma decisão de modelagem que você tomou na Prática 1 e o motivo.
//      R: derivei NovoPet com Omit. Quando `microchip` entrou em Pet, nenhum
//         derivado precisou mudar.
// ------------------------------------------------------------

import type { Pet } from './types/pet';
import { rotuloEspecie, rotuloStatusPasseio } from './types/pet';
import { buscarPetDoUsuario } from './services/petService';

export type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

export function descreverTela(estado: EstadoTela<Pet>): string {
  switch (estado.tipo) {
    case 'carregando':
      return 'Carregando…';
    case 'sucesso':
      return `${estado.dados.nome} · ${rotuloEspecie(estado.dados.especie)} · ${rotuloStatusPasseio(estado.dados.statusPasseio)}`;
    case 'erro':
      return `Erro: ${estado.mensagem}`;
  }
}

export async function carregar(): Promise<EstadoTela<Pet>> {
  try {
    const dados = await buscarPetDoUsuario();
    return { tipo: 'sucesso', dados };
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : 'Falha inesperada ao carregar o pet.';
    return { tipo: 'erro', mensagem };
  }
}

declare const petExemplo: Pet;

// `declare const` existe só para o compilador — ele é apagado na compilação.
// Por isso as chamadas abaixo ficam atrás deste guard: elas precisam ser
// TYPE-CHECKED, mas não podem EXECUTAR (dariam `ReferenceError: petExemplo
// is not defined` ao rodar o arquivo com tsx). O tipo explícito `: boolean`
// impede o TS de estreitar para `false` e marcar o bloco como inalcançável.
const VERIFICACAO_DE_TIPOS: boolean = false;

if (VERIFICACAO_DE_TIPOS) {
  // DEVEM compilar:
  descreverTela({ tipo: 'carregando' });
  descreverTela({ tipo: 'sucesso', dados: petExemplo });
  descreverTela({ tipo: 'erro', mensagem: 'Sem conexão' });
}

// DEVEM dar erro — descomente uma de cada vez (dentro do `if` acima):
// descreverTela({ tipo: 'carregando', dados: petExemplo });
// descreverTela({ tipo: 'erro', dados: petExemplo });
// descreverTela({ tipo: 'offline' });

// Rode com `npx tsx src/tela-pet.ts` depois de descomentar:
// carregar().then((estado) => console.log(descreverTela(estado)));
