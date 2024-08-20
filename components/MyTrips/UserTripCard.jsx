import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function UserTripCard({ trip }) {
  const router = useRouter();
  const tripData = trip?.tripData ? JSON.parse(trip.tripData) : null;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/trip-details',
          params: {
            trip: trip.tripData,
          },
        })
      }
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/images/bg.jpg")}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <View>
        <Text style={{ fontSize: 20, fontFamily: "medium", marginTop: 20 }}>
          {tripData?.locationInfo?.placeName || "Location not available"}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "outfit", color: "#888", marginTop: 5 }}>
          {tripData?.startDate
            ? new Date(tripData.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Start Date not available"}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "medium", marginTop: 5 }}>
          🚌 {tripData?.traveler?.tittle || "Traveler info not available"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
