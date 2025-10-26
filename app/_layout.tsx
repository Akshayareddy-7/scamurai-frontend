import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/colors";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.dark.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.dark.background },
          animation: 'fade',
          animationDuration: 300,
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          name="login"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="register"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="dashboard"
          options={{
            animation: 'fade',
            gestureEnabled: false, // Prevent swipe back from dashboard
          }}
        />
        <Stack.Screen 
          name="game"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="chatbot"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="news"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="profile"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="leaderboard"
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after a brief delay to ensure everything is loaded
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
