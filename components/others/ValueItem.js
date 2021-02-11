import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ValueItem = ({name,value}) => {
  return (
    <View style={styles.valueItem}>
      <Text style={styles.valueTitle}>{name} </Text>
      <Text style={styles.valueBox}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  valueItem: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 4
  },
  valueTitle: {
    fontSize: 20,
    width:180,
  },
  valueBox: {
    borderWidth: 0.5,
    borderColor: "#8e8e93",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    width: 160,
  },
});

export default ValueItem;
