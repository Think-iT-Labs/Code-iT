import axios from 'axios'
import { api_server } from '../constants';
const resultsPerPage = 5 ;

const initialState = {
  page: 1,
  pagesNumber : null ,
  filter : null,
  snippets: [],
  loading : false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SNIPPET_PAGE':
      return {
        ...state,
        snippets: [...action.snippets] ,
        page : action.page
      }
    case 'GET_FILTERED_SNIPPET_PAGE':
      return {
        ...state,
        snippets: [...action.snippets] ,
        page : action.page
      }
    case 'GET_PAGES_NUMBER':
      return {
        ...state,
        pagesNumber : Math.floor(action.resultsNumber / resultsPerPage) + 1
      }
    case 'APPLY_FILTER':
      return {
        ...state,
        filter : action.filter
      }


    default:
      return state
  }
}

export const getSnippetsPage = (page) => {

  const url = api_server+"/snippet?skip="+(page-1)*resultsPerPage+"&limit="+resultsPerPage;
  console.log(url);
  return function (dispatch) {
    axios.get(url)
      .then((response) => dispatch({
        type: 'GET_SNIPPET_PAGE',
        snippets :  response.data ,
        page : page
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}

export const getFilteredSnippetsPage = (page , language) => {

  const url = api_server+"/snippet?skip="+(page-1)*resultsPerPage+
                                          "&limit="+resultsPerPage+
                                          "&language="+language;
  console.log(url);
  return function (dispatch) {
    axios.get(url)
      .then((response) => dispatch({
        type: 'GET_FILTERED_SNIPPET_PAGE',
        snippets :  response.data ,
        page : page
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}

export const getPagesNumber = () => {
  const url = api_server+"/snippet/count/";
  console.log(url);
  return function (dispatch) {
    axios.get(url)
      .then((response) => dispatch({
        type: 'GET_PAGES_NUMBER',
        resultsNumber :  response.data.count
      })).catch ((response) => dispatch({
        type: 'ERROR',
        error: response.error
      }));
  }
}
export const applyFilter = (filter) => {

  return dispatch => {
    dispatch({
      type: "APPLY_FILTER" ,
      filter
    })
  }
}
