import User from '@/models/User';
import axios from 'axios';
import { useState } from 'react';


    //const [user, setUser] = useState<User | null>(null);
    const AxiosIn = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_APP,
        timeout:30000,
        timeoutErrorMessage:"Time out!",
    });



export default AxiosIn;