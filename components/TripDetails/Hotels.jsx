import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

// Use a single demo image for all hotels
const DEMO_IMAGE = require('../../assets/images/bg.jpg'); // Replace with your demo image path

export default function Hotels({details}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(); // Initialize Firestore
    const subscriber = onSnapshot(collection(db, 'UserTrip'), (querySnapshot) => {
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

      // Filter for hotels data from the first trip (or adjust as needed)
      const hotelsFromTrips = userTrips.flatMap(userTrip => userTrip.tripPlan.hotels || []);
      setHotels(hotelsFromTrips);
      setLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelContainer}>
      <Image
        source={DEMO_IMAGE} // Use demo image for all hotels
        style={styles.image}
      />
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelAddress}>Address: {item.address}</Text>
      {/* <Text style={styles.hotelDescription}>Description: {item.description}</Text> */}
      <Text style={styles.hotelPrice}>Price: {item.price}</Text>
      <Text style={styles.hotelRating}>Rating: {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Hotels Recommendation</Text>

      <FlatList
        data={hotels}
        keyExtractor={(item) => item.name}
        renderItem={renderHotelItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  hotelContainer: {
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    width: 250, // Adjust width as needed
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hotelAddress: {
    fontSize: 16,
    marginTop: 5,
  },
  hotelDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  hotelPrice: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  hotelRating: {
    fontSize: 16,
    marginTop: 5,
    color: '#f39c12',
  },
});
