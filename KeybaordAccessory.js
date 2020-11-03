import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  Keyboard,
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const KeyboardAccessory = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get('window').width;
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  useEffect(() => {
    console.log('isIphoneX()', isIphoneX());
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = (e) => {
    setKeyboardShowing(true);
    if (Platform.OS === 'ios') {
      if (isIphoneX()) {
        // setBottom(e.endCoordinates.height - 85);
        Animated.timing(fadeAnim, {
          toValue: e.endCoordinates.height - 50,
          duration: e.duration,
        }).start();
      } else {
        // setBottom(e.endCoordinates.height - 50);
        Animated.timing(fadeAnim, {
          toValue: e.endCoordinates.height - 50,
          duration: e.duration,
        }).start();
      }
      // Animation
    }

    // If you need anything here
  };

  const _keyboardWillHide = (e) => {
    setKeyboardShowing(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: e.duration,
    }).start();
  };

  return (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: fadeAnim,
        height: 100,
        width: width,
        marginBottom: 0,
        display: keyboardShowing ? 'flex' : 'none',
        alignItems: 'flex-end',
        borderTop: 'solid',
        borderTopWidth: 1,
        borderTopColor: '#516A7B',
      }}
    >
      <TouchableOpacity
        style={{
          padding: 15,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Text>Done</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default KeyboardAccessory;
