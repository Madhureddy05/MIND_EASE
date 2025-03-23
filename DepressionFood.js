import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const depressionFoods = [
  { title: " Omega-3 Fatty Acids", description: "Supports Brain Function & Reduces Inflammation\n Fatty Fish (salmon, sardines, mackerel)\n Chia Seeds, Flaxseeds, Walnuts" },
  { title: " Complex Carbs", description: "Boosts Serotonin, the 'Feel-Good' Hormone\nWhole Grains (oats, quinoa, brown rice)\n Sweet Potatoes, Legumes (Beans, Lentils, Chickpeas)\n Bananas  (rich in tryptophan)" },
  { title: " Dark Chocolate", description: "Increases Serotonin & Dopamine\n Aim for 70% or higher cocoa content" },
  { title: " Leafy Greens", description: "Rich in Folate & Antioxidants\n Spinach, Kale, Broccoli" },
  { title: " Fermented Foods", description: "Supports Gut Health, Linked to Mood Regulation\n Yogurt (with live cultures), Kimchi, Sauerkraut" },
  { title: " Nuts & Seeds", description: "Rich in Magnesium & Healthy Fats\n Almonds, Cashews, Sunflower Seeds, Pumpkin Seeds" },
  { title: " Protein-Rich Foods", description: "Boosts Dopamine & Serotonin Production\n Eggs , Lean Chicken, Turkey (High in Tryptophan)" },
  { title: " Berries", description: "Powerful Antioxidants Help Reduce Stress\n Blueberries, Strawberries, Blackberries" },
  { title: " What to Limit", description: " Processed & Sugary Foods (can cause mood swings)\n Excess Caffeine (can increase anxiety)\n Alcohol (can worsen depressive symptoms)" },
];

const DepressionFood = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mood-Boosting Foods for Depression</Text>
      <FlatList
        data={depressionFoods}
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

export default DepressionFood;
