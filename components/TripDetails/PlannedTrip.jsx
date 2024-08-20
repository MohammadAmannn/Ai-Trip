import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

// Use a demo image for all places
const DEMO_IMAGE = require("../../assets/images/bg.jpg"); // Replace with your demo image path

export default function PlannedTrip() {
  const [itinerary, setItinerary] = useState([]);
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

        // Extract itinerary data from the first trip (adjust as needed)
        const itineraryFromTrips = userTrips.flatMap(
          (userTrip) => userTrip.tripPlan.itinerary || []
        );
        setItinerary(itineraryFromTrips);
        setLoading(false);
      }
    );

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderItineraryItem = ({ item }) => {
    // Ensure unique and defined key
    const uniqueKey = `${item.day}-${item.title}` || `${Math.random()}`;

    return (
      <View style={styles.itineraryContainer}>
        <Text style={styles.dayTitle}>{`Day ${item.day}: ${item.title}`}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
        <FlatList
          data={item.places}
          keyExtractor={(place) => place.id ? place.id.toString() : `${Math.random()}`} // Ensure unique keys
          renderItem={({ item: place }) => (
            <View style={styles.placeContainer}>
              <Image
                source={DEMO_IMAGE}
                style={styles.placeImage}
              />
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDetail}>{place.detail}</Text>
              <View style={styles.ticketPricingContainer}>
                <Text style={styles.placeTicketPricing}>
                  Ticket Pricing: {place.ticket_pricing}
                </Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placesContainer}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={itinerary}
      keyExtractor={(item) => `${item.day}-${item.title}`} // Ensure unique keys
      renderItem={renderItineraryItem}
      ListHeaderComponent={<Text style={styles.title}>🗺️ Trip Plan</Text>}
      contentContainerStyle={styles.flatListContent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itineraryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  placesContainer: {
    paddingVertical: 10,
  },
  placeContainer: {
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    width: 250, // Adjust width as needed
  },
  placeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  placeDetail: {
    fontSize: 14,
    marginTop: 5,
  },
  ticketPricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  placeTicketPricing: {
    fontSize: 14,
    fontWeight: "bold",
  },
  flatListContent: {
    padding: 10,
  },
});
