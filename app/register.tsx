// app/register.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  Vibration,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { setRegisteredUser } from './login';

// EMAIL VÁLIDO PARA REGISTRO
const VALID_EMAIL = 'spotify@music.com';

export default function RegisterScreen() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async (): Promise<void> => {
    // Validación: campos vacíos
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Validación: email válido
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido');
      return;
    }

    // Validación: solo el email específico
    if (email !== VALID_EMAIL) {
      Alert.alert(
        'Error',
        `Solo puedes registrarte con:\n${VALID_EMAIL}\n\nPero puedes elegir tu propia contraseña y nombre.`
      );
      return;
    }

    // Validación: longitud de contraseña
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    Vibration.vibrate(50);
    setLoading(true);

    setTimeout(() => {
      // Registrar usuario con la función
      setRegisteredUser(name, email, password);
      setLoading(false);
      
      // Navegar al login
      router.push('/login');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Vibration.vibrate(50);
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <FontAwesome name="spotify" size={36} color="#fff" />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>
          Regístrate gratis para empezar a escuchar
        </Text>

        {/* Botones sociales */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <View style={styles.googleIcon}>
              <Ionicons name="logo-google" size={22} color="#121212" />
            </View>
            <Text style={styles.socialButtonText}>Regístrate con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-facebook" size={22} color="#1877F2" />
            <Text style={styles.socialButtonText}>Regístrate con Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-apple" size={22} color="#FFFFFF" />
            <Text style={styles.socialButtonText}>Regístrate con Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Formulario */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>¿Cuál es tu correo electrónico?</Text>
            <TextInput
              style={styles.input}
              placeholder={VALID_EMAIL}
              placeholderTextColor="#727272"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crea una contraseña (tu elección)</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#727272"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#B3B3B3"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>¿Cómo deberíamos llamarte?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#727272"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Text style={styles.helperText}>Esto aparecerá en tu perfil.</Text>
          </View>

          <View style={styles.hintContainer}>
            <Ionicons name="information-circle" size={16} color="#1DB954" />
            <Text style={styles.hintText}>
              Email: {VALID_EMAIL} (elige tu nombre y contraseña)
            </Text>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#121212" />
            ) : (
              <Text style={styles.registerButtonText}>Registrarse</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerQuestion}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              router.push('/login');
            }}
          >
            <Text style={styles.footerLink}>Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsText}>
            Al hacer clic en Registrarse, aceptas los{' '}
            <Text style={styles.termsLink}>Términos y condiciones de uso</Text>{' '}
            de Spotify.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1DB954',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 34,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 28,
  },
  socialButton: {
    backgroundColor: '#181818',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 10,
  },
  googleIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 30,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#181818',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 12,
  },
  helperText: {
    color: '#B3B3B3',
    fontSize: 12,
    marginTop: 6,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  hintText: {
    color: '#1DB954',
    fontSize: 11,
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#1DB954',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  registerButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  footerQuestion: {
    color: '#B3B3B3',
    fontSize: 15,
  },
  footerLink: {
    color: '#FFFFFF',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  terms: {
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  termsText: {
    color: '#727272',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  termsLink: {
    color: '#1DB954',
    textDecorationLine: 'underline',
  },
});