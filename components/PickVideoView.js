import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "./VideoPlayer";
import * as Sharing from 'expo-sharing';

export default function PickVideoView() {
  const [video, setVideo] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  // 비디오를 업로드 한 후 이미지를 보여주는 페이지로 가기 위해
  const navigation = useNavigation();

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

  useEffect(() => {
    (async () => {
      const isAvailable = await Sharing.isAvailableAsync();
      setIsSharing(isAvailable);
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
    /*
    url 에서 마지막 파일명 뽑아내기
     "uri": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/
    %2540anonymous%252Fnavigation-84eed0c0-4b7c-4af6-9cfd-06f2f6d74752
    /ImagePicker/57a59751-2f15-485c-b4c8-d29447bf5d5e.mp4",
    */
    const videoName = video.split('/').slice(-1)[0]
    console.log(videoName)
    formData.append("video", {
      name: videoName,
      type: "video/mp4",
      uri: video,
    });

    const res = await fetch("http://121.138.83.4:80/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .catch((error) => console.log(error));

    const data = await res.json()
    console.log(data)
    console.log(typeof data);
    console.log("ShowImage 페이지로 이동")
    
    navigation.navigate('ShowImages', {
      data: data
    });
  };

  const shareVideo = () => {
    Sharing.shareAsync(video, {
      mimeType: "video/mp4",
      dialogTitle: "공유해보세요",
    })
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="동영상을 선택해주세요" onPress={pickVideo} />
      {video && <VideoPlayer uri={video} />}
      <Button title="보내기" onPress={sendVideo} />
      {isSharing && <Button title="공유하기" onPress={shareVideo} />}
    </View>
  );
}
