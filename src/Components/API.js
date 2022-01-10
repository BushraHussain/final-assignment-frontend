import React ,{useEffect} from 'react'

export const API = () => {


    useEffect(() => {
        const url = "https://bafybeia6vrscwwuoqaxqpfae25damttahq4yqokple4ygd6yy53nfgdlvq.ipfs.infura-ipfs.io/";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log("Received response : ",json.image);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);



    return (
        <div>
            hello API
            
        </div>
    )
}
