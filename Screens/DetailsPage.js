import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import React, { useEffect, useState } from "react";

export default function DetailsPage({ route, navigation }) {
  const [trailerUrl, setTrailerUrl] = useState([]);
  const [cast, setCast] = useState([]);
  const [playing, setPlaying] = useState(false);
  const movie = route.params.item;
  const blurAmount = 10;
  const imgPathObject = {
    uri: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
  const video = React.useRef(null);
  useEffect(() => {
    fetch(`http://10.0.0.7:5000/movies/videos?id=${movie.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let videoObject = json.results.find(
          (item) => item.type === "Trailer" && item.site === "YouTube"
        );
        setTrailerUrl(videoObject ? videoObject.key : "");
      })
      .catch((error) => {
        console.error(error);
        setTrailerUrl("");
      });
  }, []);
  useEffect(() => {
    fetch(`http://10.0.0.7:5000/movies/cast?id=${movie.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCast(json);
      })
      .catch((error) => {
        console.error(error);
        setCast([]);
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
          <View style={styles.castContainer}>
            {cast
              .filter((actor) => actor.order < 4)
              .map((actor) => {
                const imgPathObject = {
                  uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                };
                return (
                  <Image
                    key={actor.id}
                    style={styles.actorImage}
                    source={imgPathObject}
                  ></Image>
                );
              })}
          </View>
          <View style={styles.overviewContainer}>
            <ScrollView>
              <Text style={styles.overview}>" {movie.overview} "</Text>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Read User Reviews >>"
              color="gold"
              onPress={() => {
                navigation.navigate("Reviews", {
                  item: movie,
                });
              }}
            />
          </View>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "2%",
  },
  spinnerTextStyle: {
    color: "#FFF",
    flex: 1,
  },
  video: {
    width: "100%",
    height: 400,
    flex: 2,
  },
  overviewContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    flex: 2,
    borderRadius: 10,
  },
  overview: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
    padding: "5%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  castContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actorImage: {
    height: 100,
    maxWidth: 100,
    flex: 1,
    borderRadius: 10,
  },
});
