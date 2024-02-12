import React from 'react';
import { StyleSheet, Text, ScrollView, Button, Alert } from 'react-native';

const Home = ({ route, navigation }) => {
  const { user } = route.params;

  const handleLogout = () => {
    // You can perform any logout logic here
    // For demonstration purposes, showing an alert and navigating to the login screen
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          // Perform any necessary cleanup or logout logic here

          // Navigate to the login screen
          navigation.replace('Signin');
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Text>Welcome, {user.name}</Text>
      <Text>Your ID: {user.id}</Text>
      <Text>Your Email: {user.email}</Text>

      {/* Logout button */}
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
