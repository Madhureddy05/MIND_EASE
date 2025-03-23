import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const foodRecommendations = [
  { category: "Magnesium-Rich Foods", items: "Dark Chocolate , Spinach, Almonds, Bananas " },
  { category: "Omega-3 Fatty Acids",items: "Salmon, Chia Seeds, Walnuts" },
  { category: "Complex Carbohydrates", items: "Oats, Quinoa, Brown Rice, Sweet Potatoes" },
  { category: "Probiotic & Fermented Foods",  items: "Yogurt, Kefir, Kimchi, Sauerkraut, Miso" },
  { category: "Tryptophan-Rich Foods", items: "Turkey, Chicken, Eggs, Cheese" },
  { category: "Vitamin B-Complex Foods", items: "Avocados, Legumes, Whole Grains" },
  { category: "Herbal Teas", items: "Chamomile Tea, Green Tea, Peppermint Tea" },
  { category: "Hydrating Foods",  items: "Cucumbers, Watermelon , Oranges " },
  { category: "Foods to Avoid",  items: "Caffeine , Processed Sugary Foods , Alcohol , Fried & Junk Foods " },
];

const FoodScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Best Foods for Anxiety</Text>
      <FlatList
        data={foodRecommendations}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.emoji} {item.category}</Text>
            <Text style={styles.cardText}>{item.items}</Text>
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

export default FoodScreen;
