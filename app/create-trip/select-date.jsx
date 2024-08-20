import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Calendar } from 'react-native-calendars';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';

export default function Dates() {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router=useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, [navigation]);

  const onDateChange = (date, type) => {
    if (type === 'startDate') {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelection = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end date');
      return;
    }

    if (endDate.isBefore(startDate)) {
      alert('End date cannot be before start date');
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, 'days');
    setTripData({
      ...tripData,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      totalNoOfDays: totalNoOfDays + 1,
    });
    console.log(totalNoOfDays)
    router.push('/create-trip/select-budget');

  };

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const selectedDay = moment(dateString);

    if (startDate && !endDate) {
      // Set end date if start date is already selected
      setEndDate(selectedDay);
      onDateChange(dateString, 'endDate');
    } else {
      // Set start date
      setStartDate(selectedDay);
      setEndDate(null);
      onDateChange(dateString, 'startDate');
    }

    setSelectedDates((prevSelectedDates) => {
      const selected = { ...prevSelectedDates };
      if (selected[dateString]) {
        delete selected[dateString];
      } else {
        selected[dateString] = {
          selected: true,
          marked: true,
          selectedColor: Colors.black,
        };
      }
      return selected;
    });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'outfit',
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Calendar
          onDayPress={onDayPress}
          markedDates={selectedDates}
          theme={{
            selectedDayBackgroundColor: Colors.primary,
            todayTextColor: Colors.primary,
            arrowColor: Colors.primary,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={OnDateSelection}
        style={{
          backgroundColor: Colors.black,
          padding: 15,
          borderRadius: 10,
          marginTop: 25,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'regular',
            fontSize: 15,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
