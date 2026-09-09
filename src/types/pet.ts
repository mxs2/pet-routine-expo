export type EspeciePet = "cachorro" | "gato" | "ave" | "outro";
export type PortePet = "pequeno" | "medio" | "grande";
export type StatusPasseio = "pendente" | "concluido" | "cancelado";

export interface Pet {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: Date;
  microchip: string;
}

export type NovoPet = Omit<Pet, 'id' | 'criadoEm' | 'statusPasseio'>;
export type ResumoPet = Pick<Pet, 'id' | 'nome' | 'especie' | 'statusPasseio'>;
export type AtualizacaoPet = Partial<Pet>;

export function rotuloStatusPasseio(status: StatusPasseio): string {
  switch (status) {
    case 'pendente':
      return 'Aguardando passeio';
    case 'concluido':
      return 'Passeio concluído';
    case 'cancelado':
      return 'Passeio cancelado';
  }
}

export function rotuloEspecie(especie: EspeciePet): string {
  switch (especie) {
    case 'cachorro':
      return 'Cachorro';
    case 'gato':
      return 'Gato';
    case 'ave':
      return 'Ave';
    case 'outro':
      return 'Outro';
  }
}

const novo: NovoPet = {
  nome: 'Fubá',
  especie: 'gato',
  porte: 'pequeno',
  idadeMeses: 30,
  microchip: 'MXS2',
};

const resumo: ResumoPet = {
  id: 'p1',
  nome: 'Fubá',
  especie: 'gato',
  statusPasseio: 'pendente',
};

const parcial: AtualizacaoPet = { idadeMeses: 31 };

// DEVEM dar erro — descomente uma de cada vez para confirmar:
// const errado1: NovoPet = { nome: 'Fubá', especie: 'gato', porte: 'pequeno', idadeMeses: 30, id: 'p1' };
// const errado2: NovoPet = { nome: 'Fubá', especie: 'peixe', porte: 'pequeno', idadeMeses: 30 };
// const errado3: ResumoPet = { id: 'p1', nome: 'Fubá', especie: 'gato' };
// const errado4: AtualizacaoPet = { statusPasseio: 'concluido' };

// Só para o `tsc` não reclamar de variáveis não usadas na verificação:
void novo;
void resumo;
void parcial;

// ============================================================
//   Acrescente o campo `microchip: string` à interface `Pet`.
//   Quantos dos três tipos derivados você precisou editar à mão?
//
//   Resposta: nenhum. Os tres saem de Pet por utility type.
// ============================================================
