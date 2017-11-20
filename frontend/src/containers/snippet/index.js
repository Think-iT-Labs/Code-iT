import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SnippetComponent from '../../components/Snippet'
import Reviews from '../../components/review'
import { loginActivated } from '../../constants'


import {
  getSnippetDetails,
  postSnippetReview,
  rateSnippetReview
} from '../../modules/snippet'



const Snippet = props => {
  if (!props.loggedIn && loginActivated) {
    props.goToAuth()
  }
  return (
  <div>
    <SnippetComponent snippet={props.snippet} id={props.match.params.id} getSnippetDetails={(id) => props.getSnippetDetails(id)} />
    <div className="white-space"></div>
    <div className="reviews" >
      <Reviews reviews={props.snippet.reviews} id={props.snippet.id} user={props.user}
        postSnippetReview={(id , review , user) => props.postSnippetReview(id , review , user)}
        rateSnippetReview={(reviewId , snippetId , rating) => props.rateSnippetReview( reviewId , snippetId , rating) }/>
    </div>
  </div>
);
}

const mapStateToProps = state => ({
  snippet : state.snippet.snippet,
  loggedIn : state.auth.loggedIn,
  user : state.auth.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getSnippetDetails,
  postSnippetReview,
  rateSnippetReview,
  goToAuth: () => push('/auth')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snippet)
