import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartTripCard() {
    const router=useRouter()
  return (
    <View
      style={{
        padding: 20,
        margintop: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="location" size={24} color="black" />
      <Text
        style={{
          fontFamily: "medium",
          fontSize: 20,
          marginTop: 10,
        }}
      >
        No Trip Planned Yet
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          marginTop: 10,
          textAlign: "center",
          color: Colors.gray,
        }}
      >
        Plan A NEW Trip
      </Text>

      <TouchableOpacity 
      onPress={()=>router.push('/create-trip/search-place')}
        style={{
          backgroundColor: Colors.black,
          padding: 15,
          borderRadius: 10,
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            fontFamily: "regular",
          }}
        >
          Start New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
