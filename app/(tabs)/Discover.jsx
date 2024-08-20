import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

// Sample data for discover section
const discoverItems = [
  {
    id: "1",
    title: "Beautiful Beaches",
    description: "Explore the most stunning beaches around the world.",
    imageUrl: "https://example.com/beach.jpg",
  },
  {
    id: "2",
    title: "Mountain Adventures",
    description: "Experience thrilling adventures in the mountains.",
    imageUrl: "https://example.com/mountains.jpg",
  },
  {
    id: "3",
    title: "City Escapes",
    description: "Discover the vibrant life in various cities.",
    imageUrl: "https://example.com/city.jpg",
  },
];

export default function Discover() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Discover</Text>

      <View style={styles.discoverList}>
        {discoverItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  discoverList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});
