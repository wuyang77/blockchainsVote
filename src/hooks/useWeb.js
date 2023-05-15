import Web3 from "web3";
import VoteJSON from "../contract/Vote.json";



const useWeb3 = () => {   
    const web3 = new Web3(Web3.givenProvider || 
        "wss://goerli.infura.io/ws/v3/bc3ae33c36c04e1b8ba9d6cc40aaaeae"
    );
    const contractAddress = "0x63a5459c07915e1f90F982F1ddF55cdd14578878";
    const voteContract = new web3.eth.Contract(VoteJSON.abi,contractAddress);
   
    const getAccount = async () => {
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts[0]);
        return accounts[0];
    };

    return {
        web3,
        voteContract,
        contractAddress,
        getAccount
    };
};



export default useWeb3;