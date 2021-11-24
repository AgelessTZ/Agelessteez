import axios from "axios";

export async function insertUserData(mintToken, firstName, lastName, walletAddress, country, city, province, postalCode, clothingSize) {
    const response = await axios.post('http://localhost:8000/insert_userdata', { data: {mintToken, firstName, lastName, walletAddress, country, city, province, postalCode, clothingSize}});
    return response.data;
}

export async function getUserData(walletAddress) {
    const response = await axios.post('http://localhost:8000/get_userdata', { data: {walletAddress}});
    return response.data;
}
