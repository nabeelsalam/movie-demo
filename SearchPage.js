import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  let [movies, setMovies] = useState([]);
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
                <Image
                  key={movie.id}
                  style={styles.poster}
                  source={imgPathObject}
                ></Image>
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
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    width: "47%",
    borderRadius: 20,
    height: 400,
    margin: "1%",
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
});
