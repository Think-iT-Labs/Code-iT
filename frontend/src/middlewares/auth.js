import { setToken, removeToken , getToken} from './token';
import authorize from './oauth2';
import { push , withRouter } from 'react-router-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { api_server } from '../constants';

const CLIENT_ID = "0c59fe8e64efb4245006";
const CLIENT_SECRET = "0d4c10e8f1d3af8b44d90ee44d41f09e81255a50";
let ACCESS_TOKEN = ""

const authMiddleware = store => next => action => {
  switch (action.type) {
    case "LOGIN_REQ":
      return authorize(action.config).then(
        ({ token, expiresAt }) =>
          {
            const loginData = {
              "code" :  token ,
              "client_id" : CLIENT_ID ,
              "client_secret" : CLIENT_SECRET
            }
            axios.post(api_server+'/getAccessToken' , loginData)
            .then((resp) => {
              ACCESS_TOKEN = resp.data ;
              axios.get('https://api.github.com/user?'+ACCESS_TOKEN)
              .then((resp) => {

                let user = {
                  id : resp.data.id ,
                  login : resp.data.login ,
                  avatar_url : resp.data.avatar_url,
                  access_token : ACCESS_TOKEN
                }

                setToken(generateToken(user), '')
                store.dispatch({type : 'GOT_USER_CREDENTIALS' , payload : resp.data})
                action.payload = { ...action.payload , user : resp.data }
                return next(action)
              })
              .catch(
                 (err) => {
                   action.payload = { ...action.payload , user : null }
                   console.log(err)
                 }

              )

            })
            .catch(
               (err) => console.log(err)
            )
          },
        error => store.dispatch(loginFailure(error))
      )
    case "GOT_USER_CREDENTIALS":
      break
    case "LOGIN_FAILURE":
    case "LOGOUT":
      removeToken()
      break
  }


  return next(action)
}

export const loginSuccess = (token, expiresAt) => ({
  type: "LOGIN_SUCCESS",
  token,
  expiresAt
})

export const loginFailure = error => ({
  type: "LOGIN_FAILURE",
  error
})

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models

  let token;
  return token = jwt.sign(user, "process.env.JWT_SECRET", {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
export default authMiddleware
