import React, { useState } from "react";
import { storage, db } from "./firebase"; // Firestore & Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const TeamRegistrationForm = () => {
  const navigate = useNavigate();

  const [teamLead, setTeamLead] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    year: "",
    number: "",
  });

  const [members, setMembers] = useState([
    { name: "", email: "", college: "", course: "", year: "", number: "" },
    { name: "", email: "", college: "", course: "", year: "", number: "" },
  ]);

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
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

    if (!paymentScreenshot) {
      formErrors.paymentScreenshot = "Payment screenshot is required.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        let paymentURL = "";

        if (paymentScreenshot) {
          const storageRef = ref(storage, `payments/${Date.now()}_${paymentScreenshot.name}`);
          await uploadBytes(storageRef, paymentScreenshot);
          paymentURL = await getDownloadURL(storageRef);
        }

        const teamData = {
          teamLead,
          members,
          paymentScreenshot: paymentURL,
        };

        await addDoc(collection(db, "teams"), teamData);

        localStorage.setItem("users", JSON.stringify(teamData));
        console.log("Team registered successfully!");

        navigate("/ticket");
      } catch (error) {
        setFormError("Error adding team. Please try again later.");
        console.error("Error adding team: ", error);
      }
    } else {
      setFormError("Please fill in all required fields correctly.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Team Registration</h2>
          {formError && <div className="text-red-500 mb-4">{formError}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Lead</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(teamLead).map(([key]) => (
                  <div key={key}>
                    <input
                      type={key === "email" ? "email" : key === "number" ? "tel" : "text"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={teamLead[key]}
                      onChange={handleTeamLeadChange}
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                    {errors[key] && <div className="text-red-500 text-sm mt-1">{errors[key]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {members.map((member, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Member {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(member).map(([key]) => (
                    <div key={key}>
                      <input
                        type={key === "email" ? "email" : key === "number" ? "tel" : "text"}
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={member[key]}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 rounded-xl border"
                      />
                      {errors[`member${index}_${key}`] && (
                        <div className="text-red-500 text-sm mt-1">{errors[`member${index}_${key}`]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Payment Screenshot Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Screenshot</h3>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-xl" />
              {errors.paymentScreenshot && <div className="text-red-500 text-sm mt-1">{errors.paymentScreenshot}</div>}
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600">
                {loading ? "Registering..." : "Register Team"}
              </button>
              <button type="button" className="px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationForm;
