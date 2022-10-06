import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  Platform,
  PermissionsAndroid,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {Linking} from 'react-native';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

const CurrentPosition = () => {
  const [location, setLocation] = useState();
  useEffect(() => {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos.coords);
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000},
        );
      }
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        {location ? (
          <>
            <Text style={styles.label}>현재위치좌표</Text>
            <Text style={styles.label}>위도: {location.latitude}</Text>
            <Text style={styles.label}>경도: {location.longitude}</Text>
          </>
        ) : (
          <Text style={styles.label}>Loading...</Text>
        )}
      </View>
      <View>
        <Button
          title="긴급전화"
          onPress={() => {
            Linking.openURL(`tel:119`);
          }}
          color="#009688"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default CurrentPosition;
