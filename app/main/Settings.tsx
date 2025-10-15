// app/main/Settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { logoutUser, getRegisteredUser } from '../login';  // ← CORREGIDO

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

export default function Settings({ visible, onClose }: SettingsProps) {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const currentUser = getRegisteredUser();

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleLogout = () => {
    Vibration.vibrate(50);
    logoutUser();
    onClose();
    router.replace('/');
  };

  const handleMenuItem = (action: string) => {
    Vibration.vibrate(30);
    switch (action) {
      case 'profile':
        console.log('Ir a perfil');
        onClose();
        break;
      case 'settings':
        console.log('Ir a configuración');
        onClose();
        break;
      case 'help':
        console.log('Ir a ayuda');
        onClose();
        break;
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.menuContainer,
            { opacity: fadeAnim }
          ]}
        >
          {/* Header del menú */}
          <View style={styles.menuHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#1DB954" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser?.name || 'Usuario'}</Text>
              <Text style={styles.userEmail}>{currentUser?.email || 'email@example.com'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Opciones del menú */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuItem('profile')}
          >
            <Ionicons name="person-outline" size={24} color="#fff" />
            <Text style={styles.menuItemText}>Ver perfil</Text>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuItem('settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
            <Text style={styles.menuItemText}>Configuración</Text>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuItem('help')}
          >
            <Ionicons name="help-circle-outline" size={24} color="#fff" />
            <Text style={styles.menuItemText}>Ayuda y soporte</Text>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Cerrar sesión */}
          <TouchableOpacity 
            style={styles.logoutItem}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#ff4444" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Versión 1.0.0</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#181818',
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#b3b3b3',
  },
  divider: {
    height: 1,
    backgroundColor: '#282828',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    color: '#ff4444',
    marginLeft: 15,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  footerText: {
    fontSize: 11,
    color: '#666',
  },
});