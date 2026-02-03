import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMapExplore } from '../../hooks/useMapExplore';
import { palette, layout } from '../../constants/theme';
import { ScreenWrapper } from '@/src/components/screen-wrapper/ScreenWrapper';
import { CustomHeader } from '@/src/components/header/CustomHeader';
import { LeafletMap } from '@/src/components/map/LeafletMap';
import { LocationDetailsSheet } from '@/src/components/map/LocationDetailsSheets';

export default function Mapa() {
  const { 
    selectedLocation, 
    locations, 
    searchText,
    handleSelectLocationId, 
    handleSearch,
    handleClearSelection 
  } = useMapExplore();

  return (
    <ScreenWrapper usePaddingBottom={false} usePaddingTop={false}>
      <View style={{ zIndex: 10 }}> 
          <CustomHeader title="Explorar Brasil" hideBackButton={true} iconLeft="leaf" />
      </View>

      <View style={styles.container}>
        
        {/* MAPA LEAFLET */}
        <LeafletMap 
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocationId}
            onMapClick={() => {
                Keyboard.dismiss();
                handleClearSelection();
            }}
        />

        {/* BARRA DE BUSCA */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={24} color={palette.verdePrimary} />
            <TextInput 
                placeholder="Procurar estado ou bioma"
                style={styles.searchInput}
                value={searchText}
                onChangeText={handleSearch}
            />
            {selectedLocation && (
                <TouchableOpacity onPress={handleClearSelection}>
                    <MaterialCommunityIcons name="close" size={20} color="#999" />
                </TouchableOpacity>
            )}
          </View>
        </View>

        {/* CARD DE DETALHES */}
        {selectedLocation && (
            <View style={styles.bottomSheetContainer}>
                <LocationDetailsSheet data={selectedLocation} />
            </View>
        )}

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchContainer: {
    position: 'absolute',
    top: 16,
    left: layout.spacing.md,
    right: layout.spacing.md,
    zIndex: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.branco,
    borderRadius: layout.radius.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: palette.textoEscuro,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '60%', 
  }
});