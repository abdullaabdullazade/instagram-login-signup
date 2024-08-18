import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { router } from "expo-router";
const index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  /*
   <TouchableOpacity>
          <AntDesign
            name="left"
            size={24}
            color="white"
            style={{ marginLeft: 10, marginTop: 10 }}
          />
        </TouchableOpacity>
  */

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
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

          <View style={{ padding: 10, paddingBottom: 0 }}>
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
              onChangeText={(username) => setUsername(username)}
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
              onChangeText={(password) => setPassword(password)}
              defaultValue={password}
            />
            <TouchableOpacity>
              <Text
                style={{
                  color: "rgb(135, 206, 235)",
                  alignSelf: "flex-end",
                  paddingRight: 10,
                  fontFamily: "mon-sb",
                }}
              >
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: "5%", padding: 20 }}>
            <TouchableOpacity
              style={{
                marginTop: "100px",
                borderWidth: 1,
                borderColor: "rgb(135, 206, 235)",
                height: 45,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(135, 206, 235)",
              }}
              onPress={handleLoginPress}
              disabled={loading}
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
                  Log in
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                borderBottomColor: "grey",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={{
                fontFamily: "mon-sb",
                color: "grey",
                marginHorizontal: 10,
              }}
            >
              OR
            </Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "grey",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "grey",
                marginTop: 30,
              }}
            >
              Don't have an account?{" "}
              <TouchableOpacity
                onPress={() => {
                  router.push("/signup");
                }}
              >
                <Text
                  style={{ color: "rgb(135, 206, 235)", textAlign: "center" }}
                >
                  Sign up.
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default index;
