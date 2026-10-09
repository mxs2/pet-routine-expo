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

## Decisões da Prática 3

### Por que `SectionList` e não `FlatList`

A lista agrupa os pets por **status do passeio**, nesta ordem: Pendente, Cancelado, Concluído.

Motivo do critério: o tutor abre o app para ver quem ainda precisa passear. O status muda durante o dia. Espécie e idade quase não mudam, então não ajudam nessa decisão.

A `SectionList` recebe dados no formato `{ title, data }[]`. Ela mostra um cabeçalho por grupo e mantém esse cabeçalho fixo no topo durante a rolagem. Com a `FlatList`, eu teria de misturar cabeçalhos e pets no mesmo array e tratar os dois tipos no `renderItem`.

### Onde os dados são agrupados

O agrupamento e a busca ficam em `src/lib/agrupar.ts`. São funções puras, sem React.

Motivos:

- Posso testar as funções sem abrir a tela. Teste feito: 22 pets resultam em 10 pendentes, 5 cancelados e 7 concluídos.
- A tela só chama `agrupar(filtrarPorNome(pets, busca))`. O JSX fica só com a apresentação.

**A busca vem antes do agrupamento.** Assim, `agrupar` já remove os grupos que ficam vazios depois da busca. Na ordem contrária, a tela mostraria cabeçalhos sem pets.

A ordem dos grupos está na constante `ORDEM_STATUS`. Pendente vem primeiro porque é o grupo que precisa de ação.

### Precisão da localização (`Accuracy`)

Escolha: `Location.Accuracy.Balanced`, com erro de cerca de 100 m.

- O registro só precisa mostrar em que bairro ou praça foi o passeio.
- O card mostra 3 casas decimais, que equivalem a cerca de 110 m.
- `High` e `BestForNavigation` usam o GPS puro. Eles demoram mais para encontrar a posição e gastam mais bateria. A tela não usaria essa precisão extra.

A tela lê a posição **uma vez** (`getCurrentPositionAsync`). O registro é um momento, não um trajeto. Por isso não há `watchPositionAsync`.

### Ajuste da foto (`contentFit="cover"`)

A foto da câmera é mais alta que a área da miniatura e da prévia.

- `cover` preenche a área toda e corta o que sobra.
- `contain` mostraria a foto inteira, com faixas vazias nos lados.

O componente `Image` vem de `expo-image`, não de `react-native`. No card, `recyclingKey` evita que uma célula reciclada mostre a foto de outro pet.

### Mensagens de falha

Cada falha tem uma mensagem própria. Cada mensagem diz ao usuário o que fazer.

| Falha                 | Como o app detecta                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Localização negada    | `status !== 'granted'` e `canAskAgain` é `true`                                                |
| Localização bloqueada | `status !== 'granted'` e `canAskAgain` é `false`. A tela mostra o botão "Abrir configurações". |
| GPS desligado         | `hasServicesEnabledAsync()` retorna `false`                                                    |
| Câmera negada         | `requestPermission()` não retorna `granted`. A câmera bloqueada tem mensagem e botão próprios. |
| Sensor indisponível   | `getCurrentPositionAsync` ou `takePictureAsync` falham, ou a `CameraView` chama `onMountError` |

**Sem permissões, o app continua funcionando.** O botão "Salvar" fica sempre ativo. Se o usuário negar tudo, o passeio fica como concluído, sem `local` e sem `fotoUri`. O card mostra um espaço vazio no lugar da foto e não mostra a linha de local. Os dois campos são opcionais em `Pet` por esse motivo.

### Limitações aceitas

- **Assinaturas de sensor:** a tela de registro não abre assinatura contínua. Ela não usa `watchPositionAsync` nem `addListener`. Se uma assinatura contínua for adicionada, ela não será encerrada ao sair da tela, porque a ferramenta para isso é assunto da Aula 6.
- **Foto no cache:** `takePictureAsync({ base64: false })` salva a foto no cache do app. A foto não vai para a galeria. O sistema pode apagar o cache. Não há envio para servidor, porque esta prática não usa rede.
- **Dados em memória:** a lista só existe em memória. Puxar a lista para baixo volta ao mock.
- **Fotos do mock:** são imagens de 1×1 pixel dentro do código (data URI). Elas aparecem como uma cor sólida e não precisam de rede.
