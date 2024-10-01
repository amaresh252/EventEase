import { useState ,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { createUserAsync, selectError } from "../AuthSlice";
import { selectLoggedInUser } from "../AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import '../../style/Auth/signup.css'
export default function Signup(){
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const error=useSelector(selectError);
 const user=useSelector(selectLoggedInUser);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [role,setRole]=useState('');
    const [errors, setErrors] = useState({});
    
    function handleusername(e){
        setUsername(e.target.value);
    }
    function handlepassword(e){
        setPassword(e.target.value);
    }
    function handlerole(e){
        setRole(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        let formErrors = {};
        const trimmedEmail = username.trim();
        const trimmedPassword = password.trim();
        const trimmedRole = role.trim();
        if (!trimmedEmail) {
          formErrors.username = 'username is required';
        } 
        if (!trimmedRole) {
            formErrors.role = 'please select role';
          } 
        if (!trimmedPassword) {
            formErrors.password = 'Password is required';
          } else if (trimmedPassword.length < 3) {
            formErrors.password = 'Password must be at least 3 characters';
          }
          if(Object.keys(formErrors).length>0){
            setErrors(formErrors)
          }
          else{
            setErrors({})
        dispatch(createUserAsync({username:username,password:password,role:role}));
          }
    }
    useEffect(() => {
        if (user) {
            navigate(`/${role}`);
        }
    }, [navigate,user]);

    return(
    <>
    <div className="row g-0 vh-100  justify-content-center align-items-center main">
   <div className="col-10 login-link text-center heading"><img src="eve-logo.png" height={35} width={30}/>EventEase</div>
            <div className="col-10 row g-0 align-items-center  rounded-2">
                
                <form className="col-6 py-4 px-3" onSubmit={handleSubmit}>
                    <h4 className="signup-title text-center py-2 mb-2 "> Sign Up</h4>
                    <div className="form-floating mb-3">
                    <input id="username" className="form-control" type="email" name="username" value={username} onChange={handleusername} autoComplete="username"></input>
                    <label htmlFor="username">UserName</label>
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                    </div>
                    <div className="form-floating mb-3">
                    <input id="password" className="form-control" type="password" name="password" value={password} onChange={handlepassword} autoComplete="current-password"></input>
                    <label htmlFor="password">Password</label>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <div className="form-floating mb-3">
                    <select type='role' className="form-control" id="role" value={role} onChange={handlerole}>
                        <option type="select">Select</option>
                        <option type="user">Customer</option>
                        <option type='vendor'>Vendor</option>
                        {/* <option type='admin'>Admin</option> */}
                    </select>
                    <label htmlFor="role">Role</label>
                    {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
                    </div>
                    <div className="text-center">
                    <button  className="signup-btn py-3 rounded-3" type="submit">SignUp</button>
                    {error && <p className="text-danger">{error}</p>}
                    </div>
                    <div className="text-center mt-3 signup-link">
                        Already Registered ? <Link to='/login' className="text-decoration-none text-success">Log In</Link>
                    </div>
                </form>
                <div className="col-6">
                    <img src="event-plan.jpg" className="img-fluid event-plan-img"/>
                </div>
            </div>
        </div>
    
    

    </>
    )
}