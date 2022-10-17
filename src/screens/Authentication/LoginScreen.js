import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import { Buffer } from "buffer";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { web3authClienID } from "../../config";

global.Buffer = global.Buffer || Buffer;

const scheme = "web3authexposample";

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

export default function App() {
  const [key, setKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId: web3authClienID,
        network: OPENLOGIN_NETWORK.TESTNET,
      });
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
      });
      setKey(state.privKey || "no key");
      setUserInfo(state);
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  const logout = async () => {
    setKey("");
    setUserInfo(null);
  };
  return (
    <View style={styles.container}>
      {key !== "" ? (
        <View
          style={{
            backgroundColor: "#151517",
            padding: 10,
            margin: 10,
            textColor: "#FFFFFF",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              marginBottom: 10,
            }}
          >
            Private Key Generated:{" "}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            {key}
          </Text>
        </View>
      ) : null}
      {userInfo !== null ? (
        <View
          style={{
            backgroundColor: "#151517",
            padding: 10,
            margin: 10,
            textColor: "#FFFFFF",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              marginBottom: 10,
            }}
          >
            User Info Captured:{" "}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Logged in via : {userInfo?.userInfo?.typeOfLogin}
          </Text>
          <Image
            source={{ uri: `${userInfo?.userInfo?.profileImage}` }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Name: {userInfo?.userInfo?.name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Email ID: {userInfo?.userInfo?.email}
          </Text>
        </View>
      ) : null}
      {errorMsg !== "" ? <Text>Error: {errorMsg}</Text> : null}
      {userInfo ? (
        <Button color="#151517" title="Logout" onPress={logout} />
      ) : (
        <Button color="#151517" title="Login with Web3Auth" onPress={login} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
