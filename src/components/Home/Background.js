import React, { useEffect } from 'react';
import gsap from 'gsap';

const ParticleAnimation = () => {
  useEffect(() => {
    const count = 100;
    const particleClass = "particle";
    const particleColors = ["#00FFFF", "#ADD8E6", "#90EE90", "#98FB98", "#FFFFFF", "#F5F5F5", "#FFFF99", "#FFFACD"];

    const container = document.getElementById("container");
    const w = container.offsetWidth;

    const getRandom = (start , end)=>{ return gsap.utils.random(start, end)}

    const createParticle = () => {
      const elem = document.createElement('div');
      elem.className = particleClass;
      container.appendChild(elem);
    
      const size = getRandom(20, 100);
      const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)]; // Select a random color from the particleColors array
    
      // Generate a semi-transparent version of the randomColor for the particle background
      const semiTransparentColor = randomColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
    
      gsap.set(elem, {
        width: size,
        height: size,
        x: gsap.utils.random(0, w),
        y: window.innerHeight,
        backgroundColor: semiTransparentColor,
        backgroundBlendMode: 'lighten',
        borderColor: randomColor, // Set the border color to the same randomly selected color
      });
    
      animateParticle(elem);
    };
    

    const animateParticle = (elem) => {
      const timeOut = getRandom(2,10)

      gsap.to(elem, timeOut, {
        y: "-100%",
        ease: "none",
        repeat: -1,
        delay: -10
      });

      gsap.to(elem, timeOut, {
        x: "+=50",
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });

      // gsap.to(elem, timeOut, {
      //   opacity: 0,
      //   ease: "power1.inOut",
      //   repeat: -1,
      //   yoyo: true
      // });

      gsap.to(elem, timeOut, {
        rotate: 360,
        ease: "none",
        repeat: -1,
      });
    };

    // Create particles
    for (let i = 0; i < count; i++) {
      createParticle();
    }

    return () => {
      // Clean up by removing animation elements when the component unmounts
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle) => {
        particle.parentNode.removeChild(particle);
      });
    };
  }, []);

  return <div id="container" style={{ width: '100%', height: '100vh', position:'fixed'}}></div>;
};

export default ParticleAnimation;
