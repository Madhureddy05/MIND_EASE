import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const BetterSleep = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Full-screen background animation */}
      <LottieView
        source={require('../assets/home_an.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* Content Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Better Sleep Techniques</Text>
        <Text style={styles.subtitle}>Select an option to explore:</Text>

        {/* <OptionButton 
          title="White Noise" 
          icon={<FontAwesome5 name="cloud-sun" size={24} color="white" />} 
          color="#5A69F9" 
          onPress={() => navigation.navigate('WhiteNoise')}
        /> */}

        <OptionButton 
          title="SleepMusic" 
          icon={<MaterialIcons name="music-note" size={24} color="black" />} 
          color="#A7D8DE" 
          onPress={() => navigation.navigate('SleepMusic')}
        />

        {/* <OptionButton 
          title="Progressive Muscle Relaxation" 
          icon={<Ionicons name="body" size={24} color="white" />} 
          color="#3CC77D" 
          onPress={() => navigation.navigate('Relaxation')} // Ensure correct screen name
        /> */}
      </View>
    </View>
  );
};

// Reusable Button Component
const OptionButton = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    position: 'relative',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '850',
    height: '850',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: 'white',
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 20, 
    color: 'white',
    textAlign: 'center',
  },
  button: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 15, 
    width: '90%', 
  },
  iconContainer: { 
    marginRight: 15, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: 8, 
    borderRadius: 10,
  },
  buttonText: { 
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1,
  },
});

export default BetterSleep;
