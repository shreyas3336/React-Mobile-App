import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import colors from "./src/colors";

import { connect } from "react-redux";
import AuthenticationStack from "./src/stacks/AuthenticationStack";

import { StatusBar } from "react-native";

import { Rubik_600SemiBold, useFonts } from "@expo-google-fonts/rubik";

function App({ auth }) {
  console.log(auth, auth.loggedIn);

  let [fontsLoaded] = useFonts({
    Rubik_600SemiBold,
  });

  const [appReady, setAppReady] = React.useState(false);
  // const dispatch = useDispatch();
  // const checkLogin = async () => {

  // };

  // if (!appReady) {
  //   return (
  //     <AppLoading
  //       onFinish={() => setAppReady(true)}
  //       onError={() => setAppReady(true)}
  //     />
  //   );
  // }

  return auth?.loggedIn && fontsLoaded ? (
    <>
      <StatusBar
        translucent={true}
        hidden={false}
        barStyle="dark-content"
        backgroundColor={
          auth.stackMode === "default" ? colors.PRIMARY : colors.WHITE
        }
      />
      <NavigationContainer>
        <AuthenticationStack />
      </NavigationContainer>
    </>
  ) : (
    fontsLoaded && (
      <>
        <StatusBar
          translucent={true}
          hidden={false}
          barStyle="dark-content"
          backgroundColor={colors.WHITE}
        />
        <NavigationContainer>
          <AuthenticationStack />
        </NavigationContainer>
      </>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithToken: (token) => dispatch(loginWithToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
