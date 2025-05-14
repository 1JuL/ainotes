import { useAuth } from "@/context/AuthContext";
import { auth } from "@/utils/firebase";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

export default function signup() {
  const router = useRouter();

  const { login } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (email !== confirmEmail) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Los correos electrónicos no coinciden.",
      });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await userCredential.user.reload();
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: `Bienvenido ${displayName}!`,
      });
      try {
        await login(email, password);
      } catch (error) {
        console.log({ error });
      }
      setTimeout(() => {
        router.replace("/welcome");
      }, 1500);
    } catch (error: any) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Ocurrió un error durante el proceso de registro.",
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
        <Text style={styles.title}>Signup</Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={displayName}
          onChangeText={setDisplayName}
        />

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
          placeholder="Confirm Email"
          placeholderTextColor="#999"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
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
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.buttonText}>Signup</Text>
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
    marginBottom: 45,
    color: "#000",
  },
  input: {
    width: 290,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
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
