import { BASE_URL } from "../../config";
import {
  GET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ACTIVITY_ID,
  SET_STACK_MODE,
  IS_SAVED,
} from "./types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { removeTokens } from "../../utils";

export const loginWithToken = (token) => {
  let finalToken = token;

  return function (dispatch) {
    AsyncStorage.setItem("access_token_tlt", finalToken);
    dispatch({
      type: LOGIN_USER,
      payload: finalToken,
    });
  };
};
export const setAccessToken = (token) => {
  console.log(token, "lg-token");
  let finalToken = token;
  return AsyncStorage.setItem("access_token_tlt", finalToken);
};

export const completeLogin = (token, isReload) => {
  return function (dispatch) {
    dispatch(loginWithToken(token));
    !isReload &&
      Alert.alert("Success", "Login Successful! Welcome to The Life Trail.");
    dispatch(getCurrentUser(token));
  };
};

export const setStackMode = (mode) => {
  return function (dispatch) {
    dispatch({
      type: SET_STACK_MODE,
      payload: mode,
    });
  };
};

export const setActivityID = (activityID) => {
  return function (dispatch) {
    dispatch({
      type: SET_ACTIVITY_ID,
      payload: activityID,
    });
  };
};

export const loginUser = (loginData, setLoading) => {
  return function (dispatch) {
    setLoading(true);
    axios
      .post(`${BASE_URL}/users/login`, loginData)
      .then((response) => {
        console.log(response);
        dispatch(completeLogin(response.data.token));
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
        setLoading(false);
        try {
          switch (response.status) {
            case 400:
              //   add a toast
              Alert.alert(
                "Error",
                "Invalid Phone Number / Account does not exist"
              );
              break;
            case 401:
              //   add a toast
              Alert.alert(
                "Error",
                "Invalid Phone Number / Account does not exist"
              );
              break;
            default:
              // server error
              Alert.alert("Error", "Server error");
              break;
          }
        } catch (e) {
          Alert.alert("Error", "Server error");
        }
      });
  };
};

export const signupUser = (signUpData, setLoading) => {
  return function (dispatch) {
    setLoading(true);
    axios
      .post(`${BASE_URL}/users/register`, signUpData)
      .then((response) => {
        console.log(response.data, "sign up");
        if (response.data.error) Alert.alert("Error", response.data.error);
        else dispatch(completeLogin(response.data.token));
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
        setLoading(false);
        try {
          switch (response.status) {
            case 400:
              //   add a toast
              Alert.alert(
                "Error",
                "Invalid Phone Number / Account does not exist"
              );
              break;
            case 401:
              //   add a toast
              Alert.alert(
                "Error",
                "Invalid Phone Number / Account does not exist"
              );
              break;
            default:
              // server error
              Alert.alert("Error", "Server error");
              break;
          }
        } catch (e) {
          Alert.alert("Error", "Server error");
        }
      });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    // remove stored tokens
    removeTokens();

    // LOGOUT_USER
    dispatch({
      type: LOGOUT_USER,
    });

    // remove all values
    // add Toast
    Alert.alert("Success", "Logged out successfully");
  };
};

export const getCurrentUser = (token) => {
  return function (dispatch) {
    axios
      .get(`${BASE_URL}/users/getme`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data.user;
        let data1 = response.data.wishlist;

        // dispatch current_user data
        dispatch({
          type: GET_CURRENT_USER,
          payload: data,
        });
        dispatch({
          type: IS_SAVED,
          payload: data1,
        });
      });
    // dispatch current_user data
  };
};
