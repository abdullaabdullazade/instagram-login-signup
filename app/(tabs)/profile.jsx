import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocalSearchParams } from "expo-router";

const MainPage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const { username } = useLocalSearchParams();

  useEffect(() => {
    async function getImageUrl() {
      try {
        const imageRef = ref(storage, "profile_photos/" + username);

        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        setImageUrl(require("../../assets/images/noprofile.png"));
      }
    }

    getImageUrl();
  }, [username]);

  /*
  require int qaytarır
  əgər image olsa firebase-dən o zaman string olmalııdr

  */
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {imageUrl ? (
          <Image
            source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
