import React, { useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import './../styles/ScrollButton.css'

function ScrollButton() {
  
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        
        if (scrolled > 300) {
            setVisible(true);
        }
        else if (scrolled <= 300){
            setVisible(false);
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 1000000,               // EDIT TO BE 0 AFTER
            behavior: "smooth"
        });
    };

    window.addEventListener("scroll", toggleVisible);
    return (
            <button onClick={scrollToTop} className="scroll-to-top">
                {visible && <FaArrowCircleUp />}
            </button>

  )
}

export default ScrollButton