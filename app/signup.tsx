import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // Stores the selected image URI
  const [file, setFile] = useState<string | null>(null);

  // Stores any error message
  const [error, setError] = useState(null);

  const handleRegister = () => {
    console.log("Register button pressed");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPassword = (text: string) => {
    console.log("value", text);
  };
  // Function to pick an image from
  //the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                  roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFile(result.assets[0].uri);
        // Clear any previous errors
        setError(null);
      }
    }
  };

    const deleteImage = ()=> {
        setFile(null);
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.backButton} onPress={router.back}>
            <AntDesign name="arrowleft" size={26} color="black" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/login/kidWithMobile.png")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <View style={styles.headerText}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.textColor,
                fontWeight: "bold",
              }}
            >
              SignUp
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email Id:</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              style={styles.input}
              onChangeText={(newText) => setEmail(newText)}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Mobile No:</Text>
            <TextInput
              placeholder="Enter your Mobile No."
              value={mobile}
              style={styles.input}
              onChangeText={(newText) => setMobile(newText)}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Password:</Text>
            <View>
              <TextInput
                placeholder="Enter your Password"
                value={password}
                style={styles.input}
                onChangeText={(newText) => setPassword(newText)}
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
            <Text style={styles.label}>Confirm Password:</Text>
            <View>
              <TextInput
                placeholder="Re-Enter your Password"
                style={styles.input}
                onChangeText={checkPassword}
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
            <Text style={styles.label}>Upload a profile photo:</Text>
            <View style={styles.uploadImageContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.inputImage}>
                <Text style={{ color: Colors.grey, fontSize: 17 }}>
                  Pick an Image
                </Text>
                <Feather name="user-plus" size={24} color="grey" />
              </TouchableOpacity>
              {file && (
                <View>
                  <TouchableOpacity style={{position: "absolute", top: 5, left: 147, zIndex: 1}} onPress={deleteImage}>
                    <MaterialIcons name="cancel" size={17} color={Colors.primary} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: file }}
                    style={{
                      height: 100,
                      width: 160,
                      resizeMode: "cover",
                      borderRadius: 20,
                      marginLeft: 10,
                    }}
                  />
                </View>
              )}
            </View>
            <Button
              title="Signup"
              color={Colors.primary}
              onPress={handleRegister}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    position: "relative",
    left: wp("3%"),
    top: hp("2%"),
  },
  imageContainer: {
    height: hp("20%"),
    width: wp("50%"),
    marginTop: hp("3%"),
    marginLeft: wp("25%"),
  },
  headerText: {
    width: wp("100%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  formContainer: {
    width: wp("85%"),
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: wp("8%"),
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    fontSize: hp("2%"),
    color: Colors.textColor,
    marginBottom: hp("2%"),
  },
  showPasswordIcon: {
    position: "absolute",
    right: 15,
    top: 13,
  },
  label: {
    fontSize: hp("2%"),
    color: Colors.textColor,
    fontWeight: "bold",
    marginLeft: wp("4%"),
    marginBottom: 2,
  },
  uploadImageContainer: {
    marginBottom: hp("2%"),
  },
  inputImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.2%"),
    fontSize: hp("2%"),
    color: Colors.textColor,
    marginBottom: hp("1%"),
  },
});
