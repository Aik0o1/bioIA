import React from 'react';
import { View, StyleSheet } from 'react-native';
import { layout, palette } from '../../constants/theme';
import { StatCard } from '../cards/StatCard';

export function StatsGrid() {
  return (
    <View style={styles.container}>
      <StatCard label="ESTADOS" value="26+DF" color={palette.terraAccent} />
      <StatCard label="ESPÉCIES" value="12.5k" color={palette.verdePrimary} />
      <StatCard label="PRECISÃO" value="98%" color={palette.verdePrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    marginBottom: layout.spacing.lg,
  }
});