export const apiUrl = 'http://localhost:8000/api/admin';
export const apiUrlFront = 'http://localhost:8000/api/front';

export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
}

export const userToken = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'));
    return data.token;
}