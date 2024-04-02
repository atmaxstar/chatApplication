import User from "@/models/user"
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material"


const colors = [
    'darkgreen','slategray','crimson','gold','darkolivegreen','lavenderblush','turquoise','gray','deeppink','limegreen','darkturquoise','darkmagenta'
]
interface Props{
    users: User[];
}

const Partners = ({users}: Props) => {
  return (
    <Paper sx={{ p:3, borderRadius: 5, bgcolor: "white", height: '100%', width: '30%'}}>
        <Box sx={{ overflowX: 'hidden', overflowY: 'auto', height: '100%', width: '100%',
                '::-webkit-scrollbar': {
                    width: '10px',
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'lightgrey',
                    borderRadius: '5px'
                } 
        }}>
            {users.map((user,index)=>
            <>
                <Box key={`${user.name}:${user.joinedAt}`} sx={{ display: 'flex', flexDirection: 'row'}} gap={2}>
                    <Avatar sx={{ bgcolor: colors[index % colors.length] }}>{user.name[0]}</Avatar>
                    <Box sx={{width: '100%'}}>
                        <Typography sx={{ fontWeight: 'bolder', fontSize: 18 }}>
                            {user.name}
                        </Typography>
                        <Typography noWrap sx={{ fontSize: 15, width: '80%' }}>
                            {user.joinedAt}
                        </Typography>
                    </Box>
                </Box>
                
                <Divider sx={{m:2}}/>
            </>
            )}
        </Box>
    </Paper>
  )
}

export default Partners
