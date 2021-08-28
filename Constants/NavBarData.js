import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

export const FeedTypes = [
  {
    API: "COMMUNITY",
    displayName: "Community",
    Icon: ({ color = "black" }) => (
      <MaterialIcons name="people" size={24} color={color} />
    ),
  },
  {
    API: "BEST",
    displayName: "Best",
    Icon: ({ color = "black" }) => (
      <MaterialIcons name="show-chart" size={24} color={color} />
    ),
  },
  {
    API: "NEW",
    displayName: "New",
    Icon: ({ color = "black" }) => (
      <MaterialIcons name="fiber-new" size={24} color={color} />
    ),
  },
  {
    API: "FEATURED",
    displayName: "Featured",
    Icon: ({ color = "black" }) => (
      <MaterialIcons name="star" size={24} color={color} />
    ),
  },
];
