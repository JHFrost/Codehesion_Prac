import { useState } from "react";
import { useHistory } from "react-router";

const Login = ({loginResponse}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRemember] = useState('false');
    const history = useHistory();
  
    const attemptLogin = async (e) => {
      e.preventDefault();
  
      if(!email){
          alert('Please enter a valid email');
          return;
      }
      else if (!password){
          alert('Please enter a valid password');
          return;
      }
      const loginDetails = {"login":email, password,
      'grant_type':'password',
      'client_id':'ihvnSMaQDPhRqvzFaaryBbGWj87LPhwFO04u920YyYU',
      'client_secret':'-T31V0ZAjTMN9L2d8HrXoN5HKJszLmHx2Joh-dd9AX0'}
      
       const Res = await fetch('https://getlion-staging.herokuapp.com/oauth/token', {
          crossDomain: true,
          mode: 'cors',
          method: 'POST',
          headers: {'Content-Type' : 'application/json',},
          body: JSON.stringify(loginDetails)
      }).then(res=>res.json())
      .then((res) =>{
          return res;
      }).catch((err)=>{
          return err;
      });

      loginResponse(Res);
      history.push('/');
    }

    return (
        <form className='login-form' onSubmit={attemptLogin}>
            <div className='form-control'>
                <label>Login</label>
                <input 
                    type='text' 
                    placeholder='bob@gmail.com'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input 
                    type='password' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className='form-control checkRemember'>
                <label>Remember me</label>
                <input
                    type='checkbox'
                    value={rememberMe}
                    onChange={(e)=>setRemember(e.currentTarget.checked)}/>
            </div>

            <input type='submit' className='btn' value='Login'/>
        </form>
    )
}

export default Login
