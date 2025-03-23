import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const depressionTips = [
  { title: " 1. The 'Tiny Wins' Strategy", description: "Break tasks into tiny steps and celebrate any progress, no matter how small!" },
  { title: " 2. Make a 'Non-Negotiable' Daily Routine", description: "Stick to basic self-care habits: wake up at the same time daily, eat 2 proper meals, spend 5 mins outdoors, shower & change clothes." },
  { title: " 3. Move Your Body (Even for 5 Minutes)", description: "Stretch in bed, walk around the house, or dance to your favorite song to boost energy." },
  { title: " 4. Get Sunlight ASAP", description: "10-15 mins of morning sunlight boosts serotonin. If stuck indoors, sit by a window or use bright lighting." },
  { title: " 5. 'Fake' Social Interaction (It Works!)", description: "Text a friend, send memes, join a Discord server, or watch a funny podcast for a social boost." },
  { title: " 6. Listen to 'Upbeat' Music", description: "Avoid slow, sad music. Try lo-fi beats, upbeat Bollywood/K-pop, or nature sounds." },
  { title: " 7. 'Brain Dump' Writing", description: "Write down your feelings freely. Helps clear your mind and stop overthinking. End with one good thing from today!" },
  { title: " 8. Limit Doomscrolling", description: "Reduce time on negative news and toxic social media. Follow uplifting content instead." },
  { title: " 9. Eat Mood-Boosting Foods", description: "Eat bananas (natural serotonin booster), dark chocolate (reduces stress hormones), and nuts & seeds (brain fuel!)." },
  { title: " 10. Seek Help (You're Not Alone!)", description: "Talk to a trusted friend, mentor, or therapist. If talking feels hard, text them instead." },
];

const DepressionTips = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Depression Management Tips</Text>
      <FlatList
        data={depressionTips}
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

export default DepressionTips;