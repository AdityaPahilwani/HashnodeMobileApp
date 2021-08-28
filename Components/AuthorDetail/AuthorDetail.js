import React from "react";
import { View, Text, Image } from "react-native";
import { fallBackImage } from "../../Constants/constants";
import styles from "./style";

const AuthorDetail = ({ author, dateAdded }) => {
  let { photo, name } = author;
  const dateConv = new Date(dateAdded).toDateString();
  photo = photo
    ? photo.includes("cloudinary")
      ? fallBackImage
      : photo
    : fallBackImage;

  return (
    <View style={styles.authorDetailContainer}>
      <Image source={{ uri: photo }} style={styles.profileImage} />
      <View style={styles.authorDetails}>
        <Text style={styles.authorName}>{name}</Text>
        <Text style={styles.articleReleaseDate}>{dateConv}</Text>
      </View>
    </View>
  );
};

export default AuthorDetail;
