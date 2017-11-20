import React, { Component } from 'react'
import { Form, TextArea , Dropdown , Button , Icon , Input , Segment} from 'semantic-ui-react'
import { push } from 'react-router-redux'

export default class LoginForm extends Component {
  state = {
    loading : false ,
    title : "",
    code : "" ,
    description : "" ,
    language : "",
    errors : false
  }


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
         this.state.code === "" ||
         this.state.language === "" ||
         this.state.description === ""
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
    console.log(code);
  }

  render() {
    return (
    <div>



      <Form >
      <Form.Field>
        <label>Name : </label>
        <Input placeholder='Title' value={this.state.title} name="title"
          onChange={(event , inputName) => this.handleInput(event , "title")} />
      </Form.Field>
      <Form.Field>
        <label>Password : </label>
        <Input placeholder='Title' value={this.state.title} name="password"
          onChange={(event , inputName) => this.handleInput(event , "password")} />
      </Form.Field>




      <Button animated floated="right"
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
