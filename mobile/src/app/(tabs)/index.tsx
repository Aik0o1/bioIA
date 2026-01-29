import { CustomHeader } from "@/src/components/Header";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import React from "react";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <ScreenWrapper>
      <CustomHeader title="Bio IA" hideBackButton={true} iconLeft="sprout"/>
      <View>
        <Text>Olá, Rocketseat!</Text>
      </View>
    </ScreenWrapper>
  );
}
