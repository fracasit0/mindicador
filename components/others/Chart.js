import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

import getFromObject from '../Functions/Functions';

const Chart = ({ serie }) => {
  const data = {
    //labels: getFromObject(serie, "fecha"), --- se bugea por el pequeño ancho de mi celular
    datasets: [
      {
        data: getFromObject(serie, "valor"),
        color: (opacity = 1) => `rgba(0, 132, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#f2f2f7",
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const screenWidth = Dimensions.get("window").width / 1.055;

  return (
    <View style={styles.valueItem}>
      <LineChart
        data={data}
        width={screenWidth}
        height={260}
        chartConfig={chartConfig}
      />
      <Text>Ultimas 10 fechas.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  Text: {
    color: "#007bff",
    fontSize: 12,
    fontWeight: '100'
  }
});

export default Chart;
