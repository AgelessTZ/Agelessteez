import React from "react";
import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import Header from "../components/Header";

function Information() {
    return (
        <div>
            <Head>
                <title>Agelessteez</title>
                <meta name="description" content="The Official Ageless Teez Website" />
                <link rel="icon" href={"images/logo_color.png"} />
            </Head>

            <main>       
                <Header activeIndex={3} /> 
                <img src={"images/background2.png"} className="info-background z-0" />
                <div className="info-section mt-24">                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">    
                        <div className="col-start-1 col-span-2 pt-6">
                            <ScrollAnimation 
                                animateIn="animate__fadeInUp" 
                                animateOut="animate__fadeOut"
                                className="animation"
                            >
                                <p className="wear-brand">The FIRST ever NFT Streetwear brand</p>
                                <p className="ageless-text mt-4">
                                    Ageless is the first ever NFT streetwear brand! <br />
                                    Combining nft’s drops to the real world in a new unique way!
                                </p>
                            </ScrollAnimation>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-14">
                                <ScrollAnimation 
                                    animateIn="animate__fadeInUp" 
                                    animateOut="animate__fadeOut"
                                    className="animation"
                                >
                                    <div className="">
                                        <p className="art-txt text-center md:text-left">
                                            The art
                                        </p>
                                        <p className="art-b-txt mt-4 text-center md:text-left">
                                            All of the art was hand drawn by Ujala.An extremely talented artist from pakistan.Here is a quick statement from her:
                                        </p>
                                        <p className="art-b-txt mt-4 text-center md:text-left">
                                            My name is ujala shahid.<br />
                                            I am a visual artist from Islamabad, pakistan.<br />
                                            in my art, i like to capture the beauty of a fantasy world. <br />
                                            I mostly draw mythical creatures/ characters. I can do so many art styles but my main style is fantasy based realistic style.  <br /> 
                                            i use different mediums to express different ideas. <br />
                                            You can also see my artworks on my instagram ( ujala_shahid )
                                        </p>
                                    </div>
                                </ScrollAnimation>
                                <div className="">
                                    <ScrollAnimation 
                                        animateIn="animate__fadeInUp" 
                                        animateOut="animate__fadeOut"
                                        className="animation"
                                    >
                                        <p className="art-txt text-center md:text-right">
                                            T-Shirts
                                        </p>
                                        <p className="art-b-txt mt-4 text-center md:text-right">
                                            Every Minter will receive an exclusive T-Shirt from the <br />
                                            drop that they mint from. The T-Shirts will only be <br />
                                            available by purchasing an NFT from the drop <br />
                                            associated to that NFT. <br />                                        
                                        </p>
                                        <p className="art-b-txt mt-4 text-center md:text-right">
                                            Every T-Shirt is: <br />
                                            Black <br />
                                            Tight Fit around the neck <br />
                                            Loose Fit On the body <br />
                                            Made from 100% Cotton <br />
                                            Weighing 10oz
                                        </p>
                                    </ScrollAnimation>
                                </div>
                            </div>
                        </div>
                        <ScrollAnimation 
                            animateIn="animate__zoomIn" 
                            animateOut="animate__fadeOut"
                            className="h-full animation"
                        >
                            <div className="col-end-4 col-span-1 h-full mt-5 md:mt-0">                                
                                <div className="mo-block">
                                    <div className="mo-img">
                                        <img src={"images/shirt.png"}  className="" />                                    
                                    </div>
                                </div>                               
                            </div>
                        </ScrollAnimation>
                    </div>
                    <ScrollAnimation 
                        animateIn="animate__slideInUp" 
                        animateOut="animate_fadeOut"
                        className="h-full animation"
                    >
                        <div className="btn-block flex items-center md:justify-between px-12 mt-14">
                            <div className="rele-btn mt-8 md:mt-0" >
                                <p className="rele-txt">Releasing</p>
                                <p className="nov-txt">November 2021</p>
                            </div>
                            <div className="rele-btn mt-8 md:mt-0" >
                                <p className="rele-txt">25 Available</p>
                                <p className="nov-txt">Hand Drawn Pieces</p>
                            </div>
                            <div className="rele-btn mt-8 md:mt-0" >
                                <p className="rele-txt">0.08 ETH</p>
                                <p className="nov-txt">1 Mint/Person</p>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14 px-8">
                        <ScrollAnimation 
                            animateIn="animate__fadeInLeft" 
                            animateOut="animate_fadeOutLeft"
                            className="h-full animation"
                        >
                            <div className="flex">
                                <div className="bp-block">
                                    <img src={"images/tm1.png"} className="relative bp-pic z-10" />
                                </div>  
                                <div className="bp-block2">
                                    <img src={"images/tm2.png"} className="relative bp-pic z-10" />
                                </div>  
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation 
                            animateIn="animate__fadeInUp" 
                            animateOut="animate_fadeOut"
                            className="h-full animation"
                        >
                            <div className="bp-txt-block">
                                <p className="uti-txt">Utility</p>
                                <ul className="bp-ou mt-10 text-center md:text-left">
                                    <li className="">
                                        <div className="red-dot"></div>
                                        Prize Pool for Holders
                                    </li>
                                    <li className="mt-8">
                                        <div className="red-dot"></div>
                                        Exclusive Community
                                    </li>
                                    <li className="mt-8">
                                        <div className="red-dot"></div>
                                        Proof Of Ownership
                                    </li>
                                    <li className="mt-8">
                                        <div className="red-dot"></div>
                                        Metaverse Integration
                                    </li>
                                </ul>
                                <div className="mt-14 text-center md:text-left">
                                    <p className="print-txt">What Is Print Prize Pool?</p>
                                    <p className="print-regular mt-8">
                                        The Print Prize Pool is a prize pool compiled of 10% of all ETH we make. Royalties and Mint. If you or a team of people collect
                                        <span className="rarity-nt">&nbsp; 4 Print Rarity NFT&quot;S &nbsp;</span>
                                        (Clearly Labeled on Open Sea) you or your team will receive all 10% of the funds collected!
                                    </p>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>                   
                    <div className="rarity-block mt-14">
                        <ScrollAnimation 
                            animateIn="animate__fadeInUp" 
                            animateOut="animate_fadeOutUp"
                            className="h-full animation"
                        >
                            <p className="uti-txt">Rarity</p>
                            
                        </ScrollAnimation>
                        <ScrollAnimation 
                            animateIn="animate__fadeInRight" 
                            animateOut="animate_fadeOutLeft"
                            className="h-full animation"
                        >
                            <img src={"images/post-man.png"}  className="m-auto mt-10" />
                            <p className="print-t mt-10">
                                Print
                            </p>
                            <p className="print-b-t">
                                The Print Rarity NFT is 1 of 1 <br /> 
                                It is the design for the T-shirt in it’s collection <br />
                                Collecting 4 of these will grant you access to the print prize pool!
                            </p>                            
                        </ScrollAnimation>
                        <ScrollAnimation 
                            animateIn="animate__fadeInLeft" 
                            animateOut="animate_fadeOutRight"
                            className="h-full animation"
                        >
                            <img src={"images/rare-nft.png"} className="m-auto mt-14" />
                            <p className="print-r mt-10">
                                RARE
                            </p>
                            <p className="print-b-t">
                                In Drop One there are only 5 Rare NFT’s <br /> 
                                These are the only other NFT’s in the collection with a detailed background <br />
                                These Each are made up of a hand drawn Woman by the Ujala <br /><br />
                                Holding on to these will give you an extremely useful later use!
                            </p>
                            
                        </ScrollAnimation>
                        <ScrollAnimation 
                            animateIn="animate__fadeInRight" 
                            animateOut="animate_fadeOutLeft"
                            className="h-full animation"
                        >
                            <div className="common-block relative">
                                <img src={"images/common.png"} className="relative m-auto z-10" />
                            </div>
                            <p className="print-c mt-20">COMMON</p>
                            <p className="print-b-t mt-8">
                                In Drop One there are only 19 Common NFT’s <br />
                                The common NFT’s were randomly generated using Hand Drawn Traits by Ujala <br /><br />
                                Holding on to these will allow you to claim money from the prize pool after drop 4
                            </p>                           
                        </ScrollAnimation> 
                        <ScrollAnimation 
                            animateIn="animate__fadeInUp" 
                            animateOut="animate_fadeOutRight"
                            className="h-full animation"
                        >
                            <p className="print-h mt-14">
                                Holding any rarity of nft will grant you 1 Reserved mint spot in the next drop per nft you own
                            </p>
                        </ScrollAnimation>
                    </div>                    
                    <footer className="flex justify-center w-full mt-50" style={{ marginTop: "100px" }}>
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

export default Information;
