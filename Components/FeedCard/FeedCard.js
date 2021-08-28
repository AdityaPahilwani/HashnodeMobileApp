import React, { memo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { fallBackImage } from "../../Constants/constants";
import AuthorDetail from "../AuthorDetail/AuthorDetail";
import styles from "./style";

const FeedCard = ({
  coverImage,
  author,
  title,
  brief,
  dateAdded,
  slug,
  cuid,
  navigateToArticle,
  _id,
}) => {
  coverImage = coverImage
    ? coverImage.includes("cloudinary")
      ? fallBackImage
      : coverImage
    : fallBackImage;

  return (
    <Pressable onPress={navigateToArticle.bind(this, slug, cuid)}>
      <View style={styles.card}>
        <AuthorDetail author={author} dateAdded={dateAdded} />
        <View style={styles.articleDataContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.brief}>{brief}</Text>
        </View>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.image} />
        ) : null}
      </View>
    </Pressable>
  );
};

function ArePropEqual(prevProps, nextProps) {
  return prevProps._id === nextProps._id;
}

export default memo(FeedCard, ArePropEqual);
