import { ObtenerQR } from "@/Services/service";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

type data = {
  folio: string,
  password: string
}

export default function App() {
  const [folio, setFolio] = useState<string>("");
  const [respuestaQR, setRespuestaQR] = useState<any>(null)

  const handleQr = async () => {


    try {
      const response = await ObtenerQR({
        folio: folio,
        password: "0x22F3774B51FE7625BDAA1724CB2C4572D8FEAB3D4C7671702F852F55EF69BF15"
      } as any)



      setRespuestaQR(response)



    }
    catch (error: any) {
      Alert.alert("Error", error);
    }
  }




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
        <View>

          <TouchableOpacity onPress={handleQr} style={{ borderRadius: 10, width: 350, height: 50, backgroundColor: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Buscar folio</Text>
          </TouchableOpacity>
        </View>

        {respuestaQR !== null && (
          <View style={styles.qrContainer}>
            {respuestaQR === undefined ? <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Folio no existe</Text> :
              <QRCode value={respuestaQR === undefined ? 'FFFF' : JSON.stringify(respuestaQR)} size={300} />
            }
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

  botonQr: {
    borderRadius: "5",
    fontWeight: "bold"

  }
});
