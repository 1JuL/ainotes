import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function login() {
  const router = useRouter();

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const firebaseUser = await login(email, password);
      const name = firebaseUser.displayName;
      await login(email, password);
      Toast.show({
        type: "success",
        text1: "Inicio de sesión exitoso",
        text2: `Bienvenido de nuevo ${name}!`,
      });
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "Error al iniciar sesión",
        text2: error.message || "Ocurrió un error durante el inicio de sesión.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Mascot */}
        <Image
          source={require("@/assets/images/will.png")}
          style={styles.avatar}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Login</Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FEF3D9",
  },
  avatar: {
    width: 402,
    height: 402,
    marginBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 25,
    color: "#000",
  },
  input: {
    width: 290,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    marginTop: 10,
    width: 290,
    height: 50,
    backgroundColor: "#F4AB9C", // dusty pink
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
