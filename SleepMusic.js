import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const sounds = [
  { name: 'Rain', file: require('../assets/sounds/rain.mp3'), color: '#A7D8DE' },
  { name: 'Wind', file: require('../assets/sounds/wind.mp3'), color: '#A7D8DE' },
  { name: 'Night', file: require('../assets/sounds/night.mp3'), color: '#A7D8DE' },
  { name: 'White Noise', file: require('../assets/sounds/white_noise.mp3'), color: '#A7D8DE' }
];

const SleepMusic = () => {
  const [playingSound, setPlayingSound] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });
    };
    requestPermissions();
  }, []);

  const toggleSound = async (soundFile, index) => {
    try {
      if (playingSound) {
        await playingSound.stopAsync();
        await playingSound.unloadAsync();
        setPlayingSound(null);
      }

      if (currentPlaying === index) {
        setCurrentPlaying(null);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(soundFile, { shouldPlay: true });
      setPlayingSound(sound);
      setCurrentPlaying(index);

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
          setPlayingSound(null);
          setCurrentPlaying(null);
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>White Noise & Sleep Music</Text>
      <Text style={styles.subtitle}>Choose a sound to relax:</Text>

      {sounds.map((sound, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.button, { backgroundColor: sound.color }]} 
          onPress={() => toggleSound(sound.file, index)}
        >
          <Text style={styles.buttonText}>
            {currentPlaying === index ? '⏸️' : '▶️'} {sound.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#546C75',
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
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { 
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold',
  }
});

export default SleepMusic;
