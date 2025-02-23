import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/userSlice"
import axios from "axios"

// This hook automatically generates refresh Token from API

const useAutoLogin = () => {
    const URL = import.meta.env.VITE_INTERNAL_API_PATH;
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
        try {
            const response = await axios.get(`${URL}/refresh`, {withCredentials: true});
        if(response.status === 200){
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                auth: response.data.auth,
              };
            dispatch(setUser(user));
        }
        } catch (error) {
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
      })();
      
    }, [])
    

  return loading;
}

export default useAutoLogin