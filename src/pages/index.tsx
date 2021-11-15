import Head from "next/head";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import Header from "../components/Header"
import HomePage from "./Home";

export default function Home() {
  return (
    <div>
        <Head>
            <title>Agelessteez</title>
            <meta name="description" content="Generated by create next app" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <main>       
            <Header />        
            <HomePage />
        </main>
     
        <footer className="flex justify-center w-full mt-50" style={{ marginTop: "100px" }}>
            <div className="flex justify-between w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6">
                {/* <ScrollAnimation 
                    animateIn="animate__fadeInLeft" 
                    animateOut="animate__fadeOutLeft"
                > */}
                    <div className="footer-icon">
                        <img src={"images/twitter.png"} className="w-2/4 m-auto" />
                    </div>
                    <div className="footer-icon">
                        <img src={"images/discord.png"} className="w-2/4 m-auto" />
                    </div>
                    <div className="footer-icon">
                        <img src={"images/instrgram.png"} className="w-2/4 m-auto" />
                    </div>
                    <div className="footer-icon">
                        <img src={"images/boat.png"} className="w-2/4 m-auto" />
                    </div>
                {/* </ScrollAnimation> */}
            </div>
        </footer>
    </div>
  )
}
