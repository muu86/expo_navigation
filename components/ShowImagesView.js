import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function ShowImagesView() {
  return (
    <View style={styles.imagesContainer}>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/0.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/1.png",
        }}
      ></Image>

      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/2.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/3.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/4.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/5.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/6.png",
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: "http://121.138.83.4/static/output_images/7.png",
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
  },
});
