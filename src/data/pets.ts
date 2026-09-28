// ============================================================
// Prática 3 — Mock de dados: lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Este arquivo é o mock da lista. No mínimo 20 itens, com:
//   • pelo menos 3 espécies diferentes
//   • todos os 3 status de passeio representados
//   • idades variadas
//   • alguns com local e/ou fotoUri, outros sem
//
// Lista pequena esconde exatamente os problemas que esta prática
// ensina a evitar. Não reduza.
// ============================================================

import type { Pet } from '../types/pet';

// TODO P3.1: complete com no mínimo 20 itens.
//   Três exemplos abaixo para referência de formato — você precisa de mais 17+.
//   Varie espécies, status e idades. Inclua ao menos um pet com `local`
//   e um com `fotoUri` preenchidos, para testar a renderização condicional.
export const PETS: Pet[] = [
  {
    id: 'p1',
    nome: 'Rex',
    especie: 'cachorro',
    porte: 'medio',
    statusPasseio: 'pendente',
    idadeMeses: 24,
    criadoEm: new Date('2025-01-15'),
  },
  {
    id: 'p2',
    nome: 'Mia',
    especie: 'gato',
    porte: 'pequeno',
    statusPasseio: 'concluido',
    idadeMeses: 18,
    criadoEm: new Date('2025-03-10'),
  },
  {
    id: 'p3',
    nome: 'Blu',
    especie: 'ave',
    porte: 'pequeno',
    statusPasseio: 'cancelado',
    idadeMeses: 6,
    criadoEm: new Date('2025-06-20'),
  },
];
