import { Tabs } from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { palette } from "../../constants/theme"; 

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,  // nao estamos utilizando devido o false
        headerStyle: {  
          backgroundColor: palette.fundoClaro,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderBottomColor: 'rgba(0,0,0,0.05)'
        },
        headerTitleStyle: {
          color: palette.textoEscuro,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: palette.verdePrimary,
        tabBarStyle: {
            backgroundColor: palette.branco,
            borderTopWidth: 0,
            elevation: 0,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="identificar"
        options={{
          title: "Identificar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="search-web" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="relacoes"
        options={{
          title: "Relações",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="molecule" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="socorros"
        options={{
          title: "Socorros",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}