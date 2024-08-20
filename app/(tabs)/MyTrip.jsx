import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import StartTripCard from '../../components/MyTrips/StartTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import UserTripList from '../../components/MyTrips/UserTripList';
import { Link } from 'expo-router';
import { ScrollView } from 'react-native';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      GetMyTrips();
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'UserTrip'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      {loading && <ActivityIndicator size="large" color={Colors.black} />}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 25,
            fontWeight: 'bold',
            color: Colors.black,
          }}
        >
          My Trips
        </Text>
        <Link href={'create-trip/search-place'}>
          <FontAwesome6 name="add" size={30} color="black" />
        </Link>
      </View>

      {userTrips.length === 0 && !loading ? (
        <StartTripCard />
      ) : (
        <UserTripList UserTrips={userTrips} />
      )}
    </ScrollView>
  );
}
