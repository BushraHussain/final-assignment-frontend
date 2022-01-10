import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import cars from './cars.jpg';
import "./image.css";



const theme = createTheme();

export default function Banner() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Think, Create & Sell Car NFTs
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              "Eat, Sleep, Drive, Repeat"
              <img src={cars} className="photo" alt="Logo" />
            </Typography>
           
         
          </Container>
        </Box>
    
    
    </ThemeProvider>
  );
}