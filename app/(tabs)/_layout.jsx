import { Stack } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SlideInDown } from "react-native-reanimated";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation:'slide_from_right'

      }}
      initialRouteName="profilephoto"
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
        }
        
      }
      />
      <Stack.Screen 
      name="profilephoto"
      />
    </Stack>
  );
}
