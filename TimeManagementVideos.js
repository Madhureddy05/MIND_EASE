import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';


const TimeManagementVideos = ({ navigation }) => {
  // YouTube video IDs for time management
  const videos = [
    {
      id: 'tpB3BMlNrno',
      title: 'How to Manage Your Time Better',
      thumbnail: 'https://img.youtube.com/vi/iONDebHX9qk/hqdefault.jpg',
      //description: 'Learn practical strategies to improve your time management skills.'
    },
    {
      id: 'v-EmHvtCJDo',
      title: 'The Pomodoro Technique Explained',
      thumbnail: 'https://img.youtube.com/vi/VfBbJ9qJoMc/hqdefault.jpg',
      //description: 'A detailed explanation of how to use the Pomodoro Technique for better productivity.'
    },
    {
      id: 'iONDebHX9qk',
      title: 'Time Management Tips for Students',
      thumbnail: 'https://img.youtube.com/vi/ykSl2u1OYgI/hqdefault.jpg',
      //description: 'Effective time management strategies specifically designed for students.'
    }
  ];

  // Function to render the video with WebView or open YouTube app
  const renderVideo = (videoId) => {
    // On iOS, WebView might work better for embedded videos
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
      // For Android, we'll use thumbnail images that open the YouTube app when clicked
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
      <Text style={styles.title}>Time Management Videos</Text>
      <Text style={styles.subtitle}>Watch these videos to improve your time management skills</Text>
      
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
    textAlign: 'center',
    color:'white'
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



export default TimeManagementVideos;