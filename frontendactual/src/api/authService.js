export const createOrder = async (orderData, token) => {
    const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });
    return response.json();
};

export const getOrders = async (token) => {
    const response = await fetch('http://localhost:4000/api/orders', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};
