import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationComponent = () => {
  useEffect(() => {
    // Initialize PushNotification
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('LOCAL NOTIFICATION:', notification);
      },
    });
  }, []);

  const scheduleNotification = () => {
    // Schedule notification to be shown 10 seconds from now
    PushNotification.localNotificationSchedule({
      title: 'My Notification Title',
      message: 'Hello, this is a local push notification!',
      date: new Date(Date.now() + 10 * 1000), // 10 seconds from now
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Press the button to schedule a local push notification</Text>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
};

export default NotificationComponent;
