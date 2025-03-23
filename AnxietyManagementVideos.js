import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const AnxietyManagementVideos = ({ navigation }) => {
  // YouTube video IDs for anxiety management
  const videos = [
    {
      id: 'DKH5yp4P40I',
      title: 'Quick Anxiety Relief Tips',
      thumbnail: 'https://img.youtube.com/vi/DKH5yp4P40I/hqdefault.jpg',
      
    },
    {
      id: '_KuUXz5gjgw',
      title: 'Tips for Anxiety',
      thumbnail: 'https://img.youtube.com/vi/_KuUXz5gjgw/hqdefault.jpg',
      
    },
    {
      id: '30VMIEmA114',
      title: '5-4-3-2-1 Method',
      thumbnail: 'https://img.youtube.com/vi/30VMIEmA114/hqdefault.jpg',
      
    }
  ];

  // Function to render the video with WebView or open YouTube app
  const renderVideo = (videoId) => {
    if (Platform.OS === 'ios') {
      return (
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)}
        >
          <Image
            source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
            style={styles.thumbnail}
          />
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶️</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anxiety Management Videos</Text>
      <Text style={styles.subtitle}>Watch these videos to learn techniques to manage anxiety.</Text>
      
      <ScrollView style={styles.scrollContainer}>
        {videos.map((video, index) => (
          <View key={index} style={styles.videoCard}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            {renderVideo(video.id)}
            <Text style={styles.videoDescription}>{video.description}</Text>
          </View>
        ))}

       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#546C75',
    padding: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'white'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'gray',
    textAlign: 'center'
  },
  scrollContainer: {
    flex: 1,
  },
  videoCard: {
    backgroundColor: '#A7D8DE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden'
  },
  videoContainer: {
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 30,
  },
  videoDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default AnxietyManagementVideos;
