import React from 'react'

const LanguageIcon = (props) => {
  if (props.language === undefined) {
    return null
  }
  let color = "black"
  if (props.color !== undefined) {
    color = props.color
  }
  const language = "devicon-"+props.language.toLowerCase()+"-plain icon-image";
    return (
      <i className={language} style={{ fontSize : props.size+"em" , color : color}}></i>
    )
}

export default LanguageIcon
