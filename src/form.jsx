import React, { useState } from 'react';
import { database, ref, push, set } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';

const TeamRegistrationForm = () => {
  const navigate = useNavigate();

  const [teamLead, setTeamLead] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    year: "",
    whatsappNo: "",
  });

  const [members, setMembers] = useState([
    { name: "", email: "", college: "", course: "", year: "", whatsappNo: "" },
    { name: "", email: "", college: "", course: "", year: "", whatsappNo: "" },
  ]);

  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code visibility

  const handleTeamLeadChange = (e) => {
    const { name, value } = e.target;
    setTeamLead({ ...teamLead, [name]: value });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const validateForm = () => {
    let formErrors = {};

    Object.keys(teamLead).forEach((key) => {
      if (!teamLead[key]) {
        formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    members.forEach((member, index) => {
      Object.keys(member).forEach((key) => {
        if (!member[key]) {
          formErrors[`member${index}_${key}`] = `Member ${index + 1} - ${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        }
      });
    });

    if (!transactionId) {
      formErrors.transactionId = "Transaction ID is required.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const teamRef = ref(database, "teams");
        const newTeam = push(teamRef);
        await set(newTeam, {
          teamLead,
          members,
          transactionId,
        });

        localStorage.setItem(
          "ticketData",
          JSON.stringify({ teamLead, members, transactionId })
        );

        console.log('Team registered successfully!');
        navigate('/ticket');

      } catch (error) {
        setFormError("Error adding team. Please try again later.");
        console.error('Error adding team: ', error);
      }
    } else {
      setFormError("Please fill in all required fields correctly.");
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all";
  const errorClassName = "text-red-500 text-sm mt-1";

  const googlePayLink = "upi://pay?pa=aibaljosej@okicici&pn=Aibal%20Jose&am=500.00&cu=INR&aid=uGICAgIDN9PurFAi";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-16 h-16">
              <div className="w-full h-full bg-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div className="absolute -right-1 -top-1 w-6 h-6 bg-purple-200 rounded-lg" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Team Registration</h2>
          </div>

          {formError && <div className="text-red-500 mb-4">{formError}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Lead Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Lead</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(teamLead).map(([key]) => (
                  <div key={key}>
                    <input
                      type={key === 'email' ? 'email' : key === 'whatsappNo' ? 'tel' : 'text'}
                      name={key}
                      placeholder={key === 'whatsappNo' ? 'WhatsApp Number' : key.charAt(0).toUpperCase() + key.slice(1)}
                      value={teamLead[key]}
                      onChange={handleTeamLeadChange}
                      className={inputClassName}
                    />
                    {errors[key] && <div className={errorClassName}>{errors[key]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members Section */}
            {members.map((member, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Team Member {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(member).map(([key]) => (
                    <div key={key}>
                      <input
                        type={key === 'email' ? 'email' : key === 'whatsappNo' ? 'tel' : 'text'}
                        name={key}
                        placeholder={key === 'whatsappNo' ? 'WhatsApp Number' : key.charAt(0).toUpperCase() + key.slice(1)}
                        value={member[key]}
                        onChange={(e) => handleMemberChange(index, e)}
                        className={inputClassName}
                      />
                      {errors[`member${index}_${key}`] && (
                        <div className={errorClassName}>{errors[`member${index}_${key}`]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Transaction ID Field */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment</h3>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Link to={googlePayLink}>
                  <h2 className="text-xl text-blue-500 cursor-pointer" onClick={() => setShowQRCode(!showQRCode)}>
                    Pay ₹500 using Google Pay
                  </h2>
                </Link>
                {showQRCode && (
                  <div className="mt-4">
                    <QRCode value={googlePayLink} size={128} />
                  </div>
                )}
              </div>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className={inputClassName}
              />
              {errors.transactionId && <div className={errorClassName}>{errors.transactionId}</div>}
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium">
                Register Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationForm;
