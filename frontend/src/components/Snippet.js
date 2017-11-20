import React, { Component } from 'react'
import Highlight from 'react-highlight';
import LanguageIcon from './LanguageIcon'
import PrismEditor from './DraftCode'

export default class MenuHeader extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //initialize snippet
    this.props.getSnippetDetails(this.props.id);
  }

  getCode() {
    return null
  }

  render() {

    const {title , language , description , code , user} =  this.props.snippet ;
    const date = new Date(this.props.snippet.createdAt) ;
    let username = ""
    if (user !== undefined) {
      username = user.login
    }
    return (
      <div>
      <h2>{title}</h2>

      <div>
        <div style={{float : 'left'}}>
          <p>Written in : {language}</p>
          <p>Written by : {username}</p>
          <p>Date : {date.toLocaleDateString("en-US")} </p>
        </div>
        <div style={{float : 'right'}}>
          <LanguageIcon language={language} size={9} color="#ccc"/>
        </div>
      </div>
      <div style={{clear :"both"}}></div>
      <br/>

      <PrismEditor getCode={(code) => this.getCode(code)} initialCode={code} language={language}
        readOnly={true} />

      </div>
    )
  }

}
