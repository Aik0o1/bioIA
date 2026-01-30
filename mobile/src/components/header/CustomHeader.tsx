import React from "react";
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

interface CustomHeaderProps {
  title: string;
  hideBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  iconLeft?: string;
  onIconLeftPress?: () => void; // Caso ícone da esquerda faça algo
}

export function CustomHeader({
  title,
  hideBackButton = false,
  rightIcon,
  onRightPress,
  iconLeft,
  onIconLeftPress,
}: CustomHeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  const ICON_SIZE = 48;

  return (
    <Appbar.Header
      elevated={false}
      style={{ backgroundColor: theme.colors.background }}
    >
      {iconLeft ? (
        //ícone personalizado
        <Appbar.Action
          icon={iconLeft}
          onPress={onIconLeftPress} // pode ser null
          color={theme.colors.primary}
          size={32}
        />
      ) : !hideBackButton ? (
        <Appbar.BackAction color={theme.colors.primary} onPress={() => router.back()} />
      ) : (
        // Se não tiver nada, mantém o espaço reservado para alinhar o centro
        <View style={{ width: ICON_SIZE }} />
      )}

      <Appbar.Content
        title={title}
        titleStyle={{ fontWeight: "bold" }}
        style={{ alignItems: "center" }}
      />

      {rightIcon ? (
        <Appbar.Action
          icon={rightIcon}
          onPress={onRightPress}
          color={theme.colors.primary}
        />
      ) : (
        // espaço vazio para a esquerda
        <View style={{ width: ICON_SIZE }} />
      )}
    </Appbar.Header>
  );
}
