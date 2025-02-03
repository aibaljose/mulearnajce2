import React, { useState, useEffect } from 'react';
import { database, ref, onValue, remove } from './firebase';
import { Activity, Trash2, Edit, Eye, Users, Download } from 'lucide-react';

const ViewList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null);

  useEffect(() => {
    try {
      const teamsRef = ref(database, 'teams');
      const unsubscribe = onValue(teamsRef, (snapshot) => {
        if (snapshot.exists()) {
          const uniqueTeams = new Map();
          snapshot.forEach((childSnapshot) => {
            const team = {
              id: childSnapshot.key,
              ...childSnapshot.val()
            };
            uniqueTeams.set(team.teamName, team);
          });
          setTeams(Array.from(uniqueTeams.values()));
        } else {
          setTeams([]);
        }
        setLoading(false);
      }, (error) => {
        setError(error.message);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const handleDelete = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await remove(ref(database, `teams/${teamId}`));
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
      } catch (err) {
        alert("Error deleting team: " + err.message);
      }
    }
  };

  const toggleShowMembers = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(teams, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "teams_backup.json";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Registered Teams</h2>
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleBackup}
            >
              <Download size={18} className="mr-2" /> Backup Data
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No teams registered yet
                    </td>
                  </tr>
                ) : (
                  teams.map((team) => (
                    <React.Fragment key={team.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {team.teamName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {team.teamLead?.name || 'No lead'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {team.teamLead?.college || 'No college name'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            onClick={() => toggleShowMembers(team.id)}
                          >
                            <Users size={18} className="mr-1" />
                            {Array.isArray(team.members) ? team.members.length : 0} members
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${team.transactionId ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {team.transactionId ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={18} />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(team.id)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedTeam === team.id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-gray-50">
                            <ul className="text-sm text-gray-700">
                              {team.members?.length > 0 ? (
                                [...new Set(team.members.map((member) => `${member.name} - ${member.email}`))].map((member, index) => (
                                  <li key={index} className="py-1">{member}</li>
                                ))
                              ) : (
                                <li className="text-gray-500">No members listed</li>
                              )}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewList;
