import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <View style={styles.screen}>
        {/* Center card */}
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/will.png")}
            style={styles.avatar}
            resizeMode="contain"
          />

          <Text style={styles.title}>Hi! My name is Will</Text>

          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FEF3D9", // cream
    alignItems: "center",
  },
  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FEF6E8", // cream background
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 40,
    alignItems: "center",
  },
  avatar: {
    width: 402,
    height: 402,
    marginBottom: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 100,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#F4AB9C", // dusty pink
    width: 291,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginBottom: 35,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    alignSelf: "center",
  },
  signupButton: {
    backgroundColor: "#FFEAA4", // pastel yellow
    width: 291,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    alignSelf: "center",
  },
});
