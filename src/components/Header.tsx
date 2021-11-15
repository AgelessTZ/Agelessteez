import React, { useState, useEffect } from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

export default function Header() {
    const [status, setStatus] = useState("-200%");

    useEffect(() => {
        // console.log("status", status)
    }, [status])

  return (
    <header className="flex justify-center py-5 relative z-99">
      <nav className="flex nav-bar">
        {navLinks.map((link, index) => { 
            return (
                <ul className={`ul-${index}`} key={index}>               
                    <Link href={link.path}>
                        {
                            link.path === "/" ? 
                                <li key={index} className="ml-8"><img src={"images/logo_color.png"} key={index} className="logo" /></li>: 
                                <li key={index} className="link-item">{link.name}</li>
                        }                
                    </Link>
                </ul>
            );
        })}
        <a className="menu-burger h-full" id="opennav" onClick={() => setStatus("0%")}>
          <img src={"images/icon_menu.png"} className="icon-menu" />
        </a>
      </nav>
      {/* {
          status ?  */}
            <div id="mySidenav" className="sidenav" style={{ top: status, opacity: "1" }}>
                <div className="cont">
                    {navLinks.map((link, index) => { 
                        return (
                            <ul key={index}>               
                                <Link href={link.path}>
                                    <li key={index} onClick={() => setStatus("-200%")}>{link.name}</li>
                                </Link>
                            </ul>
                        );
                    })}
                    <p className="closebtn" id="closenav" onClick={() => setStatus("-200%")}>&times;</p>
                </div> 
            </div>
      {/* } */}
        
    
    </header>
  );
}