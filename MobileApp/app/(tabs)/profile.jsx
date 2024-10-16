import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { database, storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocalSearchParams } from "expo-router";
import { ref as dbRef, get } from "firebase/database";
const MainPage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const { username } = useLocalSearchParams();

  const [posts, setPosts] = useState(0);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowering] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    async function getDatas() {
      try {
        const starCountRef = dbRef(
          database,
          "users/" + username.substring(0, username.length - 4)
        ); //First we detect path

        const snapshot = await get(starCountRef); //then we take path and we check it exitxs
        const data = snapshot.val();
        setPosts(data.posts || 0);
        setfollowers(data.followers || 0);
        setfollowering(data.following || 0);
        setName(data.fullName || "");
      } catch (e) {
      }
    }

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
    getDatas();
  }, [username]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
          fontFamily: "mon-sb",
        }}
      >
        {username.substring(0, username.length - 4)}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          margin: 20,
        }}
      >
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginRight: 20,
            shadowColor: "white",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 30,
          }}
        >
          <Text style={styles.text}>
            {posts}
            {"\n"}Posts
          </Text>
          <Text style={styles.text}>
            {followers}
            {"\n"}Followers
          </Text>
          <Text style={styles.text}>
            {following}
            {"\n"}Following
          </Text>
        </View>
        <View style={{ position: "absolute", marginTop: 120, marginLeft: 10 }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "mon-sb",
              fontSize: 16,
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#f8f8f8",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 22,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default MainPage;
