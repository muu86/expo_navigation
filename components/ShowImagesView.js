import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function ShowImagesView({ route }) {

  console.log(route);
  const { data } = route.params;

  console.log(typeof data);
  console.log(data);
  console.log(data.image_path);

  return (
    <View style={styles.imagesContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_0.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_1.png`,
        }}
      ></Image>

      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_2.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_3.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_4.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_5.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_6.png`,
        }}
      ></Image>
      <Image
        style={styles.image}
        source={{
          uri: `http://121.138.83.4/static/output_images/${data.image_path}_7.png`,
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
