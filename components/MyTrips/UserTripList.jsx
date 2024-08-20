import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ UserTrips }) {
  const router = useRouter();

  useEffect(() => {
    if (UserTrips.length > 0) {
      const firstTrip = UserTrips[0];
      console.log("First Trip:", firstTrip);

      try {
        const tripData = JSON.parse(firstTrip.tripData);
        console.log("Parsed Trip Data:", tripData);

        const location = tripData?.locationInfo?.placeName;
        const startDate = tripData?.startDate;
        console.log("Location:", location);
        console.log("Start Date:", startDate);
      } catch (error) {
        console.error("Failed to parse trip data:", error);
      }
    }
  }, [UserTrips]);

  if (UserTrips.length === 0) {
    return <Text>No trips available</Text>;
  }

  let tripData;
  try {
    tripData = JSON.parse(UserTrips[0]?.tripData);
  } catch (error) {
    tripData = null;
    console.error("Failed to parse trip data:", error);
  }

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Image
          source={require("../../assets/images/bg.jpg")}
          style={{ width: "100%", height: 240, borderRadius: 10 }}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "medium",
              marginTop: 20,
            }}
          >
            {tripData?.locationInfo?.placeName || "Location not available"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit",
                color: Colors.gray,
              }}
            >
              {tripData?.startDate
                ? new Date(tripData.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "Start Date not available"}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "medium",
              }}
            >
              🚌{tripData?.traveler?.tittle || "Traveler info not available"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: {
                  trip: JSON.stringify(tripData),
                },
              })
            }
            style={{
              marginTop: 10,
              backgroundColor: Colors.black,
              padding: 10,
              borderRadius: 10,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "regular",
                color: Colors.white,
              }}
            >
              See Your Plan
            </Text>
          </TouchableOpacity>
        </View>
        {UserTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
