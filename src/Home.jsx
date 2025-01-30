import React, { useState, useEffect } from "react";
import logo from "./assets/logo-2.png";
import { useNavigate } from "react-router-dom";
import "./form.css";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState("");

  const handleButtonClick = () => {
    navigate("/register");
  };

  // Countdown Timer Logic
  useEffect(() => {
    const targetDate = new Date("2025-02-20T00:00:00Z");
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setCountdown("The event has started!");
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-6 md:px-10">
        <h1 className="text-4xl font-bold text-yellow-400 text-shadow">UXPLORE</h1>
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>
        <nav
          className={`absolute md:static bg-gray-900 w-full md:w-auto top-16 left-0 md:flex space-x-6 transition-transform transform ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
            <li className="text-yellow-400 hover:text-yellow-300 transform hover:scale-105 transition-all">About</li>
            <li className="text-yellow-400 hover:text-yellow-300 transform hover:scale-105 transition-all">Events</li>
            <li className="text-yellow-400 hover:text-yellow-300 transform hover:scale-105 transition-all">Speakers</li>
            <li className="text-yellow-400 hover:text-yellow-300 transform hover:scale-105 transition-all">Gallery</li>
            <li className="text-yellow-400 hover:text-yellow-300 transform hover:scale-105 transition-all">Contact</li>
          </ul>
        </nav>
      </header>

      <section className="text-center py-20 relative" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

        <div className="flex justify-center mb-10 relative">
          <img
            src={logo}
            alt="UXPLORE Logo"
            className="w-[500px] mb-6 transform hover:scale-105 transition-all duration-300"
          />
        </div>

        <h2 className=" relative text-5xl font-bold text-white text-shadow">UXPLORE - UI HACKATHON</h2>
        <p className=" relative mt-4 max-w-2xl mx-auto text-lg">
          The ultimate UI design challenge at our college! Collaborate, innovate, and create stunning user experiences.
        </p>
        <p className=" relative mt-6 text-2xl font-semibold text-white">{countdown}</p>
        <button
          onClick={handleButtonClick}
          className="mt-6 bg-black text-yellow-400 py-3 px-8 rounded-xl text-xl hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 shadow-xl"
        >
          Register Now
        </button>
      </section>

      
      {/* <section className="p-10 bg-gray-800 text-yellow-400">
        <h3 className="text-3xl font-bold mb-6 text-shadow">Event Highlights</h3>
        <div className="bg-gray-700 p-6 rounded-lg text-center transform hover:scale-105 transition-all shadow-2xl">
          <h4 className="text-2xl font-semibold">UI/UX Hackathon</h4>
          <p>Amal Jyothi College of Engineering - Coming Soon</p>
          <p className="mt-4 text-lg font-semibold">Date & Venue:</p>
          <p>20 February, 2025, Amal Jyothi College of Engineering, Kanjirappally</p>
          <p className="mt-4 text-lg font-semibold">Contact Us:</p>
          <p>Evana Ann Benny: +91 77368 39462</p>
          <p>Alfred P Benjamin: +91 90722 78549</p>
          <p className="mt-4 text-lg font-semibold">Details:</p>
          <ul className="list-disc list-inside text-left">
            <li>Inter-College Hackathon – Open to students from various colleges</li>
            <li>UI/UX Redesign Challenge – Participants must redesign two existing websites using Figma</li>
            <li>Team-Based Competition – Each team consists of 3 members</li>
            <li>Exciting Prize Pool – ₹12,000 in total</li>
          </ul>
          <p className="mt-6 text-2xl font-semibold text-white">{countdown}</p> 
          <button className="mt-4 bg-yellow-400 text-black py-2 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-black hover:text-yellow-400 transition-all">
            Join Now
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
