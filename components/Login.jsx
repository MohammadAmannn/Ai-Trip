import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

// Main component for the Login screen
export default function Login() {
  const router = useRouter(); // Initialize router for navigation

  return (
    <View>
      {/* Header Image */}
      <Image
        source={require("../assets/images/trip.jpeg")}
        style={{
          width: "100%", // Make the image responsive to the screen width
          height: 520,
        }}
      />

      {/* Container for Text and Button */}
      <View style={styles.container}>
        {/* Title Text */}
        <Text style={styles.title}>AI Travel Planner</Text>

        {/* Subtitle Text */}
        <Text style={styles.subtitle}>
          Discover Your Next Adventure Effortlessly Personalized itineraries at
          your fingertips. Travel Smarter With AI-Driven Insights
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={() => router.push("/auth/sign-in")} // Navigate to the sign-in screen
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white, // Set background color to white
    marginTop: -20, // Slight overlap with the image
    height: "100%", // Full height to cover the screen
    borderTopLeftRadius: 30, // Rounded corners on the top left
    borderTopRightRadius: 30, // Rounded corners on the top right
    padding: 15, // Padding inside the container
  },
  title: {
    fontSize: 28, // Large font size for the title
    fontFamily: "outfit", // Custom font for the title
    textAlign: "center", // Center align the title text
    marginTop: 10, // Margin at the top of the title
  },
  subtitle: {
    fontFamily: "regular", // Regular font for the subtitle
    textAlign: "center", // Center align the subtitle text
    fontSize: 16, // Font size for the subtitle
    color: Colors.gray, // Gray color for the subtitle text
    marginTop: 25, // Margin at the top of the subtitle
  },
  button: {
    padding: 15, // Padding inside the button
    backgroundColor: Colors.black, // Black background color for the button
    borderRadius: 100, // Rounded corners for the button
    marginTop: "10%", // Margin at the top of the button
  },
  buttonText: {
    fontFamily: "medium", // Medium font weight for the button text
    fontSize: 16, // Font size for the button text
    color: Colors.white, // White color for the button text
    textAlign: "center", // Center align the button text
  },
});
