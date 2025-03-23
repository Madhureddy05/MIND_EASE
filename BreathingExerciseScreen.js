import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function BreathingExerciseScreen() {
  const [breathPhase, setBreathPhase] = useState('Breathe In');
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const phases = [
      { text: 'Breathe In', duration: 5000 },
      { text: 'Hold', duration: 1000 },
      { text: 'Breathe Out', duration: 5000 },
      { text: '', duration: 3000 }, // Wait phase (no text)
    ];

    const cyclePhases = () => {
      setBreathPhase(phases[index].text);
      timeoutRef.current = setTimeout(() => {
        index = (index + 1) % phases.length;
        cyclePhases();
      }, phases[index].duration);
    };

    cyclePhases(); // Start the breathing cycle

    return () => {
      clearTimeout(timeoutRef.current); // Stop cycle when screen is closed
      setBreathPhase('Breathe In'); // Reset phase
      if (animationRef.current) animationRef.current.reset(); // Reset animation
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>

      {/* Lottie Animation */}
      <LottieView
        ref={animationRef}
        source={require('../assets/Animation - 1740027278075.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Breathing Phase Text */}
      {breathPhase ? <Text style={styles.breathText}>{breathPhase}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#546C75',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'whitesmoke'
  },
  animation: {
    width: 500,
    height: 500,
  },
  breathText: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    color:'whitesmoke'
  },
});