import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj2oXAeSK3yXyywR2VLFta932W6mcbKx8",
    authDomain: "mulearnajce.firebaseapp.com",
    projectId: "mulearnajce",
    storageBucket: "mulearnajce.firebasestorage.app",
    messagingSenderId: "830392500306",
    appId: "1:830392500306:web:2a5f0c4499cdb41210df8b",
    databaseURL: "https://mulearnajce-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        department: "",
        number: "",
        course: "",
        year: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.firstname == "" || formData.lastname == "" || formData.email == "" || formData.number == "" || formData.department == "" || formData.course == "" || formData.year == "") {
            alert("all fields are required");
            return;
        }

        // Save data to Firebase
        const usersRef = ref(database, "users");
        push(usersRef, formData)
            .then(() => {
                alert("Registration successful!");
                localStorage.setItem("user", JSON.stringify({ name: formData.firstname + formData.lastname }));
                window.location.href = '/ticket';
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    department: "",
                    number: "",
                    course: "",
                    year: "",
                });
            })
            .catch((error) => {
                console.error("Error saving data to Firebase: ", error);
            });
    };

    return (
        <div className="flex h-screen w-full items-center justify-center " style={{ backgroundColor: "white" }}>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">µRegister</p>
                <p className="message">µfest, Skill festival Of Amal Jyothi.</p>
                <p className="message"><u>Event Highlights</u><br />
                  
                    <li><b> Orientation Sessions</b></li> 
                    Get to know what µLearn is all about, our mission, and how you can be a part of this exciting journey.

                     <li><b>Workshops</b></li>
                    Dive into hands-on workshops led by experts and enthusiasts. Explore various domains and gain practical knowledge.

                     <li><b>Learning Circles</b></li>
                    Experience the power of learning circles! Collaborate with peers to solve challenges and learn new skills.

                     <li><b>Games and Fun Activities</b></li>
                    Participate in engaging tech-themed games and activities designed to foster teamwork and creativity.</p>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            name="firstname"
                            className="input"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            name="lastname"
                            className="input"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                        <span>Lastname</span>
                    </label>
                </div>

                <label>
                    <input
                        required
                        placeholder=""
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span>Email</span>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="number"
                        name="number"
                        className="input"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    <span>WhatsApp no</span>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="text"
                        name="department"
                        className="input"
                        value={formData.department}
                        onChange={handleChange}
                    />
                    <span>Department</span>
                </label>
                <label>
                    <input
                        required
                        placeholder=""
                        type="text"
                        name="course"
                        className="input"
                        value={formData.course}
                        onChange={handleChange}
                    />
                    <span>Course</span>
                </label>

                <label>
                    <select
                        required
                        name="year"
                        className="input"
                        value={formData.year}
                        onChange={handleChange}
                    >
                        <option value="" disabled>

                        </option>
                        <option value="student">First</option>
                        <option value="teacher">Second</option>
                        <option value="admin">Third</option>
                        <option value="admin">Fourth</option>
                    </select>
                    <span>Year</span>
                </label>

                <button className="submit">Submit</button>
                <p className="signin">
                    Already registerd see ticket? <a href="/ticket">Ticket</a>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
