import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function TestMarket(props) {

    let currentAccount = props.currentConnectedAccount;
    let contract = props.contractInstance;

    const [image,setImage] = useState(null);
    const [uriArray,setUriArray] = useState([]);



    function getTokenURI(id){
            
            contract.methods.tokenURI(id).call((err,uri)=>{  
                if(err){
                    console.log('Error = ' , err)
                }
                else 
                {
                    console.log('Token URI ' , uri);
                   
                }
            
            })

        }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
 
      <main>
        {/* Hero unit */}
       
        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

              
            
           <Card sx={{ maxWidth: 260 , my: '50px', mx:'8px'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o="
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>

            </Card>
           
            
          </Grid>
          
        </Container>
      </main>
      
  

    </ThemeProvider>
  );
}