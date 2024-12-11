import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as client from "./client";


export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState<string | null>(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    setError(null); 
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password"); 
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err: any) {
      console.error("Signin error:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };


  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser) {
    return null;
  }

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>} 
      <input
        defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
      />
      <input
        defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        type = "password"
      />

      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup"> Sign up </Link>
    </div>
  );
}
