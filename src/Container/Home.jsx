import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import {
  Category,
  Create,
  Feed,
  NavBar,
  Search,
  UserProfile,
  VideoPinDetail,
} from "../Components";
import { Routes, Route } from "react-router-dom";
import { categories } from "../data";
import { getSearchFeeds } from "../utils/fetchData";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const Home = ({ user }) => {
  const [searchTerm, setsearchTerm] = useState("");
  const [feeds, setFeeds] = useState(null);

  const firestoreDb = getFirestore(firebaseApp);

  useEffect(() => {
    setsearchTerm(searchTerm);
    getSearchFeeds(firestoreDb, searchTerm).then((feed) => {
      setFeeds(feed);
    });
  }, [searchTerm]);

  return (
    <>
      <NavBar
        user={user}
        setsearchTerm={setsearchTerm}
        searchTerm={searchTerm}
      />

      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width="5%"
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"}
          px={4}
          justifyContent="center"
          alignItems={"center"}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route path="/search" element={<Search feeds={feeds} />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
