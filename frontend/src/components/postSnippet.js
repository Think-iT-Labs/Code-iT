import React, { Component } from 'react'
import { Form, TextArea , Dropdown , Button , Icon , Input , Segment} from 'semantic-ui-react'
import PrismEditor from './DraftCode'
import {languages} from '../constants'


export default class postSnippetForm extends Component {
  state = {
    loading : false ,
    title : "",
    language : "javascript",
    errors : false
  }
  code = "";

  handleInput(event , input) {
    let newState = {...this.state} ;
    newState[input] = event.target.value
    this.setState(newState)
  }

  handleLanguageChange(event , data) {

    this.setState({
      language : data.value
    })

  }

  formIsValid() {
    if ( this.state.title === "" ||
         this.code === ""
       ) {
         return false
       }else {
         return true
       }
  }

  showErrors(){
    this.setState({
      errors : true
    })
  }



  renderErrors() {
    if (this.state.errors) {
      return (
        <Segment inverted color='red' tertiary>
          Please complete all the input forms before submitting.
        </Segment>
      )
    } else {
      return null
    }
  }

  getCode(code) {
    this.code = code
  }

  render() {
    return (
    <div>
      {this.renderErrors()}
      <Form >
      <Form.Field>
        <label>Title : </label>
        <Input placeholder='Title' value={this.state.title} name="title"
          onChange={(event , inputName) => this.handleInput(event , "title")} />
      </Form.Field>

      <Form.Field>
        <label>Programming Language : </label>
        <Dropdown
          className='icon'
          fluid
          selection
          options={languages}
          search
          placeholder='Select Language'
          onChange={(event , data) => this.handleLanguageChange(event , data)}
        />
      </Form.Field>

      <div></div>
      <Form.Field>
      <label>Code : </label>
      <PrismEditor getCode={(code) => this.getCode(code)} language={this.state.language}
        for="code"/>
      <div></div>
      </Form.Field>

      <Button animated floated="right" className="spacing-top"
      onClick={() => {
        if (!this.formIsValid()) {
          this.showErrors()
          return null
        }

         this.props.postSnippet({
           title : this.state.title,
           code : JSON.stringify(this.code) ,
           language : this.state.language ,
           user : this.props.user
         })
      }}
      >
        <Button.Content visible>Submit</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>

    </Form>

    </div>
    );
  }
}
