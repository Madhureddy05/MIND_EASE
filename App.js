import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import * as Notifications from 'expo-notifications';

// Import Screens
import Anxiety from './Screens/Anxiety';
import Depression from './Screens/Depression';
// import MoodTracking from './Screens/MoodTracking';
import HeartRateMonitor from './Screens/HeartRateMonitor';
import Journaling from './Screens/Journaling';
import ReliefExercises from './Screens/tempCodeRunnerFile';
import LottieView from 'lottie-react-native';

import DepressionTest from './Screens/DepressionTest';
import DepressionTips from './Screens/DepressionTips';
import DepressionVideos from './Screens/DepressionVideos';
import DepressionFood from './Screens/DepressionFood';
import AnxietyTest from './Screens/AnxietyTest';
import AnxietyTips from './Screens/AnxietyTips';
import AnxietyManagementVideos from './Screens/AnxietyManagementVideos';
import FoodScreen from './Screens/FoodScreen';
import BreathingExerciseScreen from './Screens/BreathingExerciseScreen';
import MeditationTimer from './Screens/MeditationTimer';
import tempCodeRunnerFile from './Screens/tempCodeRunnerFile';


// const huggingFaceApiKey = '';  // Replace with your key

// Request Notification Permissions
Notifications.requestPermissionsAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// SOS Function
const handleSOS = async () => {
  const emergencyNumber = "6300526806";
  const emergencyMessage = "🚨 Emergency! I need help. Please contact me immediately.";

  const { result } = await SMS.sendSMSAsync([emergencyNumber], emergencyMessage);
  if (result !== 'sent') {
    Linking.openURL(`tel:${emergencyNumber}`);
  }
};

// Homepage with Text Analysis Feature
const HomeScreen = ({ navigation }) => {
  const [userInput, setUserInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  

  const analyzeText = async () => {
    setLoading(true);
    setAnalysisResult('');

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${huggingFaceApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: userInput })
      });

      if (!response.ok) {
        const errorMsg = ` API Error: ${response.status} - ${response.statusText}`;
        console.error(errorMsg);
        setAnalysisResult(errorMsg);
        return;
      }

      const result = await response.json();
      console.log('API Result:', result);

      if (result && result[0] && result[0][0]) {
        const emotions = result[0];
        const emotionScores = emotions.map((e) => ({
          label: e.label,
          score: (e.score * 100).toFixed(2)
        }));

        const highEmotion = emotionScores.reduce((prev, current) =>
          parseFloat(current.score) > parseFloat(prev.score) ? current : prev
        );

        const emotion = highEmotion.label;
        const confidence = parseFloat(highEmotion.score);

        let detectedConditions = [];

        if ((emotion === 'sadness' || emotion === 'fear') && confidence > 50) {
          detectedConditions.push('Depression');
        }
        if ((emotion === 'fear' || emotion === 'anxiety') && confidence > 50) {
          detectedConditions.push('Anxiety');
        }

        if (detectedConditions.length === 1) {
          const condition = detectedConditions[0];
          setAnalysisResult(` Possible ${condition} detected.`);
          navigation.navigate(condition);
        } else if (detectedConditions.length === 2) {
          Alert.alert(
            'Multiple Conditions Detected',
            'The analysis indicates signs of both Depression and Anxiety. Which would you like to explore?',
            [
              { text: 'Depression', onPress: () => navigation.navigate('Depression') },
              { text: 'Anxiety', onPress: () => navigation.navigate('Anxiety') },
              { text: 'Cancel', style: 'cancel' }
            ]
          );
        } else {
          setAnalysisResult(' No significant mental health issues detected.');
        }

      } else {
        setAnalysisResult(' Error analyzing emotions.');
      }

    } catch (error) {
      console.error('API call failed:', error);
      Alert.alert('Error', 'Failed to fetch data. Check your API key and network connection.');
      setAnalysisResult(' API error or invalid response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mental Health Analysis</Text>
      {/* Lottie Animation */}
      <LottieView
        source={require('./assets/home_an.json')}  // Adjust the path if necessary
        autoPlay
        loop
        style={styles.animation}
      />

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        multiline
        value={userInput}
        onChangeText={setUserInput}
      />

<TouchableOpacity 
  style={styles.analyzeButton} 
  onPress={analyzeText}
>
  <Text style={styles.buttonText}>Analyze Text</Text>
</TouchableOpacity>


      {loading ? <Text style={styles.loadingText}>Analyzing...</Text> : <Text style={styles.result}>{analysisResult}</Text>}
    </ScrollView>
  );
};

// Bottom Tab Navigation
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Relief') iconName = 'heart';
        // else if (route.name === 'Pulse') iconName = 'pulse';
        else if (route.name === 'Journaling') iconName = 'book';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: '#ECEFF1',
      tabBarStyle: { backgroundColor: '#78909C', height: 70 },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* <Tab.Screen name="Pulse" component={HeartRateMonitor} /> */}
    <Tab.Screen name="Relief" component={ReliefExercises} />
    <Tab.Screen name="Journaling" component={Journaling} />
  </Tab.Navigator>
);

// Main App Component
export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Ionicons name="call" size={30} color="white" />
        </TouchableOpacity>

        <Stack.Navigator>
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Anxiety" component={Anxiety} />
          <Stack.Screen name="Depression" component={Depression} />
        <Stack.Screen name="DepressionTest" component={DepressionTest} />
        <Stack.Screen name="DepressionTips" component={DepressionTips} />
        <Stack.Screen name="DepressionVideos" component={DepressionVideos} />
        <Stack.Screen name="DepressionFood" component={DepressionFood} />
        <Stack.Screen name="AnxietyTest" component={AnxietyTest} />
        <Stack.Screen name="AnxietyTips" component={AnxietyTips} />
        <Stack.Screen name="AnxietyManagementVideos" component={AnxietyManagementVideos} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="BreathingExerciseScreen" component={BreathingExerciseScreen} />
        <Stack.Screen name="MeditationTimer" component={MeditationTimer} />
        <Stack.Screen name="tempCodeRunnerFile" component={tempCodeRunnerFile} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20,backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold',zIndex: 1,color: 'whitesmoke', },
  input: { width: '90%', height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, textAlignVertical: 'top',backgroundColor: 'white',
    zIndex: 1, },
  result: { marginTop: 10, textAlign: 'center',zIndex: 1, color:'white'},
  loadingText: { marginTop: 10, fontSize: 16, color: 'whitesmoke',zIndex: 1, },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    width: 850,
    height: 850, // Ensures animation covers the background
  },
  analyzeButton: {
    backgroundColor: '#A7D8DE', // Change this to your preferred color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    zIndex: 1, // Ensure it's above the animation
  },
  
  buttonText: {
    color: 'black', // Text color inside the button
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  sosButton: { position: 'absolute', top: 35, right: 15, backgroundColor: 'red', padding: 10, borderRadius: 30, zIndex: 100 },
});
