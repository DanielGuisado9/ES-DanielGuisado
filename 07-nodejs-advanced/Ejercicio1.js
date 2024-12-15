const fetch = require('node-fetch');

async function get(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function init() {
    const url1 = 'https://reqres.in/api/users?page=2';
    const url2 = 'https://reqres.in/api/users?page=3';
    const data1 = await get(url1);
    const data2 = await get(url2);
    console.log(data1);
    console.log(data2);
}

init();