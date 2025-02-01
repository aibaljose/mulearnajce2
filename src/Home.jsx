import React, { useEffect, useState } from "react";
import * as THREE from "three";
import {Link} from "react-router-dom"
import "./style.css";
import rahu from "./assets/rehu.jpeg"
import ResponsiveNav from "./nav"

const UXplore = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            move: { speed: 1 },
          },
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const countdownDate = new Date("February 20, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = countdownDate - now;

      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three-container").appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 50;

    const animate = function () {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div id="home123">
      <div id="particles-js"></div>
      <div id="three-container"></div>
      
      <main>

      <ResponsiveNav/>



        {/* <nav>
          <div className="logo">
            <img src="https://envs.sh/aOS.png" alt="UXplore Logo" />
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#judges">Judges</a>
            <a href="#guidelines">Guidelines</a>
            <Link to="/register">
            <button className="register-btn">Register Now</button>
            </Link>
         
          </div>
        </nav> */}

        <section className="hero">
          <h1>UXplore</h1>
          <p className="tagline">Innovate. Design. Inspire</p>
          <div className="timer">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div className="time-block" key={label}>
                <span>{value}</span>
                <label>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
              </div>
            ))}
            
          </div>
          <Link to="/register">
          <button className=" mt-[30px] w-full bg-[#31b041] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Register Now
            </button>
          </Link>
        
        </section>

        <section id="about" className="about">
          <div className="section-content">
            <h2>About UXplore</h2>
            <p>UXplore is ACM AJCE’s flagship inter-college design hackathon, where creativity meets functionality. It challenges participants to revamp real-world UI/UX designs, pushing innovation to the next level. Open to beginners and pros alike, UXplore is the perfect platform to showcase skills, gain industry insights, and compete with top design talents. 🚀</p>
          </div>
        </section>

        <section id="schedule" className="event-details">
          <div className="section-content">
            <h2>Event Schedule</h2>
            <div className="schedule">
              {[
                { time: "9:00 AM", event: "Hackathon Registration" },
                { time: "10:00 AM - 3:00 PM", event: "Hackathon" },
                { time: "1:30 PM - 2:00 PM", event: "Lunch" },
                { time: "3:00 PM - 5:00 PM", event: "Cultural Events" },
               
              ].map((item, index) => (
                <div className="schedule-item" key={index}>
                  <time>{item.time}</time>
                  <p>{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="judges" className="judges">
          <div className="section-content">
            <h2>Meet Our Judges</h2>
            <div className="judges-grid">
              {[1, 2,3].map((num) => (
                <div className="judge-card" key={num}>
                  <div className="judge-image">
                    <img src={["https://media.licdn.com/dms/image/v2/D5603AQGKKrkA8M0sfw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730905428429?e=1743638400&v=beta&t=hLncOWsxnDksXJFe5DJ0QJ3I-SSpqWIZGvhST8VkJhE", "https://media.licdn.com/dms/image/v2/D5603AQGaLGJgsnCMiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706876727082?e=1743638400&v=beta&t=YbCFqzoc_c9QjXRlpQzdWfw2aiww6aXJKSd9zH8w7PY",rahu][num - 1]} alt={`Judge ${num}`} />
                  </div>
                  <h3>{["Vignesh", "Kiran C K ","Gautham Reghu"][num - 1]}</h3>
                  <p>{["Product Designer at Air India Limited", "Senior Visual Designer at NetBramha","One of top 5 designers in India"][num - 1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="guidelines" className="guidelines">
          <div className="section-content">
            <h2>Guidelines</h2>
            <div className="guidelines-grid">
              {[
                { title: "Team Size", description: "3 members per team" },
                { title: "Duration", description: "6 hours of intense designing" },
                { title: "Submission", description: "Prototype + Presentation" },
                { title: "Judging Criteria", description: "Innovation, Usability, Visual Design" },
              ].map((item, index) => (
                <div className="guideline-card" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UXplore;
