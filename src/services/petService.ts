import type { Pet } from '../types/pet';

// Deixe esta constante no código para conseguir testar o caminho de erro
// sem editar mais nada.
const SIMULAR_ERRO = false;

const ATRASO_MS = 1000; // para o estado de carregando ser visível

const MOCK: Pet = {
  id: 'p1',
  nome: 'Fubá',
  especie: 'gato',
  porte: 'pequeno',
  statusPasseio: 'pendente',
  idadeMeses: 30,
  criadoEm: new Date('2026-01-15T09:00:00Z'),
  microchip: 'MXS2',
};

/**
 * Devolve UM pet — o do tutor logado. Assinatura propositalmente idêntica
 * à que uma chamada HTTP real teria, para a troca ser indolor.
 */
export async function buscarPetDoUsuario(): Promise<Pet> {
  await new Promise((r) => setTimeout(r, ATRASO_MS));

  if (SIMULAR_ERRO) {
    throw new Error('Não foi possível carregar o pet. Tente novamente.');
  }

  return MOCK;
}

/**
 * Registra o passeio do dia. Por enquanto só devolve o pet com o
 * status atualizado; persistência é assunto de aula futura.
 */
export async function registrarPasseio(pet: Pet): Promise<Pet> {
  return { ...pet, statusPasseio: 'concluido' };
}
