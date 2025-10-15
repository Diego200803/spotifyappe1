// app/auth.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();
  const scaleLogin = new Animated.Value(1);
  const scaleRegister = new Animated.Value(1);

  const handlePressIn = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={['#121212', '#1DB954']} style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Vibration.vibrate(50);
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <FontAwesome name="spotify" size={100} color="#1DB954" />
          <Text style={styles.title}>Bienvenido a Spotify</Text>
          <Text style={styles.subtitle}>
            Inicia sesión o crea tu cuenta para disfrutar tu música
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Botón de Login */}
          <Animated.View style={{ transform: [{ scale: scaleLogin }] }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                Vibration.vibrate(50);
                router.push('/login');
              }}
              activeOpacity={0.8}
              onPressIn={() => handlePressIn(scaleLogin)}
              onPressOut={() => handlePressOut(scaleLogin)}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="log-in-outline" size={40} color="#fff" />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonTitle}>Iniciar Sesión</Text>
                  <Text style={styles.buttonDescription}>
                    Accede a tu cuenta
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={28} color="#fff" />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Botón de Registro */}
          <Animated.View style={{ transform: [{ scale: scaleRegister }] }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                Vibration.vibrate(50);
                router.push('/register');
              }}
              activeOpacity={0.8}
              onPressIn={() => handlePressIn(scaleRegister)}
              onPressOut={() => handlePressOut(scaleRegister)}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="person-add-outline" size={40} color="#1DB954" />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonTitleGreen}>Crear Cuenta</Text>
                  <Text style={styles.buttonDescriptionGreen}>
                    Regístrate gratis
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={28} color="#1DB954" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="shield-checkmark" size={28} color="#fff" />
            <Text style={styles.featureText}>Seguro</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="flash" size={28} color="#fff" />
            <Text style={styles.featureText}>Rápido</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="heart" size={28} color="#fff" />
            <Text style={styles.featureText}>Confiable</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 20,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  registerButton: {
    borderColor: '#1DB954',
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  buttonTitleGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 5,
  },
  buttonDescriptionGreen: {
    fontSize: 14,
    color: '#1DB954',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  feature: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});