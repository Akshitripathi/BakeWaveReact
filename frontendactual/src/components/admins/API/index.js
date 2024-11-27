import axios from 'axios';
const token = localStorage.getItem('token');  

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};



export const getCustomers = async () => {
  try {
    // Replace 'your_token_here' with the actual token
    const token = localStorage.getItem('token'); // If you store the token in localStorage
    
    const response = await axios.get('http://localhost:4000/api/admin/details', {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in Authorization header
      },
    });

    console.log("Response from API:", response);
    return response.data; // Assuming the response contains a `data` property with customer data
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow the error for further handling
  }
};



export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

export const getAdminDetails = async () => {
  const response = await fetch('http://localhost:4000/api/admin/details', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in headers
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch admin details');
  }
  return response.json();
};
