import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import axios from "axios";

import Chart from "../others/Chart";
import ValueItem from "../others/ValueItem";

const Details = ({ route }) => {
  const [showGraph, setShowGraph] = useState(false);
  const [info, setInfo] = useState([]);
  const [serie, setSerie] = useState([]);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerStyle = { backgroundColor: "white", margin: 10 };

  useEffect(() => {
    const getAPI = async () => {
      const url = `https://mindicador.cl/api/${route.params.index}`;
      const api_consult = await axios.get(url);
      setInfo(api_consult.data);
      setSerie(api_consult.data.serie);
      
      //setear hora
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      setTime(date);

      setLoading(false);
    };
    getAPI();
  }, []);

  if (loading) return <Text>cargando...</Text>;
  return (
    <View style={styles.container}>

      {info.unidad_medida === 'Porcentaje'
        ? <Text style={styles.price}>% {info.serie[0].valor}</Text>
        : <Text style={styles.price}>$ {info.serie[0].valor}</Text>}

      <ValueItem name="Nombre" value={info.nombre} />
      <ValueItem name="Fecha" value={time} />
      <ValueItem name="Unidad de Medida" value={info.unidad_medida} />

      <Button
        style={styles.buttonGraph}
        color="#007bff"
        mode="outlined"
        onPress={setShowGraph}
      >
        Ver Grafico
      </Button>

      {showGraph ? (
        <Modal
          visible={showGraph}
          onDismiss={setShowGraph}
          contentContainerStyle={containerStyle}
        >
          <Chart serie={serie} />
        </Modal>
      ) : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    top: 60,
    fontSize: 40,
    fontWeight: "bold",
    color: "#007bff",
    position: "absolute",
  },
  buttonGraph: {
    bottom: 100,
    position: "absolute",
  },
});

export default Details;
