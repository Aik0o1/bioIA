import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette, layout } from "../../constants/theme";
import { ScreenWrapper } from "@/src/components/screen-wrapper/ScreenWrapper";
import { CustomHeader } from "@/src/components/header/CustomHeader";
import { ActionButtons } from "@/src/components/identificar-components/ActionButtons";
import { AnalysisLoading } from "@/src/components/identificar-components/AnalysisLoading";
import { SpeciesResult } from "@/src/components/identificar-components/SpeciesResult";
import * as ImagePicker from "expo-image-picker";

export default function Identificar() {
  const [status, setStatus] = useState<"input" | "loading" | "result">("input");
  const [selectImage, setSelectImage] = useState<string | null>(null);

  const handleSelectImage = async (source: "camera" | "gallery") => {
    try {
      let result;

      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      };

      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Permissão necessária",
            "Precisamos de permissão para acessar a câmera.",
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]){
        setSelectImage(result.assets[0].uri);
        setStatus('loading');

        setTimeout(()=>{
          setStatus('result');
        }, 3000);
      }
    } catch (error) {
      console.log("erro", error);
      Alert.alert("Erro", "Não foi possível carregar a imagem.");
    }
  };

  const mockResult = {
    name: "Onça-pintada",
    scientificName: "Panthera onca",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg",
    type: "Animal" as const,
    status: "Vulnerável (VU)",
    ecologicalRole:
      "Predador de topo de cadeia, essencial para o equilíbrio do ecossistema ao controlar populações de presas.",
    careInstructions:
      "Mantenha distância. Nunca dê as costas ou corra. Notifique as autoridades ambientais locais.",
    funFact:
      "A onça-pintada possui a mordida mais forte entre todos os felinos do mundo, capaz de perfurar até cascos de tartarugas.",
  };

  const handleReset = () => {
    setStatus("input");
  };

  return (
    <ScreenWrapper>
      <CustomHeader
        title="Identificar Espécie"
        rightIcon="information-outline"
        onRightPress={() => console.log("Info")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {status !== "result" ? (
          <View>
            <Text style={styles.instruction}>
              Selecione uma imagem para identificar a fauna ou flora brasileira.
            </Text>

            <ActionButtons
              onCameraPress={() => handleSelectImage("camera")}
              onGalleryPress={() => handleSelectImage("gallery")}
            />
          </View>
        ) : (
          /* Se FOR Resultado, mostramos apenas o resultado */
          <View>
            <View style={styles.resultHeader}>
              <View style={styles.resultIndicator} />
              <Text style={styles.resultTitle}>Resultado da IA</Text>
            </View>

            <SpeciesResult data={mockResult} />

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <MaterialCommunityIcons
                name="refresh"
                size={20}
                color={palette.verdePrimary}
              />
              <Text style={styles.resetButtonText}>Nova Identificação</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* O Loading fora do ScrollView e no final do código
          para sobrepor tudo*/}
      {status === "loading" && <AnalysisLoading onCancel={handleReset} />}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: layout.spacing.md,
    paddingBottom: 20,
  },
  instruction: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textoEscuro,
    marginTop: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
    lineHeight: 26,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: layout.spacing.md,
  },
  resultIndicator: {
    width: 4,
    height: 24,
    backgroundColor: palette.verdePrimary,
    borderRadius: 2,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.textoEscuro,
  },

  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: layout.radius.md,
    borderWidth: 1,
    borderColor: palette.verdePrimary,
    marginTop: 8,
    backgroundColor: palette.branco,
  },

  resetButtonText: {
    color: palette.verdePrimary,
    fontWeight: "700",
    fontSize: 16,
  },
});
