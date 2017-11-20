import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, TextArea , Dropdown , Button , Icon , Input , Image } from 'semantic-ui-react'
import PostSnippetForm from '../../components/postSnippet'
import { loginActivated } from '../../constants'

import {
  postSnippet,
  postAnother
} from '../../modules/counter'



const Home = props => {
  if (!props.loggedIn && loginActivated) {
    props.goToAuth()
  }
  if (props.posted) {
    return (
      <div className="ui center aligned segment">
        <h2> Snippet Posted !  </h2>
        <div>
          <Image size="medium" centered src="https://img1.etsystatic.com/163/0/14449774/il_570xN.1220271005_4l4s.jpg" />
        </div>
        <br/>
        <div>
            <Button onClick={() => props.postAnother()}> Post Another One ? </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Post a Code Snippet for Review</h1>
        <PostSnippetForm user={props.user} postSnippet={(snippet) => props.postSnippet(snippet)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posted: state.counter.posted,
  loggedIn : state.auth.loggedIn,
  user : state.auth.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postSnippet ,
  postAnother ,
  goToAuth: () => push('/auth')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
