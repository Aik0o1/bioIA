import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { layout } from '../../constants/theme';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress: () => void;
}

export function FeatureCard({ title, description, icon, color, onPress }: FeatureCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { borderColor: theme.colors.primary + '33', backgroundColor: theme.colors.surface }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '1A' }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>

      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.description}>
          {description}
        </Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.outline} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.md,
    borderRadius: layout.radius.lg,
    borderWidth: 1,
    marginBottom: layout.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: layout.spacing.md,
  },
  content: {
    flex: 1,
    marginRight: layout.spacing.sm,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: 'gray',
    lineHeight: 16,
  }
});