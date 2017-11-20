import React, { Component } from 'react'
import { Form, TextArea , Dropdown , Button , Icon , Input , Segment} from 'semantic-ui-react'


export default class SignUpForm extends Component {
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
        <Input placeholder='Name' value={this.state.title} name="name"
          onChange={(event , inputName) => this.handleInput(event , "name")} />
      </Form.Field>
      <Form.Field>
        <label>Name : </label>
        <Input placeholder='Email' value={this.state.title} name="email"
          onChange={(event , inputName) => this.handleInput(event , "email")} />
      </Form.Field>
      <Form.Field>
        <label>Password : </label>
        <Input placeholder='Password' value={this.state.title} name="password"
          onChange={(event , inputName) => this.handleInput(event , "password")} />
      </Form.Field>
      <Form.Field>
        <label>Confirm Password : </label>
        <Input placeholder='Confirm your password' value={this.state.title} name="password-confirm"
          onChange={(event , inputName) => this.handleInput(event , "password-confirm")} />
      </Form.Field>




      <Button animated floated="right"
      onClick={() => {
        if (!this.formIsValid()) {
          this.showErrors()
          return null
        }
        const code = this.getCode();
        this.props.postSnippet({
          title : this.state.title,
          code : this.state.code ,
          description : this.state.description,
          language : this.state.language
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
