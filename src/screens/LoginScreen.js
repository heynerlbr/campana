import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../componentes/Buttons";
import { urlRest, CLIENT_ID, CLIENT_SECRET } from "../api/api";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
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
          // Realizar las operaciones necesarias con el perfil de usuario
          console.log("Perfil de usuario:", userProfile);
          // Navegar al screen de perfil de usuario y pasar la información del userProfile
          // navigation = useNavigation();
          navigation.navigate("Perfil", { userProfile });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            ¡Hola! ¡Bienvenido de nuevo! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            !Hola de nuevo, te hemos extrañado!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Ingresa email"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Contraseña
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Ingresa contraseña"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Recuérdame</Text>
        </View>

        <Button
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={handleSubmit}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            ¿No tengo una cuenta ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
