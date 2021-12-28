import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function SearchPage({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("spiderman");

  useEffect(() => {
    setLoading(true);
    fetch(`http://10.0.0.7:5000/movies?query=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMovies(json.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMovies([]);
        setLoading(false);
      });
  }, [searchText]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          clearButtonMode="always"
          onSubmitEditing={(event) => {
            setSearchText(event.nativeEvent.text);
          }}
          defaultValue={searchText}
          enablesReturnKeyAutomatically
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.searchList}>
            {movies.map((movie) => {
              const imgPathObject = {
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              };
              return (
                <TouchableOpacity
                  style={styles.posterContainer}
                  key={movie.id}
                  onPress={() => {
                    navigation.navigate("Details", {
                      item: movie,
                    });
                  }}
                >
                  <ImageBackground
                    style={styles.poster}
                    imageStyle={{ borderRadius: 20, overflow: "hidden" }}
                    source={imgPathObject}
                    on
                  >
                    <Text style={styles.ratings}>
                      {movie.vote_average}{" "}
                      <Image
                        style={styles.star}
                        source={require("../assets/star-filled.png")}
                      />
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
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
    width: "47%",
    height: 400,
    margin: "1%",
    borderRadius: 20,
    borderColor: "black",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "white",
    fontWeight: "bold",
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
  ratings: {
    color: "gold",
    fontSize: 24,
    fontWeight: "bold",
    padding: "1%",
    textAlign: "center",
    backgroundColor: "black",
  },
  star: {
    width: 16,
    height: 16,
  },
});
