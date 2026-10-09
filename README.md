# Pet Routine Expo

**Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
**Branch:** `feature/ads025_2026-2`

## Sobre o projeto

App de Gestão e Rotina Pet: um aplicativo para tutores de animais de estimação organizarem a rotina, passeios e histórico de saúde dos pets.

Este projeto é usado nas atividades guiadas e aplicadas da disciplina ao longo do semestre. Cada aula adiciona uma camada nova por cima da anterior — o histórico de commits desta branch é, em si, um registro do progresso.

## Estado atual (Aula 1)

Scaffold inicial gerado com Expo (`create-expo-app`, template `blank-typescript`). Nenhuma tela ou modelagem de domínio foi implementada ainda — isso é propositalmente deixado para as próximas aulas. Veja os comentários `TODO` em `App.tsx`.

## Como rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no celular e escaneie o QR code (ou use um emulador). Requisito: **Node.js 22.11+**.

## Práticas da Aula 1

Os esqueletos das práticas de `PRATICA.md` já estão no repositório. Cada `TODO Px.y` no código corresponde a um item do enunciado — resolva na ordem.

| Prática                              | Arquivo                                     | Escopo          |
| ------------------------------------ | ------------------------------------------- | --------------- |
| 1 — Modelagem do domínio Pet         | `src/types/pet.ts`                          | TypeScript puro |
| 2 — Serviço mockado                  | `src/services/petService.ts`                | TypeScript puro |
| 2 — Estado de tela                   | `src/tela-pet.ts`                           | TypeScript puro |
| 3 — Relatório de plataforma          | `docs/pratica-03-relatorio-plataforma.md`   | Texto           |
| 4 — Material desatualizado _(bônus)_ | `docs/pratica-04-material-desatualizado.md` | Texto           |

As Práticas 1 e 2 **não precisam de React Native nem do Expo** — são verificáveis só com o compilador:

```bash
npm run typecheck        # equivale a `npx tsc --noEmit`
npm run pratica:tela     # roda src/tela-pet.ts via tsx
```

> ⚠️ **O `typecheck` falha de propósito enquanto os TODOs não estiverem resolvidos.** Cada erro reportado aponta para um `TODO` que ainda falta preencher — é esse o critério de pronto. Alguns blocos marcados como _verificação_ precisam **falhar** ao serem descomentados; não os apague.

## Próximos passos (exercícios)

Os `TODO` deixados no código apontam para os exercícios de `exercises.md` de cada aula. Resolva-os na ordem em que aparecem e mantenha um commit por exercício (ou por bloco), para que o histórico da branch sirva de evidência de progresso.

## Decisões da Prática 2

### Modelagem: um estado só para a tela

A tela principal usa um único estado: `useState<EstadoTela<Pet>>`. Não usa três estados separados (`carregando`, `pet`, `erro`).

Motivo: com três estados separados, a tela pode ficar numa combinação inválida. Por exemplo: "carregando" e "com pet" ao mesmo tempo. A união `EstadoTela` impede isso. Cada variante tem só os campos dela.

O `switch` não tem `default`. Se alguém criar uma variante nova, o compilador mostra um erro até a tela tratar essa variante.

"Registrar passeio" só funciona no estado `sucesso`. A função cria um pet novo com `statusPasseio: 'concluido'` e mantém os outros campos.

### Estilo: o que é token e o que é local

**Tokens (`src/theme.ts`)** são valores que se repetem ou que definem a identidade visual:

- cores;
- espaços: 4, 8, 16, 24, 32;
- raios de borda e espessuras de borda;
- sombras, como texto para `boxShadow`;
- tipografia: `titulo`, `corpo`, `legenda`, `acao`.

Se a cor primária mudar, a mudança acontece em um arquivo só.

**Estilos locais** são decisões de layout de cada tela: `flexDirection`, `justifyContent`, `flex: 1`, `overflow`. Esses valores dependem da tela. Um token como `linhaEntrePontas` seria um layout pronto, não um valor.

**Card destacado:** a variante `destacado` adiciona uma borda na cor primária e uma sombra mais forte. O fundo não muda, para o texto manter o mesmo contraste. A variante entra por array de estilos: `[styles.card, destacado && styles.cardDestacado]`. Ela declara só o que muda.

**Espaço entre elementos:** os tokens de tipografia não têm margem nem padding. O espaço entre irmãos vem do `gap` do contêiner.
