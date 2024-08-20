import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from 'expo-router';
import { BudgetOptionsList } from '../../constants/Options';

export default function Budget() {
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState(null);

  const borderAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Budget',
      headerTransparent: false,
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: '#0f0f0f', // Dark background for the header
      },
      headerTintColor: '#fff', // Color of the back button and title
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'outfit',
        color: '#fff',
      },
    });
  }, [navigation]);

  useEffect(() => {
    // Border animation effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [borderAnimation]);

  const handleSelectBudget = (item) => {
    setSelectedBudget(item.id);
    console.log('Selected Budget:', item);
  };

  const handleContinue = () => {
    if (selectedBudget === null) {
      alert('Please select a budget option');
      return;
    }
    // Navigate to the next screen or perform any other action
    navigation.navigate('create-trip/Review-trip'); // Replace 'NextScreen' with the actual screen name
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedBudget === item.id;

    const animatedBorderColor = isSelected ? borderAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ff00ff', '#00ffff'], // Neon colors
    }) : '#fff'; // Default border color for unselected

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            borderColor: animatedBorderColor,
            borderWidth: isSelected ? 3 : 1,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleSelectBudget(item)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.range}>{item.range}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const animatedBorderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff00ff', '#00ffff'], // Neon colors
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Budget</Text>
      <Text style={styles.subHeader}>Choose spending habits</Text>
      <FlatList
        data={BudgetOptionsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Animated.View
        style={[
          styles.continueButtonContainer,
          {
            borderColor: animatedBorderColor,
            borderWidth: 4,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: '#0f0f0f',
    height: '100%',
  },
  header: {
    fontSize: 28,
    fontFamily: 'outfit',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 105, 180, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'linear-gradient(to right, #ff0099, #ff6600)',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Make the item span the full width
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 36,
    marginRight: 15,
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 5,
  },
  range: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  continueButtonContainer: {
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    overflow: 'hidden', // To make sure the border is clipped correctly
    width: '100%', // Full width
  },
  continueButton: {
    backgroundColor: '#3F88C5', // Neon color for the button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:'100%'
  },
  continueButtonText: {
    color: '#fff',
    fontFamily: 'regular',
    fontSize: 15,
  },
});
