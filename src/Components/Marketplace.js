import React,{useState , useEffect,useContext} from 'react';
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
import {NFTContext} from './NFTContext.js';
import { TitleContext } from '../Context/TitleContext.js';
import {IdContext} from '../Context/IdContext.js';
import { TokenContext } from '../Context/TokenContext.js';
import ViewModal from './ViewModal.js';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Marketplace(props) {

    let currentAccount = props.currentConnectedAccount;
    let contract = props.contractInstance;

    console.log("Contract in marketPlace" , contract);

    const [imageName,setImageName] = useState([]);
    const [uriArray,setUriArray] = useState([]);
    const [count, setCount] = useContext(NFTContext);
    const [id,setId] = useContext(TitleContext);
    const [title, setTitle] = useContext(IdContext); // for title 
    const [token, setToken] = useContext(TokenContext);
    let nftOwner;
    let nftPrice;
    //console.log("In marketplace - token value " , token);

    // let tokenURI;
    // let imageTitle ;


//-----------------------------------------------------------------------------------







//----------------------------------------------------------------------------------
  async function tradeNFT(NftID){

          console.log("NFT id in trade " , NftID);
          let _nftPrice = await getNFTPrice(NftID); //getting NFT price 
          console.log("Price in trade : " , _nftPrice);

          await _tradeNFT(NftID,_nftPrice);
          let _owner = await getNFTOwner(NftID);
          console.log("owner in trade : " , _owner);
  }   




  async function _tradeNFT(_nftId,_amountToSend){

      await contract.methods
      .BuyCarsNFT(_nftId)
      .send({
          from:currentAccount,
          value:_amountToSend
          }
           ,(err,res)=>{  
          if(err){
              console.log('Error = ' , err);
          }
          else{
              console.log("Transaction ID = " , res);
              console.log("Purchased successfully");
          }
      })

  }



  async function getNFTPrice(NftID){
      
    let _nftPrice;

    await contract.methods.viewPrice(NftID).call((err,price)=>{ 
        if(err){
            console.log('Error = ' , err)
        }
        else 
        {
            _nftPrice = price;
        }

        })

    return _nftPrice;

  }

//------------------------------------------------------------

async function getNFTOwner(_nftId){ 
  let owner;

  // Test Soup Can Token ID = 4   
  await contract.methods.ownerOf(_nftId).call((err, address)=>{

      if(err){
          console.log(err);
      }
      
      else{

          console.log('Owner in get NFT owner--  = ' , address);
          owner = address;
      }
     
  })  

  nftOwner = owner;
  return owner;

}



//------------------------------------------------------------


    // useEffect(() => {
    
    //   const fetchData = async () => {
    //     try {

    //       await getURI();
    //       const url = tokenURI;
    //       console.log("URL : " , url);

    //       const response = await fetch(url);
    //       const json = await response.json();
    //       //console.log("Received response : ",json.name);
    //       imageTitle = json.name;

    //       //console.log("Image title inside " , imageTitle);
    //     } catch (error) {
    //       console.log("error", error);
    //     }
    //     setImageName(imageName.concat(imageTitle));

    //   };


      
  //     fetchData();
  // }, []);

    

  // let newToken = token.filter(sh=>sh.id >=1).map(sh=>{
  //   return sh
  // });

  // console.log("New token" , newToken);


  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
 
      <main>
        {/* Hero unit */}
       
        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
           
            {token.filter(sh=>sh.id >=1).map((tkn) => (
             
              <Grid item key={tkn.id} xs={12} sm={80} md={4}>
                <Card
                  sx={{ maxWidth: 260 , my: '50px', mx:'8px'}}
                >
                  <CardMedia
                   component="img"
                   height="200"
                   image={tkn.image}
                   alt="green iguana"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {tkn.title}
                    </Typography>
                    <Typography>
                    Id: {tkn.id}
                    </Typography>

                    <Typography>
                     Price: {tkn.price}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <ViewModal 
                      _NftID = {tkn.id} 
                      _nftTitle = {tkn.title}
                      _nftDesccription={tkn.description}
                      _nftPrice = {tkn.price}
                      _contract = {contract}
                      _nftImage = {tkn.image}
                      />
                    
                  <Button onClick={()=> tradeNFT(tkn.id)} size="small">Buy</Button>

                   
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>






        
    </ThemeProvider>
  );
}