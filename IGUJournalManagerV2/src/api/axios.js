import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 10000,
    headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'}
});

export default axiosInstance;