import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Login from "./Views/Login";
import Admin from "./Views/Admin";
import User from "./Views/User";

function App() {
  const [roleMapping, setRoleMapping] = useState({});
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loggedUser, setLoggedUser] = useState({})
  const [whoIsLogged, setWhoIsLogged] = useState(0);

  const fetch = async (url, sets) => {
    const result = await axios(url);
    sets(result.data);
  };

  useEffect(() => {
    fetch("http://localhost:3000/roleMapping", setRoleMapping);
  }, []);

  useEffect(() => {
    checkUser()
  }, [users]);

  const submit = async (e) => {
    e.preventDefault();
    setUserInput(e.target.dataset.value)
    fetch("http://localhost:3000/user", setUsers)
    
  };


  //checking if user exist and parsing the role
  const checkUser = () => {
    users.map(user => {
      if(user.email === userInput){
       setLoggedUser(user)
       checkRole(user.id)
      }
    }
    )
  }
  
  //check which role is that user
  const checkRole = user => {
    roleMapping.map(users => {
      if(users.userId === user){
        return setWhoIsLogged(users.roleId)
      }
    })
  }

  //based on whoislogged int it will render view
  let view;
  if (whoIsLogged === 0) {
    view = <Login submit={submit} />;
  } else if (whoIsLogged === 1 ) {
    view = <Admin />;
  } else if (whoIsLogged === 2||3){
    view = <User user={loggedUser.id}/>
  };

  return <div className="App">
        {view}
    </div>;
}

export default App;
