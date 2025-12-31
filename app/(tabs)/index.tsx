import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";

export default function App() {
  const [folio, setFolio] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ingrese folio</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa el número de folio"
          keyboardType="numeric"
          value={folio}
          onChangeText={setFolio}
        />

        {folio.length > 0 && (
          <View style={styles.qrContainer}>
            <QRCode value={folio} size={200} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 30,
  },
  qrContainer: {
    marginTop: 20,
  },
});
