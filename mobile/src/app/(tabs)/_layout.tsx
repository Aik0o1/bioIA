import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from '@expo/vector-icons/Foundation';
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00b28f",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="identificar"
        options={{
          title: "Identificar",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="relacoes"
        options={{
          title: "Relações",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="envira" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="socorros"
        options={{
          title: "Socorros",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="first-aid" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// const style = StyleSheet.create({
//   icons: {
//     color:"#00b28f",
//   }
// })
