import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import axios from "axios";
import { get, ref } from "firebase/database";
import { database } from "./firebase";
import Toast from "react-native-toast-message";

const forgetpassword = () => {
  const [userName, setUsername] = useState(useLocalSearchParams()["username"]);

  const forgetPass = async () => {
    try {
      const snapshot = await get(ref(database, `users/${userName}`));
      const value = snapshot.val();
      const email_ = value["email"];

      const response = await axios.post(
        "https://resetpasswordinstagram.vercel.app/resetpassword",
        {
          username: userName,
          email: email_,
        }
      );

      Toast.show({
        type: "success",
        text1: "Link send successfully!",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to send link.",
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            color: "white",
            fontFamily: "Billabong",
            textAlign: "center",
            fontSize: 36,
            marginTop: "10%",
          }}
        >
          Forget Password
        </Text>

        <TextInput
          style={{
            marginTop: "50%",
            height: 45,
            color: "white",
            borderWidth: 1,
            margin: 10,
            borderRadius: 7,
            paddingLeft: 20,
            backgroundColor: "rgb(53, 57, 53)",
            fontFamily: "mon-sb",
          }}
          placeholder="Enter your username"
          value={userName}
          onChangeText={(value) => {
            setUsername(value);
          }}
        />
        <TouchableOpacity
          style={{
            marginTop: "3%",
            borderWidth: 1,
            borderColor: "rgb(135, 206, 235)",
            height: 45,
            borderRadius: 5,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(135, 206, 235)",
          }}
          onPress={forgetPass}
        >
          <Text style={{ fontFamily: "mon-sb", color: "white" }}>
            Send reset link
          </Text>
        </TouchableOpacity>
        <Toast />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default forgetpassword;
