import axios from "axios";

export async function insertUserData(mintToken, firstName, lastName, email, walletAddress, discordId, country, city, province, postalCode, clothingSize) {
    const response = await axios.post('http://45.61.53.206/insert_userdata', { data: {mintToken, firstName, lastName, email, walletAddress, discordId, country, city, province, postalCode, clothingSize}});
    return response.data;
}

export async function getUserData(walletAddress) {
    const response = await axios.post('http://45.61.53.206/get_userdata', { data: {walletAddress}});
    return response.data;
}
