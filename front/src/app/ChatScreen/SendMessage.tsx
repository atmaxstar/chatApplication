import { Button } from "@mui/base";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import SendIcon from '@mui/icons-material/Send';

interface Props {
    sendMessage: (message: string) => void;
}

const SendMessage = ({sendMessage}: Props) => {
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleSubmit = () => {
        if(message == '') return;
        sendMessage(message);
        setMessage('');
    }

    const handleInputKeyDown = (e: 
        React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            handleSubmit();
    };

    return (
        <Paper sx={{ width: '100%', height: '10%', borderRadius: 5}}>
            <Box display='flex' flexDirection='row' alignItems='center' height='100%' width='100%' padding={3}>
                <input placeholder="Type a message..." value={message} onChange={handleChange} onKeyDown={handleInputKeyDown} style={{width: '100%', padding: 10, border: 0, fontSize: 20, outline: 'none'}}/>
                <IconButton onClick={handleSubmit} sx={{bgcolor: '#00CCCC'}}>
                    <SendIcon sx={{color: 'white'}}/>
                </IconButton>
            </Box>
        </Paper>
    )
}

export default SendMessage
