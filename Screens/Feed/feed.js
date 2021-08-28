import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Animated, Alert } from "react-native";
import FeedCard from "../../Components/FeedCard/FeedCard";
import LoadingContainer from "../../Components/LoadingContainer/LoadingContainer";
import ChipContainer from "../../Components/ChipContainer/ChipContainer";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import { removeDuplicateAndMerge, pageSize, fetchBlogs } from "./API";
import { LoadingEnum } from "../../Constants/constants";
import { FeedTypes } from "../../Constants/NavBarData";
import styles from "./style";

const initAPI = FeedTypes[0].API;
const Feed = (props) => {
  const [loading, setLoading] = useState(LoadingEnum.fullPageLoading);
  const [nothingToFetch, setNothingToFetch] = useState(false);
  const [selectedApiType, setSelectedApiType] = useState(initAPI);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [error, setError] = useState(false);
  const FlatlistRef = useRef();
  const scrollY = useRef(new Animated.Value(0)).current;
  let blogId = useRef(new Set());

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error);
      setError(false);
    }
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      let { data: newData, errorMessage } = await fetchBlogs(
        selectedApiType,
        pageNo
      );
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
      if (newData?.length > 0) {
        setData((prevData) => {
          prevData = pageNo === 0 ? [] : prevData;
          blogId.current = pageNo === 0 ? new Set() : blogId.current;
          // Sometime data comes more then the expected pageSize
          newData =
            newData.length >= pageSize
              ? newData.slice(newData.length - pageSize)
              : newData;

          const mergedData = removeDuplicateAndMerge(prevData, newData, blogId);
          if (mergedData.length === prevData.length) {
            setPageNo((prevPageNo) => prevPageNo + 1);
          }

          return mergedData;
        });
      } else {
        setNothingToFetch(true);
      }
    };
    fetchData().then(() => {
      setLoading(LoadingEnum.loadingComplete);
    });
  }, [pageNo, selectedApiType]);

  // API CALLS
  const onEndReached = () => {
    if (!nothingToFetch && !(loading === LoadingEnum.paginateLoading)) {
      setLoading(LoadingEnum.paginateLoading);
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  const refresh = async () => {
    if (!(loading === LoadingEnum.refreshFeedLoading)) {
      setLoading(LoadingEnum.refreshFeedLoading);
      setPageNo(0);
    }
  };

  const changeApiType = (api) => {
    if (selectedApiType !== api) {
      setSelectedApiType(api);
      setLoading(LoadingEnum.fullPageLoading);
      setPageNo(0);
      setData([]);
    }
  };
  // API CALLS

  const handleScrollToTop = () => {
    FlatlistRef?.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const navigateToArticle = (slug, cuid) => {
    props.navigation.navigate("feedDetail", {
      slug,
      cuid,
    });
  };

  // DummyComponents to ignore anonymous function
  const renderItem = ({ item }) => (
    <View>
      <FeedCard
        {...item}
        key={item._id}
        navigateToArticle={navigateToArticle}
      />
    </View>
  );
  const loader = () => {
    if (!nothingToFetch && !(loading === LoadingEnum.refreshFeedLoading)) {
      return <LoadingContainer parentContainerStyle={{ height: 50 }} />;
    }
    return null;
  };
  // DummyComponents to ignore anonymous function
  return (
    <View style={styles.container}>
      {loading === LoadingEnum.fullPageLoading ? (
        <LoadingContainer parentContainerStyle={styles.pageLoader} />
      ) : (
        <FlatList
          ref={FlatlistRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          onRefresh={refresh}
          refreshing={LoadingEnum.refreshFeedLoading === loading}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item._id}
          data={data}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          ListFooterComponent={loader}
          scrollEventThrottle={16}
          bounces={false}
        />
      )}
      <ScrollToTopButton onPress={handleScrollToTop} />

      <ChipContainer
        selectedApiType={selectedApiType}
        changeApiType={changeApiType}
        scrollY={scrollY}
      />
    </View>
  );
};

export default Feed;

// API CALLS are in reactive manner because it depends on pageNo
// and the next page value depends on prevPageNo, without setting it by callback and prev the state might lead to dirty
// state are async in nature that's why whenever pageNo or API type changes we make the API call
