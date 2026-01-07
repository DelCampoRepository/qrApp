import { ObtenerQR } from "@/Services/service";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

type data = {
  folio: string,
  password: string
}

export default function App() {
  const [folio, setFolio] = useState<string>("");
  const [respuestaQR, setRespuestaQR] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [sinInternet, setSinInternet] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);


  const fechaHoy = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleQr = async () => {

    if (!folio.trim()) {
      setRespuestaQR(null);
      Alert.alert("Del Campo y Asociados", "Debes ingresar un número de folio.");
      return;
    }

    const estadoRed = await NetInfo.fetch();

    if (!estadoRed.isConnected) {
      setSinInternet(true);
      return;
    }

    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await ObtenerQR({
        folio: folio,
        password: "0x22F3774B51FE7625BDAA1724CB2C4572D8FEAB3D4C7671702F852F55EF69BF15"
      } as any);

      setRespuestaQR(response);

    } catch (error: any) {
      Alert.alert("Error", error?.message ?? "Error al obtener QR.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.fecha}>{fechaHoy}</Text>

        <Image
          source={require("../../assets/images/logoDelcampo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Número de folio</Text>

        <View
          style={[
            styles.inputContainer,
            inputFocused && styles.inputContainerFocused
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Capture el número de folio"
            keyboardType="numeric"
            value={folio}
            onChangeText={setFolio}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </View>


        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            handleQr();
          }}

          style={{
            borderRadius: 14,
            width: 350,
            height: 43,
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
            Buscar
          </Text>
        </TouchableOpacity>

        <View style={styles.qrSpace}>
          {respuestaQR !== null &&
            (respuestaQR === undefined ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>
                  Folio inválido
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.successBox}>
                  <Text style={styles.successText}>
                    Folio generado correctamente
                  </Text>
                </View>

                <QRCode value={JSON.stringify(respuestaQR)} size={300} />
              </>
            ))}
        </View>


        <Modal transparent animationType="fade" visible={loading}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <ActivityIndicator size="large" color="green" />
              <Text style={styles.modalText}>Consultando folio</Text>
            </View>
          </View>
        </Modal>

        <Modal transparent animationType="fade" visible={sinInternet}>
          <View style={styles.modalBackground}>
            <View style={styles.internetBox}>
              <Ionicons name="wifi-outline" size={38} color="#E53935" />
              <Text style={styles.internetText}>
                Necesitas conexión a internet
              </Text>

              <TouchableOpacity
                onPress={() => setSinInternet(false)}
                style={styles.internetButton}
              >
                <Text style={styles.internetButtonText}>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    flex: 1,
    height: 50,
    fontSize: 17,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    width: 250,
  },
  modalText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -35,
    marginTop: -190,

  },
  qrSpace: {
    height: 220,
    marginTop: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  errorBox: {
    backgroundColor: "#FDECEA",
    borderColor: "#E53935",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: "#E53935",
    fontSize: 15.5,
    fontWeight: "bold",
    textAlign: "center",
  },
  successBox: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 17,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  successText: {
    color: "#2E7D32",
    fontSize: 15.5,
    fontWeight: "bold",
    textAlign: "center",
  },
  fecha: {
    position: "absolute",
    top: 15,
    right: 20,
    fontSize: 14.5,
    fontWeight: "bold",
    color: "#000",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 2,
  },
  internetBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    width: 260,
  },
  internetText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  internetButton: {
    marginTop: 15,
    backgroundColor: "#E53935",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  internetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainerFocused: {
    borderColor: "#0f5132",
  },

});
