import { UsernameContext } from "@/contexts/UsernameContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, MouseEvent, useContext, useRef, useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    joinRoom: (username: string) => Promise<void>;
}

const ConnectionDialog = ({isOpen, onClose, joinRoom}: Props) => {
    const {username, setUsername} = useContext(UsernameContext);
    const isProcessing = useRef(false);

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setUsername(e.target.value);
    }

    return (
        <Dialog 
            open={isOpen}
            PaperProps={{
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    // avoid duplicate transmissions
                    event.preventDefault();
                    event.stopPropagation();
                    
                    if (isProcessing.current) return
                    isProcessing.current = true;
                    const sentUsername = (event.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
            
                    await joinRoom(sentUsername);
                    setUsername(sentUsername);
                    onClose();
                    isProcessing.current = false;
                },
                sx: {width: '20vw'}
            }}>

            <DialogContent>
                <DialogTitle>
                    {"Join as"}
                </DialogTitle>
                <TextField autoFocus required margin="dense" name="username" fullWidth variant="outlined"/>

            </DialogContent>

            <DialogActions>
                <Button type="submit" size="large">
                    Submit
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default ConnectionDialog
