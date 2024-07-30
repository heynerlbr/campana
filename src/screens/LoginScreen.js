import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../componentes/Buttons";
import COLORS from "../constants/colors";
import {
  urlRest,
  CLIENT_ID,
  CLIENT_SECRET,
  INFO_CLIENTE,
  guardarPerfilUsuario,
} from "../api/api";
import { useAuth } from "../context/AuthContext";
const Login = ({ navigation }) => {
  const { loginF } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formVisible, setFormVisible] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      setFormVisible(true);
    }
  };

  const testApiConnection = () => {
    fetch("http://10.0.2.2:8000/api/test-api-connection")
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Aquí puedes manejar la respuesta como desees
      })
      .catch((error) => {
        console.error("Error al conectar con la API:", error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      });
  };

  const handleSubmit = () => {
    // testApiConnection();
    console.log("Iniciar sesión:", username, password);

    let urlapi = urlRest + "api/LoginMovil";
    console.log(urlapi);
    // Realizar la solicitud a la API para validar el usuario
    fetch(urlapi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-ID": CLIENT_ID, // Enviar el ID de cliente como encabezado
        "X-Client-Secret": CLIENT_SECRET, // Enviar el secreto de cliente como encabezado
      },
      body: JSON.stringify({ email: username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          // Usuario autenticado correctamente
          const token = data.access_token;
          // Realizar las operaciones necesarias con el token de acceso
          console.log("Token de acceso:", token);
          fetchUserProfile(token);

          // ...
        } else {
          // Error de autenticación
          console.log("Error de autenticación:", data.msg);
        }
      })
      .catch((error) => {
        console.log("Error al conectar con la API:", error);
      });
  };

  const fetchUserProfile = (token) => {
    fetch(urlRest + "api/ProfileMovil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-ID": CLIENT_ID, // Enviar el ID de cliente como encabezado
        "X-Client-Secret": CLIENT_SECRET, // Enviar el secreto de cliente como encabezado
        Authorization: `Bearer ${token}`, // Incluir el token de acceso en el encabezado de autorización
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // Perfil de usuario obtenido correctamente
          const userProfile = data.data;

          INFO_CLIENTE.push(userProfile);

          // Realizar las operaciones necesarias con el perfil de usuario
          console.log("Perfil de usuario:", userProfile);
          // Navegar al screen de perfil de usuario y pasar la información del userProfile
          // navigation = useNavigation();
          // navigation.navigate("Perfil", { userProfile });
          guardarPerfilUsuario(userProfile);
          loginF();
          navigation.navigate("Perfil");

          // ...
        } else {
          // Error al obtener el perfil de usuario
          console.log("Error al obtener el perfil de usuario:", data.msg);
        }
      })
      .catch((error) => {
        console.log("Error al conectar con la API:", error);
      });
  };

  useEffect(() => {
    setFormVisible(true);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/imagenes/background.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>¡Hola! ¡Bienvenido de nuevo! 👋</Text>
          <Text style={styles.subheading}>
            ¡Hola de nuevo, te hemos extrañado!
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Ingresa tu email"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={styles.toggleButton}
              >
                <Ionicons
                  name={isPasswordShown ? "eye-off" : "eye"}
                  size={24}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text style={styles.checkboxLabel}>Recuérdame</Text>
          </View>

          <Button
            title="Login"
            filled
            onPress={handleSubmit}
            style={styles.loginButton}
          />

          <View style={styles.divider} />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿No tengo una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={[styles.signupText, styles.signupLink]}>
                Registro
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
  input: {
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
  },
  toggleButton: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  loginButton: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginVertical: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 16,
    color: COLORS.black,
  },
  signupLink: {
    fontWeight: "bold",
    marginLeft: 5,
    color: COLORS.primary,
  },
});

export default Login;
