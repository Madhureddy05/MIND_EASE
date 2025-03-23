import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  "I feel down or depressed",
  "I have lost interest in activities I used to enjoy",
  "I feel tired or have little energy",
  "I have trouble concentrating",
  "I feel worthless or guilty",
  "I have trouble sleeping or sleep too much",
  "I have lost or gained weight without trying",
  "I feel restless or slowed down",
  "I have thoughts of self-harm or suicide",
  "I feel hopeless about the future"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const DepressionTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [previousScores, setPreviousScores] = useState([]);

  // Load previous scores from AsyncStorage
  useEffect(() => {
    const loadScores = async () => {
      try {
        const storedScores = await AsyncStorage.getItem('previousScores');
        if (storedScores) {
          setPreviousScores(JSON.parse(storedScores));
        }
      } catch (error) {
        console.error("Error loading scores", error);
      }
    };
    loadScores();
  }, []);

  // Save new scores to AsyncStorage
  const saveScores = async (newScores) => {
    try {
      await AsyncStorage.setItem('previousScores', JSON.stringify(newScores));
    } catch (error) {
      console.error("Error saving scores", error);
    }
  };

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = () => {
    const score = responses.reduce(
      (sum, response) => sum + (response !== null ? options.indexOf(response) : 0),
      0
    );
    let level = "Mild Depression";
    if (score > 30) level = "Severe Depression";
    else if (score > 15) level = "Moderate Depression";
    
    const newEntry = { score, level };
    
    // Update previous scores and save to AsyncStorage
    const updatedScores = [...previousScores, newEntry];
    setPreviousScores(updatedScores);
    saveScores(updatedScores);
    
    setResult({ level, score });
    // Reset responses for next test
    setResponses(Array(questions.length).fill(null));
    setCurrentIndex(0);
  };

  const getChartData = () => {
    return {
      labels: previousScores.map((_, index) => (index + 1).toString()),
      datasets: [
        {
          data: previousScores.map(entry => entry.score),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White line
          strokeWidth: 2,
        }
      ],
      legend: ["Score"] // Add legend
    };
  };

  return (
    <View style={styles.container}>
      {!result ? (
        <>
          <Text style={styles.title}>Do You Feel Depressed?</Text>
          <Text style={styles.question}>{questions[currentIndex]}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[
                  styles.optionButton, 
                  responses[currentIndex] === option && styles.selectedOption
                ]} 
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.navButtons}>
            {currentIndex > 0 && (
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => setCurrentIndex(currentIndex - 1)}
              >
                <Text style={styles.navButtonText}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity 
                style={[
                  styles.navButton, 
                  responses[currentIndex] === null && styles.disabledButton
                ]} 
                disabled={responses[currentIndex] === null}
                onPress={() => setCurrentIndex(currentIndex + 1)}
              >
                <Text style={styles.navButtonText}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={calculateResult}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultText}>Your Depression Level:</Text>
          <Text style={styles.resultLevel}>{result.level}</Text>
          <Text style={styles.resultScore}>Score: {result.score} / 40</Text>

          {previousScores.length > 0 && (
            <LineChart
              data={getChartData()}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#A7D8DE',
                backgroundGradientTo: '#546C75',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
                decimalPlaces: 0,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#A7D8DE"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              withDots={true}
              withShadow={false}
            />
          )}

          <TouchableOpacity
            style={styles.clearHistoryButton}
            onPress={() => {
              setPreviousScores([]);
              saveScores([]); // Clear the AsyncStorage as well
            }}
          >
            <Text style={styles.clearHistoryText}>Clear History</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#546C75' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#F5F5F5' 
  },
  question: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#F5F5F5' 
  },
  optionsContainer: { 
    flexDirection: 'column', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  optionButton: { 
    padding: 10, 
    marginVertical: 5, 
    width: 200, 
    backgroundColor: '#A7D8DE', 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  selectedOption: { 
    backgroundColor: '#546C75' 
  },
  optionText: { 
    color: '#000', 
    fontSize: 16 
  },
  navButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  navButton: { 
    backgroundColor: '#A7D8DE', 
    padding: 10, 
    borderRadius: 8, 
    width: 100, 
    alignItems: 'center' 
  },
  navButtonText: { 
    color: '#000', 
    fontSize: 16 
  },
  disabledButton: { 
    backgroundColor: '#cccccc', 
    opacity: 0.7 
  },
  submitButton: { 
    backgroundColor: '#A7D8DE', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 20, 
    width: 150, 
    alignItems: 'center' 
  },
  submitText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  resultContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  resultText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#F5F5F5' 
  },
  resultLevel: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#A7D8DE' 
  },
  resultScore: { 
    fontSize: 16, 
    color: '#F5F5F5', 
    marginTop: 5 
  },
  clearHistoryButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: 150,
    alignItems: 'center',
  },
  clearHistoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default DepressionTest;
