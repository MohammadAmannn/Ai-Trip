import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Colors } from '../../constants/Colors';

export default function Profile() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }).start(),
    ]);
  }, [fadeAnim, scaleAnim]);

  // Sample user data
  const user = {
    name: "Mohd Aman",
    email: "aman_239225@saitm.ac.in",
    phone: "9784411085",
    address: "New Delhi",
    profilePicture: require('../../assets/images/me.jpg'), // Local image path
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
    interests: ["Photography", "Traveling", "Reading"],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.profileContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        <Text style={styles.userAddress}>{user.address}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.additionalInfo}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Text style={styles.additionalText}>{user.bio}</Text>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.sectionTitle}>Interests</Text>
        {user.interests.map((interest, index) => (
          <Text key={index} style={styles.additionalText}>
            - {interest}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.buttonText}>Account Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.bla, // Light background color
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.white, // Light primary color for the profile section
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.yellow, // Colorful border
    marginBottom: 10,
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 5,
  },
  userAddress: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.yellow, // Vibrant primary color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  additionalInfo: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 10,
  },
  additionalText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'left',
  },
  settingsButton: {
    backgroundColor: Colors.black, // Another vibrant color for the settings button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
});
