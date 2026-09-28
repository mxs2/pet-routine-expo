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
//
// ⚠️  Preencha este arquivo PRIMEIRO — os demais dependem dele.
// ============================================================

export const cores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  // TODO P2.1: complete com pelo menos mais cinco tokens de cor:
  //   texto, textoFraco, primaria, sucesso, erro.
  //   Escolha cores que façam sentido para um app de pets.
  //   Exemplo: primaria poderia ser um laranja acolhedor.
} as const;

export const espaco = {
  // TODO P2.2: escala de no mínimo 4 degraus (xs, sm, md, lg).
  //   Escolha uma progressão consistente — 4/8/16/24 é um bom default.
  //   Exemplo: xs: 4, sm: 8, md: 16, lg: 24
} as const;

export const tipografia = {
  // TODO P2.3: titulo, corpo, legenda. Cada um é um objeto de estilo
  //   de TEXTO (fontSize, fontWeight, color).
  //   A legenda pode reaproveitar `cores.textoFraco`.
  //   Não inclua layout (margin, padding) — isso é decisão do componente.
  //
  //   Exemplo de formato:
  //   titulo: { fontSize: 20, fontWeight: '600' as const, color: cores.texto },
} as const;

// TODO P2.4: por que este arquivo usa `as const` e o StyleSheet.create
//   do componente NÃO usa? Responda em um comentário de uma linha aqui.
