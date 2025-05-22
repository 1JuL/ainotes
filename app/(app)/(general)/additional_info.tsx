import { useAuth } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdditionalInfo() {
  const { user } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [carrera, setCarrera] = useState("");
  const [horario, setHorario] = useState("");
  const [metodo, setMetodo] = useState("");
  const [temasInteres, setTemasInteres] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined photo URLs
  const photoOptions = [
    "https://example.com/photo1.png",
    "https://example.com/photo2.png",
    "https://example.com/photo3.png",
    "https://example.com/photo4.png",
  ];

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || "");
      setPhotoUrl(photoOptions[0]);
    }
  }, [user]);

  const changeScreen = () => {
    router.replace("/dashboard");
  };

  const handleSubmit = async () => {
    if (!user) return;
    const body = {
      uid: user.uid,
      username,
      photoUrl,
      ...(carrera.trim() && { carrera }),
      ...(horario && { preferenciasEstudio: { horario } }),
    };

    try {
      setLoading(true);
      const response = await fetch("https://tu-api.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Error al guardar información");
      Alert.alert("Éxito", "Información guardada correctamente.");
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Información Adicional</Text>

      {/* Username read-only */}
      <TextInput
        style={[styles.input, { backgroundColor: "#eee" }]}
        value={username}
        editable={false}
      />

      {/* Photo selection */}
      <Text style={styles.sectionLabel}>Selecciona tu avatar</Text>
      <View style={styles.photoContainer}>
        {photoOptions.map((url) => (
          <TouchableOpacity key={url} onPress={() => setPhotoUrl(url)}>
            <Image
              source={{ uri: url }}
              style={[styles.photoOption, photoUrl === url && styles.photoSelected]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Carrera */}
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        placeholderTextColor="#999"
        value={carrera}
        onChangeText={setCarrera}
      />

      {/* Horario picker */}
      <Text style={styles.sectionLabel}>Horario de estudio</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={horario}
          onValueChange={(value: React.SetStateAction<string>) => setHorario(value)}
          style={styles.picker}
        >
          <Picker.Item label="Mañana" value="mañana" />
          <Picker.Item label="Tarde" value="tarde" />
          <Picker.Item label="Noche" value="noche" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Método (ej. visual)"
        placeholderTextColor="#999"
        value={metodo}
        onChangeText={setMetodo}
      />

      <TextInput
        style={styles.input}
        placeholder="Temas de interés (separados por coma)"
        placeholderTextColor="#999"
        value={temasInteres}
        onChangeText={setTemasInteres}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={changeScreen}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Guardando..." : "Guardar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#FEF3D9",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    width: 290,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#000",
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 290,
    marginBottom: 15,
  },
  photoOption: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  photoSelected: {
    borderColor: "#F4AB9C",
  },
  pickerWrapper: {
    width: 290,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  button: {
    marginTop: 10,
    width: 290,
    height: 50,
    backgroundColor: "#F4AB9C",
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
