# Prática 2.3 — Flexbox Froggy: CSS e React Native

**Autor:** Mateus Xavier **Data:** 09/10/2026

## Três diferenças entre o Flexbox do CSS e o do React Native

| #   | Ponto                 | CSS (Flexbox Froggy)                       | React Native                                                                              | Efeito prático                                                                           |
| --- | --------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Direção padrão        | `flex-direction: row`                      | `flexDirection: 'column'`                                                                 | Em React Native, `justifyContent` move os filhos na vertical, não na horizontal.         |
| 2   | Quem é contêiner flex | Só elementos com `display: flex`           | Toda `View` já é um contêiner flex                                                        | Em React Native, não existe `display: flex`. O layout flex vale sempre.                  |
| 3   | Propriedade `flex`    | Atalho com até 3 valores: `flex: 1 1 auto` | Um número só: `flex: 1`. Os valores separados são `flexGrow`, `flexShrink` e `flexBasis`. | `flex: 1` ocupa o espaço que sobra no eixo principal. O texto `'1 1 auto'` não é aceito. |

Outras diferenças vistas no jogo:

- A propriedade `order` do CSS não existe em React Native. Para mudar a ordem, é preciso mudar a ordem dos elementos no JSX ou no array de dados.
- Os nomes usam camelCase e os valores são texto entre aspas: `justify-content: flex-end` vira `justifyContent: 'flex-end'`.
- O padrão de `flexShrink` é `1` no CSS e `0` no React Native. Em React Native, um filho grande não encolhe sozinho.

## Um nível com código diferente: nível 1

No nível 1, o sapo precisa ir para a direita, até a vitória-régia.

**CSS (resposta do jogo):**

```css
#pond {
  display: flex;
  justify-content: flex-end;
}
```

**React Native:**

```tsx
const styles = StyleSheet.create({
  lagoa: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
```

**Por que o código muda:** no React Native, o eixo principal padrão é vertical. Só com `justifyContent: 'flex-end'`, o sapo vai para **baixo**, não para a direita. É preciso declarar `flexDirection: 'row'`. A linha `display: flex` sai, porque toda `View` já usa flex.
