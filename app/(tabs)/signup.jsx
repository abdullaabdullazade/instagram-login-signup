import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { database } from "./firebase";
import Toast from "react-native-toast-message";
import PhoneInput from "react-native-phone-input";
import { ref, get, set } from "firebase/database";
import { router } from "expo-router";

const Signup = () => {
  const [numberoremail, setNumberOrEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const signUp = async () => {
    if (!validateEmail(numberoremail)) {
      setIsEmailValid(false);
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email.",
      });
      return;
    }

    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);
    const data = snapshot.val() || {};

    const usernames = Object.values(data).map((user) => user.username);
    const gmails = Object.values(data).map((user) => user.email);
    const phoneNumbers = Object.values(data).map((user) => user.phoneNumber);

    if (
      date.getFullYear() > new Date().getFullYear() ||
      new Date().getFullYear() - date.getFullYear() < 17
    ) {
      Toast.show({
        type: "error",
        text1: "Age problem",
        text2: "Your age must be 16+",
      });
    } else if (usernames.includes(username)) {
      Toast.show({
        type: "error",
        text1: "Username already exists",
        text2: "Change your username.",
      });
    } else if (
      gmails.includes(numberoremail) ||
      phoneNumbers.includes(phoneNumber)
    ) {
      Toast.show({
        type: "error",
        text1: "This email or phone number already exists",
        text2: "Change your email or phone number.",
      });
    } else if (!this.phone.isValidNumber()) {
      Toast.show({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Please enter a valid phone number.",
      });
    } else if (password.length < 6) {
      console.log(password.length);
      Toast.show({
        type: "error",
        text1: "Password error",
        text2: "Password length must be 6+",
      });
    } else if (fullname.length < 6) {
      Toast.show({
        type: "error",
        text1: "Name error",
        text2: "Name length must be 6+",
      });
    } else {
      await set(ref(database, "users/" + username), {
        username: username,
        email: numberoremail,
        fullName: fullname,
        phoneNumber: phoneNumber,
        age: date.toLocaleDateString(),
        password: password,
      });
      router.push({ pathname: "profilephoto", params: { username: username } });
    }
    return;
  };

  const handleSignUp = async () => {
    setLoading(true);
    await signUp();
    setLoading(false);
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Text
            style={{
              color: "white",
              fontFamily: "Billabong",
              textAlign: "center",
              fontSize: 36,
              marginTop: "40%",
            }}
          >
            Instagram
          </Text>
          <View style={{ flex: 1, padding: 9 }}>
            <TextInput
              style={{
                height: 45,
                color: "white",
                borderWidth: 1,
                margin: 10,
                borderRadius: 7,
                paddingLeft: 20,
                backgroundColor: "rgb(53, 57, 53)",
                fontFamily: "mon-sb",
                borderColor: isEmailValid ? "gray" : "red",
              }}
              placeholder="Email"
              placeholderTextColor="gray"
              onChangeText={(data) => {
                setNumberOrEmail(data.trim());
                setIsEmailValid(validateEmail(data.trim()));
              }}
              defaultValue={numberoremail}
            />

            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              value={phoneNumber}
              onChangePhoneNumber={(number) => {
                setPhoneNumber(number);
              }}
              style={{
                height: 45,
                color: "white",
                borderWidth: 1,
                margin: 10,
                borderRadius: 7,
                paddingLeft: 20,
                backgroundColor: "rgb(53, 57, 53)",
                fontFamily: "mon-sb",
              }}
              textProps={{
                placeholder: "Phone Number",
                placeholderTextColor: "gray",
              }}
              initialCountry={"us"}
            />
            <TextInput
              style={{
                height: 45,
                color: "white",
                borderWidth: 1,
                margin: 10,
                borderRadius: 7,
                paddingLeft: 20,
                backgroundColor: "rgb(53, 57, 53)",
                fontFamily: "mon-sb",
              }}
              placeholder="Full Name"
              placeholderTextColor="gray"
              onChangeText={(data) => setFullName(data)}
              defaultValue={fullname}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={{
                  height: 45,
                  color: "white",
                  borderWidth: 1,
                  margin: 10,
                  borderRadius: 7,
                  paddingLeft: 20,
                  backgroundColor: "rgb(53, 57, 53)",
                  fontFamily: "mon-sb",
                }}
                placeholder="Birthday"
                placeholderTextColor="gray"
                value={date.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}

            <TextInput
              style={{
                height: 45,
                color: "white",
                borderWidth: 1,
                margin: 10,
                borderRadius: 7,
                paddingLeft: 20,
                backgroundColor: "rgb(53, 57, 53)",
                fontFamily: "mon-sb",
              }}
              placeholder="Username"
              placeholderTextColor="gray"
              onChangeText={(data) => setUsername(data.trim())}
              defaultValue={username}
            />

            <TextInput
              style={{
                height: 45,
                color: "white",
                borderWidth: 1,
                margin: 10,
                borderRadius: 7,
                paddingLeft: 20,
                backgroundColor: "rgb(53, 57, 53)",
                fontFamily: "mon-sb",
              }}
              placeholder="Password"
              placeholderTextColor="gray"
              onChangeText={(data) => setPassword(data)}
              secureTextEntry={true}
              defaultValue={password}
            />
          </View>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgb(135, 206, 235)",
              backgroundColor: "rgb(135, 206, 235)",
              margin: 20,
              height: 40,
              borderRadius: 6,
            }}
            onPress={handleSignUp}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontFamily: "mon-sb",
                  textAlign: "center",
                }}
              >
                Sign up
              </Text>
            )}
          </TouchableOpacity>
          <Toast />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Signup;
