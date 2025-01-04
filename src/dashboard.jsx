import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [whatsappMessage, setWhatsappMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, "users");
        try {
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const entries = Object.entries(data).map(([id, value]) => ({
                        id,
                        ...value,
                    }));
                    setRegistrations(entries);
                }
                setIsLoading(false);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
            setIsLoading(false);
        }
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

    // Bulk copy email addresses
    const copyEmailsToClipboard = () => {
        const emails = registrations.map((reg) => reg.email).join(", ");
        navigator.clipboard.writeText(emails)
            .then(() => alert("Emails copied to clipboard!"))
            .catch(() => alert("Failed to copy emails. Please try again."));
    };

    // Send WhatsApp message
    const sendWhatsAppMessage = (phone) => {
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
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

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Department-wise Registrations" },
        },
    };

    if (isLoading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

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

            {/* Copy Emails */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">Email Management</h3>
                <button
                    onClick={copyEmailsToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Copy All Emails
                </button>
            </div>

            {/* WhatsApp Message Input */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">WhatsApp Message</h3>
                <textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Type your WhatsApp message here..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
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
                                    First Name {sortOrder === "asc" ? "↑" : "↓"}
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("lastname")}>
                                    Last Name {sortOrder === "asc" ? "↑" : "↓"}
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">Email</th>
                            <th className="p-2 border border-gray-300">
                                <button onClick={() => handleSort("department")}>
                                    Department {sortOrder === "asc" ? "↑" : "↓"}
                                </button>
                            </th>
                            <th className="p-2 border border-gray-300">Number</th>
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
                                    <button
                                        onClick={() =>
                                            sendWhatsAppMessage(registration.number)
                                        }
                                        className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                                    >
                                        WhatsApp
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
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
