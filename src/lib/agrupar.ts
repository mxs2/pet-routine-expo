// ============================================================
// Prática 3 — Agrupamento e filtragem de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Funções puras — sem JSX, sem estado, sem React.
// Moram aqui para serem testáveis e reutilizáveis independentemente.
// ============================================================

import type { Pet } from '../types/pet';

export type Secao = { title: string; data: Pet[] };

export function agrupar(pets: Pet[]): Secao[] {
  // TODO P3.2: agrupe pelo critério que o grupo escolheu.
  //   Sugestão: statusPasseio (use rotuloStatusPasseio como título da seção).
  //   Alternativas válidas: espécie ou faixa etária.
  //
  //   Exemplo de abordagem:
  //     1. Crie um Map<string, Pet[]>
  //     2. Itere pelos pets, adicionando cada um ao grupo correto
  //     3. Converta o Map em Secao[]
  //
  // TODO P3.3: descarte grupos vazios — seção sem itens não aparece na lista.
  //
  // TODO P3.4: a ordem dos grupos é uma DECISÃO de produto.
  //   Escreva num comentário qual foi a sua e por quê.
  //   Ex: "pendente primeiro porque é o que exige ação do dono"
  return [];
}

export function filtrarPorNome(pets: Pet[], busca: string): Pet[] {
  // TODO P3.5: busca case-insensitive. Busca vazia devolve todos.
  //   Dica: normalize com toLowerCase() em ambos os lados.
  return pets;
}
