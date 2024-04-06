import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


 function Protected({children}){
    const  user=useSelector(selectLoggedInUser);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[])
    return children;
}
export default Protected;