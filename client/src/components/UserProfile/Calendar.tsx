import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const CalendarComponent = () => {
  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  const initClient = () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, (error: any) => {
      console.error(JSON.stringify(error, null, 2));
    });
  };

  const updateSigninStatus = (isSignedIn: any) => {
    if (isSignedIn) {
      // The user is signed in, you can make API calls from here
    }
  };

  // Render your component...
};

export default CalendarComponent;
