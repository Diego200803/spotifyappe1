// app/DashBoardScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Vibration,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashBoardScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAccessButton = () => {
    Vibration.vibrate(40);
    router.push('/auth');
  };

  return (
    <LinearGradient colors={['#121212', '#000']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="spotify" size={70} color="#1DB954" />
          </View>
          <Text style={styles.title}>Spotify</Text>
          <Text style={styles.subtitle}>Tu espacio musical personalizado</Text>
        </Animated.View>

        <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
          <Text style={styles.welcomeText}>Millones de canciones</Text>
          <Text style={styles.descriptionText}>
            Inicia sesión o crea una cuenta para comenzar a disfrutar de tu música favorita
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonSection,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleAccessButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1DB954', '#1ED760']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="log-in-outline" size={38} color="#fff" />
              <Text style={styles.buttonTitle}>Acceder</Text>
              <Text style={styles.buttonSubtitle}>
                Iniciar sesión o registrarse
              </Text>
              <View style={styles.buttonArrow}>
                <Ionicons name="arrow-forward" size={24} color="#1DB954" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={32} color="#1DB954" />
            <Text style={styles.infoTitle}>Seguro</Text>
            <Text style={styles.infoText}>Tus datos protegidos</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="flash" size={32} color="#1DB954" />
            <Text style={styles.infoTitle}>Rápido</Text>
            <Text style={styles.infoText}>Conexión instantánea</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={32} color="#1DB954" />
            <Text style={styles.infoTitle}>Comunidad</Text>
            <Text style={styles.infoText}>Millones de usuarios</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(29,185,84,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(29,185,84,0.3)',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  mainContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 18,
    padding: 25,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonSection: {
    marginBottom: 40,
  },
  mainButton: {
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonGradient: {
    padding: 25,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  buttonSubtitle: {
    fontSize: 15,
    color: '#eee',
    opacity: 0.8,
    marginTop: 5,
  },
  buttonArrow: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 15,
  },
  infoCard: {
    backgroundColor: '#181818',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 100,
    flex: 1,
    maxWidth: 110,
    borderColor: '#1DB95430',
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 4,
    textAlign: 'center',
  },
});