import { layout, palette } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface ActionButtonsProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export function ActionButtons({
  onCameraPress,
  onGalleryPress,
}: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onCameraPress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="camera"
          size={32}
          color={palette.branco}
        />
        <Text style={styles.primaryButtonText}>Tirar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.seconderyButton}
        onPress={onGalleryPress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="image"
          size={32}
          color={palette.verdePrimary}
        />
        <Text style={styles.secondaryButtonText}>Galeria</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: layout.spacing.lg,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: palette.verdePrimary,
    borderRadius: layout.radius.md,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: palette.verdePrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: palette.branco,
    fontSize: 14,
    fontWeight: "700",
  },
  seconderyButton: {
    flex: 1,
    backgroundColor: palette.branco,
    borderRadius: layout.radius.md,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: palette.verdePrimary + "1A",
  },
  secondaryButtonText: {
    color: palette.textoEscuro,
    fontSize: 14,
    fontWeight: "700",
  },
});
