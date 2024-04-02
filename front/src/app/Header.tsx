import { UsernameContext } from "@/contexts/UsernameContext";
import { AppBar, Box, Button, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from "@mui/material"
import { useContext } from "react";

const Header = () => {
        
    return (
        <Box sx={{flexGrow: 1, height: '10%'}}>
            <AppBar position="static" sx={{bgcolor: '#F0FFF0', border: '0.1rem solid #32a1ce', borderRadius: 3}}>
                <Toolbar>
                    <Typography color='black' sx={{pl: 2, fontSize: 30, fontStyle: 'italic', fontFamily: "Times New Roman"}}>
                        {"My Chat App"}
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
