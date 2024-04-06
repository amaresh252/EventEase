import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { loginUserAsync, selectError } from "../AuthSlice";
import { selectLoggedInUser } from "../AuthSlice";
import { useNavigate,Link } from "react-router-dom";
import '../../style/Auth/login.css'
export default function Login(){


    const dispatch=useDispatch();
    const navigate=useNavigate();


    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');


    const user=useSelector(selectLoggedInUser);
    const error=useSelector(selectError);

    
    useEffect(() => {
        if (user) {
            navigate(`/${user.role}`);
        }
    }, [navigate,user]);


    function handleusername(e){
        e.preventDefault();
        setUsername(e.target.value);
    }
    function handlepassword(e){
        e.preventDefault();
        setPassword(e.target.value);
    }
    


    function handleSubmit(e){
        e.preventDefault();
        dispatch(loginUserAsync({username,password}));
    }

   
    return(
        <>
        
        <div className="row g-0 vh-100 justify-content-center align-items-center main">
        <div className="col-10 login-link text-center heading"><img src="eve-logo.png" height={35} width={30} alt="eve-logo"/>EventEase</div>
            <div className="col-10 row g-0 align-items-center  rounded-2">
                <div className="col-6 ">
                    <img src="event-plan.jpg" className="img-fluid" alt="eve-plan"/>
                </div>
                <form className="col-6 py-4 px-3" onSubmit={handleSubmit}>
                    <h4 className="login-title text-center py-2 mb-2"> Login</h4>
                    <div className="form-floating mb-3">
                    <input id="username" className="form-control" type="email" name="username" value={username} onChange={handleusername} autoComplete="username"></input>
                    <label htmlFor="username">UserName</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input id="password" className="form-control" type="password" name="password" value={password} onChange={handlepassword} autoComplete="current-password"></input>
                    <label htmlFor="password">Password</label>
                    </div>
                    <div className="text-center">
                    <button  className="login-btn py-3 rounded-3" type="submit">LogIn</button>
                    {error && <p className="text-danger">{error}</p>}
                    </div>
                    <div className="text-center mt-3 login-link">
                        Not Registered ? <Link to='/signup' className="text-decoration-none text-success">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    
        </>

    )
}