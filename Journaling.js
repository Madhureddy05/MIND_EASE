import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Journaling = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/home_an.json')}  // Add path to your animation file
        autoPlay
        loop
        style={styles.animation}
      />
      
      <Text style={styles.title}>What's on your mind?</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Journal')}>
        <Text style={styles.buttonText}>Go to Journal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    zIndex: 1,
    color:'#FFFFFF' // Ensures text is above the animation
  },
  button: {
    backgroundColor: '#A7D8DE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 1, // Ensures button is above the animation
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    width:850,
    height:850, // Ensures animation is in the background
  },
});

export default Journaling;
