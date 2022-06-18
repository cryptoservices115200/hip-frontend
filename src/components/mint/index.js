import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

import DiversifyNFT from "../../contracts/DiversifyNFT.json";
import DiversifyNFTSales from "../../contracts/DiversifyNFTSales.json";

const NftImage = '/images/PicsArt_01-20-04.44.33.png';

const NFTAddress = "0xCc48a3ECB6c671eb4eEBBeBE000802D4C15796f6";
const NFTSaleAddress = "0xB48bceaAF3bF8aB9C5517518aF0dCc21F81790cE";

class MintNFT extends React.Component {

    constructor(props) {
        super(props);
        this.addMintNumber = this.addMintNumber.bind(this);
        this.subMintNumber = this.subMintNumber.bind(this);
        // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
        this.state = {
            value: 3,
            mintState: true
        };
    }

    addMintNumber (e) {
        let mintNum = this.state.value + 1;
        if (mintNum > 5) {
            mintNum = 5;
        }
        this.setState({value : mintNum});
    }

    subMintNumber (e) {
        let mintNum = this.state.value - 1;
        if (mintNum < 1) {
            mintNum = 1;
        }
        this.setState({value : mintNum});
    }

    mintNFT = async() => {
        const { ethereum } = window;
        if (ethereum) {

const providerOptions = {
//   binancechainwallet: {
//     package: binancechainwallet
//     },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "0bbb45846bdf44d1bcbe6275327619ad"
    }
    },
    walletlink: {
    package: WalletLink, 
    options: {
      appName: "Hip Ass Ape Minter", 
      infuraId: "0bbb45846bdf44d1bcbe6275327619ad", 
      rpc: "", 
      chainId: 4
, 
      appLogoUrl: null, 
      darkMode: true 
    }
    },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
}


          var provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                // var account = accounts[0];
                const { chainId } = await provider.getNetwork();
                if (chainId !== 0x4) {
                    // alert("Please change the network to rinkby");
                    return;
                }
                this.setState({mintState : false});

                const signer = provider.getSigner();
                const DiversifyNFTContract = new ethers.Contract(NFTAddress, DiversifyNFT.abi, signer);
                const DiversifyNFTSalesContract = new ethers.Contract(NFTSaleAddress, DiversifyNFTSales.abi, signer);

                const result = await DiversifyNFTContract.totalSupply();
                const totalSupply = result.toNumber();
                // console.log("totalSupply : ", totalSupply);

                let data = [];
                for(var n = 0; n < this.state.value; n++) {
                    const tokenID = totalSupply + n;
                    const obj = { user : accounts[0], tokenId : tokenID};
                    data.push(obj);
                }
                // console.log("mint data : ", data);

                const mintFee = await DiversifyNFTSalesContract.fee();
                // console.log("fee : ", ethers.utils.formatEther(mintFee));

                await DiversifyNFTSalesContract.mint(data, {value: mintFee});

                alert("NFt minting successed!");

                // const mintResult = await DiversifyNFTSalesContract.minted();
                // console.log("minted : ", mintResult.toNumber());

            } else {
                alert("Please connect the wallet");
            }
        } else {
            alert("Please install Metamask!");
        }

        this.setState({mintState : true});
    }
    
    render() {
        return (
            <Container>
                <div className="title text-center">
                    <div className="title-big splitAnim" data-aos="fade-up" data-aos-duration="2000">NFT Mint</div>
                    <h2 className="splitAnim" data-aos="fade-up" data-aos-duration="2000">NFT Mint</h2>
                </div>
                <div className="nftmint-list" data-aos="fade-up" data-aos-duration="2000">
                    <Row className="mint-row">
                        <Col lg={5}>
                            <div className="mint-image" data-aos="fade-right" data-aos-duration="2000">
                                <img src={NftImage} className="img-fluid" alt="" />
                            </div>
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={3} className="mint-col">
                            <div className="mint-amount-col">
                                <Button variant="success" className="mint-number-button" onClick={this.subMintNumber}> - </Button>
                                <input className="mint-amount-input" type="number" pattern="[0-9]*" value={this.state.value} min={1} disabled />
                                <Button variant="success" className="mint-number-button" onClick={this.addMintNumber}> + </Button>
                            </div>
                        </Col>
                        <Col lg={3} className="mint-col" style={{marginBottom:"20px"}}>
                            <Button variant="success" onClick={this.mintNFT} disabled={!this.state.mintState}>Mint Now</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default MintNFT;
