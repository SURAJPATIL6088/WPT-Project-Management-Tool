import React, { useState } from "react";
import { toast } from "react-toastify";
import { getRegisteredUsers } from "../../Services/UserService";

const RegisteredUsers = () => {
  const [getUsers, setGetUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleUsers = async () => {
    try {
      const response = await getRegisteredUsers();

      if (response.status === 200) {
        toast.success("Users Details Fetch Successfully");
        setShowTable(true);
        setGetUsers(response.data.users);
      }
    } catch (error) {
      toast.error("Error in Fetching Users");
    }
  };

  console.log(getUsers);

  const handleClose = () => {
    setShowTable(false);
  };

  return (
    <div>
      {!showTable && <button onClick={handleUsers}> Get Users</button>}

      {showTable && (
        <div>
          <h3>Registered Users</h3>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {getUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.username}</th>
                    <th>{user.role}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
