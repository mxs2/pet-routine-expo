// ============================================================
// Prática 3 — Tela de registro de passeio (sensores)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Captura o CONTEXTO do passeio: onde aconteceu (GPS) e como ele
// se parecia (câmera). Navegação por condicional com useState —
// navegação real chega na Aula 7.
//
// CONTRATO DE TRÊS TEMPOS — preencha em cada bloco de sensor:
//   1. PEDIR   → ______________________________
//   2. LER     → ______________________________
//   3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
//
// Restrições:
//   • Sem useEffect, useRef — apenas useState + hooks das bibliotecas
//   • Sem navegação — a tela aparece por condicional em App.tsx
//   • Sem mapa — coordenada é texto
//   • Sem salvar na galeria e sem escolher do rolo
//   • Sem rede — foto vive no cache
// ============================================================
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

import type { Pet } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';

type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: Pet['local'], fotoUri?: string) => void;
  onCancelar: () => void;
};

export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const [local, setLocal] = useState<Pet['local'] | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [mostrarCamera, setMostrarCamera] = useState(false);

  // TODO P3.16: hook de permissão de câmera (das libs, não do React):
  //   const [permissaoCamera, pedirPermissaoCamera] = useCameraPermissions();

  // TODO P3.17: ref da câmera via useState (useRef não está disponível nesta prática).
  //   const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  //   Funciona como callback ref: <CameraView ref={setCameraRef} ... />

  // ----- Localização -----
  // CONTRATO: 1. PEDIR → TODO P3.18
  //           2. LER   → TODO P3.18
  //           3. PARAR → não se aplica (leitura única, sem subscription)
  async function obterLocalizacao() {
    // TODO P3.18: peça permissão e leia a posição.
    //
    //   1. Cheque se o serviço está ligado:
    //      const servico = await Location.hasServicesEnabledAsync();
    //      if (!servico) → setErro('GPS desligado. Ative a localização nas configurações.')
    //
    //   2. Peça permissão:
    //      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    //      Trate TRÊS cenários com mensagens DISTINTAS:
    //        • status !== 'granted' && canAskAgain  → "Permissão negada. Toque para tentar de novo."
    //        • status !== 'granted' && !canAskAgain → "Permissão bloqueada. Vá em Configurações > Permissões."
    //        • serviço desligado (já tratado acima)
    //
    //   3. Leia a posição:
    //      const posicao = await Location.getCurrentPositionAsync({
    //        accuracy: Location.Accuracy.High,
    //        // TODO P3.22: justifique a escolha de Accuracy no README.
    //        //   Por que High e não BestForNavigation? Pense em bateria.
    //      });
    //
    //   4. Salve no estado:
    //      setLocal({
    //        latitude: posicao.coords.latitude,
    //        longitude: posicao.coords.longitude,
    //        precisaoMetros: posicao.coords.accuracy ?? 0,
    //      });
    //      setErro('');
  }

  // ----- Câmera -----
  // CONTRATO: 1. PEDIR → pedirPermissaoCamera()
  //           2. LER   → cameraRef.takePictureAsync()
  //           3. PARAR → setMostrarCamera(false) (fecha a view)
  async function abrirCamera() {
    // TODO P3.19: peça permissão de câmera e abra a view.
    //   const { status } = await pedirPermissaoCamera();
    //   if (status !== 'granted') {
    //     setErro('Permissão de câmera negada.');
    //     return;
    //   }
    //   setMostrarCamera(true);
    //   setErro('');
  }

  async function tirarFoto() {
    // TODO P3.20: tire a foto e guarde o URI.
    //   if (!cameraRef) return;
    //   const foto = await cameraRef.takePictureAsync({ base64: false });
    //   if (foto) {
    //     setFotoUri(foto.uri);
    //     setMostrarCamera(false);
    //   }
    //   Nota: base64: false — para exibir, o uri basta.
    //   Salvar na galeria não é assunto desta prática.
  }

  function salvar() {
    // TODO P3.23: chame onSalvar com os dados capturados.
    //   onSalvar(local ?? undefined, fotoUri ?? undefined);
    //
    // TODO P3.24: o app funciona MESMO quando o usuário nega tudo.
    //   Um pet sem foto e sem local ainda é um pet.
    //   O botão Salvar fica habilitado SEMPRE.
  }

  // ----- Renderização: câmera ativa -----
  if (mostrarCamera) {
    return (
      <View style={styles.tela}>
        {/* TODO P3.17 (continuação): renderize a CameraView.
              <CameraView
                ref={setCameraRef}
                style={styles.camera}
                facing="back"
              />
              Dois botões: "Tirar foto" (chama tirarFoto) e "Cancelar" (fecha a câmera). */}
      </View>
    );
  }

  // ----- Renderização: tela principal de registro -----
  return (
    <View style={styles.tela}>
      <Text style={tipografia.titulo}>Registrar passeio de {pet.nome}</Text>

      {/* TODO P3.21: mostre o erro com mensagem DISTINTA por cenário.
            Os cinco cenários que precisam de mensagem própria:
              1. Permissão de localização negada (canAskAgain: true)
              2. Permissão de localização bloqueada (canAskAgain: false)
              3. Serviço de localização desligado
              4. Permissão de câmera negada
              5. Sensor/hardware indisponível
            Cada mensagem diz ao usuário O QUE FAZER, não só que deu erro. */}
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {/* Localização */}
      {local ? (
        <View style={styles.secao}>
          <Text style={tipografia.corpo}>
            {/* Formate lat/lng para HUMANOS, com precisão.
                Ex: "Local: -8.054, -34.871 (±12m)"
                Coordenada crua com 14 casas decimais não é informação. */}
            Local: {local.latitude.toFixed(3)}, {local.longitude.toFixed(3)} (±{Math.round(local.precisaoMetros)}m)
          </Text>
        </View>
      ) : (
        <Pressable onPress={obterLocalizacao} style={styles.botaoAcao}>
          <Text style={styles.textoBotao}>Obter localização</Text>
        </Pressable>
      )}

      {/* Foto */}
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={styles.previa}
          // TODO P3.15: contentFit explícito. Por que "cover" e não "contain"?
          //   Justifique num comentário ou no README.
          contentFit="cover"
        />
      ) : (
        <Pressable onPress={abrirCamera} style={styles.botaoAcao}>
          <Text style={styles.textoBotao}>Tirar foto</Text>
        </Pressable>
      )}

      {/* Ações */}
      <View style={styles.acoes}>
        <Pressable onPress={salvar} style={styles.botaoAcao}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
        <Pressable onPress={onCancelar} style={styles.botaoCancelar}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: espaco.md,
    paddingTop: 48,
    backgroundColor: cores.fundo,
    gap: espaco.md,
  },
  erro: { ...tipografia.corpo, color: cores.erro },
  secao: { gap: espaco.sm },
  camera: { flex: 1, borderRadius: espaco.sm },
  previa: { width: '100%', height: 200, borderRadius: espaco.sm },
  botaoAcao: {
    backgroundColor: cores.primaria,
    padding: espaco.md,
    borderRadius: espaco.sm,
    alignItems: 'center' as const,
  },
  botaoCancelar: {
    backgroundColor: cores.textoFraco,
    padding: espaco.md,
    borderRadius: espaco.sm,
    alignItems: 'center' as const,
    flex: 1,
  },
  textoBotao: { color: '#FFFFFF', fontWeight: 'bold' as const },
  acoes: { flexDirection: 'row' as const, gap: espaco.md },
});
