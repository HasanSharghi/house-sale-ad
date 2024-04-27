import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['آگهی ها', 'آگهی های من', 'ثبت آگهی'].map((text, index) => (
          <Link to={text==='آگهی ها'? "/" : text==='آگهی های من' ? "/my-ad":"/new-ad"}>
          <ListItem key={text} disablePadding>
            <ListItemButton >
              <ListItemText sx={{textAlign:"right"}}>
                <span className='font-bold'>{text}</span>
            </ListItemText>
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
      <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#64748b" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#64748b" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#64748b" stroke-width="2" stroke-linecap="round"></path> </g></svg>
      </Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}