import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function dashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <>
      <View>
        <Text>dashboard</Text>
        <Button title={"Index"} onPress={() => router.push("/")}></Button>
      </View>
      <View>
        <TouchableOpacity
          style={styles.lastButton}
          onPress={async () => {
            try {
              await logout();
              router.replace("/home");
            } catch (error) {
              console.error("Error al cerrar sesión:", error);
            }
          }}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="logout" size={20} color="#ED8C8C" style={styles.icon} />
            <Text style={styles.redText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lastButton: {
    marginBottom: 0,
    width: "100%",
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "flex-start",
  },
  redText: {
    color: "#ED8C8C",
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
});
