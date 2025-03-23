import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const questions = [
  "I feel tense or restless",
  "I worry excessively about different things",
  "I feel down or depressed",
  "I have lost interest in activities I used to enjoy",
  "I feel tired or have little energy",
  "I get startled easily",
  "I feel worthless or guilty",
  "I have trouble concentrating",
  "I have trouble sleeping or sleep too much",
  "I experience sudden chest pains or rapid heartbeat",
  "I feel like I cannot breathe or am breathing too fast",
  "I have lost or gained weight without trying",
  "I avoid certain places, activities, or situations",
  "I feel hopeless about the future",
  "I have racing thoughts that I can't control",
  "I break into tears without apparent reason",
  "I feel fidgety or unable to sit still",
  "I feel like my mind is foggy or blank",
  "I have thoughts of self-harm or suicide",
  "I frequently anticipate the worst possible outcome"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const MentalHealthTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const API_URL = "http://172.16.30.206:5500/analyze";

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const goToNext = () => {
    if (responses[currentIndex] !== null) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const calculateResult = async () => {
    if (responses.includes(null)) {
      return; // Don't proceed if any questions are unanswered
    }
    
    setIsCalculating(true);
    
    try {
        console.log("Sending data to:", API_URL);
        console.log("Data being sent:", { responses });
        
        const response = await axios.post(API_URL, { responses }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 60000 // 60 second timeout
        });
        
        console.log("Response from server:", response.data);
        
        if (response.data.result) {
            setResult({ type: response.data.result });
        } else if (response.data.error) {
            setResult({ type: `Error: ${response.data.error}` });
        } else {
            setResult({ type: "Undefined response from server" });
        }
    } catch (error) {
        console.error("Error details:", error);
        if (error.response) {
            // The server responded with a status code outside the 2xx range
            console.error("Server responded with:", error.response.data);
            setResult({ type: `Server error: ${error.response.status}` });
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received");
            setResult({ type: "Could not connect to server. Check that the server is running and accessible." });
        } else {
            // Something happened in setting up the request
            console.error("Request setup error:", error.message);
            setResult({ type: `Request error: ${error.message}` });
        }
    } finally {
        setIsCalculating(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {isCalculating ? (
        <View style={styles.calculatingContainer}>
          <ActivityIndicator size="large" color="#F5F5F5" />
          <Text style={styles.calculatingText}>Calculating result... please wait</Text>
        </View>
      ) : !result ? (
        <>
          <Text style={styles.title}>Mental Health Assessment</Text>
          <Text style={styles.question}>{questions[currentIndex]}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.optionButton, responses[currentIndex] === option && styles.selectedOption]} 
                onPress={() => handleSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.navButtons}>
            {currentIndex > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={() => setCurrentIndex(currentIndex - 1)}>
                <Text style={styles.navButtonText}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity 
                style={[styles.navButton, responses[currentIndex] === null && styles.disabledButton]} 
                onPress={goToNext}
                disabled={responses[currentIndex] === null}>
                <Text style={styles.navButtonText}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.submitButton, responses.includes(null) && styles.disabledButton]} 
                onPress={calculateResult}
                disabled={responses.includes(null)}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Mental Health Status:</Text>
          <Text style={styles.resultGraph}>{result.type}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#546C75' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color:'#F5F5F5' },
  question: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color:'#F5F5F5' },
  optionsContainer: { flexDirection: 'column', alignItems: 'center', marginBottom: 20 },
  optionButton: { padding: 10, marginVertical: 5, width: 200, backgroundColor: '#A7D8DE', borderRadius: 5, alignItems: 'center' },
  selectedOption: { backgroundColor: '#546C75' },
  optionText: { color: '#000', fontSize: 16 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navButton: { backgroundColor: '#A7D8DE', padding: 10, borderRadius: 8, width: 100, alignItems: 'center' },
  navButtonText: { color: '#000', fontSize: 16 },
  disabledButton: { backgroundColor: '#cccccc', opacity: 0.7 },
  submitButton: { backgroundColor: '#A7D8DE', padding: 15, borderRadius: 8, marginTop: 20, width: 150, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 20, alignItems: 'center' },
  resultText: { fontSize: 18, fontWeight: 'bold' },
  resultGraph: { fontSize: 22, fontWeight: 'bold', color: '#A7D8DE' },
  calculatingContainer: { alignItems: 'center', justifyContent: 'center' },
  calculatingText: { marginTop: 20, fontSize: 18, color: '#A7D8DE' }
});
export default MentalHealthTest;