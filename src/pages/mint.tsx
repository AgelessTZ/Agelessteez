import React, { useEffect, useState } from "react";
import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Zoom, Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { ethers } from "ethers";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import abi from "../utils/contract.json";

import Header from "../components/Header";

const TESTNET_SITE = true;

// ** Immutables
const BUILDSPACE_TWITTER_HANDLE = "_buildspace";
const BUILDSPACE_TWITTER_LINK = `https://twitter.com/${BUILDSPACE_TWITTER_HANDLE}`;
const TWITTER_HANDLE = 'andreasbigger';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CONTRACT_ADDRESS = TESTNET_SITE ?
  "0x0bCABF44a1bF9106C6Bf414147f431aD4692078E" :
  "0x0"
;
const CONTRACT_ABI = abi.abi;
const OPENSEA_COLLECTION_URL = TESTNET_SITE ?
  "https://testnets.opensea.io/collection/the-epics-v2" :
  "https://opensea.io/collection/the-epics-v2"
;

const DEPLOYED_CHAINS = [3];


const calculateTimeLeft = () => {;
    let year = new Date().getFullYear();
    const difference = +new Date(`11/27/${year} 02:00:00 PM EST`) - +new Date();
    let timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

    if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
      
};  

function Mint() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const [currAccount, setCurrentAccount] = useState(null);
	const [currMintCount, setCurrMintCount] = useState(0);
	const [maxMintCount, setMaxMintCount] = useState(0);
	const [price, setPrice] = useState(null);
	const [presaleStartDate, setPresaleStartDate] = useState(1635126000);
	const [publicStartDate, setPublicStartDate] = useState(1635127200);

	const [toastLink, setToastLink] = useState("");
	const [chainId, setChainId] = useState(1);

	const [isAppInited, setIsAppInited] = useState(false);

	const [isMinting, setIsMinting] = useState(false);

	const getChainId = async () => {
        // @ts-ignore
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const { chainId } = await provider.getNetwork()
		setChainId(chainId);
	}

    // ** Try to connect to wallet
	const checkIfWalletIsConnected = () => {
        // @ts-ignore
		const { ethereum } = window;
		if(!ethereum) {
			toast.error('🦊 Missing Metamask!', {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return
		}

		// ** Try to get access to the user's wallet
		ethereum.request({ method: 'eth_accounts' })
		.then((accounts) => {
			// ** There could be multiple accounts
			if(accounts.length !== 0) {
				// ** Get the first account
				let account = accounts[0].toString().toLowerCase();

				// ** Get the chainId
				getChainId();

				// ** Store the account
				setCurrentAccount(account);

				// ** Get the contract mint count info
				getInfo();
			} else {
				toast.error(<>No authorized accounts found! <br />Please connect a metamask account!</>, {
					position: "top-left",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		}).catch(err => {
			// console.log(err);
		})
	}

	const connectWallet = () => {
        // @ts-ignore
		const { ethereum } = window;

		if(!ethereum) {
			toast.error('🦊 Missing Metamask!', {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}

		ethereum.request({ method: 'eth_requestAccounts' })
		.then((accounts) => {
			let account = accounts[0].toString().toLowerCase();
			setCurrentAccount(account);

			// ** Get the chainId
			getChainId();

			// ** Get the contract mint count info
			getInfo();

			// ** Refresh page
			checkIfWalletIsConnected();
		})
		.catch((e) => {
			toast.error(<>Failed to load metamask accounts! <br />Please refresh the page!</>, {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		})
	}

	const onMint = async () => { 
		setIsMinting(true);
		try {
            // @ts-ignore
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

				try {
                    // @ts-ignore
					const now = parseInt((new Date()).getTime() / 1000);
                    if ( now < presaleStartDate ) {
                        toast.error(<>Sorry, Presale Minting is not started.</>, {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else if (presaleStartDate <= now && now < publicStartDate) {
						const gasPrice = await provider.getGasPrice();
						const res = await connectedContract.preSaleMint({value : price.toString(), gasPrice : gasPrice.toString()});
						// console.log(res);
                        toast.success(<>You have minted successfully.</>, {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
					} else {
						const gasPrice = await provider.getGasPrice();
						const res = await connectedContract.mint({value : price.toString(), gasPrice : gasPrice.toString()});
						// console.log(res);
                        toast.success(<>You have minted successfully.</>, {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
					}
					setIsMinting(false);
				} catch (er) {
					// console.log(er);
					const msg = er.error && er.error.message ? er.error.message.slice(20) : "Rejected Transaction";
					toast.error(msg, {
						position: "top-left",
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
					setIsMinting(false);
					return;
				}
			} else {
				// console.log("Ethereum object doesn't exist!");
				setIsMinting(false);
			}
		} catch (error) {
			toast.error('🎟️ Failed to mint, please try again!', {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			setIsMinting(false);
		}
	}

	const getInfo = async () => {
		try {
            // @ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const eContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

			let info = await eContract.info();
			// console.log(info);

			// Price
			// console.log("price", Number(info[0]) / Math.pow(10, 18));
			setPrice(Number(info[0]));

			// Presale Start Date
			// console.log("presaleStartDate", Number(info[1]));
			setPresaleStartDate(Number(info[1]));
			
			// Public Sale Start Date
			// console.log("publicStartDate", Number(info[2]));
			setPublicStartDate(Number(info[2]));

			// Current Supply
			// console.log("currMintCount", Number(info[3]));
			setCurrMintCount(Number(info[3]));

			// Max Supply
			// console.log("maxMintCount", Number(info[4]));
			setMaxMintCount(Number(info[4]));

			setIsAppInited(true);
		} catch (e) {
			toast.error(<>Failed to load the information from Network. <br />Make sure you are connected to Network and refresh page!</>, {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			setIsAppInited(false);
		}
	}

    useEffect(() => {
		checkIfWalletIsConnected();
		const interval = setInterval(() => {
			if (isAppInited) getInfo();
		}, 1000);
		return () => clearInterval(interval);
	}, [isAppInited])
    
    return ( 
        <div> 
            <Head>
                <title>Agelessteez</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={"images/logo_color.png"} />
            </Head>
            <main>
                <a
                    href={toastLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    <ToastContainer />
                </a>
                <Header activeIndex={4} />   
                    {/* <div className="opa-20 mint-background z-0 " ></div> */}
                    <div className="mint-section mt-28">                    
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid grid-cols-2">
                                <ScrollAnimation 
                                    animateIn="animate__fadeInUp" 
                                    animateOut="animate_fadeOutLeft"
                                    className="h-full animation flex items-center justify-center md:justify-end"
                                >
                                    <div className="circle-block">                                    
                                        <div className="relative h-full flex justify-center items-center flex-col mint-circle">
                                            <p className="h-n">{ timeLeft.days }</p>
                                            <p className="h-d">Days</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation 
                                    animateIn="animate__fadeInDown" 
                                    animateOut="animate_fadeOutUp"
                                    className="h-full animation flex items-center justify-center"
                                >
                                    <div className="circle-block">
                                        <div className="relative h-full flex justify-center items-center flex-col mint-circle">
                                            <p className="h-n">{ timeLeft.hours }</p>
                                            <p className="h-d">Hours</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <ScrollAnimation 
                                animateIn="animate__zoomIn" 
                                animateOut="animate_fadeOut"
                                className="h-full animation flex justify-center"
                            >
                                <div className="w-3/5 md:w-full h-full relative">
                                    {
                                        currAccount ? (
                                            <button 
                                                disabled={(currMintCount >= maxMintCount || !DEPLOYED_CHAINS.includes(chainId)) ? true : false}
                                                className="w-full h-full relative mint-block"
                                                onClick={onMint}
                                                style={{
                                                    opacity: (currMintCount >= maxMintCount || !DEPLOYED_CHAINS.includes(chainId)) ? 0.5 : 1,
                                                }}
                                            >
                                                Mint
                                            </button>
                                        ) : null
                                    }
                                    { currAccount ? null : (
                                            <button className="w-full h-full relative mint-block" style={{ fontSize: '3rem' }} onClick={connectWallet}>
                                                Connect Wallet
                                            </button>
                                    )}
                                </div>
                            </ScrollAnimation>
                            <div className="grid grid-cols-2">
                                <ScrollAnimation 
                                    animateIn="animate__fadeInDown" 
                                    animateOut="animate_fadeOutUp"
                                    className="h-full animation flex items-center justify-center"
                                >
                                    <div className="circle-block">
                                        <div className="relative h-full flex justify-center items-center flex-col mint-circle">
                                            <p className="h-n">{ timeLeft.minutes }</p>
                                            <p className="h-d">Minutes</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation 
                                    animateIn="animate__fadeInUp" 
                                    animateOut="animate_fadeOutLeft"
                                    className="h-full animation h-full animation flex items-center justify-center md:justify-start"
                                >
                                    <div className="circle-block">
                                        <div className="relative h-full flex justify-center items-center flex-col mint-circle">
                                            <p className="h-n">{ timeLeft.seconds }</p>
                                            <p className="h-d">Seconds</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                        <ScrollAnimation 
                            animateIn="animate__fadeInUp" 
                            animateOut="animate_fadeOutUp"
                            className="h-full animation"
                        >
                            <div className="text-center mt-1">
                                {/* <p className="t-m">
                                    0/25 Mints Available
                                </p> */}
                                {price ? (
                                    <p className="t-m">
                                        <span style={{ fontSize: "20px" }}>ETH PRICE:</span>  <span>{(price/Math.pow(10, 18)).toFixed(2)}</span>
                                    </p>
                                ) : null}
                                {DEPLOYED_CHAINS.includes(chainId) ? (
                                    <div className="t-m">
                                        <span className="t-m">{currMintCount}/{maxMintCount}</span> Teez have been minted!
                                    </div>
                                ) : null}
                            </div>
                        </ScrollAnimation>
                        <div className="image-block grid grid-cols-1 md:grid-cols-4 gap-4 mt-14 mb-24 md:mb-0">
                            <ScrollAnimation 
                                animateIn="animate__fadeInLeft" 
                                animateOut="animate_fadeOutLeft"
                                className="h-full animation"
                            >
                                <div className="flex justify-center md:justify-end">                                
                                    <div className="p-back-part">
                                        <Slide>
                                            <div className="p-back">
                                                <img src={"images/mint_man_back.png"} />
                                            </div>
                                            <div className="p-back">
                                                <img src={"images/mint_man.png"} />
                                            </div>
                                            <div className="p-back shirt">
                                                <img src={"images/mint_shirt.png"} />
                                            </div>
                                            <div className="p-back shirt">
                                                <img src={"images/mint_shirt_1.png"} />
                                            </div>
                                        </Slide>
                                    </div>                               
                                </div>           
                            </ScrollAnimation>    
                            <div>
                            </div>
                            <div>
                            </div>
                            <ScrollAnimation 
                                animateIn="animate__fadeInRight" 
                                animateOut="animate_fadeOutRight"
                                className="h-full animation flex justify-start items-center"
                            >  
                                <div className="post-part relative mt-14 md:mt-0">
                                    <div className="p-post-part relative">   
                                        <img src={"images/post_man.png"} className="post_man z-10" />                                 
                                    </div>                                
                                </div>
                            </ScrollAnimation>
                        </div>
                        <footer className="flex justify-center w-full" style={{ marginTop: "40px" }}>
                            <div className="flex justify-between w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6">
                                {/* <ScrollAnimation 
                                    animateIn="animate__fadeInLeft" 
                                    animateOut="animate__fadeOutLeft"
                                > */}
                                    <a href="https://twitter.com/AgelessTeez" target="_blank" rel="noreferrer" className="footer-icon">
                                        <img src={"images/twitter.png"} className="w-2/4 m-auto" />
                                    </a>
                                    <a href="https://discord.gg/xBe4hu4tgp" target="_blank" rel="noreferrer" className="footer-icon">
                                        <img src={"images/discord.png"} className="w-2/4 m-auto" />
                                    </a>
                                    <a href="https://www.instagram.com/agelessteez/" target="_blank" rel="noreferrer" className="footer-icon">
                                        <img src={"images/instrgram.png"} className="w-2/4 m-auto" />
                                    </a>
                                    {/* <a className="footer-icon">
                                        <img src={"images/boat.png"} className="w-2/4 m-auto" />
                                    </a> */}
                                {/* </ScrollAnimation> */}
                            </div>
                        </footer>
                    </div>
            </main>
        </div>
    )
}

export default Mint;