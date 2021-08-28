import React, { useState, useRef, useEffect } from "react";
import LoadingContainer from "../../Components/LoadingContainer/LoadingContainer";
import BackButton from "../../Components/BackButton/BackButton";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

const FeedDetail = ({ route, navigation }) => {
  const { slug, cuid } = route.params;
  const [webViewCanGoBack, setWebViewCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(
    `hashnode.com/post/${slug}-${cuid}`
  );
  const webviewRef = useRef(null);
  const webViewBackHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const handleWebViewNavBubbling = () => {
    if (webViewCanGoBack) {
      webViewBackHandler();
      return true;
    } else {
      return false;
    }
  };

  const handleBackButton = () => {
    if (!handleWebViewNavBubbling()) {
      navigation.pop();
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton handleBackButton={handleBackButton} />,
    });
  });
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleWebViewNavBubbling);
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleWebViewNavBubbling
      );
  }, [webViewCanGoBack]);

  const handleNavStateChange = (navState) => {
    setWebViewCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);
  };
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: currentUrl }}
      renderLoading={() => <LoadingContainer />}
      ref={webviewRef}
      onNavigationStateChange={handleNavStateChange}
      startInLoadingState={true}
    />
  );
};

// for some weird reason renderLoading only works with fatArrow renderLoading={() => <LoadingContainer />}
// renderLoading={LoadingContainer} this is causing an crash
export default FeedDetail;
