import React from "react";

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
              <div className="a">{user.name}</div>
             
               
              <div className="route">
                <h2>µFest</h2>
                
                <h2></h2>
              </div>
              <div className="details">
                <div className="item">
                  <span>Passenger</span>
                  <h3>69Pixels</h3>
                </div>
                <div className="item">
                  <span>Flight No.</span>
                  <h3>US6969</h3>
                </div>
                <div className="item">
                  <span>Departure</span>
                  <h3>08/26/2018 15:33</h3>
                </div>
                <div className="item">
                  <span>Gate Closes</span>
                  <h3>15:03</h3>
                </div>
                <div className="item">
                  <span>Luggage</span>
                  <h3>Hand Luggage</h3>
                </div>
                <div className="item">
                  <span>Seat</span>
                  <h3>69P</h3>
                </div>
              </div>
            </div>
            <div className="receipt qr-code">
              <svg
                className="qr"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 29.938 29.938"
              >
                <path d="M7.129 15.683h1.427v1.427h1.426v1.426H2.853V17.11h1.426v-2.853h2.853v1.426h-.003zm18.535 12.83h1.424v-1.426h-1.424v1.426zM8.555 15.683h1.426v-1.426H8.555v1.426zm19.957 12.83h1.427v-1.426h-1.427v1.426zm-17.104 1.425h2.85v-1.426h-2.85v1.426zm12.829 0v-1.426H22.81v1.426h1.427zm-5.702 0h1.426v-2.852h-1.426v2.852zM7.129 11.406v1.426h4.277v-1.426H7.129zm-1.424 1.425v-1.426H2.852v2.852h1.426v-1.426h1.427zm4.276-2.852H.002V.001h9.979v9.978zM8.555 1.427H1.426v7.127h7.129V1.427zm-5.703 25.66h4.276V22.81H2.852v4.277zm14.256-1.427v1.427h1.428V25.66h-1.428zM7.129 2.853H2.853v4.275h4.276V2.853zM29.938.001V9.98h-9.979V.001h9.979zm-1.426 1.426h-7.127v7.127h7.127V1.427zM0 19.957h9.98v9.978H0v-9.978z" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ticket;
