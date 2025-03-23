import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const topics = [
  { name: "Time Management", icon: <Ionicons name="time" size={24} color="black" />, color: '#A7D8DE', screen: "TimeManagement" },
  { name: "Mental Health Test", icon: <FontAwesome5 name="clipboard-list" size={24} color="black" />, color: '#A7D8DE', screen: "MentalHealthTest" },
  { name: "Better Sleep", icon: <MaterialIcons name="bedtime" size={24} color="black" />, color: '#A7D8DE', screen: "BetterSleep" } 
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Full-screen animated background */}
      <LottieView
        source={require('../assets/home_an.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* Content Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Find Support for Your Journey</Text>
        <View style={styles.listContainer}>
          {topics.map((item, index) => (
            <OptionButton 
              key={index} 
              title={item.name} 
              icon={item.icon} 
              color={item.color} 
              onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Reusable Button Component
const OptionButton = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.line} />
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
    width: 850,
    height: 850,
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
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 15, 
    width: '90%', 
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: { 
    marginRight: 15, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: 8, 
    borderRadius: 10 
  },
  buttonText: { 
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1 
  },
  line: {
    position: 'absolute',
    right: 10,
    top: 5,
    bottom: 5,
    width: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  }
});

export default HomeScreen;
