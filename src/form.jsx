import React, { useState } from 'react';
import { database, ref, push, set } from './firebase';

const TeamRegistrationForm = () => {
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

  const [errors, setErrors] = useState({});

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
    // Validate Team Lead
    Object.keys(teamLead).forEach((key) => {
      if (!teamLead[key]) {
        formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    // Validate Members
    members.forEach((member, index) => {
      Object.keys(member).forEach((key) => {
        if (!member[key]) {
          formErrors[`member${index}_${key}`] = `Member ${index + 1} - ${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        }
      });
    });

    // Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (teamLead.email && !emailRegex.test(teamLead.email)) {
      formErrors.teamLeadEmail = "Please enter a valid email address.";
    }
    members.forEach((member, index) => {
      if (member.email && !emailRegex.test(member.email)) {
        formErrors[`member${index}_email`] = `Member ${index + 1} - Please enter a valid email address.`;
      }
    });

    // Validate Phone Number (basic format)
    const phoneRegex = /^[0-9]{10}$/;
    if (teamLead.number && !phoneRegex.test(teamLead.number)) {
      formErrors.teamLeadNumber = "Please enter a valid 10-digit phone number.";
    }
    members.forEach((member, index) => {
      if (member.number && !phoneRegex.test(member.number)) {
        formErrors[`member${index}_number`] = `Member ${index + 1} - Please enter a valid 10-digit phone number.`;
      }
    });

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        // Reference to the "teams" node in Firebase
        const teamRef = ref(database, "teams");

        // Create a new team entry with the data
        const newTeam = push(teamRef);
        await set(newTeam, {
          teamLead,
          members,
        });

        console.log('Team registered successfully!');
      } catch (error) {
        console.error('Error adding team: ', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg">
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Lead Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Lead</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(teamLead).map(([key]) => (
                  <div key={key}>
                    <input
                      type={key === 'email' ? 'email' : key === 'number' ? 'tel' : 'text'}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
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
                        type={key === 'email' ? 'email' : key === 'number' ? 'tel' : 'text'}
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
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

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
              >
                Register Team
              </button>
              <button
                type="button"
                className="px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
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
