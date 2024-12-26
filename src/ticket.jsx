import React from "react";
import qr from "./qr.png"
import banner from "./banner.png"
import "./ticket.css";

const Ticket = () => {
    // Get 'name' from the location state
    const user = JSON.parse(localStorage.getItem("user"));

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
                        


                            <p className=" text-white">Skill festival Of
                                Amal Jyothi</p>
                            <div className="route">

                                <h2> <b>µFest </b></h2>


                            </div>
                            <div className="details">
                                <div className="a"> Jan 6-8 | 4:10-5:30Pm</div>
                                <div><b>Participant</b></div>
                            </div>
                            <div className="details mt-3">
                                <h1>Name</h1>
                                <h1>Course</h1>
                            </div>
                            <div className="details mt-2 border-2 p-3 rounded-md" >
                                <h1><b>{user?.formData.firstname +" " +user?.formData.lastname || "Not valid"}<b /></b></h1>
                                <h1><b>{user?.formData.course || "Not valid"}<b /></b></h1>
                                {console.log(user.formData.firstname)}

                            </div>
                            <div className="details mt-2 border p-3 rounded-md text-center flex-wrap items-center justify-center" >
                                <h1>Workshops<b /></h1>
                                <h1>Learning Circles<b /></h1>
                                <h1>Orientation Sessions<b /></h1>
                                <h1>Games and Fun Activities</h1>

                            </div>
                          

                        </div>
                        <div className="receipt qr-code">
                            <img src={qr} alt="" className="qr" />


                            <div className="text-[#3f32e5] ml-4 text-[30px] flex justify-center items-center"> <b>Participant</b> </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ticket;
