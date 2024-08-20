import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import { CreateTripContext } from '../../context/CreateTripContext';
import { TouchableOpacity } from 'react-native';

export default function Review() {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const router=useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, [navigation]);

  const formatDate = (date) => {
    if (!date) return 'Not selected';
    return new Date(date).toDateString(); // or use any preferred format
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Review Your Trip</Text>

      <Text style={styles.infoText}>
        Before generating your trip, please review your selection:
      </Text>

      <View style={styles.infoBox}>
        <Entypo name="location-pin" size={34} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.detail}>{tripData?.locationInfo?.placeName || 'Not selected'}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Fontisto name="date" size={34} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Travel Dates</Text>
          <Text style={styles.detail}>
            Start Date: {formatDate(tripData?.startDate)}{'\n'}
            End Date: {formatDate(tripData?.endDate)}
          </Text>
        </View>
      </View>

      {/* <View style={styles.infoBox}>
        <Entypo name="price-tag" size={34} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Budget</Text>
          <Text style={styles.detail}>{tripData?.budget || 'Not selected'}</Text>
        </View>
      </View> */}

      <View style={styles.infoBox}>
        <Entypo name="calendar" size={34} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Number of Days</Text>
          <Text style={styles.detail}>{tripData?.totalNoOfDays || 'Not calculated'}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Entypo name="users" size={34} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Traveler</Text>
          <Text style={styles.detail}>{tripData?.traveler?.tittle || 'Not selected'}</Text>
        </View>
    
      </View>
      <TouchableOpacity 
      onPress={()=>router.push('/create-trip/genrateTrip')}
      
      style={{
        backgroundColor: Colors.black,
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        alignItems: 'center',
      }}>
            <Text style={{
                color: Colors.white,
                
            }}>Build My Trip </Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    fontSize: 20,
    fontFamily: 'outfit',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'regular',
    marginTop: 20,
    color: Colors.gray,
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit',
  },
  detail: {
    fontFamily: 'regular',
    color: Colors.gray,
    fontSize: 15,
  },
});
