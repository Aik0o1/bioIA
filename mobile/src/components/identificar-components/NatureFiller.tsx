import { palette } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

export function NatureFiller() {

    const floatAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
   
    // Cria um loop infinito: Sobe e Desce
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15, // Sobe 15 pixels
          duration: 2000, // Leva 2 segundos
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // Volta pro lugar
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, {transform: [{translateY: floatAnim}]}]}>
        <View style={styles.circleBg}>
          <MaterialCommunityIcons
            name="butterfly-outline"
            size={80}
            color={palette.verdePrimary}
          />
        </View>
        <MaterialCommunityIcons
          name="leaf"
          size={24}
          color={palette.terraAccent}
          style={styles.leaf1}
        />
        <MaterialCommunityIcons
          name="flower-tulip-outline"
          size={24}
          color={palette.terraAccent}
          style={styles.leaf2}
        />
      </Animated.View>
      <Text style={styles.title}>Explore a Natureza</Text>
      <Text style={styles.subtitle}>Aponte sua câmera para plantas, insetos ou animais e descubra o mundo ao seu redor.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent: "center",
        marginTop: 20,
        paddingHorizontal: 16,
        opacity: 0.9
    },

    imageContainer:{
        marginBottom: 18,
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },

    circleBg:{
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: palette.verdePrimary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: palette.verdePrimary +'30'
    },
    leaf1: {
        position:'absolute',
        top: 10,
        right: 20,
        transform: [{rotate: '15deg'}]

    },
    leaf2:{
        position: 'absolute',
        bottom: 20,
        left: 15,
        transform: [{rotate: '15deg'}]
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: palette.verdePrimary,
        marginBottom: 8,
        textAlign: 'center'

    },
    subtitle:{
        fontSize: 14,
        color: palette.textoEscuro,
        textAlign: 'center',
        opacity: 0.6,
        lineHeight: 22

    },
})
