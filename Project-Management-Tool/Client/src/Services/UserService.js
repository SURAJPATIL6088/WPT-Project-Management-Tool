import axios from "axios";
import { getToken } from "./AdminService";

const token = getToken();

export function getRegisteredUsers() {
  return axios.get("http://localhost:5000/api/users/all-users", {
    headers: { Authorization: `Bearer ${token}` },
  });
}


