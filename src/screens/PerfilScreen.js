import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar } from "react-native-elements";

const Perfil = ({ route }) => {
  const { userProfile } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/imagenes/background.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={require("../images/acecard.png")}
            size="xlarge"
          />
        </View>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.text}>{userProfile.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userProfile.email}</Text>
        {/* Mostrar más información del perfil de usuario */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
});

export default Perfil;
