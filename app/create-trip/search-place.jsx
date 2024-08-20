import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Autosuggest from "./Autocomplete";
import { CreateTripContext } from "../../context/CreateTripContext";
import { router, useRouter } from "expo-router";
import { useNavigation } from "expo-router";

export default function SearchPlace() {
  const { setTripData } = useContext(CreateTripContext);
  const api = process.env.EXPO_PUBLIC_OLA_API; // Ensure this is correctly set in your environment
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Search For A place",
      headerTransparent: true,
    });
  }, []);

  const handlePlaceSelect = (prediction) => {
    console.log("Selected place:", prediction); // Log selected prediction
    setTripData((prevData) => ({
      ...prevData,
      locationInfo: {
        placeName: prediction.description,
        placeId: prediction.place_id,
        latitude: prediction.geometry.location.lat,
        longitude: prediction.geometry.location.lng,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Autosuggest
        apiKey={api}
        onPlaceSelected={handlePlaceSelect}
        placeholder="Search for a place..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
});
