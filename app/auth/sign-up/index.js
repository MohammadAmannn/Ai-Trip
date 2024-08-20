import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setfullName]=useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount=()=>{

if(!email&&!password&&!fullName){
  ToastAndroid.show('Please Enter All Details',ToastAndroid.BOTTOM)
  return

}

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace("/MyTrip");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);

    // ..
  });
  }

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => router.back()}
      />

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 25,
          marginTop: 30,
        }}
      >
        Create New Account
      </Text>

      {/* user full name */}
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
          Full Name


        </Text>
        <TextInput style={styles.input} placeholder="Enter Your Full Name"
        
        onChangeText={(value)=>setfullName(value)}/> 
      </View>

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
          Email
        </Text>
        <TextInput  style={styles.input} placeholder="Enter Your Email"           onChangeText={(value)=>setEmail(value)}/> 

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
 onChangeText={(value)=>setPassword(value)}

          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Your Passsword"
        />
      </View>

      <TouchableOpacity
        onPress={onCreateAccount}
        style={{
          padding: 15,
          backgroundColor: Colors.black,
          borderRadius: 99,
          marginTop: 30,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontFamily: "regular",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("auth/sign-in")}
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
          Sign In
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
