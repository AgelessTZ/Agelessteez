import React, { useEffect, useState } from "react";
import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Zoom, Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import { ethers } from "ethers";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import abi from "../utils/contract.json";
import { useMutation, gql } from '@apollo/client';

import Header from "../components/Header";

const TESTNET_SITE = true;

const InsertUserData = gql`
  mutation InsertUserData($mintToken: String, $firstName: String, $lastName: String, $walletAddress: String, $country: String, $city: String, $province: String, $postalCode: String, $clothingSize: String) {
    insertUserData(input: { mintToken: $mintToken, firstName: $firstName, lastName: $lastName, walletAddress: $walletAddress, country: $country, city: $city, province: $province, postalCode: $postalCode, clothingSize: $clothingSize }) {
        mintUser {
            id
            mintToken
            firstName
            lastName
            walletAddress
            country
            city
            province
            postalCode
            clothingSize
      }
    }
  }
`;

// ** Immutables
const BUILDSPACE_TWITTER_HANDLE = "_buildspace";
const BUILDSPACE_TWITTER_LINK = `https://twitter.com/${BUILDSPACE_TWITTER_HANDLE}`;
const TWITTER_HANDLE = 'andreasbigger';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CONTRACT_ADDRESS = TESTNET_SITE ?
  "0xc25c5F724858C25fE01F10b79fB5803b618E12c1" :
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

    const [insertUserData] = useMutation(InsertUserData);

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
						console.log("presalemint", res);
                        if (res) {
                            toast.success(<>You have minted successfully.</>, {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            setShowModal(true)
                        }                        
					} else {
						const gasPrice = await provider.getGasPrice();
						const res = await connectedContract.mint({value : price.toString(), gasPrice : gasPrice.toString()});
						// const re1 = await connectedContract.tokenID();
                        console.log("publicsalemint", res);
                        if (res) {
                            toast.success(<>You have minted successfully.</>, {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            setShowModal(true)
                        }
                        
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

    const [showModal, setShowModal] = useState(false);    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [country, setCountry] = useState("Afganistan");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [clothingSize, setClothesSize] = useState("S");


    const onUserFormSubmit = async () => {
        if (firstName === "") {
            toast.error(<>Please insert your FirstName.</>, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else if (lastName === "") {
            toast.error(<>Please insert your LastName.</>, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else if (walletAddress === "") {
            toast.error(<>Please insert your WalletAddress.</>, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else if (walletAddress.slice(0, 2) !== "0x") {
            toast.error(<>Your walletAddress is invalid.</>, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else { console.log("submit", country)
            
            let result = await insertUserData({variables: {
                mintToken: '', firstName, lastName, walletAddress, country, city, province, postalCode, clothingSize
            }});
            
            if (result) {
                toast.success(<>You will get a free T-Shirt soon</>, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

            setFirstName("");
            setLastName("");
            setWalletAddress("");
            setCountry("Afganistan");
            setClothesSize("S");
            setCity("");
            setProvince("");
            setPostalCode("");
            setShowModal(false)
        }
        
    }

    const closeModal = () => { 
        setFirstName("");
        setLastName("");
        setWalletAddress("");
        setCountry("Afganistan");
        setClothesSize("S");
        setCity("");
        setProvince("");
        setPostalCode("");
        setShowModal(false);
    }

    return ( 
        <div> 
            <Head>
                <title>Agelessteez</title>
                <meta name="description" content="The Official Ageless Teez Website" />
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
                    {/* <button>                */}
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
                        <div className="image-block grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 mb-24 md:mb-0">
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

            {/* <Button
                color="lightBlue"
                type="button"
                onClick={(e) => setShowModal(true)}
                ripple="light"
            >
                Open small Modal
            </Button> */}

            <Modal size="md" active={showModal} toggler={() => closeModal()}>
                <ModalHeader toggler={() => closeModal()}>
                    You will get a free T-Shirt
                </ModalHeader>
                <ModalBody>      
                    <form>            
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                            Wallet address
                                        </label>
                                        <input
                                            type="text"
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            value={walletAddress}
                                            onChange={(e) => setWalletAddress(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {/* <p className="text-red-500 text-xs password">Please insert a password.</p> */}
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="Afganistan">Afghanistan</option>
                                            <option value="Albania">Albania</option>
                                            <option value="Algeria">Algeria</option>
                                            <option value="American Samoa">American Samoa</option>
                                            <option value="Andorra">Andorra</option>
                                            <option value="Angola">Angola</option>
                                            <option value="Anguilla">Anguilla</option>
                                            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Armenia">Armenia</option>
                                            <option value="Aruba">Aruba</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Bahamas">Bahamas</option>
                                            <option value="Bahrain">Bahrain</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Barbados">Barbados</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Belize">Belize</option>
                                            <option value="Benin">Benin</option>
                                            <option value="Bermuda">Bermuda</option>
                                            <option value="Bhutan">Bhutan</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Bonaire">Bonaire</option>
                                            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                            <option value="Botswana">Botswana</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                            <option value="Brunei">Brunei</option>
                                            <option value="Bulgaria">Bulgaria</option>
                                            <option value="Burkina Faso">Burkina Faso</option>
                                            <option value="Burundi">Burundi</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Cameroon">Cameroon</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Canary Islands">Canary Islands</option>
                                            <option value="Cape Verde">Cape Verde</option>
                                            <option value="Cayman Islands">Cayman Islands</option>
                                            <option value="Central African Republic">Central African Republic</option>
                                            <option value="Chad">Chad</option>
                                            <option value="Channel Islands">Channel Islands</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">Christmas Island</option>
                                            <option value="Cocos Island">Cocos Island</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Cook Islands">Cook Islands</option>
                                            <option value="Costa Rica">Costa Rica</option>
                                            <option value="Cote DIvoire">Cote DIvoire</option>
                                            <option value="Croatia">Croatia</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="Curaco">Curacao</option>
                                            <option value="Cyprus">Cyprus</option>
                                            <option value="Czech Republic">Czech Republic</option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Dominica">Dominica</option>
                                            <option value="Dominican Republic">Dominican Republic</option>
                                            <option value="East Timor">East Timor</option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="El Salvador">El Salvador</option>
                                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Estonia">Estonia</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Falkland Islands">Falkland Islands</option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">French Polynesia</option>
                                            <option value="French Southern Ter">French Southern Ter</option>
                                            <option value="Gabon">Gabon</option>
                                            <option value="Gambia">Gambia</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Gibraltar">Gibraltar</option>
                                            <option value="Great Britain">Great Britain</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Greenland">Greenland</option>
                                            <option value="Grenada">Grenada</option>
                                            <option value="Guadeloupe">Guadeloupe</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Guinea">Guinea</option>
                                            <option value="Guyana">Guyana</option>
                                            <option value="Haiti">Haiti</option>
                                            <option value="Hawaii">Hawaii</option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="India">India</option>
                                            <option value="Iran">Iran</option>
                                            <option value="Iraq">Iraq</option>
                                            <option value="Ireland">Ireland</option>
                                            <option value="Isle of Man">Isle of Man</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Jamaica">Jamaica</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Jordan">Jordan</option>
                                            <option value="Kazakhstan">Kazakhstan</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Kiribati">Kiribati</option>
                                            <option value="Korea North">Korea North</option>
                                            <option value="Korea Sout">Korea South</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Laos">Laos</option>
                                            <option value="Latvia">Latvia</option>
                                            <option value="Lebanon">Lebanon</option>
                                            <option value="Lesotho">Lesotho</option>
                                            <option value="Liberia">Liberia</option>
                                            <option value="Libya">Libya</option>
                                            <option value="Liechtenstein">Liechtenstein</option>
                                            <option value="Lithuania">Lithuania</option>
                                            <option value="Luxembourg">Luxembourg</option>
                                            <option value="Macau">Macau</option>
                                            <option value="Macedonia">Macedonia</option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Malawi">Malawi</option>
                                            <option value="Maldives">Maldives</option>
                                            <option value="Mali">Mali</option>
                                            <option value="Malta">Malta</option>
                                            <option value="Marshall Islands">Marshall Islands</option>
                                            <option value="Martinique">Martinique</option>
                                            <option value="Mauritania">Mauritania</option>
                                            <option value="Mauritius">Mauritius</option>
                                            <option value="Mayotte">Mayotte</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Midway Islands">Midway Islands</option>
                                            <option value="Moldova">Moldova</option>
                                            <option value="Monaco">Monaco</option>
                                            <option value="Mongolia">Mongolia</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Morocco">Morocco</option>
                                            <option value="Mozambique">Mozambique</option>
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Nambia">Nambia</option>
                                            <option value="Nauru">Nauru</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Netherland Antilles">Netherland Antilles</option>
                                            <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                            <option value="Nevis">Nevis</option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">Norfolk Island</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau Island">Palau Island</option>
                                            <option value="Palestine">Palestine</option>
                                            <option value="Panama">Panama</option>
                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                            <option value="Paraguay">Paraguay</option>
                                            <option value="Peru">Peru</option>
                                            <option value="Phillipines">Philippines</option>
                                            <option value="Pitcairn Island">Pitcairn Island</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Qatar">Qatar</option>
                                            <option value="Republic of Montenegro">Republic of Montenegro</option>
                                            <option value="Republic of Serbia">Republic of Serbia</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Romania">Romania</option>
                                            <option value="Russia">Russia</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="St Barthelemy">St Barthelemy</option>
                                            <option value="St Eustatius">St Eustatius</option>
                                            <option value="St Helena">St Helena</option>
                                            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                            <option value="St Lucia">St Lucia</option>
                                            <option value="St Maarten">St Maarten</option>
                                            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                            <option value="Saipan">Saipan</option>
                                            <option value="Samoa">Samoa</option>
                                            <option value="Samoa American">Samoa American</option>
                                            <option value="San Marino">San Marino</option>
                                            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Seychelles">Seychelles</option>
                                            <option value="Sierra Leone">Sierra Leone</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Slovakia">Slovakia</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">Solomon Islands</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Swaziland">Swaziland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syria">Syria</option>
                                            <option value="Tahiti">Tahiti</option>
                                            <option value="Taiwan">Taiwan</option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania">Tanzania</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Togo">Togo</option>
                                            <option value="Tokelau">Tokelau</option>
                                            <option value="Tonga">Tonga</option>
                                            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                            <option value="Tunisia">Tunisia</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Turkmenistan">Turkmenistan</option>
                                            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Erimates">United Arab Emirates</option>
                                            <option value="United States of America">United States of America</option>
                                            <option value="Uraguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Vatican City State">Vatican City State</option>
                                            <option value="Venezuela">Venezuela</option>
                                            <option value="Vietnam">Vietnam</option>
                                            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                            <option value="Wake Island">Wake Island</option>
                                            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                            <option value="Yemen">Yemen</option>
                                            <option value="Zaire">Zaire</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Zimbabwe">Zimbabwe</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City/Municipality
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            value={province}
                                            onChange={(e) => setProvince(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                            ZIP / Postal code
                                        </label>
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            className="modal-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                            Clothing size
                                        </label>
                                        <select
                                            id="clothes"
                                            name="clothes"
                                            autoComplete="clothes-size"
                                            value={clothingSize}
                                            onChange={(e) => setClothesSize(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                            <option value="XXXL">XXXL</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </form> 
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={() => closeModal()}
                        ripple="dark"
                    >
                        Close
                    </Button>                                    
                    <Button
                        color="green"
                        type="submit"
                        onClick={() => onUserFormSubmit()}
                        ripple="light"
                    >
                        Save Changes
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Mint;