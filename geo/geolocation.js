import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Geofencing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  // const [locationError, setLocationError] = useState(null);
  // const destinationDistance = {latitude: 40.7128, longitude: -74.006};
  const destinationDistance = {latitude: 23.207207207207, longitude: 75.9665979755644};

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Current location:', position)
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
      },
      error => {
        Alert.alert(
          'Error',
          'Failed to get current location. Please make sure location services are enabled.',
        );
        console.log('error in current location:', error);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000},
    );
  }, []);

  const handleLogin = () => {
    console.log('Login button clicked');
    if (!userLocation) {
      console.log('Waiting for location information...');
      Alert.alert(
        'Error',
        'Waiting for location information. Please wait and try again.',
      );
      return;
    }

    const distance = calculateDistance(userLocation, destinationDistance);
    console.log(userLocation)
    console.log(`Distance to destination: ${distance} meters`);

    if (distance <= 10) {
      Alert.alert('Success', 'You are within the destination');
      console.log('You are within the destination');
      // Add your login logic here
    } else {
      Alert.alert( 'You are not within the destination');
      console.log('You are not within the destination');
      // Add your logic to display a message or prevent login
    }
  };

  const calculateDistance = (location1, location2) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(location2.latitude - location1.latitude);
    const dLon = degreesToRadians(location2.longitude - location1.longitude);

    const lat1 = degreesToRadians(location1.latitude);
    const lat2 = degreesToRadians(location2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
console.log(a)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c * 1000; // distance in meters
  };

  const degreesToRadians = degrees => {
    return degrees * (Math.PI / 180);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 10}}>Login</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={handleLogin} />
      {/* {locationError && <Text>Error: {locationError}</Text>} */}
    </View>
  );
};

export default Geofencing;
