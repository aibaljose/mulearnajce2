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
    <div className="min-h-screen bg-white text-black">
      <header className="flex justify-between items-center p-6 md:px-10">
        <h1 className="text-3xl font-bold">UXPLORE</h1>
        <button className="md:hidden text-black text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#9776;
        </button>
        <nav
          className={`absolute md:static bg-white w-full md:w-auto top-16 left-0 md:flex space-x-6 transition-transform transform ${isMenuOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
            <li>About</li>
            <li>Events</li>
            <li>Speakers</li>
            <li>Gallery</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      <section className="text-center py-20">
        <div className="flex justify-center align-center">
          <img src={logo} alt="" className="w-[600px]" />
        </div>
        <h2 className="text-5xl font-bold text-yellow-400">UXPLORE - UI HACKATHON</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          The ultimate UI design challenge at our college! Collaborate, innovate, and create stunning user experiences.
        </p>
        <p className="mt-6 text-xl font-semibold">{countdown}</p>
        <button onClick={handleButtonClick} className="mt-6 bg-yellow-400 text-black py-2 px-6 rounded">
          Register Now
        </button>
      </section>

      {/* Event Highlights */}
      {/* <section className="p-10">
        <h3 className="text-3xl font-bold mb-6">Event Highlights</h3>
        <div className="bg-gray-200 p-6 rounded-lg text-center">
          <h4 className="text-2xl font-semibold">UI/UX Hackathon</h4>
          <p>Amal Jyothi College of Engineering - Coming Soon</p>
          <p className="mt-4 text-lg font-semibold">Date & Venue:</p>
          <p>20 February, 2025, Amal Jyothi College of Engineering, Kanjirappally</p>
          <p className="mt-4 text-lg font-semibold">Contact Us:</p>
          <p>Evana Ann Benny : +91 77368 39462</p>
          <p>Alfred P Benjamin : +91 90722 78549</p>
          <p className="mt-4 text-lg font-semibold">Details:</p>
          <ul className="list-disc list-inside text-left">
            <li>Inter-College Hackathon – Open to students from various colleges</li>
            <li>UI/UX Redesign Challenge – Participants must redesign two existing websites using Figma</li>
            <li>Team-Based Competition – Each team consists of 3 members</li>
            <li>Exciting Prize Pool – ₹12,000 in total</li>
          </ul>
          <button className="mt-4 bg-yellow-400 text-black py-2 px-6 rounded">Join Now</button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
