import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { layout, palette } from '../../constants/theme';

export function HeroBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.banner}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.label}>NOSSA MISSÃO</Text>
          <Text style={styles.title}>Explorando a Biodiversidade</Text>
          <Text style={styles.subtitle}>
            Tecnologia a favor da fauna e flora brasileira.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
  },
  banner: {
    height: 180,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: layout.radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cobre toda a imagem
    backgroundColor: 'rgba(0,0,0,0.4)', // Escurece para ler o texto
    borderRadius: layout.radius.lg,
    padding: layout.spacing.md,
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: palette.branco,
    opacity: 0.9,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.branco,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: palette.branco,
    opacity: 0.9,
  }
});