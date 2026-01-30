import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { StatusBar } from "expo-status-bar"; 
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  bgColor?: string;
  usePaddingTop?: boolean;
  usePaddingBottom?: boolean;
}

export function ScreenWrapper({
  children,
  style,
  bgColor,
  usePaddingTop = true,
  usePaddingBottom = false,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  // Se não passar cor, usa o background do tema
  const containerBackgroundColor = bgColor || theme.colors.background;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: containerBackgroundColor,
          paddingTop: usePaddingTop ? insets.top : 0,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: usePaddingBottom ? insets.bottom : 0,
        },
        style,
      ]}
    >
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});