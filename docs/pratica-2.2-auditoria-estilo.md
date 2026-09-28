# Auditoria de estilo — TelaResumo

**Autor:** ____________________   **Data:** ____________

## 1. Problemas encontrados

| # | Onde (linha/trecho) | O que está errado | Consequência concreta | Correção |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |
| 6 |  |  |  |  |
| 7 |  |  |  |  |
| 8 |  |  |  |  |
<!-- TODO: pelo menos oito linhas. "É feio" não é consequência concreta —
     consequência concreta é: quebra em runtime / não compila / o layout sai
     errado / o valor fica impossível de mudar em um lugar só. -->

## 2. O problema arquitetural

<!-- TODO: qual problema NÃO se resolve trocando uma linha? Explique por que
     a ESTRUTURA escolhida o produz, e o que ela acopla a quê. -->

## 3. `globalStyles.ts` reescrito como `theme.ts`

```tsx
// theme.ts
export const cores = {
  // TODO: os valores que sobreviveram do globalStyles
} as const;

export const espaco = {
  // TODO
} as const;

// TODO: liste aqui, em comentário, o que você REMOVEU do globalStyles e por quê.
//       (dica: o que era layout, e não decisão de design, não entra)
```

## 4. Ordem de refatoração — tenho meio dia

| Ordem | O que faço | Risco se não fizer | Retorno |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
<!-- TODO: justifique por RISCO e RETORNO. A ordem em que os problemas
     aparecem no arquivo não é uma justificativa. -->

## 5. O que eu decidi NÃO corrigir

<!-- TODO: um item, com o motivo. Toda auditoria honesta tem esse parágrafo. -->
