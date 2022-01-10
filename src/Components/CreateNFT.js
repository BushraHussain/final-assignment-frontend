import React ,{useState,useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import { create } from 'ipfs-http-client'
import Footer from './Footer';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {NFTContext} from './NFTContext.js';
import {TitleContext} from '../Context/TitleContext.js';
import {IdContext} from '../Context/IdContext.js';
import {TokenContext} from '../Context/TokenContext.js';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
    const Input = styled('input')({
        display: 'none',
    });

    const client = create('https://ipfs.infura.io:5001/api/v0'); 
    let status ;
    let _flag = true;

export default function CreateNFT(props) {

    const [imageUrl, updateImageUrl] = useState(``);
    const [nftName,setNftName] = useState(``);
    const [nftDes,setNftDes] = useState(``);
    const [nftPrice, setNFTPrice] = useState(``);
    const [nftOwner,setOwner] = useState(``);

    const [count, setCount] = useContext(NFTContext);
    const [id,setId] = useContext(TitleContext); // for id 
    const [title, setTitle] = useContext(IdContext); // for title 
    
    const [token,setToken] = useContext(TokenContext);



    let currentAccount = props.currentConnectedAccount;
    let contract = props.contractInstance;

   
 

    if(currentAccount == undefined){
        
      _flag = false;
    }
    else{ 
        status = "Connected to : " + currentAccount;
        _flag = true;
    }
    
    const[flag,setFlag] = useState(``); 
    const [NftID,setNftID] = useState(``);


    async function onChange(e) {

        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          const _imageURL = `https://ipfs.infura.io/ipfs/${added.path}` // base uri of IPFS (public node )
          updateImageUrl(_imageURL)

          console.log("Image URL " , _imageURL);
    
          //----------------------- now make metaData of NFT 
    
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
    

    async function setName(e){ // setting input value
        let name = e.target.value;
        setNftName(name);
       // setTitle(name)
    }


    async function setDescription(e){ // setting input value
        let Description = e.target.value;
        setNftDes(Description);
    }

    async function setPrice(e) { // setting input value
        let price = e.target.value;
        setNFTPrice(price);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };
//-----------------------------------------------------------------

async function getNFTOwner(_nftId){ 
  let _owner;

  // Test Soup Can Token ID = 4   
  await contract.methods.ownerOf(_nftId).call((err, address)=>{

      if(err){
          console.log(err);
      }
      
      else{

          console.log('Owner in get NFT owner--  = ' , address);
          _owner = address;
      }
     
  })  

  setOwner(_owner);

  return _owner;

}



// <Button
//     type="submit"
//     disabled={
//         name === "" || email === "" || password === "" ? true : false
//     }
//     fullWidth
//     variant="contained"
//     color="primary"
//     className={classes.submit}>
//     SignUP
// </Button>





//-----------------------------------------------------------------

    // async function _setNFTURI(){

    //   const tokenObject = JSON.stringify({
    //     "name": nftName,
    //     "description": nftDes,
    //     "image": imageUrl,
    //   });
      
    //   const cid = await client.add(tokenObject);
    //   const CID = `https://ipfs.infura.io/ipfs/${cid.path}`;
  
    //   console.log("IPFS CID:", CID); // pass this URL as tokenURI to mint function
    //   setNFTURI(CID);

    // }

    async function _mintNft(){

      const tokenObject = JSON.stringify({
        "name": nftName,
        "description": nftDes,
        "image": imageUrl,
      });


      setTitle(title.concat(nftName));
      const cid = await client.add(tokenObject);
      const CID = `https://ipfs.infura.io/ipfs/${cid.path}`;
      console.log("NFT URL in mint " , CID);
      console.log("Price in mint " , nftPrice);
   

      let TokenID;
 
      let transaction = await contract.methods
         .MintCarsNFT(CID, nftPrice)
         .send({from:currentAccount} ,(err,res)=>{  
            if(err){
              console.log('Error = ' , err)
            }
            else{
              console.log("Transaction ID = " , res);
              console.log("NFT Minted successfully")
            
             }
         })
  
        TokenID = transaction.events.Transfer.returnValues.tokenId;
        console.log("Minted token ID" , TokenID)
        setCount(count.concat(1)) ;
        setFlag(true);
        setNftID(TokenID);
        let _owner= await getNFTOwner(TokenID);
        
        setId(TokenID);

        const updateToken = [
          // copy the current users state
          ...token,
          // now you can add a new object to add to the array
          {
            // using the length of the array for a unique id
            id: TokenID,
            // adding a new user name
            title: nftName,
            // with a type of member
            description: nftDes,
            image: imageUrl,
            price: nftPrice,
            
          }
        ];
  
        setToken(updateToken);


        return TokenID;
 
    }

  return (
 
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <TagFacesIcon />
          </Avatar>
          
          <Typography component="h3" variant="h5">
            Create New Item
          </Typography>

          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <label htmlFor="icon-button-file" margin="normal">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={onChange}   />
                <Box component="form" sx={{ p: 1, border: '1px dashed grey',alignItems: 'center'  } } >
                  <Box component="form"  sx={{ p: 2 , alignItems: 'center' }} >
                    <AddPhotoAlternateIcon 
      
                      sx={{ fontSize: 80, 
                        color:"action",
                        alignItems: 'center' }}
                    />
                  </Box>
                </Box>
            </label>

            

            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              label="Title"
              type="text"
              onChange={setName}
              autoFocus
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              type="text"
              onChange={setDescription}
              multiline rows={2}
              label="Description"
             
            />

            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              type="number"
              onChange={setPrice}
              label="Price in wei"
             
            />
  
        
            <Button
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={_mintNft}
             
            >
              Create
            </Button>
         
          </Box>
        </Box>
          {_flag == false?  

            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    Please connect MetaMask
                </Alert>
            </Stack>

          : status}
   
 
        
      </Container>
    </ThemeProvider>
  );
}