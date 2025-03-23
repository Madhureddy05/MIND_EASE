import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            playAlarm();
            handleSessionEnd();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Play alarm sound when session ends
  const playAlarm = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/alarm.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Handle session end
  const handleSessionEnd = () => {
    if (!isBreak) {
      Alert.alert(
        'Time for a break!',
        'Do you want to start your break now?',
        [
          {
            text: 'Not Yet',
            style: 'cancel',
            onPress: () => {
              setIsRunning(false);
            }
          },
          {
            text: 'Start Break',
            onPress: () => {
              setIsBreak(true);
              setTime(5 * 60); // Set break time
              setIsRunning(true);
            }
          }
        ]
      );
    } else {
      setIsBreak(false);
      setTime(25 * 60);
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/pom_an.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      
      <Text style={styles.title}>{isBreak ? 'Break Time! ' : 'Focus Mode! '}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setIsRunning(!isRunning)}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          setIsRunning(false);
          setIsBreak(false);
          setTime(25 * 60);
        }}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#546C75' },
  animation: { width: 150, height: 150 }, // Adjust size as needed
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' },
  timer: { fontSize: 48, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  button: { backgroundColor: '#A7D8DE', padding: 15, margin: 10, borderRadius: 8 },
  buttonText: { color: 'black', fontSize: 18, fontWeight: 'bold' }
});

export default Pomodoro;
