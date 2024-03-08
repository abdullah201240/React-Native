//rnfes
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity , Alert} from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
const Signin = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.110:3000/users/login', {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        const { token, id, email, name } = response.data;
        

        if (token) {
          navigation.navigate('Home', {
            user: {
              id: id as string,
              email: email as string,
              name: name as string,
            },
          });
          console.log('Login successful');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Image source={require("../../assets/project-management-icon-flat-design-GP43TY.jpg")} style={styles.logo} />
      <Text style={{ fontSize: 40, color: "rgb(88, 14, 206)", fontWeight: "bold" }}>
        Login
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("Signup")}>

        <Text style={{ paddingLeft: 180, paddingBottom: 10 }}>Forget your  password?</Text>



      </Pressable>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogin}      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Pressable onPress={() => navigation.navigate("Signup")}>

        <Text style={{ paddingTop: 10 }}>Don't have account? <Text style={{ color: "violet" }}>Signup</Text></Text>



      </Pressable>

    </ScrollView>
  )
}

export default Signin

const styles = StyleSheet.create({

  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonSignup: {
    color: "violet",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 5,
    height: 50,
    width: 300,
    backgroundColor: "rgb(85, 12, 206)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonContainerSignup: {
    marginTop: 5,
    height: 50,
    width: 400,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: 20,
    width: 300,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
})