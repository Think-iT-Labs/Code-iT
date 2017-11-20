import React from 'react'
import LoginForm from '../../components/loginForm'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tab , Button , Icon } from 'semantic-ui-react'
import { server } from '../../constants';

const config = {
  url: "https://github.com/login/oauth/authorize",
  client: "0c59fe8e64efb4245006",
  redirect: server+"/auth",
  width: 400,
  height: 400
}

const Auth = (props) => {
	let Login = null ;
  console.log(process.env);
  if (props.loggedIn) {
    Login = (<button type='button' onClick={() => props.logout()}>Logout</button>) ;
		props.goToHome()
  } else {

		Login = (
			<div className="ui semantic segement">
		    <Button animated='vertical' onClick={() => props.login()}>
		      <Button.Content hidden>Login</Button.Content>
		      <Button.Content visible>
		        <Icon name='github' />
		      </Button.Content>
		    </Button>
		</div>
		);
  }


	return (
		<div>
			<h1>Login with your Github Account</h1>
			{props.response}
			{Login}
		</div>
	)
}

const mapStateToProps = ({ auth }) => ({
	loggedIn: auth.loggedIn,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	login: () => ({
	  type: 'LOGIN_REQ',
	  config
	}),
	goToHome: () => push('/'),
	logout : () => ({
	  type: 'LOGOUT_REQ'
	})
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
