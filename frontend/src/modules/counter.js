import axios from 'axios'
import { api_server } from '../constants';
const initialState = {
  posted: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SNIPPET_POSTED':
      return {
        ...state ,
        posted : true
      }
    case 'POST_ANOTHER':
        return {
          ...state ,
          posted : false
      }
    default:
      return state
  }
}

export const postSnippet = (snippet) => {

  return function (dispatch) {
    axios.post(api_server+'/snippet' , snippet )
      .then((response) => dispatch({
        type: 'SNIPPET_POSTED'
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}

export const postAnother = (snippet) => {
  return function (dispatch) {
    dispatch({
        type: 'POST_ANOTHER'
    })
}
}
