import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette, layout } from "../../constants/theme";


interface SpeciesData {
  name: string;
  scientificName: string;
  imageUrl: string;
  type: "Animal" | "Planta" | "Fungo";
  status: string; // ex: Vulnerável
  ecologicalRole: string;
  careInstructions: string;
  funFact: string;
}

interface SpeciesResultProps {
  data: SpeciesData;
}

export function SpeciesResult({ data }: SpeciesResultProps) {
  return (
    <View style={styles.resultCard}>
      {/* Imagem e Badges */}
      <ImageBackground
        source={{ uri: data.imageUrl }}
        style={styles.resultImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.badges}>
          <View style={styles.badge}>
            <MaterialCommunityIcons
              name="paw"
              size={12}
              color={palette.verdePrimary}
            />
            <Text style={styles.badgeText}>{data.type}</Text>
          </View>
          <View style={[styles.badge, styles.warningBadge]}>
            <MaterialCommunityIcons
              name="alert"
              size={12}
              color={palette.branco}
            />
            <Text style={styles.warningBadgeText}>{data.status}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.resultContent}>
        {/* Cabeçalho */}
        <View style={styles.speciesInfo}>
          <Text style={styles.speciesName}>{data.name}</Text>
          <Text style={styles.speciesScientific}>{data.scientificName}</Text>
        </View>

        {/* Info Blocks */}
        <InfoBlock
          label="PAPEL ECOLÓGICO"
          text={data.ecologicalRole}
          color={palette.verdePrimary}
          bg={palette.fundoClaro}
        />
        <InfoBlock
          label="ENCONTRO & CUIDADOS"
          text={data.careInstructions}
          color={palette.perigo}
          bg="#fef2f2"
          border
        />

        {/* Curiosidade */}
        <View style={styles.funFactCard}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={16}
            color={palette.terraAccent}
            style={styles.funFactIcon}
          />
          <Text style={styles.funFactLabel}>Você sabia?</Text>
          <Text style={styles.funFactText}>{data.funFact}</Text>
        </View>
      </View>
    </View>
  );
}

// Subcomponente interno para evitar repetição
const InfoBlock = ({ label, text, color, bg, border = false }: any) => (
  <View
    style={[
      styles.infoCard,
      { backgroundColor: bg },
      border && { borderLeftWidth: 4, borderLeftColor: color },
    ]}
  >
    <Text style={[styles.infoCardLabel, { color }]}>{label}</Text>
    <Text style={styles.infoCardText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: palette.branco,
    borderRadius: layout.radius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: layout.spacing.md,
  },
  resultImage: { height: 224 },
  badges: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: palette.branco + "E6",
    borderRadius: layout.radius.full,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: palette.verdePrimary },
  warningBadge: { backgroundColor: "#f97316" },
  warningBadgeText: { fontSize: 12, fontWeight: "700", color: palette.branco },
  resultContent: { padding: 20 },
  speciesInfo: { marginBottom: layout.spacing.md },
  speciesName: {
    fontSize: 24,
    fontWeight: "900",
    color: palette.verdePrimary,
    marginBottom: 4,
  },
  speciesScientific: {
    fontSize: 14,
    fontStyle: "italic",
    color: palette.textoEscuro,
    opacity: 0.6,
  },
  infoCard: {
    borderRadius: layout.radius.sm,
    padding: 12,
    marginBottom: layout.spacing.md,
  },
  infoCardLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  infoCardText: { fontSize: 14, color: palette.textoEscuro, lineHeight: 21 },
  funFactCard: {
    backgroundColor: palette.terraAccent + "1A",
    borderRadius: layout.radius.md,
    borderWidth: 1,
    borderColor: palette.terraAccent + "33",
    padding: 16,
    position: "relative",
    overflow: "hidden",
  },
  funFactIcon: {
    position: "absolute",
    right: -8,
    bottom: -8,
    opacity: 0.1,
    transform: [{ rotate: "12deg" }],
  },
  funFactLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.terraAccent,
    marginBottom: 4,
  },
  funFactText: {
    fontSize: 14,
    fontStyle: "italic",
    color: palette.textoEscuro,
    lineHeight: 20,
  },
});
