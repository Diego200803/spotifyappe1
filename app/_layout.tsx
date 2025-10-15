// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,  // ← Esto oculta el header
          animation: 'fade',
          contentStyle: { backgroundColor: '#121212' },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }}  // ← Asegúrate de esto
        />
        <Stack.Screen 
          name="DashBoardScreen" 
          options={{ headerShown: false }}  // ← Y esto también
        />
        <Stack.Screen 
          name="auth" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="home" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </>
  );
}