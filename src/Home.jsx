import React from 'react';
import course from "./course.png";
import { useNavigate } from "react-router-dom";
import "./form.css";

const Home = () => {
    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        navigate("/register");
    };
    
    return (
        
        <div className='forms md:flex h-screen w-full flex-wrap items-center justify-center '>
         
            <div className="landingpage md:w-[40%]">
                <div className="card1">
                    <p>µfest</p>
                </div>
                <h1 className='text-[34px] md:text-[50px]'><b>µfest, Skill festival Of <br /> Amal Jyothi</b> </h1>
                <p>Join us for the first-ever µFest at Amal Jyothi College of Engineering, the flagship event by µLearn!
                    This is your gateway to discovering the world of peer-to-peer learning, innovation, and collaboration.
                </p>

                <button className="button" onClick={handleButtonClick}>
                    Register now
                    <span className="button-span"> ─ it's free</span>
                </button>

            </div>
            <div className="hor">
                <img src={course} alt="" className='md:h-[600px] h-[400px]' />
            </div>
        </div>
    );
};

export default Home;
