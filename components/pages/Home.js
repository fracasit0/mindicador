import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import axios from "axios";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const api_consult = await axios.get("https://mindicador.cl/api");
      let result = api_consult.data;
      delete result["version"];
      delete result["fecha"];
      delete result["autor"];
      setIndicadores(Object.values(result));
      setLoading(false);
    };
    getAPI();
  }, []);

  if (loading) return <Text>cargando...</Text>;
  return (
    <ScrollView style={styles.container}>
      {indicadores.map((item) => (
        <TouchableOpacity
          key={item.nombre}
          onPress={() => navigation.navigate("Prices", {index: item.codigo})}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.subtitle}>{item.unidad_medida}</Text>

            <IconButton
              icon="information-outline"
              color="#007bff"
              size={40}
              onPress={() => navigation.navigate("Details", {index: item.codigo})}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      ))}
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
  title: {
    paddingLeft: 10,
    fontSize: 18,
    alignSelf: "flex-start",
    color: "#007bff",
  },
  subtitle: {
    paddingLeft: 10,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  icon: {
    alignSelf: "flex-end",
    position: "absolute",
    fontSize: 60
  },
});

export default Home;
