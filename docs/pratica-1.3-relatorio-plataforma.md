<!--
  Prática 1.3 — Relatório de decisão de plataforma
  Nível ⭐⭐ · ~1 h · Entrega individual · 1 a 2 páginas
  Enunciado completo (contexto e restrições do cliente): `PRATICA.md` › "Prática 1.3".

  TODO P1.3 — preencha TODAS as lacunas abaixo. A estrutura é fixa; o conteúdo é seu.
  Não existe uma resposta única correta — o que é avaliado é a qualidade do raciocínio.
-->

# Relatório de decisão de plataforma — App de Rotina Pet

**Autor:** Antigravity AI   **Data:** 27/09/2026

## 1. Recomendação

<!-- TODO P1.3.1 — escolha UMA abordagem e diga qual. Sem "depende". -->

Para o app do tutor, é recomendado a abordagem **cross-platform**
(React Native / Expo).

## 2. Restrições que sustentam a escolha

<!-- TODO P1.3.2 — cite TRÊS restrições do enunciado, TEXTUALMENTE.
     Não argumente em abstrato ("cross-platform é mais rápido de desenvolver"
     não é uma restrição do enunciado; "2 devs, nenhum com Kotlin ou Swift" é). -->

| # | Restrição do enunciado | Como ela empurra para a minha escolha |
|---|---|---|
| 1 | "Equipe disponível: 2 desenvolvedores — ambos com TypeScript e React, nenhum com Kotlin ou Swift" | Inviabiliza a abordagem nativa pura dado o prazo. Com cross-platform (React Native) a equipe reaproveita o conhecimento em TypeScript/React sem precisar aprender duas linguagens novas. |
| 2 | "Prazo: 3 meses até o piloto" | Com apenas 3 meses e uma equipe enxuta, manter duas bases de código nativas simultaneamente ou lidar com limitações drásticas das stores seria arriscado. Cross-platform acelera a entrega inicial para ambas as lojas móveis. |
| 3 | "Requisitos funcionais que envolvem hardware: Tirar foto [...] Capturar a localização GPS [...] Funcionar com conectividade instável" | Afasta a escolha de web/PWA. PWAs sofrem com limitações de API e confiabilidade (especialmente no iOS) para recursos essenciais de background (como GPS) e armazenamento offline robusto. Cross-platform oferece pacotes estáveis para hardware. |

## 3. O que estamos perdendo

<!-- TODO P1.3.3 — toda decisão tem custo. Uma resposta que não nomeia
     nenhum custo está escondendo o custo, não eliminando-o. -->

Abordagem rejeitada: Nativo

O que a organização deixa de ganhar ao não escolhê-la:
Perde-se o nível máximo de otimização de performance, consumo mínimo de bateria e pegada de memória reduzida — pontos que seriam extremamente favoráveis considerando que "65% dos aparelhos do público-alvo são Android de entrada com menos de 4 GB de RAM".

## 4. O painel das clínicas

<!-- TODO P1.3.4 — lembre que o painel é usado em desktop, na recepção. -->

Mesma tecnologia do app do tutor?  ( ) sim   (X) não

Justificativa:
O painel das clínicas é voltado para desktop web, não exige recursos pesados de câmera móvel ou GPS em background, e precisará de interfaces focadas em produtividade (tabelas e dashboards). Podemos usar React puro (Web) aproveitando o conhecimento do time.

## 5. Risco técnico e mitigação

<!-- TODO P1.3.5 — risco CONCRETO e específico deste projeto
     (pense em: Android de entrada com <4 GB de RAM, GPS em background,
     sincronização offline, notificações). Nada de "pode dar atraso". -->

| | |
|---|---|
| **Risco concreto** | Travamentos e encerramento inesperado (OOM - Out of Memory) do app durante captura de fotos e uso de GPS contínuo. |
| **Por que ele é plausível aqui** | 65% do público utiliza dispositivos Android de entrada (menos de 4 GB de RAM). Como apps cross-platform (React Native) rodam o motor JavaScript adicional, a RAM consumida junto com recursos de câmera e localização em segundo plano pode estourar facilmente o limite do SO. |
| **Como eu mitigaria** | Adotar bibliotecas maduras nativas integradas via JSI (como VisionCamera), definir resoluções baixas (downsampling) antes de salvar as fotos em disco, realizar profiling rígido de memória via Android Studio e priorizar testes em aparelhos de baixo custo reais. |

## 6. A pergunta que eu faria ao cliente

<!-- TODO P1.3.6 — uma pergunta que REALMENTE mudaria a decisão.
     Se a resposta do cliente não altera nada, a pergunta não vale nota. -->

Algo que o enunciado NÃO informa e que poderia mudar minha resposta:

As funcionalidades avançadas que usam hardware (localização por GPS contínua, uso de câmera e modo offline robusto) são absolutamente essenciais para a validação inicial do piloto de 3 meses, ou elas poderiam ser lançadas apenas em uma segunda fase?

Se a resposta fosse "não são essenciais agora (podem ficar para a fase 2)", faz sentido a recomendação para web/PWA, porque é possível entregar muito mais rápido para todos usando apenas tecnologias web padrão e ecconomizar o tempo precioso lidando com aprovações em App Stores e módulos nativos.
