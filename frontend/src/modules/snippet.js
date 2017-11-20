import axios from 'axios'
import {find} from 'lodash'
import { api_server } from '../constants';

const initialState = {

  snippet : {}

}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_SNIPPET_DETAILS':
      return {
        ...state,
        snippet: {...action.snippet}
      }
    case 'POST_SNIPPET_REVIEW':
      return {
        ...state,
        snippet: {...action.snippet , reviews : [ ...state.snippet.reviews ,action.review] }
      }
    case 'RATE_SNIPPET_REVIEW':

      return {
        ...state
      }

    default:
      return state
  }
}

export const getSnippetDetails = (id) => {

  const url = api_server+"/snippet/"+id;
  return function (dispatch) {
    axios.get(url)
      .then((response) => dispatch({
        type: 'GET_SNIPPET_DETAILS',
        snippet :  response.data
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}

export const postSnippetReview = (snippetId , review , user) => {
  console.log(review);
  const url = api_server+"/review/";
  const data = {
    code : review,
    snippet : snippetId ,
    user : user ,
    rating : 0
  }
  return function (dispatch) {
    axios.post(url , data)
      .then((response) => dispatch({
        type: 'POST_SNIPPET_REVIEW',
        review :  response.data
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}

export const rateSnippetReview = (reviewId, snippetId , rating) => {
  const url = api_server+"/review/"+reviewId;
  const data = {
    rating
  }
  return function (dispatch) {
    axios.put(url , data)
      .then((response) => dispatch({
        type: 'RATE_SNIPPET_REVIEW'
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}
