import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Autosuggest = ({ apiKey, onPlaceSelected, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleInputChange = async (text) => {
    setQuery(text);
  
    if (text.length === 0) {
      setSuggestions([]); // Close dropdown when input is empty
      return;
    }
  
    if (text.length > 2) {
      try {
        const response = await axios.get(`https://api.olamaps.io/places/v1/autocomplete?input=${text}&api_key=${apiKey}`);
        const predictions = response.data.predictions || [];
        setSuggestions(predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };
  

  const handleSuggestionPress = (suggestion) => {
    const placeName = suggestion.structured_formatting.main_text; // Extract main_text
    setQuery(placeName); // Set the query to the main_text
    setSuggestions([]);
  
    if (onPlaceSelected) {
      onPlaceSelected({
        ...suggestion,
        description: placeName, // Use main_text as the description
      });
    }
  
    // Navigate to the specified route
    router.push('/create-trip/select-Traveler');
  };
  

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.suggestionItemContainer} onPress={() => handleSuggestionPress(item)}>
      <Text style={styles.suggestionItem}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search for a place"}
        value={query}
        onChangeText={handleInputChange}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsWrapper}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${item.place_id || index}-${index}`} // Ensure unique key
            renderItem={renderItem}
            style={styles.suggestionsContainer}
          />
        </View>
      )}
    </View>
  );
};;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    position: 'relative',
    width:"auto",
    margin:19
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1, // Ensure input box is below suggestions
  },
  suggestionsWrapper: {
    position: 'absolute',
    top: 45, // Adjust based on input height
    left: 0,
    right: 0,
    zIndex: 2, // Ensure suggestions are above input box
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 250,
    elevation: 77,
    marginTop:2
  },
  suggestionItemContainer: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  suggestionItem: {
    fontSize: 14,
    color: '#333',
  },
});

export default Autosuggest;
