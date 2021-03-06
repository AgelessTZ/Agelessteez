import React from "react";
import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import Header from "../components/Header"

function Drops() {
    return (
        <div>
            <Head>
                <title>Agelessteez</title>
                <meta name="description" content="The Official Ageless Teez Website" />
                <link rel="icon" href={"images/logo_color.png"} />
            </Head>

            <main>       
                <Header activeIndex={1} />        
                <div className="w-full relative mt-16">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 drop-img-column">
                            <ScrollAnimation 
                                animateIn="animate__bounceInLeft" 
                                animateOut="animate__fadeOut"
                                className="animation"
                            >
                                <div className="item-col">
                                    <div className="item-img-col">
                                        <img src={"images/post-man.png"} />
                                    </div>                                    
                                </div>
                                <p className="drop-p-1 text-align mt-3">DROP ONE</p>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__bounceInRight"
                                animateOut="animate__fadeOut"
                                className="animation"
                            >
                                <div className="item-col">
                                    <div className="bg-trans item-img-col">
                                        <img src={"images/question.png"}  className="w-1/4" />
                                    </div>
                                </div>
                                <p className="drop-p-1 text-align mt-3">DROP TWO</p>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__slideInLeft" 
                                animateOut="animate__fadeOut"
                                className="animation"
                            >
                                <div className="item-col">
                                    <div className="bg-trans item-img-col">
                                        <img src={"images/question.png"} className="w-1/4" />
                                    </div>
                                </div>
                                <p className="drop-p-1 text-align mt-3">DROP THREE</p>
                            </ScrollAnimation>
                            <ScrollAnimation 
                                animateIn="animate__slideInRight"
                                animateOut="animate__fadeOut"
                                className="animation"
                            >
                                <div className="item-col">
                                    <div className="bg-trans item-img-col">
                                        <img src={"images/question.png"} className="w-1/4" />
                                    </div>
                                </div>
                                <p className="drop-p-1 text-align mt-3">DROP FOUR</p>
                            </ScrollAnimation>
                        </div>                        
                    </div>                    
                </div>
            </main>

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
    )
}

export default Drops;