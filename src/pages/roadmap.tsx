import React from "react";
import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import Header from "../components/Header"


function Roadmap() {
    return (
        <div>
            <Head>
                <title>Agelessteez</title>
                <meta name="description" content="The Official Ageless Teez Website" />
                <link rel="icon" href={"images/logo_color.png"} />
            </Head>
            <main>
                <Header activeIndex={0} /> 
                <img src={"images/background3.png"} className="info-background z-0"  style={{ height: "132vh" }} />
                <div className="roadmap-section md:px-8 mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-5 text-center md:text-left">
                            <ScrollAnimation 
                                animateIn="animate__fadeInUp" 
                                animateOut="animate__fadeOutLeft"
                                className="animation"
                            >
                                <div className="road-title-block">
                                    <p className="color-red">Different design, Every Drop</p>
                                    <p className="color-yel">Quality Art, Quality Clothing</p>
                                    <p className="color-long">Long Term Plan, Long Term Goals</p>
                                </div>
                                <div className="road-text-block mt-14">
                                    <p className="">Our project’s goal is to look long term.</p>
                                    <p className="mt-4">
                                        With the metaverse starting to come to life, crypto is being adopted at rates never seen before. It is only a matter of time before we begin to see your favorite brands being used all across the metaverse. So why not join in on this early?
                                    </p>
                                    <p className="mt-4">
                                    Currently, Gaming Skins and Cosmetics are a multi-billion dollar industry. A lot of people may not know that these Skins and Cosmetics are technically NFT’s, you own a piece of art that your ingame character wears or uses. However, the use for these cosmetics are only within one game or one developer&quot;s gameverse. Could you imagine when every game is able to be played on one metaverse. Your cosmetics will be less looked at as cosmetics and just clothes.
                                    </p>
                                    <p className="mt-4">
                                        That’s what we are striving for in the long term.&nbsp;THE streetwear brand of the metaverse.
                                    </p>
                                </div>
                            </ScrollAnimation>
                        </div>
                        <ScrollAnimation 
                            animateIn="animate__wobble" 
                            animateOut="animate__fadeOutRight"
                            className="animation"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="fa-y-block">
                                    <div className="flex justify-center y-img">
                                        <img src={"images/rm1.png"} className="" />
                                    </div>
                                </div>
                                <div className="fa-b-block mt-16 md:mt-0">
                                    <div className="flex justify-center b-img">
                                        <img src={"images/rm2.png"} className="" />
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                    <div className="drop-block mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ScrollAnimation 
                                animateIn="animate__fadeInLeft" 
                                animateOut="animate__fadeOutRight"
                                className="animation"
                            >
                                <div className="f-drop">                                
                                    <div className="grid grid-cols-2 md:grid-cols-2">
                                        <div>
                                            <p className="f-title">Drop 1</p>
                                            <div className="f-t-body">
                                                <div className="f-t-eval flex items-center">
                                                    <img src={"images/check.png"} className="" />
                                                    <p className="mt-1 ml-3">25 Mints Available</p>
                                                </div>
                                                <div className="f-t-eval flex items-center mt-3">
                                                    <img src={"images/check.png"} className="" />
                                                    <p className="mt-1 ml-3">1/25 - The Print</p>
                                                </div>
                                                <div className="f-t-eval flex items-center mt-3">
                                                    <img src={"images/check.png"} className="" />
                                                    <p className="mt-1 ml-3">1/25 - The Print</p>
                                                </div>
                                                <div className="f-t-eval flex items-center mt-3">
                                                    <img src={"images/check.png"} className="" />
                                                    <p className="mt-1 ml-3">1/25 - The Print</p>
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <img src={"images/rm3.png"} className="f-img" />
                                        </div>
                                    </div>
                                    <p className="f-t-bottom mt-5">
                                        All Minters will receive an Exclusive Drop 1 T-Shirt <br />
                                        10% of all funds will be allocated to the prize pool<br />
                                        Holders Get Priority Access to Drop 2
                                    </p>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__fadeInRight" 
                                animateOut="animate__fadeOutRight"
                                className="animation"
                            >
                                <div className="s-drop h-full">                                
                                    <div>
                                        <p className="f-title">Drop 2</p>
                                        <div className="f-t-body">
                                            <div className="f-t-eval flex items-center">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">75 Mints Available</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">25/75 - Reserved for past holders</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-8">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/75 - The Print</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/75 - Rares</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/75 - Commons</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <p className="f-t-bottom mt-14">
                                        All Minters will receive an Exclusive Drop 2 T-Shirt <br /> 
                                        10% of all funds will be allocated to the prize pool <br />
                                        20% of funds go towards a community orientated decision <br /> 
                                        Holders Get Priority Access to Drop 3
                                    </p>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__fadeInLeft" 
                                animateOut="animate__fadeOutLeft"
                                className="animation"
                            >
                                <div className="f-drop h-full">                                
                                    <div>
                                        <p className="f-title">Drop 3</p>
                                        <div className="f-t-body">
                                            <div className="f-t-eval flex items-center">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">175 Mints Available</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">75/175 - Reserved for past holders</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-8">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/175 - The Print</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/175 - Rares</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/175 - Commons</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <p className="f-t-bottom mt-14">
                                        All Minters will receive an Exclusive Drop 3 T-Shirt <br />
                                        10% of all funds will be allocated to the print prize pool <br />
                                        10% of funds go towards the Common Prize Pool 30% of funds <br /> 
                                        go towards a community orientated decisionHolders Get <br />
                                        Priority Access to Drop 4
                                    </p>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__fadeInRight" 
                                animateOut="animate__fadeOutRight"
                                className="animation"
                            >
                                <div className="s-drop h-full">                                
                                    <div>
                                        <p className="f-title">Drop 4</p>
                                        <div className="f-t-body">
                                            <div className="f-t-eval flex items-center">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">375 Mints Available</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">75/375 - Reserved for past holders</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-8">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/375 - The Print</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/375 - Rares</p>
                                            </div>
                                            <div className="f-t-eval flex items-center mt-3">
                                                <img src={"images/check.png"} className="" />
                                                <p className="mt-1 ml-3">?/375 - Commons</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <p className="f-t-bottom mt-14">
                                        All Minters will receive an Exclusive Drop 4 T-Shirt <br /> 
                                        10% of all funds will be allocated to the prize pool <br />
                                        10% of funds go towards the Common Prize Pool <br />
                                        20% of funds go towards a community orientated decision
                                    </p>
                                </div>
                            </ScrollAnimation>                           
                        </div>
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

export default Roadmap;