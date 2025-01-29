import React from "react";
import qr from "./qr.png";
import banner from "./banner.png";
import "./ticket.css";

const Ticket = () => {
    // Retrieve 'users' from localStorage
    const ticketData = JSON.parse(localStorage.getItem("users"));
    const teamLead = ticketData?.teamLead || {};
    const members = ticketData?.members || [];

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#1B0E33] to-[#2B0442]">
            <main className="ticket-system">
                <div className="top">
                    <h1 className="title">Wait a second, your ticket is being printed</h1>
                    <div className="printer" />
                </div>
                <div className="receipts-wrapper">
                    <div className="receipts">
                        <div className="receipt">
                            <p className="text-white">ACM Amal Jyothi</p>
                            <div className="text-[30px]">
                                <h2>UXPLORE - UI HACKATHON</h2>
                            </div>
                            <div className="details">
                                <div className="a"> 20th February, 2025 | 10:00 AM - 5:00 PM</div>
                            </div>
                            <div className="details mt-3">
                                <h1>Name</h1>
                                <h1>Course</h1>
                            </div>
                            <div className="details mt-2 border-2 p-3 rounded-md">
                                <h1><b>{teamLead.name || "Not valid"}</b></h1>
                                <h1>{teamLead.course || "Not valid"}</h1>
                            </div>
                            <div className="details mt-2 border p-3 rounded-md text-center flex-wrap items-center justify-center">
                                <h1>UI/UX Redesign Challenge</h1>
                                <h1>Team-Based Competition</h1>
                                <h1>Exciting Prize Pool – ₹12,000</h1>
                            </div>
                        </div>
                        <div className="receipt qr-code">
                            <img src={qr} alt="" className="qr" />
                            <div className="text-[#3f32e5] ml-4 text-[30px] flex justify-center items-center">
                                <b>Participant</b>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ticket;
