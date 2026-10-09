# Auditoria — TelaPasseio

**Autor:** Mateus Xavier **Data:** 09/10/2026

## 1. Problemas de permissão

| #   | Sintoma para o usuário                                                         | Causa no código                                                                                                                                                         | Correção                                                                                                           |
| --- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | Quem nega a localização vê o app parado ou um erro sem explicação.             | O código ignora o resultado de `requestForegroundPermissionsAsync()`. Ele chama `getCurrentPositionAsync` mesmo com `status: 'denied'`, sem `try/catch`.                | Ler `{ status, canAskAgain }` e continuar só se `status === 'granted'`.                                            |
| 2   | Depois de negar uma vez, o app não pede a permissão de novo até ser fechado.   | A variável `jaPediuPermissao` fica no módulo. Ela registra que o app **pediu**, não que o usuário **permitiu**.                                                         | Remover a variável. Verificar com `getForegroundPermissionsAsync()` ou pedir de novo.                              |
| 3   | "Permissão bloqueada" e "GPS desligado" não mostram mensagem.                  | O código não usa `canAskAgain` nem `hasServicesEnabledAsync()`.                                                                                                         | Três mensagens: negada (tentar de novo), bloqueada (botão `Linking.openSettings()`) e GPS desligado (ligar o GPS). |
| 4   | A mensagem "Erro ao obter localização" nunca aparece.                          | `getCurrentPositionAsync` lança um erro; não retorna `null`. A linha `if (!posicao)` nunca executa. O `setErro('')` dentro do watch também apaga o erro a cada leitura. | Usar `try/catch` na leitura e um tipo de falha (união) no lugar de texto livre.                                    |
| 5   | No iOS, a loja pode rejeitar o app, ou o app pode fechar ao pedir localização. | Falta o texto `NSLocationWhenInUseUsageDescription` (plugin `expo-location` no `app.json`).                                                                             | Configurar o plugin com um texto que diga para que o app usa a localização.                                        |

## 2. Vazamentos

Duas assinaturas ficam abertas. Nenhuma tem `remove()`.

- **`watchPositionAsync`:** o código descarta a assinatura. O GPS fica ligado em `Highest` mesmo depois de sair da tela. A função continua chamando `setRegistros` num componente desmontado.
- **`Accelerometer.addListener`:** o código também descarta a assinatura. O sensor continua lendo 60 vezes por segundo.

Cada toque em "Iniciar passeio" abre mais uma assinatura de cada tipo. Com **cinco toques**, ficam abertos **5 GPS e 5 acelerômetros**. Resultado:

- Cada nova posição gera 5 registros iguais, com o mesmo `id`, porque `String(antigos.length)` se repete.
- Cada posição chama `reverseGeocodeAsync` 5 vezes.
- Cada movimento conta 5 passos.
- A bateria cai rápido e a lista cresce sem limite.

Correção: guardar as duas assinaturas no estado. Adicionar o botão "Encerrar passeio", que chama `remove()` nas duas. Não abrir uma assinatura se já houver uma aberta. O encerramento automático ao sair da tela (`useEffect` com cleanup) é assunto da Aula 6.

## 3. Consumo de bateria

1. **`Accuracy.BestForNavigation` e `Highest`.** Essas opções são para navegação de carro, curva a curva. Para registrar um passeio, `Balanced` (cerca de 100 m) basta. Para desenhar o trajeto, usar `High` com `distanceInterval: 20` e um `timeInterval` de alguns segundos. Assim o GPS trabalha menos.
2. **`reverseGeocodeAsync` a cada posição.** Cada chamada consulta um serviço externo. O nome da rua não muda a cada metro. Melhor buscar o endereço uma vez, no início ou no fim do passeio.
3. **`Accelerometer.setUpdateInterval(16)`.** São 60 leituras por segundo. Cada passo contado desenha a tela inteira, incluindo a lista. Para contar passos, usar o `Pedometer` do `expo-sensors`. Ele usa o contador de passos do próprio aparelho e quase não gasta bateria.

## 4. O uso errado de sensor

O código usa o **acelerômetro como contador de passos**: `if (x > 1.5) setPassos(n => n + 1)`. Isso não funciona:

- O código lê só o eixo `x`. O resultado muda conforme a posição do celular no bolso ou na mão.
- O limite fixo de 1,5 g conta cada leitura acima dele. Um único balanço gera vários passos. Uma caminhada lenta não gera nenhum.
- Não há filtro. Sacudir o celular parado conta centenas de passos.

O autor queria **contar os passos do passeio**. A ferramenta certa é o `Pedometer`: `isAvailableAsync()` e `watchStepCount`, ou `getStepCountAsync(inicio, fim)` no iOS. Se o aparelho não tiver esse sensor, o app mostra "Contagem de passos indisponível neste aparelho".

## 5. Os defeitos de imagem

1. **`Image` do `react-native` com URL fixa da internet.** Todos os registros mostram a mesma foto (`picsum…/seed/passeio`). A foto não é do passeio e depende de rede. Sem cache controlado, as imagens piscam na rolagem. Sem placeholder, aparece um retângulo vazio enquanto a imagem carrega ou quando não há rede. Correção: usar `Image` do `expo-image` com `contentFit="cover"`, `cachePolicy`, `placeholder` e `recyclingKey`. Mostrar a foto local do passeio (`uri` da câmera) ou nada.
2. **`resizeMode` em vez de `contentFit`.** No `expo-image`, a prop certa é `contentFit`. Sem `contentFit` explícito, quem trocar o import pode ver a foto distorcida ou com faixas vazias. Também há desperdício: a imagem tem 600×400 pixels e aparece numa faixa de 140 pixels de altura.

## 6. Ordem de correção — tenho meio dia

Critério: **impacto no usuário por hora de trabalho**.

1. **Fechar as assinaturas.** Guardar as assinaturas, criar o botão "Encerrar" e não abrir duas vezes. Hoje o app gasta bateria e duplica dados para todo usuário que toca duas vezes. A correção tem cerca de 20 linhas.
2. **Tratar a permissão.** Ler o resultado, usar `try/catch` e mostrar mensagens diferentes (itens 1 a 5). Para quem nega a permissão, o app parece quebrado. O item 5 também é exigência da loja.
3. **Reduzir a precisão e tirar o geocoding do watch.** É a próxima maior causa de gasto de bateria. A mudança é de configuração e tem risco baixo.
4. **Trocar o acelerômetro pelo `Pedometer`.** Hoje o número de passos está errado. Mas, depois do passo 1, ele não quebra nada nem gasta muita bateria.
5. **Usar `expo-image` com a foto local.** A mudança é visível, mas afeta menos o funcionamento.

Os passos 1 e 2 afetam todos os usuários (bateria) ou muitos usuários (quem nega permissão) e custam pouco. Os passos 4 e 5 corrigem informação ou aparência, mas não impedem o uso do app.

## 7. O que eu decidi NÃO corrigir

- **Valores fixos no `StyleSheet`** (`'#f26522'`, `padding: 14`). O usuário não percebe esse problema. A correção entra quando a tela passar a usar os tokens do `theme.ts`. O PR de permissões precisa de uma revisão focada em comportamento.
- **`id: String(antigos.length)`.** O id correto vem com a persistência (id do servidor). Depois do passo 1, só uma assinatura fica aberta e nada sai da lista, então os ids deixam de se repetir na prática. Criar UUID agora seria trabalho repetido quando o servidor existir.
