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
            <meta name="description" content="The Official Ageless Teez Website" />
            <link rel="icon" href={"images/logo_color.png"} />
        </Head>

        <main>       
            <Header activeIndex={2} />        
            <HomePage />
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
