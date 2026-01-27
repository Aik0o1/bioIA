import { View, Text, StyleSheet } from 'react-native';

export default function Identificar() {
  return (
    <View style={styles.container}>
      <Text>Tela Identificar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});