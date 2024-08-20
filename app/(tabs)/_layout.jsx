import { Stack } from "expo-router";
import React from "react";
export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "SignIn",
        }}
      />
      <Stack.Screen name="profilephoto" />
      <Stack.Screen name="mainPage" />
    </Stack>
  );
}
