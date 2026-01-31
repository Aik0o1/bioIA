import { layout, palette } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";

interface AnalysisLoadingProps {
  onCancel: () => void;
}

export function AnalysisLoading({ onCancel }: AnalysisLoadingProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start(); 
  }, []);

  return (
    // View para atuar como o container Overlay
    <View style={styles.overlayContainer}>
      
      {/*Card Branco que fica no centro */}
      <View style={styles.loadingCard}>
        <Animated.View
          style={[styles.loadingIcon, { transform: [{ scale: pulseAnim }] }]}
        >
          <MaterialCommunityIcons
            name="magnify-scan"
            size={40}
            color={palette.verdePrimary}
          />
        </Animated.View>
        <View style={styles.loadingText}>
          <Text style={styles.loadingTitle}>Analisando imagem...</Text>
          <Text style={styles.loadingSubtitle}>
            Nossa IA está cruzando dados da biodiversidade brasileira.
          </Text>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  // cria o efeito de Overlay
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Ocupa toda a tela
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Garante que fique acima de tudo
    padding: layout.spacing.md,
  },
  loadingCard: {
    backgroundColor: palette.branco,
    borderRadius: layout.radius.md,
    padding: layout.spacing.lg,
    alignItems: "center",
    gap: 16,
    width: '100%', // Largura do card
    maxWidth: 340,
    borderWidth: 1,
    borderColor: palette.verdePrimary + "0D",
    // Sombra para destacar o modal
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.verdePrimary + "1A",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { alignItems: "center" },
  loadingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textoEscuro,
    marginBottom: 4,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: palette.textoEscuro,
    opacity: 0.7,
    textAlign: "center",
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: palette.fundoClaro,
    borderRadius: layout.radius.full,
    marginTop: 8
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.textoEscuro,
    letterSpacing: 1,
  },
});