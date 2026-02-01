import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette, layout } from "../../constants/theme";
import { ScreenWrapper } from "@/src/components/screen-wrapper/ScreenWrapper";
import { CustomHeader } from "@/src/components/header/CustomHeader";
import { ActionButtons } from "@/src/components/identificar-components/ActionButtons";
import { AnalysisLoading } from "@/src/components/identificar-components/AnalysisLoading";
import { SpeciesResult } from "@/src/components/identificar-components/SpeciesResult";
import { useIdentification } from "@/src/hooks/useIdentification";

export default function Identificar() {
  const {
    status,
    resultData,
    handleSelectImage,
    handleReset

  } = useIdentification();

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

            <SpeciesResult data={resultData} />

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
