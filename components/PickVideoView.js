import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "./VideoPlayer";

export default function PickVideoView() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  const sendVideo = async () => {
    const formData = new FormData();
    formData.append("video", {
      name: "video_upload",
      type: "video/mp4",
      uri: video,
    });

    const result = await fetch("http://121.138.83.4:80/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }).catch((error) => console.log(error));

    console.log(String(result));

    console.log("upload success!");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="동영상을 선택해주세요" onPress={pickVideo} />
      {video && <VideoPlayer uri={video} />}
      <Button title="보내기" onPress={sendVideo} />
    </View>
  );
}
