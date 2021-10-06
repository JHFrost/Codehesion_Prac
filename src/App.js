import './App.css';
import Header from './components/Header';
import { useState } from "react";
import { React } from "react";
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';

function App() {
  
  const [menudata, setMenuData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const [authToken, setToken] = useState('');
  const loginResponse = (res) =>{
      setToken(res);
      setIsEmpty(false);
  }

  const obtainMenuData = async () =>{
      if (authToken){
        const menuData = await fetch('https://getlion-staging.herokuapp.com/api/v1/menus', {
        crossDomain: true,
        mode: 'cors',
        method: 'GET',
        headers: {'Content-Type' : 'application/json',
                'Authorization': `Bearer `+authToken.access_token}
        }).then(res=>res.json())
        .then((res) =>{
            return res;
        }).catch((err)=>{
            setIsEmpty(false);
            return err;
        });
        setMenuData(menuData);
      }
      else{
        setIsEmpty(false)
      }
  }

  return (
    <div>
      <BrowserRouter>
      <nav>
      {isEmpty?<li><Link to="/login">Login</Link></li>
        : <li id="menuLink"><Link to="/menu" onClick={()=>obtainMenuData(authToken)}>Menu</Link></li>}
      </nav>
        <Switch>
          <Route path="/login">
            <div className='container'>
              <Header header='Welcome!'/>
              <Login loginResponse={loginResponse}/>
            </div>
          </Route>:
          <Route path='/menu'>
            <Menu menudata={menudata} isEmpty={!isEmpty}></Menu>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
