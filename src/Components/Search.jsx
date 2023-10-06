import { firebaseApp } from "../firebase-config";
import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getSearchFeeds } from "../utils/fetchData";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import RecommendedVideos from "./RecommendedVideos";
import VideoPin from "./VideoPin";

function Search({ feeds }) {
  return (
    <>
      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </>
  );
}

export default Search;
