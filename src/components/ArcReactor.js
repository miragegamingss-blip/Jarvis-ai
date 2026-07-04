import React, { useEffect } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';

const ArcReactor = () => {
  const spinClockwise = new Animated.Value(0);
  const spinCounterClockwise = new Animated.Value(0);
  const pulseScale = new Animated.Value(0.93);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinClockwise, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(spinCounterClockwise, {
        toValue: -1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.05,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 0.93,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const outerRotation = spinClockwise.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const innerRotation = spinCounterClockwise.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ring,
          styles.outerRing,
          { transform: [{ rotate: outerRotation }] },
        ]}
      />

      <Animated.View
        style={[
          styles.ring,
          styles.innerRing,
          { transform: [{ rotate: innerRotation }] },
        ]}
      />

      <Animated.View
        style={[
          styles.core,
          {
            transform: [{ scale: pulseScale }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  ring: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#00f0ff',
    borderRadius: 9999,
  },
  outerRing: {
    width: 210,
    height: 210,
    borderStyle: 'dashed',
  },
  innerRing: {
    width: 150,
    height: 150,
    borderStyle: 'dashed',
  },
  core: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    elevation: 20,
  },
});

export default ArcReactor;
