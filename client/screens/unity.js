import React, {useState, useEffect} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  View,
  Pressable,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import UnityView, {
  UnityModule,
  UnityResponderView,
} from 'react-native-unity-play';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TABBAR_HEIGHT = 49;
const bottom = TABBAR_HEIGHT / 6;
const [location, setLocation] = useState();

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

const onUnity = () => {
  var dataToSend = {
    x: location.latitude,
    y: location.longitude,
  };

  fetch(`${BASE_URL}/api/unity/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  }).then(this.setState({isVisible: true}));
};

const {width, height} = Dimensions.get('window');

class Unity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.initComponent = () => {
      if (Platform.OS === 'android') {
        UnityModule.resume();
      }
    };
  }

  componentDidMount() {
    this.initComponent();
  }

  render() {
    const {isVisible} = this.state;
    let unityElement;

    if (Platform.OS === 'android') {
      unityElement = (
        <UnityView style={{width: width, height: height + 150, zIndex: 2}} />
      );
    } else {
      unityElement = (
        <UnityResponderView
          fullScreen={true}
          style={{width: width, height: height}}
        />
      );
    }

    return (
      <View>
        {!isVisible && (
          <>
            <View style={[styles.wrapper, {bottom}]}>
              {/* 카메라 버튼 눌렀을 때 modal visible  */}
              <Pressable
                android_ripple={{
                  color: '#ffffff',
                }}
                style={styles.circle}
                onPress={onUnity}>
                <Icon name="camera-alt" color="white" size={24} />
              </Pressable>
            </View>
          </>
        )}

        {isVisible && (
          <>
            <View
              style={{
                position: 'absolute',
                top: 45,
                left: 20,
                zIndex: 20,
              }}>
              <Button
                title={'Close'}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    UnityModule.quit();
                  }
                  this.setState({isVisible: false});
                }}
                style={{color: '#fff'}}
              />
            </View>
            {unityElement}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#009688',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Unity;
