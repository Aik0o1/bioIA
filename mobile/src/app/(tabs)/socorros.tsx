import { CustomHeader } from "@/src/components/header/CustomHeader";
import { ScreenWrapper } from "@/src/components/screen-wrapper/ScreenWrapper";
import { View, Text, StyleSheet } from "react-native";

export default function Identificar() {
  return (
    <ScreenWrapper>
      <CustomHeader
        title="Relações Ecológicas"
        hideBackButton={false}
        rightIcon="alert-circle"
      />
      <View style={styles.container}>
        <Text>Tela Socorros</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
