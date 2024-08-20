import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { chatSession } from "../../configs/AiModal";
import { useRouter } from "expo-router";
import {auth,db} from '../../configs/FirebaseConfig'
import { doc,setDoc } from "firebase/firestore";
export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user=auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.placeName || "Unknown Location"
    )
      .replace("{totalDays}", tripData?.totalNoOfDays || "0")
      .replace("{totalDays}", tripData?.totalNoOfDays || "0")
      .replace("{totalNights}", tripData?.totalNoOfDays || "0")
      .replace("{totalNights}", tripData?.totalNoOfDays || "0")
      .replace("{traveler}", tripData?.traveler?.tittle || "Unknown Traveler")
      .replace("{budget}", tripData?.title); // Ensure budget is part of tripData

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp=JSON.parse(result.response.text())
    setLoading(false);

const docId=(Date.now()).toString()
 const result_= await setDoc(doc(db,'UserTrip',docId),{
      userEmail:user.email,
      tripPlan:tripResp,
      tripData:JSON.stringify(tripData),
     docId:docId


      
    })

    router.replace("(tabs)/MyTrip");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Wait...</Text>
      <Text style={styles.subHeader}>
        We are working to generate your dream trip...
      </Text>

      <Image
        source={require("./../../assets/images/yeos-uu.gif")}
        style={styles.loader}
      />

      <Text style={styles.footer}>Do Not Go Back</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 75,
    backgroundColor: "#1E1E1E", // Dark background for contrast
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontFamily: "outfit",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "regular",
    color: "#ccc",
    marginVertical: 20,
    textAlign: "center",
  },
  loader: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  footer: {
    fontSize: 16,
    fontFamily: "regular",
    color: "#FF5722", // Vibrant color for emphasis
    marginTop: 30,
    textAlign: "center",
  },
});
