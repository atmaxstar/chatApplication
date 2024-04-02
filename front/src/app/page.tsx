'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Screen from './ChatScreen/Screen'
import Partners from './Partners/Partners'
import Header from './Header'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Message from '@/models/message'
import User from '@/models/user'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { UsernameContext } from '@/contexts/UsernameContext'
import { URL_API } from '@/config/URL'
import ConnectionDialog from '@/components/dialogs/ConnectionDialog'

export default function Home() {
  const [username, setUsername] = useState('');
  const [connection, setConnection] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  
  const joinRoom = async (userName: string) => {

    try {
      const connection = new HubConnectionBuilder()
        .withUrl(URL_API)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (message: Message) => {
        setMessages((messages) => [...messages, message]);
      });

      connection.on("ReceiveConnectedUsers", (users: User[]) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", userName);
      setConnection(connection);
    } catch (e) {
      console.error(e);
    }
  };
  
  const sendMessage = async (message: string) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.error(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const onCloseDialog = () =>{
    setIsDialogOpen(false);
  }

  return (
    <UsernameContext.Provider value={{username: username, setUsername: setUsername}}>
      <main className={styles.main}>
          <ConnectionDialog isOpen={isDialogOpen} joinRoom={joinRoom} onClose={onCloseDialog}/>
          <Header/>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: '90%'}}>
            <Partners users={users}/>
            <Screen users={users} messages={messages} sendMessage={sendMessage} closeConnection={closeConnection}/>
          </Box>
      </main>
    </UsernameContext.Provider>
  )
}
