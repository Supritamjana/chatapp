import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function SignIn() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading , setLoading] = useState(false);

  const handleLogin = async() => {
    if(emailRef.current || !passwordRef.current){
      Alert.alert('Sign In',"Please fill all the fields");
      return;
  }
  //Logon process
}

// route to forgot password page
  const handlePassword = () => {
    console.log("ForgotPassword button pressed!");
  };

  //route to signup page
  const handleRegister = () => {
    router.navigate("/signup");
  };

  //funstion to show or hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, gap: 5, paddingTop: hp(3), alignItems: "center" }}
      >
        {/* Signin image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/login/kidWithMobile.png")}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <Text
          style={{
            fontSize: hp(3),
            color: Colors.textColor,
            fontWeight: "bold",
          }}
        >
          SignIn
        </Text>
        {/* Text fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Id:</Text>
          <View style={styles.input}>
            <Entypo name="mail" size={23} color={Colors.grey} />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={Colors.grey}
              style={{ fontSize: hp(2), width: "90%" }}
              onChangeText={(newText) => (emailRef.current = newText)}
              keyboardType="email-address"
            />
          </View>
          <Text style={styles.label}>Password:</Text>
          <View style={styles.input}>
            <Entypo name="lock" size={23} color={Colors.grey} />
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor={Colors.grey}
              style={{ fontSize: hp(2), width: "90%" }}
              onChangeText={(newText) => (passwordRef.current = newText)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPasswordIcon}
              onPress={handleShowPassword}
            >
              {showPassword ? (
                <AntDesign name="eyeo" size={20} color={Colors.grey} />
              ) : (
                <Octicons name="eye-closed" size={20} color={Colors.grey} />
              )}
            </TouchableOpacity>
          </View>
          {/* Singin button */}
          <Button title="signin" color={Colors.primary} onPress={handleLogin} />
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={handlePassword}>
            <Text style={styles.optionText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.optionText}>New User? Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={{ color: Colors.grey }}>
            This app is @copywrite in 2025
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    height: hp(24),
    width: wp(50),
    alignItems: "center",
  },
  headerText: {
    width: wp("100%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  formContainer: {
    width: wp(85),
    paddingHorizontal: wp(1),
    paddingVertical: hp(1),
  },
  input: {
    flexDirection: "row",
    backgroundColor: Colors.inputBackground,
    alignItems: "center",
    gap: hp(1),
    borderRadius: 20,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.4),
    marginBottom: hp("2%"),
  },
  label: {
    fontSize: hp("2%"),
    color: Colors.textColor,
    fontWeight: "bold",
    marginLeft: wp(2.5),
    marginBottom: 2,
  },
  showPasswordIcon: {
    position: "absolute",
    right: wp(4),
  },
  options: {
    flexDirection: "row",
    gap: wp(22),
  },
  optionText: {
    fontSize: hp(1.8),
    color: Colors.primary,
  },
  footer: {
    position: "static",
    marginTop: hp(35),
  },
});
