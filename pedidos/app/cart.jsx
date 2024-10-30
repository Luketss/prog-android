import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartProvider, useCart } from "./cartContext";

export default function Cart() {
  const { cart, cleanCart } = useCart();
  const navigation = useNavigation();

  const fetchData = async () => {
    const API_URL = "http://192.168.2.190:8000/pedidos";
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          order_status: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data received:", data);
    } catch (error) {
      Alert.alert("Connection Error", "Failed to connect to the server");
      console.error("Fetch error:", error.message || error);
    }
  };

  const placeOrder = () => {
    fetchData();
    cleanCart();
    alert("Order placed successfully!");
    navigation.goBack();
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </View>
          )}
        />
        <Button title="Place Order" onPress={placeOrder} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
