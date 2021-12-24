import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import Star from "react-native-star-view";
import React from "react";

export default function DetailsPage({ route, navigation }) {
  const movie = route.params.item;
  const blurAmount = 10;
  const imgPathObject = {
    uri: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
  const video = React.useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.posterContainer}>
        <ImageBackground
          style={styles.poster}
          source={imgPathObject}
          blurRadius={blurAmount}
        >
          <Star
            score={movie.vote_average}
            totalScore={10}
            style={styles.starStyle}
          />
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode="cover"
          />
          <Text numberOfLines={5} style={styles.overview}>
            " {movie.overview} "
          </Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  posterContainer: {
    width: "100%",
    height: "100%",
  },
  poster: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2%",
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  searchList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  spinnerTextStyle: {
    color: "#FFF",
    flex: 1,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  overview: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    fontStyle: "italic",
  },
  starStyle: {
    width: 200,
    height: 40,
    marginBottom: 40,
    backgroundColor: "brown",
    borderRadius: 20,
  },
});
