// utils/authStorage.ts

interface UserData {
    name: string;
    email: string;
    password: string;
  }
  
  // Almacenamiento en memoria (se pierde al cerrar la app)
  let registeredUser: UserData | null = null;
  
  export const authStorage = {
    // Registrar usuario
    register: (name: string, email: string, password: string): boolean => {
      registeredUser = { name, email, password };
      return true;
    },
  
    // Verificar login
    login: (email: string, password: string): UserData | null => {
      if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        return registeredUser;
      }
      return null;
    },
  
    // Verificar si el email ya está registrado
    isEmailRegistered: (email: string): boolean => {
      return registeredUser !== null && registeredUser.email === email;
    },
  
    // Obtener usuario actual
    getCurrentUser: (): UserData | null => {
      return registeredUser;
    },
  
    // Cerrar sesión
    logout: (): void => {
      registeredUser = null;
    }
  };