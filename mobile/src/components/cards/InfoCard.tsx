import { View, Text } from "react-native";
import { Avatar, Card, useTheme } from "react-native-paper";

interface InfoCardProps {
  title: string;
  description?: string;
  icon: string;
  onPress?: () => void;
  iconColor?: string;
}

export function InfoCard({
  title,
  description,
  icon,
  onPress,
  iconColor,
}: InfoCardProps) {
  const theme = useTheme();

  const activeIconColor = iconColor || theme.colors.primary;
  return (
    <Card
      style={{ marginBottom: 12, backgroundColor: theme.colors.surface }}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: theme.colors.background,
            padding: 10,
            borderRadius: 50,
            marginRight: 16,
          }}
        >
          <Avatar.Icon
            size={32}
            icon={icon}
            color={activeIconColor}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{title}</Text>
          {description && <Text style={{color:'gray'}}> {description}</Text>}
        </View>
        <Avatar.Icon size={24} icon="chevron-right" color="#ccc" style={{ backgroundColor: 'transparent' }}/>
      </Card.Content>
    </Card>
  );
}
