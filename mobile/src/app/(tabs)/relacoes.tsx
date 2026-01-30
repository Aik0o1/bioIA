import { CustomHeader } from "@/src/components/header/CustomHeader";
import { ScreenWrapper } from "@/src/components/screen-wrapper/ScreenWrapper";
import { View, Text, StyleSheet } from "react-native";

export default function Identificar() {
  return (
    <ScreenWrapper>
      <CustomHeader title="Relações Ecológicas" hideBackButton={false} rightIcon="dots-horizontal"/>
      <View style={styles.container}>
        <Text>Tela Relações</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
