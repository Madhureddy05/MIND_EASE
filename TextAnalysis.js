import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  function analyzeText(text) {
    const depressionKeywords = [
      'sad', 'hopeless', 'lonely', 'suicidal', 'down', 'blue', 'empty', 'lost', 'tearful',
      'grief', 'sorrow', 'anguish', 'bleak', 'dismal', 'unhappy', 'discouraged', 'broken', 'regret',
      'hurt', 'mourning', 'weepy', 'heartbroken', 'despairing', 'woeful', 'mournful', 'pained',
      'upset', 'low', 'glum', 'sombre', 'ache', 'heavy', 'burden', 'crushed'
    ];

    const anxietyKeywords = [
      'nervous', 'worried', 'panicked', 'restless', 'tense', 'anxious', 'fearful', 'scared', 'stressed',
      'insecure', 'threatened', 'alarmed', 'distressed', 'edgy', 'shaky', 'uptight', 'dread',
      'trembling', 'sweating', 'breathless', 'trapped', 'afraid', 'fidgety', 'restless', 'shivering',
      'timid', 'tremulous', 'agitated', 'fretful'
    ];

    let depressionScore = 0;
    let anxietyScore = 0;

    depressionKeywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) {
        depressionScore++;
      }
    });

    anxietyKeywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) {
        anxietyScore++;
      }
    });

    if (depressionScore > 0 || anxietyScore > 0) {
      setAnalysisResult(`Possible mental health issue detected. Depression Score: ${depressionScore}, Anxiety Score: ${anxietyScore}`);
    } else {
      setAnalysisResult('No mental health issue detected based on simple keyword matching.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mental Health Analysis</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text to analyze"
        onChangeText={setTextInput}
        value={textInput}
        multiline
      />

      <Button title="Analyze Text" onPress={() => analyzeText(textInput)} />
      <Text style={styles.result}>{analysisResult}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '90%', height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, textAlignVertical: 'top' },
  result: { marginTop: 10, textAlign: 'center' },
});