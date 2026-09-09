# Relatório de decisão de plataforma: App de Rotina Pet

**Autor:** Mateus Xavier **Data:** 08/09/2026

## 1. Recomendação

Para o app do tutor, recomendo a abordagem **cross-platform** (React Native com Expo).

## 2. Restrições que sustentam a escolha

| #   | Restrição do enunciado                                                        | Como ela empurra para a minha escolha                                  |
| --- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | "2 desenvolvedores, ambos com TypeScript e React, nenhum com Kotlin ou Swift" | Nativo seriam duas bases em linguagens que ninguém domina.             |
| 2   | "Capturar a localização GPS durante passeios"                                 | Elimina PWA. GPS em background não é confiável no navegador Android.   |
| 3   | "R$ 90 mil" e "3 meses até o piloto"                                          | Uma base de código só. Dois apps nativos dobram UI e QA no mesmo teto. |

## 3. O que estamos perdendo

Abordagem rejeitada: **nativo** (Kotlin e Swift).

- RAM e tempo de inicialização, justo nos 65% com menos de 4 GB.
- API nova do sistema só chega quando alguém escreve o módulo nativo.

## 4. O painel das clínicas

Mesma tecnologia do app do tutor? ( ) sim (x) não

- React web, não React Native. Roda em desktop, sem loja.
- Compartilha os tipos do domínio e o cliente de API.

## 5. Risco técnico e mitigação

|                                  |                                                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Risco concreto**               | GPS do passeio para com a tela trancada e o trajeto chega incompleto.                                                   |
| **Por que ele é plausível aqui** | Android mata background com pouca RAM, e 65% do público tem menos de 4 GB.                                              |
| **Como eu mitigaria**            | `expo-location` com foreground service, pontos em SQLite local, sincronizar depois. Testar em aparelho de entrada real. |

## 6. A pergunta que eu faria ao cliente

Algo que o enunciado NÃO informa e que poderia mudar minha resposta:

- As clínicas usam leitor de microchip com SDK proprietário só para nativo?

Se fosse **sim**, eu mudaria para **nativo no Android**: ponte nativa para SDK de terceiro não sai em 3 meses sem Kotlin no time.
