'use client';
import 'notificationapi-js-client-sdk/dist/styles.css';
import notificationapi from 'notificationapi-node-server-sdk';
import { memo, useEffect } from 'react';
const NotificationAPIComponent = memo((props: { userId: string }) => {
  useEffect(() => {
    const loadNotificationAPI = async () => {
      const NotificationAPI = (await import('notificationapi-js-client-sdk'))
        .default;
      const notificationapi = new NotificationAPI({
        clientId: process.env.CLIENT_ID,
        userId: props.userId
      });
      notificationapi.showInApp({
        root: "notif"
      });
    };

    // Call the async function
    loadNotificationAPI();
  }, [props.userId]);

  return <div id="notif"></div>;
});

NotificationAPIComponent.displayName = 'NotificationAPIComponent';

export default NotificationAPIComponent;