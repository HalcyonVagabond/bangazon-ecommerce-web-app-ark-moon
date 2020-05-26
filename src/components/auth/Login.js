import React, {useState, useEffect} from "react"
import AuthManager from "../../modules/AuthManager.js"

const Login = ({routerProps}) => {

  const [loggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({username: "", password: ""})

  const handleFieldChange = (evt) => {
    const stateToChange = {...credentials}
    stateToChange[evt.target.id] = evt.target.value
    setCredentials(stateToChange)
  }

  const handleLogin = (e) => {
      e.preventDefault()
      const customerCreds = {
          "username": credentials.username, 
          "password": credentials.password
      }
      return AuthManager.loginUser(customerCreds)
      .then(parsedResponse => {
          if("valid" in parsedResponse && parsedResponse.valid && "token" in parsedResponse) {
              sessionStorage.setItem("token", parsedResponse.token)
              setIsLoggedIn(true)
          }
      })
      .then(() => routerProps.history.push("/"))
  }

 

  return (
   <>
   <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input onChange={handleFieldChange} type="text" id="username" placeholder="Username" value={credentials.username}/>
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input onChange={handleFieldChange} type="password" id="password" placeholder="Password" value={credentials.password}/>
            </fieldset>
            <fieldset>
            <button type="Submit">Login</button>
            </fieldset>
        </form>
   </>
  );
};

export default Login