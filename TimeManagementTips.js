import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const timeManagementTips = [
  { title: " Time Management Tips for Students ", description: "Here are practical, no-BS time management strategies that actually work! " },
  { title: " 1. Use the \"2-Minute Rule\" for Procrastination", description: " If a task takes less than 2 minutes, do it immediately.\nIf it takes longer, schedule it into your day." },
  { title: " 2. Try the \"Pomodoro\" Hack (Study Smarter, Not Harder!)", description: "25 mins of deep work → 5 mins break (Repeat 4x, then take a longer break).\n Use apps like Forest, Pomodone, or StudyWithMe on YouTube." },
  { title: " 3. Plan Your Day in Advance (Before Sleeping!)", description: " Write a mini to-do list for tomorrow before bed.\n Helps avoid morning decision fatigue." },
  { title: " 4. Prioritize with the \"Eisenhower Box\"", description: "Urgent & Important – Do it now.\n Important but Not Urgent – Schedule it.\n Urgent but Not Important – Delegate it.\ Not Urgent & Not Important – Ignore it." },
  { title: " 5. The \"Eat the Frog\" Method (Do Hard Tasks First!)", description: " Start your day with the hardest task first.\n Everything else will feel easier after that." },
  { title: " 6. Set Time Blocks (For Focus & Fun!)", description: " Assign specific time slots for study, socializing, self-care, and breaks." },
  { title: " 7. Reduce Distractions (Your Phone is a Trap!)", description: " Use Do Not Disturb mode while working.\n Apps like Freedom, Cold Turkey, or StayFocusd block distractions.\ Keep your phone out of reach during study sessions." },
  { title: "8. Use Sunday for a \"Reset Day\"", description: " Plan your week ahead.\n Organize notes, clean your space, and set goals." },
  { title: " 9. The \"1-3-5 Rule\" (Perfect for Overwhelmed Days!)", description: " Set: 1 big goal, 3 medium tasks, 5 small tasks.\nKeeps your to-do list realistic & doable." },
  { title: "10. Reward Yourself (Because You Deserve It!)", description: " Finish a task? Treat yourself! (Snack, meme break, or fav song).\n Makes studying less painful & more fun." },
];

const TimeManagementTips = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Time Management Tips for Students </Text>
      <FlatList
        data={timeManagementTips}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
          </View>
        )}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#546C75', padding: 20 },
  title: { fontSize: 19, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#fff' },
  card: { backgroundColor: '#A7D8DE', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  cardText: { fontSize: 16, color: '#333', marginTop: 5 },
  backButton: { marginTop: 20, alignSelf: 'center', backgroundColor: '#007AFF', padding: 10, borderRadius: 8, width: '50%', alignItems: 'center' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default TimeManagementTips;