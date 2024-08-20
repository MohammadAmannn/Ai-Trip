import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";

export default function Flightinfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(); // Initialize Firestore
    const subscriber = onSnapshot(
      collection(db, "UserTrip"),
      (querySnapshot) => {
        const userTrips = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const parsedTripData = JSON.parse(data.tripData); // Parse tripData string

          userTrips.push({
            ...data,
            tripData: parsedTripData, // Store parsed tripData
            key: doc.id,
          });
        });

        console.log("Fetched UserTrip data: ", userTrips); // Log the fetched data

        setUsers(userTrips);
        setLoading(false);
      }
    );

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: Colors.aman,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {" "}
          ✈️ Flights
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 5,
            borderRadius: 7,

            width: 100,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "regular",
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display flight information for each user's trip */}
      {users.map((userTrip) => (
        <View key={userTrip.key}>
          {/* <Text>Location: {userTrip.tripPlan.location}</Text> */}
          {userTrip.tripPlan.flights.map((flight, index) => (
            <View key={index}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "outfit",
                }}
              >
                Airline: Spie jet
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                }}
              >
                {" "}
                Price: {flight.price}
              </Text>

              {/* <Text>Departure City: {flight.departure_city}</Text>
              <Text>Arrival City: {flight.arrival_city}</Text>
              <Text>Departure Date: {flight.departure_date}</Text>
              <Text>Return Date: {flight.return_date}</Text> */}
              {/* <Text>Booking URL: {flight.booking_url}</Text> */}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
