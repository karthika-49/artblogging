import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../img/logo.png";
import MusicBg from "../img/musicbg.jpg";
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const firebaseDb = getFirestore(firebaseApp);

  const navigate = useNavigate();

  const login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseDb, "users", providerData[0].uid),
      providerData[0]
    );

    navigate("/", { replace: true });
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Image src={MusicBg} objectFit="cover" width={"full"} height={"full"} />
      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.700"}
        top={0}
        left={0}
        justifyContent="center"
        alignItems={"center"}
      >
        <Flex flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"whiteAlpha.300"}
        p={8}
        gap={8}
        rounded={10}>
       <Image src={logo} width={'15vw'}></Image>
        <FcGoogle fontSize={50} />
          <Button
            shadow={"lg"}
            onClick={() => login()}
            color="black"
            >
            Signin with Google
          </Button>
            </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;