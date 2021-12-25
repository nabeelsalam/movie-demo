import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import React, { useEffect, useState } from "react";

export default function DetailsPage({ route, navigation }) {
  const [trailerUrl, setTrailerUrl] = useState([]);
  const [playing, setPlaying] = useState(false);
  const movie = route.params.item;
  const blurAmount = 2;
  const imgPathObject = {
    uri: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
  const video = React.useRef(null);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1807015c9aad92d4a94aa2dfd3ea17e4&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let videoObject = json.results.find(
          (item) => item.type === "Trailer" && item.site === "YouTube"
        );
        setTrailerUrl(videoObject.key);
      })
      .catch((error) => {
        console.error(error);
        setTrailerUrl("");
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.posterContainer}>
        <ImageBackground
          style={styles.poster}
          source={imgPathObject}
          blurRadius={blurAmount}
        >
          <View style={styles.video}>
            <YoutubePlayer height={300} play={playing} videoId={trailerUrl} />
          </View>
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
    backgroundColor: "gold",
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
    backgroundColor: "#000",
    fontWeight: "bold",
    fontSize: 24,
    fontStyle: "italic",
    padding: "10%",
  },
  starStyle: {
    width: 200,
    height: 40,
    marginBottom: 40,
    backgroundColor: "black",
    borderRadius: 20,
  },
});
