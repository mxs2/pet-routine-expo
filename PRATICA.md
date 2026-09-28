# Prática 3

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio destas práticas:** **App de Gestão e Rotina Pet** (`Pet`).

| Projeto                    | Repositório        | Branch da disciplina |
| -------------------------- | ------------------ | -------------------- |
| App de Gestão e Rotina Pet | `pet-routine-expo` | `feature/pratica_03` |

## Como usar este arquivo

- **Toda prática vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é uma prática concluída, e é assim que o professor confere rápido quem parou onde.

> 🔴 **Esta prática precisa de aparelho físico para a parte de sensores.** O iOS Simulator **não tem câmera, acelerômetro nem giroscópio**. O Android Emulator tem sensores virtuais e uma câmera de cena virtual — serve para testar o fluxo, não a experiência. **Traga o celular carregado, com o Expo Go instalado e o cabo.** Se não tiver, faça em dupla.

> 📦 **O que esta prática acrescenta ao seu catálogo:** **`Pressable`**, **`SectionList`**, **`expo-location`**, **`expo-camera`** (`CameraView`, `useCameraPermissions`) e **`expo-image`**. Tudo das Práticas 1 e 2 continua valendo e deve ser usado — `View`, `Text`, `Image`, `TextInput`, `ScrollView`, `Button`, `Switch`, `StyleSheet`, Flexbox e `useState`. **Não use nas entregas:** componentes de toque que não sejam o `Pressable`, bibliotecas de lista de terceiros, `useEffect`/`useRef` para sensores (chegam na Aula 6), navegação/`expo-router` (Aula 7), mapas, chamadas de rede.

> ⚠️ **Regras de escrita válidas para todas as práticas** — as cinco primeiras vêm da Prática 2, as três seguintes são de listas, e as seis últimas são de sensores:
> 1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
> 2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
> 3. **`gap`** (ou `ItemSeparatorComponent`) para espaçar irmãos, nunca `margin` em cada filho.
> 4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
> 5. **Zero `any`.**
> 6. **A ação vai em `onPress`**, nunca em `onPressIn`. Feedback visual vai no `pressed`.
> 7. **`renderItem` declarado fora do componente**, sempre que não depender de estado local.
> 8. **Toda lista tem `ListEmptyComponent`.** Sem exceção — inclusive as das práticas.
> 9. **Todo `addListener` / `watchPositionAsync` tem um `remove()` no mesmo arquivo.** Sem exceção.
> 10. **Estados de falha são distintos na tela.** "Permissão negada", "permissão bloqueada" e "serviço desligado" são três mensagens, não uma.
> 11. **Nenhuma `Accuracy` sem justificativa.** Se escreveu `High`, saiba dizer por quê.
> 12. **`contentFit` explícito** em toda `Image` do `expo-image`.
> 13. **Confira o import do `Image`.** `expo-image` e `react-native` têm um componente com o mesmo nome.
> 14. **`base64` só quando for realmente usado.** Para exibir, o `uri` basta.

**O domínio, estendido com dois campos de sensor:**

```tsx
type StatusPasseio = 'pendente' | 'concluido' | 'cancelado';
type EspeciePet = 'cachorro' | 'gato' | 'ave' | 'outro';

interface Pet {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: Date;
  // novidades da Prática 3 — opcionais de propósito:
  local?: { latitude: number; longitude: number; precisaoMetros: number };
  fotoUri?: string;
}
```

> 💡 **Por que os dois campos são opcionais:** o usuário pode negar a permissão, e o app tem que continuar funcionando. Um pet sem foto e sem local ainda é um pet. Se o seu tipo obriga os dois, o seu app quebra para quem disse "não".

**Setup:**

```bash
git clone https://github.com/renanalencar/pet-routine-expo pet-routine-expo
cd pet-routine-expo
git checkout feature/pratica_03
npm install
npx expo start
```

> As dependências de sensor (`expo-location`, `expo-sensors`, `expo-camera`, `expo-image`) já estão no `package.json` desta branch.

---

# Prática 3.1 — A tela de lista com registro de passeio

**Nível:** ⭐⭐⭐ · **Tempo:** 5–6 h · **Entrega:** branch `feature/pratica_03` do repositório do grupo

## Contexto

Na Prática 2 vocês deixaram a tela do projeto apresentável: tokens, `CardPet`, Flexbox, um formulário. Mas ela só mostrava um pet em destaque, e o botão era um remendo.

Agora ela vira uma tela de produto: uma **lista de verdade** com itens que reagem ao toque e os estados que uma lista real tem. E o registro de passeio ganha **contexto** — onde aconteceu e com o que se parecia — sem que ninguém precise digitar nada.

## O que entregar

1. **Uma tela principal** que lista os pets com **`SectionList`**, agrupando por um critério que faça sentido para o produto (status do passeio, espécie ou faixa etária — escolham e justifiquem no README).
2. **Item tocável** com `Pressable`, reaproveitando o `CardPet` da Prática 2 por dentro. O toque alterna o status do passeio.
3. **Ação secundária no toque longo** (`onLongPress`) — remover o pet da lista.
4. **Os quatro estados da lista**, todos implementados:
   - **com dados** — o caso normal;
   - **vazio** — `ListEmptyComponent`, com um texto que diga ao usuário **o que fazer**;
   - **atualizando** — `refreshing` + `onRefresh`;
   - **filtrado sem resultado** — um `TextInput` de busca no `ListHeaderComponent` que filtra por nome; quando nada casa, o estado vazio diz isso, **não** a mesma frase do primeiro acesso.
5. **Registro de passeio com sensores** — ao tocar em "Registrar passeio" no `CardPet`, uma tela de registro captura:
   - **localização** do momento (`expo-location`), exibida como texto legível com o raio de precisão;
   - **foto** (`expo-camera`), exibida como prévia com `expo-image`.
6. **Miniatura da foto no card** — o `CardPet` agora mostra a foto (quando houver) usando `expo-image`.
7. **Tratamento de permissões** com mensagens **distintas** para cada cenário de falha:
   - permissão de localização negada (`canAskAgain: true`),
   - permissão de localização bloqueada (`canAskAgain: false`),
   - serviço de localização desligado,
   - permissão de câmera negada,
   - sensor/hardware indisponível.
8. **Degradação graciosa** — negando tudo, o app funciona. Um pet sem foto e sem local renderiza sem quebrar.
9. **README.md** com uma seção "Decisões da Prática 3" respondendo:
   - por que `SectionList` e não `FlatList` neste caso;
   - onde vocês agrupam os dados, e por que **não** é dentro do JSX;
   - a escolha de `Accuracy` e por que (bateria vs. precisão);
   - as limitações assumidas (tela de registro sem cleanup de subscription, foto no cache e não na galeria).

## Estrutura de arquivos a criar/completar

```
pet-routine-expo/
├── App.tsx                              ← tela principal (SectionList + condicional)
└── src/
    ├── data/
    │   └── pets.ts                      ← mock de dados (20+ itens)
    ├── lib/
    │   └── agrupar.ts                   ← agrupamento e filtragem (sem JSX)
    ├── components/
    │   ├── card.tsx                      ← já pronto (Prática 2)
    │   ├── card-pet.tsx                 ← estendido com foto e localização
    │   ├── item-pet.tsx                 ← Pressable envolvendo CardPet
    │   └── lista-vazia.tsx              ← estado vazio da lista
    ├── screens/
    │   ├── pet-form.tsx                 ← já pronto (Prática 2)
    │   └── tela-registro.tsx            ← registro com GPS + câmera
    ├── theme.ts                         ← já pronto (Prática 2)
    ├── types/pet.ts                     ← estendido com local? e fotoUri?
    └── services/pet-service.ts          ← já pronto (Prática 1)
```

> **Ordem recomendada:** data/pets.ts → lib/agrupar.ts → item-pet.tsx → lista-vazia.tsx → card-pet.tsx (atualizações) → App.tsx (lista) → tela-registro.tsx → App.tsx (condicional de registro).

## Scaffolds

Os scaffolds com `// TODO` já estão nos arquivos da branch. Aqui, os trechos-chave para referência.

### `src/data/pets.ts`

```ts
import type { Pet } from '../types/pet';

// TODO P3.1: 20+ itens com variedade de espécies, status, idades.
// Inclua ao menos um com `local` e um com `fotoUri`.
export const PETS: Pet[] = [
  // ...três exemplos estão no arquivo; faltam 17+
];
```

### `src/lib/agrupar.ts`

```ts
export type Secao = { title: string; data: Pet[] };

export function agrupar(pets: Pet[]): Secao[] {
  // TODO P3.2: agrupar pelo critério que o grupo escolheu
  // TODO P3.3: descartar grupos vazios
  // TODO P3.4: a ordem dos grupos é uma DECISÃO. Comente qual e por quê.
}

export function filtrarPorNome(pets: Pet[], busca: string): Pet[] {
  // TODO P3.5: busca case-insensitive. Busca vazia devolve tudo.
}
```

### `src/components/item-pet.tsx`

```tsx
export function ItemPet({ pet, onAlternar, onRemover, onRegistrar }: ItemPetProps) {
  return (
    <Pressable
      // TODO P3.6: onPress → alternar; onLongPress → remover
      // TODO P3.7: acessibilidade (accessibilityRole + accessibilityLabel)
      // TODO P3.8: hitSlop e unstable_pressDelay — justifique cada valor
      style={({ pressed }) => [
        styles.item,
        // TODO P3.9: feedback visual quando pressed
      ]}
    >
      {/* TODO P3.10: <CardPet pet={pet} aoRegistrarPasseio={...} /> */}
    </Pressable>
  );
}
```

### `src/components/lista-vazia.tsx`

```tsx
type ListaVaziaProps = {
  // TODO P3.12: prop para distinguir "primeiro acesso" de "busca sem resultado"
};

export function ListaVazia(/* TODO P3.12 */) {
  // TODO P3.13: dois textos diferentes. O da busca menciona o termo procurado.
}
```

### `src/screens/tela-registro.tsx`

```tsx
// CONTRATO DE TRÊS TEMPOS — preencha em cada bloco de sensor:
//   1. PEDIR   → ______________________________
//   2. LER     → ______________________________
//   3. PARAR   → ______________________________

export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  // TODO P3.16–P3.17: hook de permissão + ref da câmera via useState
  // TODO P3.18: obterLocalizacao() — pedir permissão, tratar 3 cenários, ler posição
  // TODO P3.19–P3.20: abrirCamera() + tirarFoto() — pedir permissão, capturar
  // TODO P3.21: 5 mensagens de erro distintas
  // TODO P3.22: contrato de 3 tempos preenchido
  // TODO P3.23–P3.24: salvar + degradação graciosa
}
```

### `App.tsx`

```tsx
export default function App() {
  // TODO P3.28: estados (pets, busca, atualizando, petRegistrando)
  // TODO P3.29: alternarStatus — imutável
  // TODO P3.30: removerPet — imutável
  // TODO P3.31: recarregar — volta ao mock
  // TODO P3.32: handleRegistro — recebe local + fotoUri da TelaRegistro
  // TODO P3.33: condicional — petRegistrando não é null → TelaRegistro
  // TODO P3.34: secoes = agrupar(filtrarPorNome(pets, busca))
  // TODO P3.35: SectionList completo (renderItem, renderSectionHeader, empty, refresh)
  // TODO P3.36: TextInput de busca no ListHeaderComponent
}
```

## Restrições (é aqui que a nota se decide)

**Listas:**
- **Nenhuma `ScrollView` envolvendo a lista.** Use `ListHeaderComponent` / `ListFooterComponent`.
- **Nenhuma mutação de estado.** Toda mudança cria array novo.
- **Nenhum `<Button>` nem `<Text onPress>` sobrando** onde o `Pressable` é a resposta.
- **Nenhum `margin` para espaçar itens de lista.**
- **O agrupamento e o filtro moram fora do componente de tela**, em `src/lib/`.
- **Mínimo de 20 itens no mock.**

**Sensores:**
- **Sem `useEffect`, `useRef`** para sensores. Os hooks de permissão das bibliotecas (`useCameraPermissions`) são permitidos.
- **Sem navegação.** A tela de registro aparece por condicional com `useState`.
- **Sem mapa.** A coordenada é texto.
- **Sem salvar na galeria** e **sem escolher foto do rolo**.
- **Sem rede.** A foto vive no cache.
- **Se abrir uma torneira (`addListener`/`watchPositionAsync`), tem que existir botão para fechar.** E o README declara: *"esta assinatura não é encerrada ao sair da tela, porque a ferramenta para isso é assunto da Aula 6"*.

**Geral:**
- **Zero `any`.**
- **Nenhum hex ou número mágico dentro de componentes** — tudo vem do `theme.ts`.

## Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Correção do toque** | 15% | Ação em `onPress`; feedback via `pressed`; `onLongPress` funcionando |
| **Correção da lista** | 15% | `SectionList` bem configurada; chave estável; sem `ScrollView` envolvendo |
| **Os quatro estados** | 15% | Todos implementados; o vazio de busca não repete o texto do primeiro acesso |
| **Imutabilidade** | 10% | Nenhuma mutação; lista atualiza sozinha |
| **Contrato de três tempos** | 10% | Pede, lê, para. Comentário-checklist preenchido em cada arquivo de sensor |
| **Estados de falha distintos** | 10% | As cinco situações, cada uma com mensagem e orientação ao usuário |
| **Uso correto das APIs de sensor** | 10% | `Accuracy` justificada; `contentFit` explícito; import do `Image` correto |
| **Degradação graciosa** | 5% | Negando tudo, o app funciona |
| **Separação de responsabilidade** | 5% | Agrupar e filtrar em `lib/`; sensor em `tela-registro` |
| **README** | 5% | Decisões explicadas com critério |

## O que **não** é avaliado

- Beleza da tela além do que a Prática 2 já cobrou.
- Desempenho medido. Com 20 itens não há o que otimizar.
- Animação de qualquer tipo.
- Quantidade de sensores usados. Usar bem GPS e câmera vale mais que usar mal quatro.

---

# Prática 3.2 — Auditoria de lista em código alheio

**Nível:** ⭐⭐ · **Tempo:** ~1 h · **Entrega:** arquivo `docs/pratica-3.2-auditoria-lista.md`

## Contexto

Você entrou num time e pegou esta tela. Ela **funciona** — em desenvolvimento, com o mock de 8 itens. Em produção são 4 000, e o time reclama que "a tela de pets trava e às vezes não atualiza".

```tsx
import { useState } from 'react';
import { ScrollView, FlatList, TextInput, Text, View, StyleSheet } from 'react-native';

import { PETS } from '../mock';

export default function TelaPets() {
  const [pets, setPets] = useState(PETS);
  const [busca, setBusca] = useState('');

  const visiveis = pets.filter((p) => p.nome.includes(busca));

  function registrar(id) {
    const alvo = pets.find((p) => p.id === id);
    alvo.statusPasseio = 'concluido';
    setPets(pets);
  }

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.titulo}>Meus pets</Text>

      <FlatList
        data={visiveis}
        ListHeaderComponent={() => (
          <TextInput
            style={styles.busca}
            value={busca}
            onChangeText={setBusca}
            placeholder="buscar"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemAcao} onPress={() => registrar(item.id)}>
              registrar passeio
            </Text>
          </View>
        )}
        removeClippedSubviews={true}
        windowSize={50}
        initialNumToRender={100}
      />

      <Text style={styles.rodape}>Total: {visiveis.length}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: '600' },
  busca: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  item: { padding: 14, backgroundColor: '#fff', borderRadius: 10, marginBottom: 8 },
  itemNome: { fontSize: 16 },
  itemAcao: { color: '#FF6002', marginTop: 4 },
  rodape: { textAlign: 'center', padding: 16, color: '#6b6459' },
});
```

## O que entregar

O template está em `docs/pratica-3.2-auditoria-lista.md`. **Não reescreva o arquivo inteiro** — o exercício é diagnosticar e priorizar, não digitar.

## Critérios de avaliação

| Critério | Peso | O que é "bom" |
|---|---|---|
| **Cobertura** | 30% | 8+ problemas reais; sem "problemas" que são só preferência de estilo |
| **Sintoma, não jargão** | 20% | Cada item diz o que o **usuário** vê, não só o que o código faz |
| **O problema arquitetural** | 20% | Identificou o aninhamento e explicou por que ele anula a virtualização |
| **Os ajustes de desempenho** | 15% | Defaults corretos e a percepção de que foram mexidos sem medir |
| **Priorização** | 15% | Ordem justificada por risco e retorno |

---

# Prática 3.3 — Auditoria de permissões em código alheio

**Nível:** ⭐⭐⭐ · **Tempo:** ~1h30 · **Entrega:** arquivo `docs/pratica-3.3-auditoria-permissoes.md`

## Contexto

Você entrou num time e recebeu esta tela para dar manutenção. Ela **funciona no aparelho de quem escreveu**, e é justamente por isso que ninguém percebeu os problemas.

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

interface Registro {
  id: string;
  nome: string;
  fotoUrl: string;
  lat: number;
  lon: number;
}

let jaPediuPermissao = false;

export default function TelaPasseio() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [passos, setPassos] = useState(0);
  const [erro, setErro] = useState('');

  async function iniciarPasseio() {
    if (!jaPediuPermissao) {
      await Location.requestForegroundPermissionsAsync();
      jaPediuPermissao = true;
    }

    const posicao = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest }, async (p) => {
      const endereco = await Location.reverseGeocodeAsync(p.coords);
      setErro('');
      setRegistros((antigos) => [
        ...antigos,
        {
          id: String(antigos.length),
          nome: endereco[0]?.street ?? 'sem rua',
          fotoUrl: 'https://picsum.photos/seed/passeio/600/400',
          lat: p.coords.latitude,
          lon: p.coords.longitude,
        },
      ]);
    });

    Accelerometer.setUpdateInterval(16);
    Accelerometer.addListener(({ x }) => {
      if (x > 1.5) setPassos((n) => n + 1);
    });

    if (!posicao) setErro('Erro ao obter localização');
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={iniciarPasseio} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Iniciar passeio</Text>
      </Pressable>

      <Text>Passos: {passos}</Text>
      {erro !== '' && <Text style={estilos.erro}>{erro}</Text>}

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Image source={{ uri: item.fotoUrl }} style={estilos.foto} resizeMode="cover" />
            <Text>
              {item.nome} — {item.lat}, {item.lon}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, gap: 12 },
  botao: { backgroundColor: '#f26522', padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700' },
  erro: { color: '#b00020' },
  card: { gap: 8, paddingVertical: 8 },
  foto: { width: '100%', height: 140 },
});
```

## O que entregar

O template está em `docs/pratica-3.3-auditoria-permissoes.md`. **Não é para consertar o código** — é para diagnosticar, priorizar e justificar.

## Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Cobertura** | 30% | Problemas de permissão, vazamentos, sensor errado e defeitos de imagem |
| **Sintoma antes da causa** | 20% | Cada problema começa pelo que **o usuário sente** |
| **Priorização justificada** | 20% | A ordem tem critério explícito e defensável |
| **Precisão técnica** | 20% | Correções corretas, nomes atuais das APIs |
| **O que não corrigir** | 10% | A seção 7 existe e tem justificativa real |

---

# Prática 3.4 — O comedouro nivelado *(opcional, bônus)*

**Nível:** ⭐⭐ · **Tempo:** 45 min

Comedouro torto derrama água e faz o pet comer numa postura ruim. Faça uma ferramenta de nível: o app mostra uma bolha que só fica **verde e centralizada** quando o telefone, apoiado sobre o comedouro, está perfeitamente plano.

- Use o **acelerômetro**, não o giroscópio. Saiba dizer por quê.
- A bolha se move com `x` e `y`; o `StyleSheet` e o Flexbox são os da Prática 2. **Sem animação.**
- Escolha o intervalo de atualização **conscientemente** e justifique em um comentário.
- Um botão liga, outro desliga.

**Critério:** funciona, não engasga, e o comentário sobre o intervalo mostra que você entendeu a troca entre suavidade e número de renderizações.

---

## Resumo de tempos

| Parte                                | Onde | Tempo   |
| ------------------------------------ | ---- | ------- |
| Prática 3.1 — Lista + registro       | Casa | 5–6 h   |
| Prática 3.2 — Auditoria de lista     | Casa | ~1 h    |
| Prática 3.3 — Auditoria de permissões| Casa | ~1h30   |
| Prática 3.4 — Comedouro *(opcional)* | Casa | ~45 min |
