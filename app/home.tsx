// app/home.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Vibration,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getRegisteredUser, logoutUser } from './login';

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Usuario');

  useEffect(() => {
    // Obtener el nombre del usuario registrado
    const currentUser = getRegisteredUser();
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  const handleLogout = () => {
    Vibration.vibrate(50);
    logoutUser();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="spotify" size={32} color="#1DB954" />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hola, {userName}</Text>
          <Text style={styles.subGreeting}>¿Qué quieres escuchar hoy?</Text>
        </View>

        {/* Recent Plays */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reproducido recientemente</Text>
          <View style={styles.recentGrid}>
            <TouchableOpacity style={styles.recentCard}>
              <View style={styles.recentCardImage}>
                <Ionicons name="musical-notes" size={32} color="#1DB954" />
              </View>
              <Text style={styles.recentCardText}>Daily Mix 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recentCard}>
              <View style={styles.recentCardImage}>
                <Ionicons name="heart" size={32} color="#1DB954" />
              </View>
              <Text style={styles.recentCardText}>Tus me gusta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recentCard}>
              <View style={styles.recentCardImage}>
                <Ionicons name="time" size={32} color="#1DB954" />
              </View>
              <Text style={styles.recentCardText}>Descubrir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recentCard}>
              <View style={styles.recentCardImage}>
                <Ionicons name="radio" size={32} color="#1DB954" />
              </View>
              <Text style={styles.recentCardText}>Radio</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Playlists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus playlists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} style={styles.playlistCard}>
                <View style={styles.playlistImage}>
                  <Ionicons name="musical-note" size={40} color="#1DB954" />
                </View>
                <Text style={styles.playlistTitle}>Playlist {item}</Text>
                <Text style={styles.playlistSubtitle}>50 canciones</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendado para ti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.recommendedCard}>
                <View style={styles.recommendedImage}>
                  <Ionicons name="disc" size={50} color="#1DB954" />
                </View>
                <Text style={styles.recommendedTitle}>Álbum {item}</Text>
                <Text style={styles.recommendedArtist}>Artista Popular</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Player Bar */}
      <View style={styles.playerBar}>
        <View style={styles.playerInfo}>
          <View style={styles.playerImageSmall}>
            <Ionicons name="musical-note" size={20} color="#1DB954" />
          </View>
          <View>
            <Text style={styles.playerTitle}>Nombre de la canción</Text>
            <Text style={styles.playerArtist}>Artista</Text>
          </View>
        </View>
        <View style={styles.playerControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: '#b3b3b3',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  recentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
  },
  recentCard: {
    backgroundColor: '#282828',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: 8,
  },
  recentCardImage: {
    width: 50,
    height: 50,
    backgroundColor: '#181818',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  recentCardText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  playlistCard: {
    width: 150,
    marginLeft: 20,
  },
  playlistImage: {
    width: 150,
    height: 150,
    backgroundColor: '#282828',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  playlistSubtitle: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  recommendedCard: {
    width: 140,
    marginLeft: 20,
  },
  recommendedImage: {
    width: 140,
    height: 140,
    backgroundColor: '#282828',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendedArtist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  playerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#181818',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerImageSmall: {
    width: 45,
    height: 45,
    backgroundColor: '#181818',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  playerArtist: {
    color: '#b3b3b3',
    fontSize: 11,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});