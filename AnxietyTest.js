import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

const questions = [
  "I worry about things", "I anticipate the worst", "I cannot control my fears", "I am irritable",
  "I feel tense", "I get startled easily", "I break into tears without apparent reason", "I get tired quickly",
  "I am unable to relax", "I have racing thoughts", "My sleep is disturbed", "I do not wake up feeling rested",
  "I find it difficult to concentrate on tasks", "I can’t remember things", "I am fidgety", "My hands tremble",
  "I experience sudden chest pains or rapid heartbeat", "I feel like I cannot breathe or am breathing too fast",
  "My mouth goes dry", "I avoid certain places, activities, or situations"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const AnxietyTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [previousScores, setPreviousScores] = useState([]);

  // Load previous scores from AsyncStorage
  useEffect(() => {
    const loadPreviousScores = async () => {
      try {
        const storedData = await AsyncStorage.getItem('anxietyScores');
        if (storedData) {
          setPreviousScores(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load previous scores", error);
      }
    };
    loadPreviousScores();
  }, [result]);

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = async () => {
    const score = responses.reduce((sum, response) => sum + (response !== null ? options.indexOf(response) : 0), 0);
    let level = "Mild Anxiety";
    if (score > 40) level = "Severe Anxiety";
    else if (score > 25) level = "Moderate Anxiety";

    const newEntry = { score, level, date: new Date().toLocaleDateString() };

    try {
      const storedData = await AsyncStorage.getItem('anxietyScores');
      const pastScores = storedData ? JSON.parse(storedData) : [];
      const updatedScores = [...pastScores, newEntry];

      await AsyncStorage.setItem('anxietyScores', JSON.stringify(updatedScores));

      setPreviousScores(updatedScores);
      setResult({ level, score });
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  // Clear history function
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('anxietyScores');
      setPreviousScores([]);
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#546C75' }}>
      {!result ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#F5F5F5' }}>
            Do You Feel Anxious?
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#F5F5F5' }}>
            {questions[currentIndex]}
          </Text>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  width: 200,
                  backgroundColor: responses[currentIndex] === option ? '#546C75' : '#A7D8DE',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={() => handleSelect(option)}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#A7D8DE',
                  padding: 10,
                  borderRadius: 8,
                  width: 100,
                  alignItems: 'center',
                }}
                onPress={() => setCurrentIndex(currentIndex - 1)}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: responses[currentIndex] !== null ? '#A7D8DE' : '#cccccc',
                  opacity: responses[currentIndex] !== null ? 1 : 0.7,
                  padding: 10,
                  borderRadius: 8,
                  width: 100,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (responses[currentIndex] !== null) {
                    setCurrentIndex(currentIndex + 1);
                  }
                }}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: '#A7D8DE',
                  padding: 15,
                  borderRadius: 8,
                  marginTop: 20,
                  width: 150,
                  alignItems: 'center',
                }}
                onPress={calculateResult}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F5F5F5' }}>Your Anxiety Level:</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#A7D8DE' }}>{result.level}</Text>
          <Text style={{ fontSize: 16, color: '#F5F5F5', marginTop: 5 }}>Score: {result.score} / 80</Text>

          {/* Graph with Numbered X-Axis */}
          {previousScores.length > 1 && (
            <LineChart
              data={{
                labels: previousScores.map((_, index) => (index + 1).toString()), // X-axis as 1, 2, 3, ...
                datasets: [{ data: previousScores.map(entry => entry.score) }],
              }}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#A7D8DE',
                backgroundGradientTo: '#546C75',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={{ marginTop: 20, borderRadius: 10 }}
            />
          )}

          {/* Clear History Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6B6B',
              padding: 10,
              borderRadius: 8,
              marginTop: 20,
              width: 150,
              alignItems: 'center',
            }}
            onPress={clearHistory}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Clear History</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AnxietyTest;
