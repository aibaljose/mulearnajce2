import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import qr from "./assets/qr.png";
import banner from "./banner.png";
import { Share2 } from 'lucide-react';
import "./ticket.css";

const Ticket = () => {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    const teamLead = ticketData?.teamLead || {};
    const members = ticketData?.members || [];
    const ticketRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const handleShare = async () => {
        try {
            setIsCapturing(true); // This will temporarily remove the animation
            
            // Wait for next render cycle
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const ticketElement = ticketRef.current;
            
            // Create canvas from the ticket element
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                backgroundColor: null,
                logging: false,
                useCORS: true,
                allowTaint: true,
            });

            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                if (blob) {
                    try {
                        if (navigator.share) {
                            const file = new File([blob], 'uxplore-ticket.png', { type: 'image/png' });
                            await navigator.share({
                                files: [file],
                                title: 'UXplore Ticket',
                                text: 'My ticket for UXplore UI Hackathon'
                            });
                        } else {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'uxplore-ticket.png';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                        }
                    } catch (error) {
                        console.error('Error sharing:', error);
                    }
                }
                setIsCapturing(false); // Restore the animation
            }, 'image/png');
        } catch (error) {
            console.error('Error capturing ticket:', error);
            setIsCapturing(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-gradient-to-br from-[#1B0E33] to-[#2B0442]">
            <button
                onClick={handleShare}
                className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 z-10"
            >
                <Share2 size={20} />
                Share Ticket
            </button>

            <main className="ticket-system" >
                <div className="top">
                    <h1 className="title">Wait a second, your ticket is being printed</h1>
                    <div className="printer" />
                </div>
                <div className="receipts-wrapper" ref={ticketRef}>
                    <div className={`receipts ${isCapturing ? 'no-animation' : ''}`} style={isCapturing ? { transform: 'translateY(0)' } : undefined}>
                        <div className="receipt">
                            <p className="text-white">ACM Amal Jyothi</p>
                            <div className="text-[30px]">
                                <h2>UXPLORE - UI HACKATHON</h2>
                            </div>
                            <div className="details">
                                <div className="a">20th February, 2025 | 10:00 AM - 5:00 PM</div>
                            </div>
                            <div className="details mt-3">
                                <h1>Team Name</h1>
                                <h1>Course</h1>
                            </div>
                            <div className="details mt-2 border-2 p-3 rounded-md">
                                <h1><b>{ticketData?.teamName || teamLead.name || "Not valid"}</b></h1>
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