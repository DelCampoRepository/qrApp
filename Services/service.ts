import { API_URL } from "@/utils/constans";

export const ObtenerQR = async (data: any) => {
    try {



        const response = await fetch(`${API_URL}/Empleado/ObtenerQR`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(data)
        })




        const apiResponse = {
            QR: "{\"folio\":\"8291220251\",\"cod_lote\":\"415\",\"nom_lote\":\"TOMATE BEEF ALTATA\",\"nom_usuario\":\"Remisionista Altata\",\"nom_conductor\":\"Oscar Aviles\",\"tractor\":\"64\",\"bins\":\"32\",\"cajas_baldesXbin\":\"15\",\"total_baldes_cajas\":\"480\",\"naves\":\"N01,N02,N03,N04,N05,N07,N06,N08,N09,N10,N11,N12,N13,N14,N15,N16,N17,N18,N19,N20,N28,N29,N31,N32\"}",
            estado: 1,
            mensaje: "Todo Ok"
        };


        const rawText = await response.text();


        const parsed = JSON.parse(rawText);   // JSON principal
        const qrObject = JSON.parse(parsed.QR); // JSON interno (QR)


        return qrObject



    }
    catch (error: any) {
        console.log(error.mensaje)
    }
}