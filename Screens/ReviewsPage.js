import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  Text,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function ReviewsPage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const movie = route.params.item;
  const filteredReviews = reviews.filter(
    (review) => review.author_details.rating && review.author
  );
  const blurAmount = 10;
  const imgPathObject = {
    uri: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
  useEffect(() => {
    setLoading(true);
    fetch(`http://10.0.0.7:5000/movies/reviews?id=${movie.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setReviews(json.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setReviews([]);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.posterContainer}>
          <ImageBackground
            style={styles.poster}
            source={imgPathObject}
            blurRadius={blurAmount}
          >
            <FlatList
              data={filteredReviews}
              renderItem={({ item }) => (
                <View style={styles.reviewContainer}>
                  <View style={styles.ratingsContainer}>
                    <Text style={styles.ratingsText}>{item.author}</Text>
                    <Text style={styles.ratingsText}>
                      {item.author_details.rating}{" "}
                      <Image
                        style={styles.star}
                        source={require("../assets/star-filled.png")}
                      />
                    </Text>
                  </View>
                  <Text style={styles.reviewContent}>{item.content}</Text>
                </View>
              )}
            />
          </ImageBackground>
        </View>
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
    width: "100%",
    height: "100%",
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
  ratingsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  ratingsText: {
    color: "gold",
    fontSize: 24,
    fontWeight: "bold",
    padding: "1%",
    margin: "2%",
  },
  star: {
    width: 16,
    height: 16,
  },
  reviewContainer: {
    margin: "2%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  reviewContent: {
    padding: "4%",
    fontSize: 24,
    color: "white",
  },
});
