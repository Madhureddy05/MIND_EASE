import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds fade-in effect
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../assets/logo.png')} 
        style={[styles.logo, { opacity: fadeAnim }]} 
      />
      <Text style={styles.title}>Take a Deep Breath</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#546C75',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A7D8DE',
  },
});

export default SplashScreen;