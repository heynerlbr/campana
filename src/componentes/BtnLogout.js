import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { INFO_CLIENTE, eliminarPerfilUsuario } from "../api/api";
import { useAuth } from "../context/AuthContext";
const CerrarSesion = () => {
  const { logoutF } = useAuth();
  const navigation = useNavigation();
  const cerrarSesion = () => {
    // Eliminar la información de la sesión actual (tokens, información del perfil, etc.)
    // Por ejemplo, puedes limpiar AsyncStorage, eliminar cookies, etc.

    // Redirigir al usuario a la pantalla de inicio de sesión
    eliminarPerfilUsuario();
    logoutF();
    INFO_CLIENTE.length = 0; // Limpiar el array existente
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <Text>¿Estás seguro de que deseas cerrar sesión?</Text>
      <Button title="Cerrar sesión" onPress={cerrarSesion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CerrarSesion;
