import { CustomHeader } from "@/src/components/Header";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { View, Text, StyleSheet } from "react-native";

export default function Identificar() {
  return (
    <ScreenWrapper>
      <CustomHeader title="Explorar Brasil" hideBackButton={false} rightIcon="alert-circle"/>
      <View style={styles.container}>
        <Text>Tela Mapa</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
