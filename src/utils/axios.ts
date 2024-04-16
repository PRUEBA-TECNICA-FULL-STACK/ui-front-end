import axios from 'axios';

// Set base URL if needed
axios.defaults.baseURL = process.env.NEXT_PUBLIC_OMDBAPI;

// Add any other configuration, interceptors, etc.

export default axios;