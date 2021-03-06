import {
  Button,
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
  const [crew, setCrew] = useState([]);
  const [playing, setPlaying] = useState(false);
  const movie = route.params.item;
  const blurAmount = 10;
  const imgPathObject = {
    uri: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
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
  useEffect(() => {
    fetch(`http://10.0.0.7:5000/movies/crew?id=${movie.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCrew(json);
      })
      .catch((error) => {
        console.error(error);
        setCrew([]);
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
          <View style={styles.genres}>
            {movie.genre_ids.slice(0, 3).map((genre) => (
              <View key={genre} style={styles.genre}>
                <Text style={styles.genreText} numberOfLines={1}>
                  {genres[genre]}
                </Text>
              </View>
            ))}
          </View>
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
                  <ImageBackground
                    key={actor.id}
                    style={styles.actorImage}
                    imageStyle={{ borderRadius: 20, overflow: "hidden" }}
                    source={imgPathObject}
                  >
                    <Text style={styles.actorName} numberOfLines={1}>
                      {actor.name}{" "}
                    </Text>
                  </ImageBackground>
                );
              })}
          </View>
          <View style={styles.castContainer}>
            {crew
              .filter(
                (member) =>
                  member.job === "Producer" || member.job === "Director"
              )
              .slice(0, 4)
              .map((member) => {
                const imgPathObject = {
                  uri: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
                };
                return (
                  <ImageBackground
                    key={member.id}
                    style={styles.actorImage}
                    imageStyle={{ borderRadius: 20, overflow: "hidden" }}
                    source={imgPathObject}
                  >
                    <Text style={styles.actorName} numberOfLines={2}>
                      {member.name}
                      {"\n"}
                      {member.job}
                    </Text>
                  </ImageBackground>
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
              style={styles.reviewButton}
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
    padding: "1%",
  },
  spinnerTextStyle: {
    color: "#FFF",
    flex: 1,
  },
  video: {
    width: "100%",
    height: 400,
    flex: 2,
    margin: "2%",
  },
  overviewContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: "4%",
  },
  overview: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
    padding: "4%",
    textAlign: "left",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "3%",
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
    overflow: "hidden",
  },
  actorName: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    color: "white",
    width: "100%",
    fontSize: 12,
    textAlign: "center",
    padding: "1%",
  },
  genres: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  genre: {
    flex: 1,
    padding: "3%",
    margin: "1%",
    justifyContent: "center",
    borderRadius: 50,
    textAlign: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
  },
  genreText: {
    fontSize: 16,
    color: "white",
  },
});
