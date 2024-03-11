import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import LoginNavigation from "./LoginNavigation";
import LugaresNavigation from "./LugaresNavigation";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007bff", // Color del icono cuando está seleccionado
        tabBarInactiveTintColor: "#999", // Color del icono cuando no está seleccionado
        tabBarLabelStyle: { fontSize: 12 }, // Estilo de la etiqueta del ícono
        tabBarStyle: { backgroundColor: "#f8f9fa" }, // Estilo del fondo de la barra de pestañas
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginNavigation}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lugares"
        component={LugaresNavigation}
        options={{
          tabBarLabel: "Lugares",
          tabBarIcon: ({ color, size }) => (
            <Icon name="building" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
