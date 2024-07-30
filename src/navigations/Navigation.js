import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../context/AuthContext";
import LoginNavigation from "./LoginNavigation";
import LugaresNavigation from "./LugaresNavigation";
import MyReservasNavigation from "./MyReservasNavigation";
import UserProfileScreen from "../screens/PerfilScreen";

import { INFO_CLIENTE, obtenerPerfilUsuario } from "../api/api";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // // useEffect(() => {
  // //   // Verificar si el usuario está logueado al principio
  // //   setIsUserLoggedIn(INFO_CLIENTE.length > 0);
  // // }, []);

  // // useEffect(() => {
  // //   // Verificar si el usuario está logueado
  // //   setIsUserLoggedIn(obtenerPerfilUsuario);
  // // }, []);

  // useEffect(() => {
  //   // Verificar si el usuario está logueado al principio y cada vez que cambia el estado
  //   const userLoggedIn = obtenerPerfilUsuario();
  //   console.log(userLoggedIn);
  //   setIsUserLoggedIn(userLoggedIn !== null && userLoggedIn !== undefined);
  // }, []);
  const { isAuthenticated } = useAuth();

  console.log("soy yo ", isAuthenticated);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007bff", // Color del icono cuando está seleccionado
        tabBarInactiveTintColor: "#999", // Color del icono cuando no está seleccionado
        tabBarLabelStyle: { fontSize: 12 }, // Estilo de la etiqueta del ícono
        tabBarStyle: { backgroundColor: "#f8f9fa" }, // Estilo del fondo de la barra de pestañas
      }}
    >
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Perfil"
            component={UserProfileScreen}
            options={{
              tabBarLabel: "Perfil",
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
          <Tab.Screen
            name="Mis reservas"
            component={MyReservasNavigation}
            options={{
              tabBarLabel: "Mis reservas",
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart" size={size} color={color} />
              ),
            }}
          />
        </>
      ) : (
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
      )}
    </Tab.Navigator>
  );
};

export default Navigation;
