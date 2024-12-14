
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const register = (nom_client, mot_de_passe, adresse_email) => {
  return axios.post(`${API_URL}/signup`, {
    nom_client,
    mot_de_passe,
    adresse_email,
  });
};

const login = (adresse_email, mot_de_passe) => {
  return axios.post(`${API_URL}/signin`, {
    adresse_email,
    mot_de_passe,
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
