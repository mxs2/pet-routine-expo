// ============================================================
// Prática 2 — Sistema de tokens de design
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tokens são VALORES (cores, espaçamentos, tipografia), nunca
// layouts prontos. Componentes consomem estes tokens — nunca o
// contrário. Nenhum componente deve ter um hex ou número mágico;
// tudo vem daqui.
//
// Regra: `as const` AQUI, nunca dentro de `StyleSheet.create`.
// ============================================================

export const cores = {
  fundo: "#FEF7EE",
  cartao: "#FFFFFF",
  texto: "#2B2118",
  textoFraco: "#6B6459",
  primaria: "#E8772E",
  sucesso: "#2E8B57",
  erro: "#C0392B",
  borda: "#E2D6C6",
  textoSobrePrimaria: "#FFFFFF",
  neutra: "#8A8175",
  sombra: "rgba(43, 33, 24, 0.12)",
} as const;

export const espaco = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const raio = {
  sm: 8,
  md: 12,
} as const;

export const borda = {
  fina: 1,
  destaque: 2,
} as const;

export const tipografia = {
  titulo: { fontSize: 22, fontWeight: "700", color: cores.texto },
  corpo: { fontSize: 16, fontWeight: "400", color: cores.texto },
  legenda: { fontSize: 13, fontWeight: "400", color: cores.textoFraco },
  acao: { fontSize: 16, fontWeight: "600", color: cores.primaria },
} as const;

export const dimensao = {
  miniatura: 120,
  previa: 200,
} as const;

export const opacidade = {
  pressionado: 0.7,
} as const;

export const sombra = {
  cartao: `0 2px 6px ${cores.sombra}`,
  destaque: `0 4px 12px ${cores.sombra}`,
} as const;

// `as const` preserva os literais ('700', 16) que o StyleSheet exige; no StyleSheet.create o próprio create já tipa e valida cada estilo.
