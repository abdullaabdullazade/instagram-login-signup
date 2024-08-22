import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { storage } from "./firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system"; // Yeni əlavə

const SelectProfilePhoto = () => {
  const { username } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const continueProgress = async () => {
    let fileName;
    let blob;

    if (selectedImage) {
      const fileUri = selectedImage;
      const response = await fetch(fileUri);
      blob = await response.blob();
      fileName = `${username}.jpg`;
    }

    const storageRef = ref(storage, `profile_photos/${fileName}`);

    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Şəkil uğurla yükləndi:", downloadURL);
        router.push({
          pathname: "/profile",
          params: { username: downloadURL },
        });
        await AsyncStorage.setItem("username", username);
      })
      .catch((error) => {
        console.error("Şəkil yüklənərkən xəta baş verdi:", error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          color: "white",
          fontFamily: "mon-sb",
          fontSize: 20,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Welcome {username}!
      </Text>
      <View style={{ marginTop: "20%" }}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: 174,
              height: 174,
              borderRadius: 87,
              alignSelf: "center",
            }}
          />
        ) : (
          <FontAwesome5
            name="user-circle"
            size={174}
            color="white"
            style={{
              alignSelf: "center",
            }}
          />
        )}
      </View>
      {selectedImage ? (
        <TouchableOpacity
          style={{
            marginTop: "20%",
            margin: 20,
            borderWidth: 1,
            borderColor: "rgb(135, 206, 235)",
            height: 45,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(135, 206, 235)",
          }}
          onPress={continueProgress}
        >
          <Text>Continue</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            marginTop: "20%",
            margin: 20,
            borderWidth: 1,
            borderColor: "rgb(135, 206, 235)",
            height: 45,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(135, 206, 235)",
          }}
          onPress={pickImage}
        >
          <Text>Select photo from Gallery</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={continueProgress}
      >
        <Text style={{ color: "rgb(135, 206, 235)" }}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectProfilePhoto;
