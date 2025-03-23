import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Depression = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Animation */}
      <LottieView 
        source={require('../assets/home_an.json')} 
        autoPlay 
        loop 
        style={styles.backgroundAnimation}
      />
      
      <Text style={styles.title}>Managing Depression</Text>
      <Text style={styles.subtitle}>Select an option to explore:</Text>

      <OptionButton 
        title="Take Test" 
        icon={<FontAwesome5 name="clipboard-list" size={24} color="black" />} 
        color="#A7D8DE" 
        onPress={() => navigation.navigate('DepressionTest')}
      />

      <OptionButton 
        title="Tips" 
        icon={<MaterialIcons name="tips-and-updates" size={24} color="black" />} 
        color="#A7D8DE" 
        onPress={() => navigation.navigate('DepressionTips')}
      />

      <OptionButton 
        title="Watch Related Videos" 
        icon={<Ionicons name="videocam" size={24} color="black" />} 
        color="#A7D8DE" 
        onPress={() => navigation.navigate('DepressionVideos')}
      />

      <OptionButton 
        title="Food Recommendations" 
        icon={<MaterialIcons name="fastfood" size={24} color="black" />} 
        color="#A7D8DE" 
        onPress={() => navigation.navigate('DepressionFood')}
      />
    </View>
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
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  backgroundAnimation: {
    position: 'absolute',
    width: 850,
    height: 850,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color:'#FFFFFF' },
  subtitle: { fontSize: 16, marginBottom: 20, color: '#FFFFFF' },
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

export default Depression;
