import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { SelectTravelesList } from "../../constants/Options";
import OptionCard from "../../components/Create-Trip/CreateOption";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = React.useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler, // Store the full object
      });
    }
  }, [selectedTraveler]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit",
          marginTop: 20,
        }}
      >
        Who is Traveling
      </Text>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 25,
          }}
        >
          Choose Your Travelers
        </Text>

        <FlatList
          data={SelectTravelesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)} // Store the full object
              style={{ marginVertical: 10 }}
            >
              <OptionCard
                option={item}
                selectTraveler={selectedTraveler?.tittle}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item.tittle}-${index}`}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/create-trip/select-date");
        }}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "medium",
            color: "white",
          }}
        >
          Contiune
        </Text>
      </TouchableOpacity>
    </View>
  );
}
