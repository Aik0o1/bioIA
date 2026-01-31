import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { StatsGrid } from '../../components/home-components/StatsGrid';
import { layout, palette } from '../../constants/theme';
import { ScreenWrapper } from '@/src/components/screen-wrapper/ScreenWrapper';
import { CustomHeader } from '@/src/components/header/CustomHeader';
import { FeatureCard } from '@/src/components/cards/FeatureCard';
import { HeroBanner } from '@/src/components/home-components/HeroBanner';

export default function Home() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <CustomHeader 
        title="Bio AI" 
        hideBackButton={true}
        iconLeft="leaf"
        // rightIcon="account-circle-outline" 
        onRightPress={() => console.log('Perfil')}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <HeroBanner />
        <StatsGrid />

        <View style={{ paddingHorizontal: layout.spacing.md }}>
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            Nossos Módulos
          </Text>

          <FeatureCard
            icon="camera-iris"
            title="Identificação por IA"
            description="Identifique fauna e flora brasileiras em segundos."
            color={palette.verdePrimary}
            onPress={() => router.push('/identificar')}
          />

          <FeatureCard
            icon="map"
            title="Mapa da Biodiversidade"
            description="Visualize a distribuição geográfica de espécies."
            color={palette.aviso}
            onPress={() => router.push('/mapa')}
          />
          <FeatureCard
            icon="molecule"
            title="Relações Ecológicas"
            description="Entenda como as espécies interagem em seus biomas."
            color={palette.terraAccent}
            onPress={() => router.push('/relacoes')}
          />

          <FeatureCard
            icon="medical-bag"
            title="Primeiros Socorros"
            description="Entenda como as espécies interagem em seus biomas."
            color={palette.perigo}
            onPress={() => router.push('/socorros')}
          />

        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}