import axios from "axios";
import jwt from 'jsonwebtoken';
const CLIENT_ID = "0c59fe8e64efb4245006"
const CLIENT_SECRET = "0d4c10e8f1d3af8b44d90ee44d41f09e81255a50"

const token = localStorage.getItem("token")

let initialState = {
  response : null,
  loggedIn : false
}

if (token !== null) {
  const jwt_decrypt = jwt.verify(token, "process.env.JWT_SECRET");
  initialState = {
    response : null ,
    loggedIn : true ,
    user : {
      id : jwt_decrypt.id ,
      login : jwt_decrypt.login ,
      avatar_url : jwt_decrypt.avatar_url ,
    }
  }
}
console.log(initialState);
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQ':
      return {
        ...state
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        response: action.response
      }
    case 'GOT_USER_CREDENTIALS':
      return {
        ...state,
        user : action.payload ,
        loggedIn : true
      }

    default:
      return state
  }
}
