import React from 'react';
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const Index = ({navigation}) => {


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Image source={require("../../assets/project-management-icon-flat-design-GP43TY.jpg")} style={styles.logo} />
            <Text style={{ fontSize: 40, color: "rgb(88, 14, 206)", fontWeight: "bold", paddingBottom: 10 }}>App Name</Text>
            <TouchableOpacity style={styles.buttonContainer}onPress={() => navigation.navigate('Signin')}
>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainerSignup}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonSignupText}>Sign Up</Text>
      </TouchableOpacity>
        </ScrollView>
    );
}

export default Index;

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 12,
        height: 50,
        width: 200,
        backgroundColor: "rgb(85, 12, 206)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonContainerSignup: {
        marginTop: 10,
        height: 50,
        width: 200,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "black",
    },
    buttonSignupText: {
        color: "rgb(85, 12, 206)",
        fontSize: 18,
    },
});
