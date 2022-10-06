import React, { useState } from 'react';
import {Button, Dimensions, Platform,View, Pressable, StyleSheet} from 'react-native';
import UnityView, {
  UnityModule,
  UnityResponderView,
} from 'react-native-unity-play';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import {BASE_URL} from '../config'
import AsyncStorage from '@react-native-community/async-storage';

const TABBAR_HEIGHT = 49;
const bottom = TABBAR_HEIGHT / 6;

const {width, height} = Dimensions.get('window');

  const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                console.log(latitude)
                console.log(longitude)

                AsyncStorage.getItem('userData', (err, result) => {
                  const saveduserDatas = JSON.parse(result);

                fetch(`${BASE_URL}/api/unity/client`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({x: latitude, y: longitude, token: saveduserDatas.token}),
                })
                  .then(response => response.json())
                  .then(json => console.log(json))
                  .catch(error => console.error(error))

              })
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:false, timeout: 30000, maximumAge: 10000 },
        )
    }

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
        <UnityView style={{width: width, height: height+100, zIndex: 2}} />
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
            onPress={() => {
              this.setState({isVisible: true});
              geoLocation();
            }}>
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

export default CameraButton;
