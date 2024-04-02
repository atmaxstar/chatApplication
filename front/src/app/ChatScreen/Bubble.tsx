import { Paper, Typography } from "@mui/material"
import { bgcolor_bubble_me, bgcolor_bubble_partner, txtcolor_bubble_me, txtcolor_bubble_partner } from "../constant/colors";

interface Props {
    isMe: boolean;
    name: string;
    txt: string;
}

const Bubble = ({isMe, name, txt}: Props) => {
  return (
    <>
    
    <Typography sx={{fontWeight: 'bold', textAlign: isMe ? 'end' : 'start', pl: isMe ? 0 : 2, pr: isMe ? 2 : 0}}>
            {name}
    </Typography>
    <Paper sx={{bgcolor: isMe? bgcolor_bubble_me : bgcolor_bubble_partner, borderRadius: 5, p: 3}}>
        <Typography sx={{color: isMe? txtcolor_bubble_me : txtcolor_bubble_partner}}>
            {txt}
        </Typography>
    </Paper>
    </>
  )
}

export default Bubble
