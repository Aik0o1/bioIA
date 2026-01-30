import { CustomHeader } from "@/src/components/header/CustomHeader";
import { ScreenWrapper } from "@/src/components/screen-wrapper/ScreenWrapper";
import { View, Text, StyleSheet } from "react-native";

export default function Identificar() {
  return (
    <ScreenWrapper>
      <CustomHeader title="Identificar Espécie" hideBackButton={false} rightIcon="alert-circle"/>
      <View style={styles.container}>
        <Text>Tela Identificar</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
