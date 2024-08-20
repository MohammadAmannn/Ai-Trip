import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); //define empty array so that it can only runs ones

  const SignIn = () => {
    if (!email && !password) {
      ToastAndroid.show("Please Enter All Details", ToastAndroid.BOTTOM);

      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace("/MyTrip");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("inavlid credential", ToastAndroid.BOTTOM);
        }

        

      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 80,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit",
          marginTop: 30,
        }}
      >
        Let's Sign You in
      </Text>

      <Text
        style={{
          fontSize: 25,
          fontFamily: "regular",
          marginTop: 20,
          color: Colors.gray,
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          fontSize: 25,
          fontFamily: "regular",
          marginTop: 10,
          color: Colors.gray,
        }}
      >
        You've been Missed
      </Text>

      {/* view for email */}
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "medium",
          }}
        >
          Email
        </Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Enter Your Email"
        />
      </View>

      {/* View For Pass */}

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "medium",
          }}
        >
          Password
        </Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Your Passsword"
        />
      </View>

      {/* login Button */}

      <TouchableOpacity
        onPress={SignIn}
        style={{
          padding: 15,
          backgroundColor: Colors.black,
          borderRadius: 99,
          marginTop: "20%",
        }}
      >
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontFamily: "regular",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      {/* Create Account  */}

      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={{
          padding: 15,
          backgroundColor: Colors.white,
          borderRadius: 99,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.black,
            textAlign: "center",
            fontFamily: "regular",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
    fontFamily: "medium",
  },
});
