import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette, layout } from '../../constants/theme';


interface LocationDetailsSheetProps {
  data: MapLocation;
}

export function LocationDetailsSheet({ data }: LocationDetailsSheetProps) {

  const handleOpenMaps = (lat: number, long: number, label: string) => {
    // Abre o app de mapas nativo com rota
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = `${scheme}${lat},${long}?q=${lat},${long}(${label})`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.tagsRow}>
            {data.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <MaterialCommunityIcons name={tag.icon as any} size={14} color={palette.verdePrimary} />
                <Text style={styles.tagText}>{tag.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Ilustração do mapa do estado */}
        <MaterialCommunityIcons name="map-legend" size={48} color={palette.terraAccent} style={{opacity: 0.5}}/>
      </View>

      <Text style={styles.description}>{data.description}</Text>

      {/* Carrossel de Espécies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Espécies Nativas</Text>
            <TouchableOpacity>
                <Text style={styles.seeAll}>VER TUDO</Text>
            </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {data.species.map(species => (
            <View key={species.id} style={styles.speciesCard}>
              <Image source={{ uri: species.image }} style={styles.speciesImage} />
              <View style={styles.speciesOverlay}>
                 <Text style={styles.speciesName}>{species.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/*Unidades de Conservação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unidades de Conservação</Text>
        {data.conservationUnits.map(unit => (
          <View key={unit.id} style={styles.unitCard}>
            <View style={styles.unitIcon}>
               <MaterialCommunityIcons name="tree" size={24} color={palette.verdePrimary} />
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.unitName}>{unit.name}</Text>
                <Text style={styles.unitLocation}>{unit.location}</Text>
            </View>
            <TouchableOpacity 
                style={styles.visitButton}
                onPress={() => handleOpenMaps(unit.latitude, unit.longitude, unit.name)}
            >
                <Text style={styles.visitButtonText}>VISITAR</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

import { Platform } from 'react-native'; // Import necessário para o Linking
import { MapLocation } from '@/src/data/mocks/mapaData';

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.branco,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: layout.spacing.lg,
    paddingBottom: 40,
    // Sombra para mapa
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.textoEscuro,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.fundoClaro,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: palette.verdePrimary,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.textoEscuro,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.verdePrimary,
  },
  carousel: {
    marginHorizontal: -layout.spacing.lg, // Quebra o padding do pai
    paddingHorizontal: layout.spacing.lg,
  },
  speciesCard: {
    width: 120,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  speciesImage: {
    width: '100%',
    height: '100%',
  },
  speciesOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  speciesName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  unitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 8,
  },
  unitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.verdePrimary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitName: {
    fontWeight: '700',
    color: palette.textoEscuro,
    fontSize: 14,
  },
  unitLocation: {
    fontSize: 12,
    color: '#64748b',
  },
  visitButton: {
    backgroundColor: palette.verdePrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});