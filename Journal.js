import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Alert, StyleSheet, 
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, 
  ScrollView, TouchableOpacity
} from "react-native";
import LottieView from "lottie-react-native";
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [userId, setUserId] = useState(null);
  const [journals, setJournals] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const getOrCreateUserId = async () => {
    try {
      let storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        storedUserId = uuid.v4();
        await AsyncStorage.setItem("userId", storedUserId);
      }
      setUserId(storedUserId);
    } catch (error) {
      console.error("Error generating user ID:", error);
    }
  };

  useEffect(() => {
    getOrCreateUserId();
  }, []);

  const saveJournalEntry = async () => {
    if (!entry.trim()) {
      Alert.alert("Error", "Journal entry cannot be empty.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User ID not found. Please try again.");
      return;
    }

    Alert.alert("Success", "Journal entry saved!");
    setEntry("");
    Keyboard.dismiss();

    try {
      await addDoc(collection(db, "journals"), {
        userId: userId,
        entry: entry,
        timestamp: Timestamp.now(),
      });
      fetchJournalEntries();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert("Error", "Failed to save entry. Try again.");
    }
  };

  const fetchJournalEntries = async () => {
    if (!userId) return;

    try {
      const q = query(collection(db, "journals"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs
        .filter((doc) => doc.data().userId === userId)
        .map((doc) => ({
          id: doc.id,
          entry: doc.data().entry,
          timestamp: doc.data().timestamp.toDate().toLocaleString(),
        }));

      setJournals(entries);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const deleteJournalEntry = async (entryId) => {
    try {
      await deleteDoc(doc(db, "journals", entryId));
      Alert.alert("Deleted", "Journal entry removed successfully.");
      fetchJournalEntries();
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error", "Failed to delete entry. Try again.");
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      fetchJournalEntries();
    }
    setShowHistory(!showHistory);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            
            {/* Lottie Animation */}
            <View style={styles.animationContainer}>
              <LottieView 
                source={require("../assets/journal_an.json")} 
                autoPlay 
                loop 
                style={styles.animation}
              />
            </View>

            <Text style={styles.title}>Write Your Journal</Text>
            <TextInput
              style={styles.input}
              placeholder="How was your day?"
              placeholderTextColor="white"
              multiline
              numberOfLines={5}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
              value={entry}
              onChangeText={setEntry}
            />
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={saveJournalEntry}>
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
                <Text style={styles.historyButtonText}>
                  {showHistory ? "Hide History" : "View History"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Journal History */}
            {showHistory && (
              <View style={styles.historyContainer}>
                <ScrollView contentContainerStyle={styles.historyContent} nestedScrollEnabled>
                  {journals.map((item) => (
                    <View key={item.id} style={styles.journalItem}>
                      <View style={styles.entryContainer}>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                        <Text style={styles.entryText}>{item.entry}</Text>
                      </View>
                      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteJournalEntry(item.id)}>
                        <Text style={styles.deleteButtonText}>🗑</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  innerContainer: { 
    padding: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: '#546C75',
    flex: 1,
  },
  animationContainer: { 
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  animation: { width: 700, height: 200 }, 
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "white" 
  },
  input: { 
    width: "100%", 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "white",
    borderRadius: 8, 
    height: 150, 
    textAlignVertical: "top", 
    marginBottom: 10,
    backgroundColor: "#546C75",
    color: "white"
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#A7D8DE",
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: { color: "black", fontSize: 16, fontWeight: "bold" },

  historyButton: {
    backgroundColor: "#A7D8DE",
    padding: 15,
    borderRadius: 10,
  },
  historyButtonText: { color: "black", fontSize: 16, fontWeight: "bold" },

  historyContainer: {
    width: "100%",
    maxHeight: 300, 
    backgroundColor: "#A7D8DE",
    borderRadius: 10,
    padding: 10,
  },
  historyContent: {
    paddingBottom: 10,
  },

  journalItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5, 
    backgroundColor: "#fff"
  },

  entryContainer: { 
    flex: 1, 
    marginRight: 10 
  },

  deleteButton: { 
    backgroundColor: "#FFFFFF", 
    padding: 10, 
    borderRadius: 10,
    width: 40, 
    height: 40, 
    justifyContent: "center",
    alignItems: "center"
  },

  deleteButtonText: { color: "#fff", fontWeight: "bold" },
});

export default Journal;