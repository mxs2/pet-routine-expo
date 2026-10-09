# Auditoria de estilo — TelaResumo

**Autor:** Mateus Xavier **Data:** 09/10/2026

## 1. Problemas encontrados

| #   | Onde (linha/trecho)                                                                            | O que está errado                                                              | Consequência concreta                                                                                                        | Correção                                                                         |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | `{ fontSize: 14, color: '#666', fontSize: 16 }`                                                | A chave `fontSize` aparece duas vezes no mesmo objeto.                         | Com TypeScript estrito, o código não compila. Em JavaScript, o valor 14 é ignorado sem aviso.                                | Usar uma chave só, com valor de token (`tipografia.corpo`).                      |
| 2   | `<Button style={globalStyles.button} />`                                                       | O `Button` do React Native não aceita `style`.                                 | O fundo azul, o padding e o raio não aparecem. O botão fica com o visual padrão do sistema.                                  | Colocar o `Button` dentro de uma `View` com estilo e usar a prop `color`.        |
| 3   | `<ScrollView style={{ padding: 20, alignItems: 'center' }}>`                                   | O layout do conteúdo está em `style`. O lugar certo é `contentContainerStyle`. | `alignItems` em `style` causa erro em tempo de execução. O padding em `style` corta o fim do conteúdo.                       | Mover os dois para `contentContainerStyle`.                                      |
| 4   | `TelaResumo(props: any)`                                                                       | As props não têm tipo.                                                         | `props.totl` (com erro de digitação) compila e mostra um espaço vazio. Renomear uma prop não mostra erro.                    | Criar `type TelaResumoProps = { total: number; nome: string; detalhe: string }`. |
| 5   | `): JSX.Element`                                                                               | O retorno usa o namespace global `JSX`.                                        | Com React 19, esse namespace global não existe mais. O código não compila.                                                   | Remover a anotação. O TypeScript descobre o tipo sozinho.                        |
| 6   | `styles.item` com `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` e `elevation` | A sombra usa 4 props do iOS e `elevation` do Android.                          | Cada sistema mostra uma sombra diferente. Na web, as 4 props são ignoradas.                                                  | Usar `boxShadow: '0 1px 2px rgba(0,0,0,0.2)'`.                                   |
| 7   | `marginBottom: 10` na linha e `marginBottom: 8` no item                                        | O espaço entre irmãos usa margem em cada filho, com valores diferentes.        | O espaço vertical fica irregular (10 e 8). Para mudar o espaço, é preciso editar cada filho.                                 | Usar `gap: espaco.sm` no `contentContainerStyle`.                                |
| 8   | `'#333'`, `'#666'`, `fontSize: 18`, `padding: 20` em estilos inline                            | Cores e tamanhos fixos se repetem no código.                                   | Para mudar a cor do texto, é preciso editar vários arquivos. `'#333'` e `globalStyles.text` já podem ter valores diferentes. | Criar tokens em `theme.ts` e usar `StyleSheet.create` local.                     |
| 9   | `container: { flex: 1, padding: 20 }` dentro do `ScrollView`                                   | `flex: 1` dentro de conteúdo com rolagem.                                      | O ScrollView não define a altura dos filhos. Os blocos encolhem ou crescem de forma diferente em cada sistema.               | Remover `flex: 1` desses blocos.                                                 |
| 10  | `backgroundColor: 'blue'`                                                                      | A cor tem nome genérico e não faz parte de uma paleta.                         | A cor não segue a identidade do app e o contraste não foi verificado.                                                        | Usar `cores.primaria`.                                                           |
| 11  | `setAberto(!aberto)`                                                                           | O novo valor usa o valor lido no último render.                                | Com dois toques rápidos, o segundo toque pode ler o valor antigo e não mudar nada.                                           | Usar `setAberto((a) => !a)`.                                                     |
| 12  | `import React from 'react'` e `React.useState`                                                 | Import padrão desnecessário com o JSX atual.                                   | Não quebra nada, mas é diferente do resto do projeto.                                                                        | Usar `import { useState } from 'react'`.                                         |

## 2. O problema arquitetural

O `globalStyles.ts` guarda **layouts prontos** (`container`, `text`, `button`). Ele deveria guardar **valores**. Isso causa três problemas.

1. **Uma tela afeta a outra.** `container` mistura um valor de design (padding 20) com uma regra de layout (`flex: 1`). Toda tela que usa `container` recebe as duas coisas. O `flex: 1` quebra a tela dentro do ScrollView (item 9). Uma correção em `container` para uma tela pode quebrar outras.
2. **Os valores não têm uma fonte única.** As telas copiam valores (`'#333'`, `18`) em vez de usar um nome. As cópias podem ficar diferentes com o tempo.
3. **A ordem dos estilos decide o resultado.** Em `[globalStyles.container, styles.item]`, o estilo local substitui o global. Para saber o visual final, é preciso ler dois arquivos.

Uma troca de linha não resolve. O problema está na **direção da dependência**: os componentes dependem de layouts globais. Eles deveriam depender só de valores globais e definir o layout no próprio arquivo.

## 3. `globalStyles.ts` reescrito como `theme.ts`

```tsx
// theme.ts
export const cores = {
  texto: "#333333",
  textoFraco: "#666666",
  primaria: "#1E5BD8", // substitui 'blue'
  textoSobrePrimaria: "#FFFFFF",
} as const;

export const espaco = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
} as const;

export const raio = {
  sm: 5,
} as const;

export const tipografia = {
  titulo: { fontSize: 18, fontWeight: "700", color: cores.texto },
  corpo: { fontSize: 16, color: cores.texto },
  legenda: { fontSize: 14, color: cores.textoFraco },
} as const;

// REMOVIDO do globalStyles:
// - `container.flex: 1`: é layout. Cada tela define o próprio flex.
//   Dentro de ScrollView, ele quebra a tela.
// - `button.alignItems: 'center'`: é layout de um componente.
//   Também não tinha efeito, porque Button não aceita style.
// - Os nomes `container`, `text` e `button`: agora são valores
//   (`espaco.lg`, `tipografia.titulo`, `cores.primaria`, `raio.sm`).
//   Cada componente monta o próprio estilo com esses valores.
// - `'blue'`: cor sem papel na paleta. Agora é `primaria`.
```

## 4. Ordem de refatoração — tenho meio dia

| Ordem | O que faço                                                                                                                         | Risco se não fizer                                         | Retorno                                                       |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| 1     | Corrigir o que quebra: `fontSize` duplicado, `JSX.Element`, `alignItems` e padding do ScrollView.                                  | O código não compila e a tela dá erro ao abrir.            | Alto. Poucas linhas liberam o resto do trabalho.              |
| 2     | Tipar as props (`any` vira `TelaResumoProps`).                                                                                     | As próximas mudanças ficam sem verificação do compilador.  | Alto. O compilador passa a verificar os passos 3 e 4.         |
| 3     | Criar o `theme.ts` e trocar os valores da TelaResumo por tokens. O `globalStyles` continua com os mesmos nomes, mas usa os tokens. | Cada tela nova copia mais valores fixos.                   | Alto. Ataca a causa sem mexer em todas as telas no mesmo dia. |
| 4     | `Button` dentro de `View` com `color`, `boxShadow` e `gap`.                                                                        | O estilo do botão não aparece e a sombra muda por sistema. | Médio. O resultado é visível e o risco é baixo.               |

Critério da ordem: primeiro o que **quebra** (risco alto, custo baixo). Depois o que **protege as próximas mudanças** (tipos). Depois o que **resolve a causa** (tokens). O ajuste visual fica por último.

## 5. O que eu decidi NÃO corrigir

**Migrar as outras telas que usam `globalStyles`.** Em meio dia, sem testes visuais, trocar o arquivo global altera telas que eu não auditei. Um erro nessas telas seria difícil de achar na revisão.

Decisão: o `globalStyles` passa a usar os tokens (passo 3). A TelaResumo serve de exemplo. A migração das outras telas vira uma tarefa separada, uma tela por vez.

O `import React` (item 12) também fica como está. Ele não muda o funcionamento.
