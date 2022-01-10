import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ViewModal(props) {
  const [open, setOpen] = React.useState(false);
  const [NftID,setNftID] = React.useState(``);
  const [owner,setOwner] = React.useState(``);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let contract = props._contract;
  let nftId = props._NftID ;
  let nftTitle=props._nftTitle;
  let nftDes= props._nftDesccription;
  let nftPrice= props._nftPrice;
  let nftImage= props._nftImage;


console.log("Contract in modal " , contract);

async function setID(e){ 
  let ID = e.target.value;
  setNftID(ID);
}


async function getNFTOwner(){ 
  let owner;

  // Test Soup Can Token ID = 4   
  await contract.methods.ownerOf(NftID).call((err, address)=>{

      if(err){
          console.log(err);
      }
      
      else{

          console.log('Owner in get NFT owner--  = ' , address);
          owner = address;
      }
     
  })  

  setOwner(owner);
  return owner;

}

  // _NftID = {tkn.id} 
  // _nftTitle = {tkn.title}
  // _nftDesccription={tkn.description}
  // _nftPrice = {tkn.price}
  // _contract = {contract}
  // _nftOwner = {nftOwner}
  // _nftImage = {tkn.image}

  return (
    <div>
      <Button size="small" onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {nftTitle} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            NFT ID : {nftId} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Desciption : {nftDes}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Price : {nftPrice}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <label>Enter NFT ID </label>
            <input
                type="number"
                onChange={setID}
            />
            <button onClick={getNFTOwner}>Get owner</button><br /><br />
            </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Owner : {owner}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Image : {nftImage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



