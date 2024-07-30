import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const WelcomeScreen = ({ navigation }) => {
  const buttonPositionY = useSharedValue(0); // Posición inicial del botón

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(buttonPositionY.value, config) },
        {
          scale: interpolate(
            buttonPositionY.value,
            [0, -100],
            [1, 0.9],
            Extrapolate.CLAMP
          ),
        }, // Agregar escala al botón
      ],
    };
  });

  React.useEffect(() => {
    // Anima el botón hasta el centro de la pantalla
    buttonPositionY.value = -100; // Puedes ajustar el valor según sea necesario
  }, []); // Se ejecuta una vez al montar el componente

  const handleLoginPress = () => {
    navigation.navigate("LoginForm");
  };

  return (
    <ImageBackground
      source={require("../../assets/imagenes/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Bienvenido a StarBell</Text>
          <Text style={styles.subtitle}>Explora y disfruta</Text>
        </View>
        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 150, // Ajusta las dimensiones de la imagen según sea necesario
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Cambio del color del sombreado
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Cambio del color del sombreado
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
