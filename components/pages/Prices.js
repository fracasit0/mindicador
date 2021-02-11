import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

function float2int(value) {
  return value | 0;
}

const Prices = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [unitType, setUnitType] = useState(null)

  useEffect(() => {
    const getAPI = async () => {
      const url = `https://mindicador.cl/api/${route.params.index}`;
      const api_consult = await axios.get(url);
      setValues(api_consult.data.serie);
      setUnitType(api_consult.data.unidad_medida)
      setLoading(false);
    };
    
    getAPI();
  }, []);

  if (loading) return <Text>cargando...</Text>;
  return (
    <ScrollView style={styles.container}>
      {values.map((item) => {
        var newDate = item.fecha.split("T");
        return (
          <View key={item.fecha} style={styles.item}>
            <Text style={styles.date}>{newDate[0]}</Text>
            {unitType === 'Porcentaje'
              ? <Text style={styles.price}>% {item.valor}</Text>
              : <Text style={styles.price}>$ {item.valor}</Text>}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    borderTopWidth: 0.5,
    borderColor: "grey",
    justifyContent: "center",
    height: 60,
  },
  date: {
    paddingLeft: 15,
    fontSize: 18,
    alignSelf: "flex-start",
    color: "#007bff",
  },
  price: {
    paddingRight: 15,
    fontSize: 14,
    alignSelf: "flex-end",
    position: "absolute",
  },
});

export default Prices;
