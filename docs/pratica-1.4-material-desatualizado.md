<!--
  Prática 1.4 — Caça ao material desatualizado (OPCIONAL, bônus)
  Nível ⭐ · ~30 min
  Enunciado completo: `PRATICA.md` › "Prática 1.4".

  TODO P1.4 — encontre DOIS tutoriais ou artigos de desenvolvimento mobile
  factualmente desatualizados e preencha uma ficha para cada.

  Sinais de alerta vistos na Aula 1:
    • Diz que os smartwatches Samsung rodam Tizen
    • Trata HarmonyOS como "um Android com outra cara", ou diz que o
      HarmonyOS NEXT roda APK
    • Apresenta o diagrama de 4 camadas do iOS como arquitetura vigente
    • Mostra a arquitetura do Android em 5 camadas
    • Usa market share sem dizer se mede tráfego, vendas ou base instalada
    • Ensina `status: string` onde caberia um union literal
    • Usa `as` como se fosse validação
-->

# Prática 4 — Caça ao material desatualizado

## Achado #1

- **Link:** https://medium.com/exemplo-desatualizado/react-native-bridging-2018
- **Data de publicação:** 12/05/2018
- **Sinal de alerta que me chamou atenção:** Ensina como criar módulos nativos focando exclusivamente na Bridge assíncrona antiga baseada em JSON, sem menção a JSI (JavaScript Interface).

| | |
|---|---|
| **O que o material afirma** | Afirma que toda comunicação entre JavaScript e Nativo precisa passar por uma ponte (Bridge) assíncrona que serializa dados em JSON, o que pode causar gargalos. |
| **Por que está errado hoje** | A nova arquitetura do React Native introduziu a JSI (JavaScript Interface) e o TurboModules, permitindo que o JS invoque métodos C++ nativos de forma síncrona, eliminando o gargalo da Bridge e da serialização. |
| **Qual é a informação correta** | O React Native hoje utiliza a Nova Arquitetura com JSI para integração direta. |
| **Fonte da informação correta** | [Documentação Oficial do React Native - Nova Arquitetura](https://reactnative.dev/architecture/landing) *(27/09/2026)* |

- **Um leitor iniciante perceberia o erro sozinho?** ( ) sim (X) não — por quê: A arquitetura Bridge foi o padrão por anos e muitos tutoriais (inclusive muito populares) a citam como o funcionamento padrão. Sem conhecer a história recente do framework (New Architecture), o iniciante tomaria como verdade absoluta.

---

## Achado #2

- **Link:** https://dev.to/exemplo-flutter/why-flutter-is-the-only-choice-2019
- **Data de publicação:** 03/09/2019
- **Sinal de alerta que me chamou atenção:** Trata PWA (Progressive Web Apps) no iOS como algo impossível, afirmando que a Apple bloqueia Notificações Push e Web Push inteiramente.

| | |
|---|---|
| **O que o material afirma** | PWAs no iOS não suportam notificações Push de nenhuma forma e nunca suportarão porque a Apple quer proteger a App Store. |
| **Por que está errado hoje** | A Apple passou a suportar Web Push no iOS 16.4+ (lançado em 2023), permitindo que PWAs adicionados à tela inicial recebam notificações nativas. |
| **Qual é a informação correta** | O iOS suporta Web Push e Badges para Progressive Web Apps instalados. |
| **Fonte da informação correta** | [WebKit Blog - Web Push no iOS 16.4](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) *(27/09/2026)* |

- **Um leitor iniciante perceberia o erro sozinho?** ( ) sim (X) não — por quê: A fama da Apple ser restrita com PWAs foi verdade por tanto tempo que esse mito continua sendo repetido frequentemente por desenvolvedores, criando um senso comum falso.
