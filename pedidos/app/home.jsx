import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartProvider, useCart } from "./cartContext";

const sampleMenu = [
  {
    id: 1,
    name: "Pizza",
    description: "Delicious cheese pizza",
    price: "15",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy beef burger",
    price: "25",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Pasta",
    description: "Italian pasta with sauce",
    price: "10",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [menuError, setMenuError] = useState('');
  const navigation = useNavigation();
  console.log(useCart());
  const { cart, addToCart } = useCart();

  const goToCart = () => {
    navigation.navigate("cart", { cart });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.2.190:8000/produtos?offset=0&limit=100`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setMenu(data)
        } else {
          setMenuError('Error')
          setMenu(sampleMenu)
        }
      } catch (error) {
        Alert.alert("Error", "Failed to connect to the server");
        console.error(error);
      }
    };

    fetchData().catch(console.error);
  }, [cart]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>R$ {item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={goToCart} />
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
