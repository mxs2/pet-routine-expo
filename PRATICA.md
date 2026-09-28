# Prática 2

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio destas práticas:** **App de Gestão e Rotina Pet** (`Pet`).

| Projeto                    | Repositório        | Branch da disciplina |
| -------------------------- | ------------------ | -------------------- |
| App de Gestão e Rotina Pet | `pet-routine-expo` | `feature/pratica_02` |

## Como usar este arquivo

- **Toda prática vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é uma prática concluída.

> 📦 **Componentes desta prática** — use **somente** estes sete: `View`, `ScrollView`, `Text`, `TextInput`, `Image`, `Button`, `Switch`, mais `StyleSheet` e Flexbox. Componentes de toque estilizáveis (`TouchableOpacity` etc.) e componentes de lista **não são assunto desta prática** e não devem aparecer nas entregas. Onde precisar de interação: `onPress` no `Button`, `onPress` no `Text`, `onChangeText` no `TextInput`, `onValueChange` no `Switch`.

> ⚠️ **Regras de escrita válidas para todas as práticas** — são exatamente os pontos que material antigo ensina errado:
> 1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
> 2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
> 3. **`gap`** para espaçar irmãos, não `margin` em cada filho.
> 4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
> 5. **Zero `any`.**

**Setup:**

```bash
git clone https://github.com/renanalencar/pet-routine-expo pet-routine-expo
cd pet-routine-expo
git checkout feature/pratica_02
npm install
npx expo start
```

---

# Prática 2.1 — Tela do pet em destaque com estilo

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 4 a 5 h · **Entrega:** individual · **Prazo:** próxima aula

## Contexto

Na Prática 1 você modelou o domínio `Pet` em TypeScript puro: tipos, serviço mockado e estado de tela. Agora é hora de **construir a tela de verdade** — e construí-la **com estilo sustentável desde o início**.

Esta tela mostra **uma única entidade em destaque**, não uma lista — listas e `FlatList` chegam mais adiante no semestre. Além da tela principal, você vai montar um **formulário** para cadastrar/editar um pet e um **sistema de tokens** que mantém cores e espaçamentos consistentes no app todo.

## O que já está pronto (Prática 1)

Estes arquivos vieram da prática anterior e **não precisam ser reescritos**:

| Arquivo | O que contém |
|---|---|
| `src/types/pet.ts` | `Pet`, unions literais, tipos derivados, rótulos, `EstadoTela<T>` |
| `src/services/pet-service.ts` | `buscarPetEmDestaque()`, `registrarPasseio()`, mock com atraso |
| `src/tela-pet.ts` | Lógica de tela pura (verificação em TS) |

## Estrutura de arquivos a criar/completar

```
pet-routine-expo/
├── App.tsx                          ← tela principal (scaffold 4)
└── src/
    ├── theme.ts                     ← tokens de design (scaffold 1)
    ├── types/pet.ts                 ← já pronto (Prática 1)
    ├── services/pet-service.ts      ← já pronto (Prática 1)
    ├── components/
    │   ├── card.tsx                  ← card reutilizável (scaffold 2)
    │   └── card-pet.tsx             ← card do pet (scaffold 3)
    └── screens/
        └── pet-form.tsx             ← formulário (scaffold 5)
```

> **Ordem recomendada:** theme.ts → card.tsx → card-pet.tsx → App.tsx → pet-form.tsx.
> O `npm run typecheck` vai apontar erros nos arquivos que dependem de tokens ainda não definidos — resolva o theme primeiro.

---

## Scaffold 1 — `src/theme.ts`

Tokens são **valores** (cores, espaçamentos, tipografia), não layouts prontos. `as const` vai aqui; nunca dentro de `StyleSheet.create`.

```ts
export const cores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  // TODO P2.1: complete com texto, textoFraco, primaria, sucesso, erro
} as const;

export const espaco = {
  // TODO P2.2: escala de 4+ degraus (xs, sm, md, lg). Progressão consistente.
} as const;

export const tipografia = {
  // TODO P2.3: titulo, corpo, legenda. Objetos de estilo de TEXTO.
} as const;

// TODO P2.4: por que `as const` aqui e não em StyleSheet.create?
```

---

## Scaffold 2 — `src/components/card.tsx`

Componente genérico — ele não sabe nada sobre `Pet`. Recebe `children` e uma prop opcional `destacado`.

```tsx
import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { cores, espaco } from '../theme';

type CardProps = {
  children: ReactNode;
  // TODO P2.5: prop opcional `destacado`
};

export function Card({ children /* TODO P2.6 */ }: CardProps) {
  // TODO P2.7: array de estilos — base sempre, variante só quando destacado
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // TODO P2.8: padding, borderRadius, backgroundColor — tudo dos tokens
    // TODO P2.9: boxShadow + gap
  },
  cardDestacado: {
    // TODO P2.10: o que muda no destaque?
  },
});
```

---

## Scaffold 3 — `src/components/card-pet.tsx`

Usa o `Card` reutilizável e os tipos do domínio. A ação "Registrar passeio" vem das props — o card não sabe o que fazer, só avisa que o toque aconteceu.

```tsx
import { StyleSheet, Text, View } from 'react-native';
import { type Pet, rotuloEspecie, rotuloStatusPasseio } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';
import { Card } from './card';

// TODO P2.11: tipe as props (pet: Pet, aoRegistrarPasseio: () => void)
type CardPetProps = { /* ... */ };

export function CardPet({ /* TODO P2.12 */ }: CardPetProps) {
  return (
    <Card>
      {/* TODO P2.13: nome do pet */}
      {/* TODO P2.14: linha com espécie e status, um em cada ponta */}
      {/* TODO P2.15: idade em meses */}
      {/* TODO P2.16: Text com onPress para "Registrar passeio" */}
    </Card>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // TODO P2.17: marginTop com token
  },
  botao: {
    // TODO P2.18: marginTop, fontWeight, color — tudo dos tokens
  },
});
```

---

## Scaffold 4 — `App.tsx`

A tela principal. Usa `EstadoTela<Pet>` no state do React e um `switch` exaustivo (sem `default`) para renderizar cada variante.

```tsx
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { CardPet } from './src/components/card-pet';
import { buscarPetEmDestaque } from './src/services/pet-service';
import { type EstadoTela, type Pet } from './src/types/pet';
import { cores, espaco } from './src/theme';

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Pet>>({ tipo: 'carregando' });

  const carregar = useCallback(async () => {
    // TODO P2.19: carregando → buscar → sucesso ou erro
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  function registrarPasseio() {
    // TODO P2.20: só se estado.tipo === 'sucesso'. Atualize statusPasseio.
  }

  switch (estado.tipo) {
    case 'carregando':
      return (
        <View style={styles.centro}>
          {/* TODO P2.21: ActivityIndicator com color do token */}
          <ActivityIndicator size="large" />
        </View>
      );
    case 'sucesso':
      return (
        <View style={styles.container}>
          {/* TODO P2.22: <CardPet pet={estado.dados} aoRegistrarPasseio={registrarPasseio} /> */}
        </View>
      );
    case 'erro':
      return (
        <View style={styles.centro}>
          {/* TODO P2.23: mensagem + Text com onPress para tentar de novo */}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48 /* TODO: padding e backgroundColor dos tokens */ },
  centro:    { flex: 1, alignItems: 'center', justifyContent: 'center' /* TODO: backgroundColor */ },
});
```

---

## Scaffold 5 — `src/screens/pet-form.tsx`

Formulário dentro de um `ScrollView`. Inputs controlados, `Switch`, `Button` desabilitado quando o nome está vazio.

```tsx
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { cores, espaco, tipografia } from '../theme';

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [alertaVacina, setAlertaVacina] = useState(false);

  // TODO P2.24: substitua `true` por nome.trim() === ''
  const nomeVazio = true;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.rotulo}>Nome do pet</Text>
      {/* TODO P2.26: value + onChangeText */}
      {/* TODO P2.27: array de estilos com inputInvalido quando nomeVazio */}
      <TextInput style={styles.input} placeholder="Ex: Rex" />

      <Text style={styles.rotulo}>Raça</Text>
      {/* TODO P2.28: input controlado */}
      <TextInput style={styles.input} placeholder="Ex: Golden Retriever" />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Alerta de vacina</Text>
        {/* TODO P2.29: Switch controlado (value + onValueChange) */}
        <Switch />
      </View>

      <View style={styles.areaBotao}>
        {/* TODO P2.30: disabled={nomeVazio} */}
        {/* TODO P2.31: color={cores.primaria} */}
        <Button title="Salvar" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela:         { flex: 1 /* TODO P2.32: backgroundColor */ },
  conteudo:     { /* TODO P2.33: padding e gap dos tokens */ },
  input:        { borderWidth: 1 /* TODO P2.34: borderColor, borderRadius, padding, fontSize */ },
  inputInvalido:{ /* TODO P2.35: só o que muda — ex: borderColor: cores.erro */ },
  linha:        { /* TODO P2.36: row, space-between, center */ },
  rotulo:       { /* TODO P2.37: tipografia */ },
  areaBotao:    { borderRadius: 8, overflow: 'hidden' /* TODO P2.38: marginTop do token */ },
});
```

> **Para testar o formulário** sem navegação entre telas: troque temporariamente o componente renderizado em `App.tsx` por `PetForm` e depois devolva.

---

## Como testar o estado de erro

Troque `SIMULAR_ERRO` para `true` em `src/services/pet-service.ts`, confira a tela de erro e o botão "Tentar novamente", e devolva a constante para `false` antes de entregar — mas **deixe a constante no código**.

---

## O que entregar

1. Os cinco arquivos acima, com todos os `TODO` resolvidos e **removidos**.
2. Os **três estados** funcionando na tela principal: carregando, sucesso e erro.
3. A ação **"Registrar passeio"** alterando o estado local (o status do pet muda na tela).
4. O **formulário** funcional: inputs controlados, switch, botão desabilitado quando o nome está vazio, pelo menos um estilo condicional.
5. O **sistema de tokens** (`theme.ts`) usado de fato em todos os componentes — nenhum hex ou número mágico nos componentes.
6. Um `README.md` complementando o do repositório com:
   - **Uma decisão de modelagem** que você tomou e o motivo (ex.: por que `type` e não `interface`, por que esse conjunto de status).
   - **Uma decisão de organização de estilo** que você tomou e o motivo (ex.: por que tal estilo virou token e tal outro ficou local).

---

## Restrições (é aqui que a nota se decide)

- ❌ Nenhum `JSX.Element` como tipo de retorno
- ❌ Nenhum `as const` dentro de `StyleSheet.create`
- ❌ Nenhum `margin` usado para espaçar irmãos (use `gap`)
- ❌ Nenhum quarteto `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` (use `boxShadow`)
- ❌ Nenhum componente fora dos sete permitidos + `StyleSheet`
- ❌ Nenhum `any`
- ❌ Nenhuma cor ou espaçamento em hex/número mágico dentro de componentes — tudo vem do `theme.ts`
- ❌ Nenhum `as` sem justificativa em comentário

---

## Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Tokens bem desenhados** | 15% | São valores, não layouts; escala de espaço coerente; usados em todos os componentes |
| **Uso correto de Flexbox** | 15% | Eixo correto, `flex: 1` onde necessário, `gap` no lugar de `margin` |
| **Os três estados funcionam** | 15% | Loading, sucesso e erro visíveis e testáveis |
| **Componente Card reutilizável** | 15% | Props tipadas, `destacado` via array de estilos, sem valores mágicos |
| **Formulário funcional** | 15% | Inputs controlados, Switch, contentContainerStyle, botão desabilitado |
| **Ação de registrar passeio** | 10% | Funciona e atualiza o estado local corretamente |
| **Respeito às restrições** | 10% | Cada item da lista acima que aparecer no código desconta |
| **README** | 5% | Decisões explicadas com motivo real |

## O que **não** é avaliado

Beleza visual, animações, navegação entre telas, persistência, listas. Foque na modelagem de estado, nos três estados da tela, no formulário e na consistência do estilo.

---

# Prática 2.2 — Auditoria de estilo em código alheio

**Nível:** ⭐⭐ · **Tempo estimado:** 1 h · **Entrega:** individual · **Formato:** `docs/pratica-2.2-auditoria-estilo.md`

## Contexto

Você entrou num time que mantém um app React Native de dois anos atrás. Seu tech lead pede uma **auditoria da camada de estilo** antes de vocês começarem a mexer.

Abaixo está um trecho representativo do código que você encontrou.

```tsx
import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function TelaResumo(props: any): JSX.Element {
  const [aberto, setAberto] = React.useState(false);

  return (
    <ScrollView style={{ padding: 20, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>Resumo</Text>
        <Text style={{ fontSize: 18, color: '#333' }}>{props.total}</Text>
      </View>

      <View style={globalStyles.container}>
        <Text style={{ fontSize: 14, color: '#666' }}>{props.nome}</Text>
      </View>

      <View style={[globalStyles.container, styles.item]}>
        <Text style={{ fontSize: 14, color: '#666', fontSize: 16 }}>{props.detalhe}</Text>
      </View>

      <Button
        style={globalStyles.button}
        title={aberto ? 'Fechar' : 'Abrir'}
        onPress={() => setAberto(!aberto)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
```

```tsx
// ../styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 18, color: '#333' },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center' },
});
```

## O que entregar

O template está em `docs/pratica-2.2-auditoria-estilo.md`. Preencha:

1. **Lista de problemas encontrados** — pelo menos **oito**, cada um com: o que está errado, consequência **concreta**, e correção. "É feio" não é consequência concreta.
2. **Um problema arquitetural** — algo que não se resolve trocando uma linha. Explique por que a **estrutura** o produz.
3. **O `globalStyles.ts` reescrito** como `theme.ts` de tokens — com explicação do que você removeu e por quê.
4. **Ordem de prioridade da refatoração** — você tem meio dia. Justifique por **risco** e **retorno**, não pela ordem no arquivo.
5. **Um problema que você decidiu NÃO corrigir**, e por quê.

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Cobertura dos problemas** | 30% | Pelo menos 8, com correção correta |
| **Problema arquitetural** | 25% | Percebeu o acoplamento, não só erros de sintaxe |
| **`theme.ts` reescrito** | 20% | Tokens são valores; explicou o que saiu e por quê |
| **Priorização por risco/retorno** | 15% | Não é lista na ordem do arquivo |
| **O item que ficou de fora** | 10% | Escolha defensável |

> **Não existe uma resposta única.** O que é avaliado é a qualidade do raciocínio de engenharia.

---

# Prática 2.3 — Flexbox Froggy + relatório curto *(opcional)*

**Nível:** ⭐ · **Tempo estimado:** 30 min

Complete os 24 níveis do [Flexbox Froggy](https://flexboxfroggy.com/). Depois entregue **meia página**:

- **Três diferenças** que você notou entre o Flexbox do jogo (CSS) e o do React Native.
- **Um nível** que exigiria código diferente em React Native, com os dois códigos lado a lado.

**Por que vale a pena:** o jogo constrói intuição de eixo muito rápido. Mas ele é CSS — e transferir sem perceber as diferenças é como aprender espanhol e falar português achando que é o mesmo idioma.

---

# Equivalência de domínio

Use como **último recurso**. O ponto da prática é decidir de novo, não traduzir.

| `Habito` *(material da aula)* | `Pet` *(seu domínio)* |
|---|---|
| `Habito` | `Pet` |
| `CardHabito` | `CardPet` |
| `titulo: string` | `nome: string` |
| `categoria: CategoriaHabito` | `especie: EspeciePet` |
| `frequencia: FrequenciaHabito` | `porte: PortePet` |
| `status: StatusHabito` (`'pendente' \| 'concluido' \| 'pulado'`) | `statusPasseio: StatusPasseio` (`'pendente' \| 'concluido' \| 'cancelado'`) |
| `streakDias: number` | `idadeMeses: number` |
| `rotuloStatus()` | `rotuloStatusPasseio()` |
| `buscarHabitoDoDia()` | `buscarPetEmDestaque()` |
| "Hábito do dia" | "Pet em destaque" |
| "Marcar concluído hoje" | "Registrar passeio" |

---

## Resumo de tempos

| Parte                             | Onde | Tempo   |
| --------------------------------- | ---- | ------- |
| Prática 2.1                       | Casa | 4–5 h   |
| Prática 2.2                       | Casa | ~1 h    |
| Prática 2.3 *(opcional)*          | Casa | ~30 min |
