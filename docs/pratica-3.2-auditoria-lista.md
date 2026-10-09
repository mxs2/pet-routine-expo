# Auditoria de lista — TelaPets

**Autor:** Mateus Xavier **Data:** 09/10/2026

## 1. Problemas encontrados

| #   | Trecho                                                           | Problema                                                                                | Sintoma para o usuário                                                                                                                 | Correção                                                                                                |
| --- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | `<ScrollView>` em volta da `<FlatList>`                          | Lista virtualizada dentro de um ScrollView na mesma direção.                            | Com 4.000 pets, a tela demora segundos para abrir e trava na rolagem. Em aparelhos fracos, o sistema fecha o app por falta de memória. | Remover o ScrollView. O título vai para `ListHeaderComponent` e o total vai para `ListFooterComponent`. |
| 2   | `alvo.statusPasseio = 'concluido'; setPets(pets)`                | O código altera o objeto e envia **o mesmo array** para `setPets`.                      | O toque em "registrar passeio" às vezes não muda nada. A mudança só aparece quando outra ação desenha a tela de novo.                  | `setPets(ant => ant.map(p => p.id === id ? { ...p, statusPasseio: 'concluido' } : p))`                  |
| 3   | `ListHeaderComponent={() => (<TextInput … />)}`                  | O cabeçalho é uma função nova em cada render. O React desmonta e monta o campo de novo. | A cada letra digitada, o teclado fecha. Não dá para usar a busca.                                                                      | Passar um elemento: `ListHeaderComponent={<TextInput … />}`.                                            |
| 4   | `keyExtractor={(item, index) => index.toString()}`               | A chave é a posição na lista, e a lista muda com a busca.                               | Depois da busca, uma célula pode mostrar dados de outro pet.                                                                           | `keyExtractor={(item) => item.id}`                                                                      |
| 5   | `p.nome.includes(busca)`                                         | A busca diferencia maiúsculas e acentos e não remove espaços.                           | "rex" não encontra "Rex". "Fuba" não encontra "Fubá". Um espaço no fim esconde todos os resultados.                                    | Normalizar os dois lados: `toLowerCase()`, remover acentos com `normalize('NFD')` e usar `trim()`.      |
| 6   | Sem `ListEmptyComponent`                                         | A lista vazia não tem mensagem.                                                         | Uma busca sem resultado mostra só "Total: 0". O usuário não sabe se houve erro.                                                        | Adicionar `ListEmptyComponent` com uma mensagem que cita o termo buscado.                               |
| 7   | `<Text onPress>` como ação do item                               | A ação fica num `Text`, sem `Pressable` e sem papel de acessibilidade.                  | A área de toque é só o texto, então o dedo erra. Não há resposta visual ao toque. O leitor de tela não anuncia um botão.               | Usar `Pressable` com `accessibilityRole="button"`, `hitSlop` e estilo em `pressed`.                     |
| 8   | `renderItem` inline e `registrar` recriado em cada render        | Funções novas a cada letra digitada.                                                    | Com 4.000 itens, cada letra desenha de novo todas as células montadas. A digitação fica lenta.                                         | Declarar o item fora do componente, com `memo`, e usar `useCallback` com `setPets` funcional.           |
| 9   | `marginBottom` em `busca` e em `item`, `marginTop` em `itemAcao` | O espaço entre irmãos usa margem.                                                       | O último item tem espaço a mais. O espaço muda se a ordem mudar.                                                                       | Usar `gap` no `contentContainerStyle` ou `ItemSeparatorComponent`.                                      |
| 10  | `'#ccc'`, `'#fff'`, `'#FF6002'`, `fontSize: 22`                  | Valores fixos fora do `theme.ts`.                                                       | Para mudar a cor primária, é preciso procurar cada valor. Este laranja já é diferente do resto do app.                                 | Usar tokens (`cores.primaria`, `tipografia.titulo`).                                                    |
| 11  | `registrar(id)` sem tipo                                         | O parâmetro tem tipo `any` implícito.                                                   | Com TypeScript estrito, não compila. Sem tipo, `registrar(undefined)` causa um `TypeError` e a tela quebra.                            | `function registrar(id: string)` e verificar se `alvo` existe.                                          |

## 2. O problema arquitetural

O problema arquitetural é a **`FlatList` dentro do `ScrollView`** (item 1).

A `FlatList` é rápida porque monta só as células que aparecem na tela, mais uma margem. As outras células ficam desmontadas. Isso se chama virtualização.

Dentro de um `ScrollView` vertical, a FlatList recebe altura sem limite. Para ela, todos os itens estão visíveis. Ela monta **os 4.000 itens**. A virtualização deixa de existir.

Este problema é mais grave que os outros juntos:

- Nenhum ajuste de desempenho funciona com ele. `windowSize`, `initialNumToRender`, `removeClippedSubviews` e `memo` precisam que a lista conheça a área visível.
- Os outros problemas custam um pouco por item. Este multiplica esse custo por 4.000.
- Com 8 itens no mock, a diferença não aparece. Por isso o time não percebeu o problema.

## 3. Os três ajustes de desempenho deste arquivo

| Prop                           | Padrão                            | O que a mudança faz                                                                            | Por que não resolve                                                                                                        |
| ------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `removeClippedSubviews={true}` | `true` no Android, `false` no iOS | Remove da tela as views que estão fora da área visível. No iOS, pode deixar células em branco. | Só funciona se houver células fora da área visível. Com o ScrollView, todas estão "visíveis". No Android, já era o padrão. |
| `windowSize={50}`              | `21`                              | Mantém montado o conteúdo de 50 alturas de tela. Usa mais memória e mais trabalho por render.  | Aumenta o que fica montado, ao contrário do necessário. O ScrollView também anula esta prop.                               |
| `initialNumToRender={100}`     | `10`                              | Monta 100 células antes de mostrar a tela. A abertura fica cerca de 10 vezes mais lenta.       | A abertura lenta é a reclamação "a tela trava". Esta mudança piora o problema.                                             |

Ninguém mediu antes de mudar esses valores. Não há registro de ferramenta de medição (Perf Monitor, React DevTools Profiler). Dois dos três ajustes pioram o que tentam melhorar.

Correção: voltar aos valores padrão, resolver o item 1 e medir com 4.000 itens antes de mudar qualquer valor.

## 4. O bug de "às vezes não atualiza"

A documentação descreve a `FlatList` como um **`PureComponent`**. Ela só desenha de novo quando uma prop muda de referência (comparação rasa).

Sequência do bug:

1. `registrar` altera o objeto `alvo` dentro do array.
2. `setPets(pets)` envia **o mesmo array**.
3. O React compara o valor novo com o antigo, vê o mesmo array e ignora a atualização.
4. A tela não muda.

O "às vezes" acontece quando outro estado força um render, por exemplo, uma letra na busca. Nesse momento, a FlatList desenha o objeto que já foi alterado.

Duas correções possíveis:

1. **Atualizar sem alterar o array original:** `setPets(ant => ant.map(p => p.id === id ? { ...p, statusPasseio: 'concluido' } : p))`. O array e o objeto são novos, então a FlatList recebe um `data` diferente.
2. **Usar `extraData`:** passar um valor que muda junto com o item, para forçar um novo render.

**Escolho a correção 1.** A correção 2 esconde o problema: o estado continua sendo alterado no lugar. `extraData` serve para outro caso: quando a célula depende de um valor que não está em `data`, como o id do item selecionado.

## 5. Ordem de refatoração — tenho meio dia

| Ordem | O que faço                                                            | Risco se não fizer                                                          | Retorno                                                        |
| ----- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1     | Remover o `ScrollView` e voltar os três ajustes ao padrão.            | A tela continua travando com 4.000 itens. Usuários desistem da tela.        | Muito alto. Uma mudança pequena traz a virtualização de volta. |
| 2     | Corrigir a alteração do array em `registrar` e tipar o `id`.          | O usuário acha que registrou o passeio, mas o registro não aparece.         | Alto, com 3 linhas.                                            |
| 3     | Cabeçalho como elemento e `keyExtractor` por `id`.                    | A busca não funciona (o teclado fecha) e as células mostram dados trocados. | Alto. Com 4.000 itens, a busca é a forma de achar um pet.      |
| 4     | Busca normalizada e `ListEmptyComponent`.                             | Buscas válidas não encontram nada e a tela fica sem mensagem.               | Médio.                                                         |
| 5     | Medir com 4.000 itens. Só depois usar `memo` e `useCallback` no item. | A digitação ainda pode ficar lenta.                                         | Depende da medição. Por isso fica por último.                  |

Critério: primeiro o que **trava ou perde dados** (1 e 2). Depois o que **impede o uso** (3). Por último, o que **piora a experiência** (4 e 5). Sem o item 1 resolvido, qualquer medição dá resultado errado.

## 6. O que eu decidi NÃO corrigir

**Trocar `Text onPress` por `Pressable` e os valores fixos por tokens (itens 7, 9 e 10).** Esses problemas são reais, mas não travam a tela nem perdem dados.

Se eu incluir esses itens no PR de desempenho, a revisão fica maior. A medição de antes e depois também fica confusa, porque o `Pressable` muda a estrutura das views. Esses itens ficam registrados como tarefa para um PR seguinte.
