import Routers from './router/Router';
import { FunctionComponent, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { BASE_URL } from './configs/apiConfig/baseUrl';
import { useToast } from '@src/hooks/useToast';

export const SignalR = () => {
  const hubConnection = new signalR.HubConnectionBuilder()
    // .withUrl(BASE_URL + '/getHello')
    .withUrl('https://192.168.192.157:9998/Chat_Hub', {
      // withCredentials: true,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
  hubConnection.start().then((a) => {
    if (hubConnection.connectionId) {
      hubConnection.invoke('receiveMsg', hubConnection.connectionId);
    }
  });

  useEffect(() => {
    hubConnection.on('receiveMsg', (message) => {
      const toast = useToast();
      toast.showDefault(message);
    });
  }, []);

  // return <p className="d-flex justify-content-center">Message From Server : {clientMessage}</p>;
};
const App: FunctionComponent = () => {
  return (
    <>
      {/* <SignalR /> //with vibration */}
      <Routers />
    </>
  );
};

export default App;
