import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { WalletConnection } from './WalletConnection';
import MenuBar from './MenuBar.js';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();
let status ;
let flag = true;
export default function Footer(props) {

    let currentAccount = props.currentConnectedAccount;
   
    if(currentAccount == undefined){
        
        flag = false;
    }
    else{ 
        status = "Connected to : " + currentAccount;
        flag = true;
    }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 0 }} component="footer">
     
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >

        
        
        
        </Typography>
       
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}