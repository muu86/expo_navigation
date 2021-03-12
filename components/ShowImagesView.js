import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Animated,
  Dimensions,
} from "react-native";

import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Ticker = ({ scrollX }) => {
  const pose = ["adress", "take away", "back swing", "top", "down swing", "impact", "release", "follow through"];
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });

  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {pose.map((item, index) => (
          <Text key={index} style={styles.tickerText}>
            {item}
          </Text>
        ))}
      </Animated.View>
    </View>
  )
}

const Description = ({ description, index, scrollX, opacity }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });

  return (
    <Animated.Text
      style={[
        styles.description,
        {
          opacity,
          transform: [
            {
              translateX: translateXDescription,
            },
          ],
        },
      ]}
    >
      {description.key}
      {description.data[2]}
    </Animated.Text>
  )
}

const Item = ({ feedback, image, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 1, 1],
  });

  const good = Object.keys(feedback).filter(key => (
    feedback[key][0] == 2
  )).map(key => ({
    key: key,
    data: feedback[key]
  }));

  const normal = Object.keys(feedback).filter(key => (
    feedback[key][0] == 1
  )).map(key => ({
    key: key,
    data: feedback[key]
  }));

  const bad = Object.keys(feedback).filter(key => (
    feedback[key][0] == 0
  )).map(key => ({
    key: key,
    data: feedback[key]
  }));

  // console.log(image);
  // console.log(index);

  // let imageInfo = FileSystem.getInfoAsync(image);  
  // console.log(imageInfo.then(e => console.log(e)));

  // console.log(image);

  // console.log(`${FileSystem.cacheDirectory}${image}/${index}.png`);

  // let path = await FileSystem.getContentUriAsync(`${FileSystem.documentDirectory}${image}/${index}.png`);
  // console.log(path);

  // (async () => {
  //   let path = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + image);
  //   console.log(path);
  // })();

  console.log(image)
  // image = await FileSystem.getContentUriAsync(image);
  // console.log(image);

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={{ uri: image }}
        style={[
          styles.imageStyle,
          {
            // transform: [{ scale }],
            opacity: opacity,
          },
        ]}
      />
      <View style={styles.textContainer}>
        <View style={styles.goodPoint}>
          <Feather name="thumbs-up" size={32} color="green" />
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity,
                transform: [{ translateX: translateXHeading }],
              }
            ]}
          >
            굿 포인트
          </Animated.Text>
        </View>
        <View style={styles.goodPointDescription}>
          {good && good.map((description, key) => (
            <Description description={description} key={key} index={index} scrollX={scrollX} opacity={opacity} />
          ))}
          {/* <Animated.Text
            style={[
              styles.description,
              {
                opacity,
                transform: [
                  {
                    translateX: translateXDescription,
                  },
                ],
              },
            ]}
          >
            {good}
          </Animated.Text> */}
        </View>
        <View style={styles.badPoint}>
          <Feather name="thumbs-down" size={32} color="red" /> 
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity,
                transform: [{ translateX: translateXHeading }],
              }
            ]}
          >
            배드 포인트ㅠㅠ
          </Animated.Text>
          {/* <Animated.Text
            style={[
              styles.description,
              {
                opacity,
                transform: [
                  {
                    translateX: translateXDescription,
                  },
                ],
              },
            ]}
          >
            {bad}
          </Animated.Text> */}
        </View>
      </View>
    </View>
  )
}

const Pagination = ({ data, scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });

  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            // backgroundColor: 'red',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map((item, index) => (
        <View key={index} style={styles.paginationDotContainer}>
          <View
            style={[styles.paginationDot, { backgroundColor: item.color }]}
          />
        </View>
      ))}
    </View>
  )
}

const ShowImagesView = ({ route }) => {
  // console.log(route);
  const response = route.params.data;
  const images = route.params.images;
  // const imagePath = response["image_path"]; 
  // console.log(imagePath);

  const poseName = ["address", "take away", "back swing", "top", "down swing", "impact", "release", "follow through"];

  // const data = Object.keys(response).map(i => {
  //   if (i !== "image_path") {
  //     console.log(i);
  //     console.log(response[i]);
  //     return {
  //       ...response[i],
  //       key: poseName[i],
  //       image: `${imagePath}_${i}`,
  //     }
  //   }
  // });

  const data = Object.keys(response).filter(key => (
    key !== 'image_path'
  )).map(key => ({
    feedback: response[key],
    key: poseName[key],
    image: images[key],
  }));

  // console.log(data);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isSharing, setSharing] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await Sharing.isAvailableAsync();
      setSharing(result);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX }}}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      {/* <Pagination data={route.data} scrollX={scrollX} /> */}
      
      <View style={{ 
        position: 'absolute', 
        bottom: height * 0.4, 
        left: width * 0.35, 
        flexDirection: 'row' }}>
        <Ionicons name="md-share-social-outline" size={32} color="black" />
        <MaterialIcons name="save-alt" size={32} color="black" />
        <MaterialIcons name="replay" size={32} color="black" />
      </View>

      <Ticker scrollX={scrollX} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 1,
    height: width * 1,
    resizeMode: 'contain',
    flex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: height * 0.45,
    alignSelf: 'center',
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE *  0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.7,
  },
  goodPoint: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  goodPointDescription: {
    // flex: 1,
  },
  badPoint: {
    flexDirection: 'row',
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default ShowImagesView;