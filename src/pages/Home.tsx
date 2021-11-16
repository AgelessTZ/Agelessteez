import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";



const getWindowDimensions = () => {
    if (typeof window !== "undefined") {
        // browser code
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
      }  
    
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [windowDimensions]);
  
    return windowDimensions;
}

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        centerMode: true
    };
    const size  = useWindowDimensions();console.log("window-size", size);
    if (size && size.width < 756) {
        settings.slidesToShow = 1;
    } else {
        settings.slidesToShow = 3;
    } 
    return (        
        <div className="home-section">
            <div className="gif-block flex justify-center">
                <ScrollAnimation 
                    animateIn="animate__bounceIn"
                    className="animation"
                >
                    <img src="images/gif.gif" />
                </ScrollAnimation>
            </div>
            <div className="slide-block mt-8">
                <ScrollAnimation 
                    animateIn="animate__fadeInUp"
                    className="h-full animation"
                >
                    <Slider {...settings}>
                        <div className="item-img">
                            <img src={"images/1.png"} className="home-slide-img" />
                        </div>
                        <div className="item-img">
                            <img src={"images/2.png"} className="home-slide-img" />
                        </div>
                        <div className="item-img">
                            <img src={"images/3.png"} className="home-slide-img" />
                        </div>
                        <div className="item-img">
                            <img src={"images/4.png"} className="home-slide-img" />
                        </div>
                        <div className="item-img">
                            <img src={"images/5.png"} className="home-slide-img" />
                        </div>
                    </Slider>
                </ScrollAnimation>
            </div>
            
        </div>
    )
}

export default Home;
