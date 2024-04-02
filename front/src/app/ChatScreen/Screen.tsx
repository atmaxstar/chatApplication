import { Box, Grid, linearProgressClasses } from "@mui/material"
import Bubble from "./Bubble"
import User from "@/models/user";
import Message from "@/models/message";
import { useContext, useEffect, useRef } from "react";
import { UsernameContext } from "@/contexts/UsernameContext";
import SendMessage from "./SendMessage";


interface Props {
    users: User[];
    messages: Message[];
    sendMessage: (message: string) => void;
    closeConnection: () => void;
}

const Screen = ({users, messages, sendMessage, closeConnection}: Props) => {
    const {username} = useContext(UsernameContext);
    const messageRef = useRef<any>();
  
    useEffect(() => {
      if (messageRef && messageRef.current) {
        const { scrollHeight, clientHeight } = messageRef.current;
        messageRef.current.scrollTo({
          left: 0,
          top: scrollHeight - clientHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);


  return (
    <Box sx={{bgcolor: `white`, height: '100%', width: '65%', borderRadius: 5, p: 2}}>
        <Box
        ref={messageRef} 
        sx={{ overflowX: 'hidden', overflowY: 'auto', height: '90%', width: '100%', p: 3,
                '::-webkit-scrollbar': {
                    display: 'block',
                    width: '5px',
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'lightgrey',
                    borderRadius: '5px'
                } 
        }}>
            <Grid container spacing={2} direction='column'>
                {messages.map(message=>
                <Grid item key={`${message.from}:${message.sentAt}`} alignSelf={message.from == username ? 'end' : 'start'}>
                    <Bubble isMe={message.from == username} name={message.from} txt={message.text} />
                </Grid>
                )}
            </Grid>
        </Box>
        <SendMessage sendMessage={sendMessage}/>
    </Box>
  )
}

export default Screen
