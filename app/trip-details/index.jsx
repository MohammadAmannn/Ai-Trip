import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import Flightinfo from "../../components/TripDetails/Flightinfo";
import Hotels from "../../components/TripDetails/Hotels";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams(); // receiving 'trip' as parameter
  const [TripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerTransparent: true,
    });

    if (trip) {
      try {
        const parsedTrip = JSON.parse(trip);
        console.log("Parsed Trip Data:", parsedTrip); // Log the parsed trip data
        setTripDetails(parsedTrip);
      } catch (error) {
        console.error("Error parsing trip data:", error);
      }
    } else {
      console.log("Trip data is not available");
    }
  }, [trip]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderContent = () => (
    <>
      <Image
        source={require("../../assets/images/bg.jpg")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.locationName}>
          {TripDetails?.locationInfo?.placeName || "Location not available"}
        </Text>

        {/* Date Range */}
        <View style={styles.dateRange}>
          <Text style={styles.dateText}>
            {TripDetails?.startDate
              ? formatDate(TripDetails.startDate)
              : "Date not available"}
          </Text>
          <Text style={styles.dateSeparator}>{" - "}</Text>
          <Text style={styles.dateText}>
            {TripDetails?.endDate
              ? formatDate(TripDetails.endDate)
              : "Date not available"}
          </Text>
        </View>

        <Text style={styles.travelerInfo}>
          🚌{TripDetails?.traveler?.tittle || "Traveler info not available"}
        </Text>

        {/* Flight info */}
        {/* <Flightinfo flightData={TripDetails?.tripPlan?.flights}  /> */}

        {/* Hotels List */}
        <Hotels hotelList={TripDetails?.tripPlan?.hotels}/>

        {/* Planned Trip */}
        <PlannedTrip details={TripDetails?.tripPlan?.itinerary} />

        {/* Trip Day Planner */}
      </View>
    </>
  );

  return (
    <FlatList
      data={[{ key: 'tripDetails' }]} // Dummy data to render the component
      keyExtractor={(item) => item.key}
      renderItem={() => renderContent()}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 330,
  },
  contentContainer: {
    padding: 15,
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateRange: {
    flexDirection: "row",
    marginTop: 10,
  },
  dateText: {
    fontSize: 18,
    color: Colors.gray,
  },
  dateSeparator: {
    fontSize: 18,
    color: Colors.gray,
  },
  travelerInfo: {
    fontSize: 16,
    fontFamily: "medium",
    marginTop: 5,
  },
});
