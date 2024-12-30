import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [emailTemplate, setEmailTemplate] = useState("");
    const [emailSubject, setEmailSubject] = useState("");

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, "users");
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const entries = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setRegistrations(entries);
            }
        });
    }, []);

    // Sort functionality
    const handleSort = (field) => {
        const sortedData = [...registrations].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setRegistrations(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Department-wise data aggregation
    const departmentCounts = registrations.reduce((acc, reg) => {
        acc[reg.department] = (acc[reg.department] || 0) + 1;
        return acc;
    }, {});

    // Chart data preparation
    const chartData = {
        labels: Object.keys(departmentCounts),
        datasets: [
            {
                label: "Registrations per Department",
                data: Object.values(departmentCounts),
                backgroundColor: [
                    "#4F46E5",
                    "#F59E0B",
                    "#10B981",
                    "#EF4444",
                    "#6366F1",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Send mail functionality
    const sendMail = (email) => {
      const subject = encodeURIComponent(emailSubject);
      const body = encodeURIComponent(emailTemplate);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
  };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Registration Dashboard</h2>

            {/* Total Registrations */}
            <div className="bg-[#7b5cfb] text-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold">Total Registrations:</h3>
                <p className="text-3xl font-bold text-white">
                    {registrations.length}
                </p>
            </div>

            {/* Email Template Input */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Email Template</h3>
                <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Type your email subject here..."
                    className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <textarea
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    placeholder="Type your email message here..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    rows="4"
                ></textarea>
            </div>

            {/* Registration Table */}
            <div className="overflow-auto bg-white shadow-md rounded-lg p-4 mb-6">
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("firstname")}>
                                    First Name
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("lastname")}>
                                    Last Name
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">Email</th>
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("department")}>
                                    Department
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">Number</th>
                            <th className="p-2 border border-gray-300">Course</th>
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("year")}>
                                    Year
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((registration) => (
                            <tr key={registration.id} className="hover:bg-gray-100">
                                <td className="p-2 border border-gray-300">
                                    {registration.firstname}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.lastname}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.email}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.department}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.number}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.course}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {registration.year}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        onClick={() => sendMail(registration.email)}
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Send Mail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Department-wise Graph</h3>
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
