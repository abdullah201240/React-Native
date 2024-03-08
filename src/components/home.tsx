import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function myRegisterForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
  
      const expoPushToken = (await Notifications.getExpoPushTokenAsync({ projectId: '14920d37-6ade-4c54-96af-ea86e42f296e' })).data;
      token = expoPushToken;
      console.log(token);
    } else {
      alert('Must use a physical device for Push Notifications');
    }
  
    return token;
  }
  

  useEffect(() => {
    const setupNotifications = async () => {
      const token = await myRegisterForPushNotificationsAsync();
      setExpoPushToken(token);

      notificationListener.current = Notifications.addNotificationReceivedListener((receivedNotification) => {
        setNotification(receivedNotification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    };

    setupNotifications();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center',paddingTop:100 }}>
      {notification && notification.request && notification.request.content && (
        <>
          <Text>Title: {notification.request.content.title} </Text>
          <Text>Body: {notification.request.content.body}</Text>
          <Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
        </>
      )}
<Button  title="Schedule Notification" onPress={schedulePushNotification} />

    </View>
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
