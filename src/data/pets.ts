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

import type { Pet } from "../types/pet";

// Fotos do mock como data URI (PNG 1x1): renderizam sem rede, como exige a
// prática. As fotos reais vêm da câmera e vivem no cache do app.
const FOTO_LARANJA =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGN4Ua4HAAPYAY7bdZP7AAAAAElFTkSuQmCC";
const FOTO_VERDE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPQ6w4HAAH7ARF0JhTpAAAAAElFTkSuQmCC";

export const PETS: Pet[] = [
  {
    id: "p1",
    nome: "Rex",
    especie: "cachorro",
    porte: "medio",
    statusPasseio: "pendente",
    idadeMeses: 24,
    criadoEm: new Date("2025-01-15"),
  },
  {
    id: "p2",
    nome: "Mia",
    especie: "gato",
    porte: "pequeno",
    statusPasseio: "concluido",
    idadeMeses: 18,
    criadoEm: new Date("2025-03-10"),
    local: { latitude: -8.0631, longitude: -34.8711, precisaoMetros: 12 },
    fotoUri: FOTO_LARANJA,
  },
  {
    id: "p3",
    nome: "Blu",
    especie: "ave",
    porte: "pequeno",
    statusPasseio: "cancelado",
    idadeMeses: 6,
    criadoEm: new Date("2025-06-20"),
  },
  {
    id: "p4",
    nome: "Thor",
    especie: "cachorro",
    porte: "grande",
    statusPasseio: "pendente",
    idadeMeses: 48,
    criadoEm: new Date("2024-11-02"),
  },
  {
    id: "p5",
    nome: "Luna",
    especie: "gato",
    porte: "pequeno",
    statusPasseio: "pendente",
    idadeMeses: 9,
    criadoEm: new Date("2025-07-01"),
  },
  {
    id: "p6",
    nome: "Pipoca",
    especie: "cachorro",
    porte: "pequeno",
    statusPasseio: "concluido",
    idadeMeses: 30,
    criadoEm: new Date("2024-08-19"),
    local: { latitude: -8.0476, longitude: -34.877, precisaoMetros: 35 },
  },
  {
    id: "p7",
    nome: "Nina",
    especie: "gato",
    porte: "medio",
    statusPasseio: "cancelado",
    idadeMeses: 60,
    criadoEm: new Date("2023-12-05"),
  },
  {
    id: "p8",
    nome: "Zeca",
    especie: "ave",
    porte: "pequeno",
    statusPasseio: "pendente",
    idadeMeses: 14,
    criadoEm: new Date("2025-02-11"),
  },
  {
    id: "p9",
    nome: "Bolt",
    especie: "cachorro",
    porte: "medio",
    statusPasseio: "concluido",
    idadeMeses: 36,
    criadoEm: new Date("2024-05-23"),
    fotoUri: FOTO_VERDE,
  },
  {
    id: "p10",
    nome: "Fubá",
    especie: "gato",
    porte: "pequeno",
    statusPasseio: "pendente",
    idadeMeses: 30,
    criadoEm: new Date("2026-01-15"),
  },
  {
    id: "p11",
    nome: "Paçoca",
    especie: "cachorro",
    porte: "pequeno",
    statusPasseio: "cancelado",
    idadeMeses: 4,
    criadoEm: new Date("2026-05-30"),
  },
  {
    id: "p12",
    nome: "Tico",
    especie: "outro",
    porte: "pequeno",
    statusPasseio: "pendente",
    idadeMeses: 12,
    criadoEm: new Date("2025-09-14"),
  },
  {
    id: "p13",
    nome: "Mel",
    especie: "cachorro",
    porte: "grande",
    statusPasseio: "concluido",
    idadeMeses: 84,
    criadoEm: new Date("2022-03-08"),
    local: { latitude: -8.1127, longitude: -34.8917, precisaoMetros: 8 },
    fotoUri: FOTO_VERDE,
  },
  {
    id: "p14",
    nome: "Simba",
    especie: "gato",
    porte: "grande",
    statusPasseio: "pendente",
    idadeMeses: 20,
    criadoEm: new Date("2025-04-17"),
  },
  {
    id: "p15",
    nome: "Kiwi",
    especie: "ave",
    porte: "pequeno",
    statusPasseio: "concluido",
    idadeMeses: 3,
    criadoEm: new Date("2026-07-02"),
  },
  {
    id: "p16",
    nome: "Bidu",
    especie: "cachorro",
    porte: "medio",
    statusPasseio: "pendente",
    idadeMeses: 110,
    criadoEm: new Date("2021-10-10"),
  },
  {
    id: "p17",
    nome: "Frida",
    especie: "gato",
    porte: "pequeno",
    statusPasseio: "cancelado",
    idadeMeses: 42,
    criadoEm: new Date("2024-01-27"),
  },
  {
    id: "p18",
    nome: "Toddy",
    especie: "cachorro",
    porte: "pequeno",
    statusPasseio: "concluido",
    idadeMeses: 15,
    criadoEm: new Date("2025-08-08"),
  },
  {
    id: "p19",
    nome: "Shell",
    especie: "outro",
    porte: "pequeno",
    statusPasseio: "pendente",
    idadeMeses: 72,
    criadoEm: new Date("2023-06-16"),
  },
  {
    id: "p20",
    nome: "Amora",
    especie: "cachorro",
    porte: "medio",
    statusPasseio: "cancelado",
    idadeMeses: 26,
    criadoEm: new Date("2025-02-02"),
  },
  {
    id: "p21",
    nome: "Chico",
    especie: "ave",
    porte: "medio",
    statusPasseio: "pendente",
    idadeMeses: 40,
    criadoEm: new Date("2024-04-04"),
  },
  {
    id: "p22",
    nome: "Lola",
    especie: "gato",
    porte: "pequeno",
    statusPasseio: "concluido",
    idadeMeses: 7,
    criadoEm: new Date("2026-03-21"),
  },
];
