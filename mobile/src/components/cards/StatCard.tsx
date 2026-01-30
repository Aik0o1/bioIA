import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { layout } from '../../constants/theme';

interface StatCardProps {
    label: string;
    value: string;
    color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
    const theme = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: color + '40' }]}>
            <Text style={[styles.label, { color }]}>{label}</Text>
            <Text variant="headlineSmall" style={styles.value}>{value}</Text>
            {/* Barrinha */}
            <View style={{ height: 4, width: 24, backgroundColor: color, borderRadius: 2, opacity: 0.5 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: layout.spacing.sm,
        borderRadius: layout.radius.md,
        borderWidth: 1,
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 18,
    }
});