import { useContext } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
    
    return (
        <Drawer
            anchor="left"
            open={ sideMenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
