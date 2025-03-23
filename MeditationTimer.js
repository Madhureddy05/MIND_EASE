import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

export default function MeditationTimer({ navigation }) {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('4'); // Default 4 seconds
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmSound, setAlarmSound] = useState(null);

  // Load alarm sound
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/shelter_iphone.mp3'));
      setAlarmSound(sound);
    }
    loadSound();
    return () => {
      if (alarmSound) alarmSound.unloadAsync();
    };
  }, []);

  // Start Timer
  const startTimer = () => {
    const totalTime = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalTime > 0) {
      setTimeLeft(totalTime);
      setIsRunning(true);
      Keyboard.dismiss(); // Close keyboard when timer starts
    }
  };

  // Stop Timer
  const stopTimer = () => {
    setTimeLeft(null);
    setIsRunning(false);
  };

  // Countdown Logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      stopTimer();
      if (alarmSound) alarmSound.playAsync();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Animation */}
        <LottieView
          source={require('../assets/medi_an.json')}
          autoPlay
          loop
          style={styles.animation}
        />

        <Text style={styles.header}> Meditation Timer</Text>

        {/* Timer Input Fields */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={hours}
            onChangeText={setHours}
            maxLength={2}
            returnKeyType="done"
            keyboardAppearance="light"
            blurOnSubmit={true}
          />
          <Text style={styles.label}>Hrs</Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            maxLength={2}
            returnKeyType="done"
            keyboardAppearance="light"
            blurOnSubmit={true}
          />
          <Text style={styles.label}>Min</Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={seconds}
            onChangeText={setSeconds}
            maxLength={2}
            returnKeyType="done"
            keyboardAppearance="light"
            blurOnSubmit={true}
          />
          <Text style={styles.label}>Sec</Text>
        </View>

        {/* Display Timer */}
        <Text style={styles.timerText}>
          {timeLeft !== null
            ? `${Math.floor(timeLeft / 3600)}h : ${Math.floor((timeLeft % 3600) / 60)}m : ${timeLeft % 60}s`
            : '00h : 00m : 00s'}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStart} onPress={startTimer} disabled={isRunning}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStop} onPress={stopTimer} disabled={!isRunning}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#546C75',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'whitesmoke'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color:'whitesmoke'

  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    color:'white',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'white'
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color:'white'

  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonStart: {
    backgroundColor: '#A7D8DE',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    color:'black'

  },
  buttonStop: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    color:'black'

  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
