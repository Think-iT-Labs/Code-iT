import React, { Component } from 'react'
import {  Button, Comment, Form, Header , Rating  } from 'semantic-ui-react'
import Highlight from 'react-highlight';
import PrismEditor from './DraftCode'

export default class Reviews extends Component {

  constructor(props) {
    super(props)
    this.state = {
      review : ""
    }
    this.review = null
  }

  rate(reviewId , snippetId , data ) {
      this.props.rateSnippetReview(reviewId , snippetId , data.rating)
  }

  getCode(code) {

  }

  renderReviews() {
    if (this.props.reviews === undefined || this.props.reviews === null) {
      return null
    }
    if (this.props.reviews.length === 0) {
      return <h4>no reviews posted yet , be the first to post ! </h4>
    }
    return this.props.reviews.map( (review , index) => {

        const reviewDate = new Date(review.updatedAt);

        return (
          <Comment.Content className="single-review" key={"review_"+index}>
            <Comment.Author as='a'>{review.poster}</Comment.Author>
            <Comment.Metadata>
              <div>Posted by : {review.user.login}</div>
              <div className="date-review">{reviewDate.toLocaleDateString()} -  {reviewDate.toLocaleTimeString() }</div>

              <Rating icon='star' className="rate-review" defaultRating={review.rating}
                onRate={(event,data) => this.rate(review.id , this.props.id , data)}
                maxRating={5} />
          </Comment.Metadata>
            <Comment.Text>

            {review.description}

            <PrismEditor getCode={(code) => this.getCode(code)} initialCode={review.code} language={review.language}
              readOnly={true} />


            </Comment.Text>

          </Comment.Content>

        )

      })
  }

  handleReviewChange(event) {
    this.setState({
      review : event.target.value
    })
  }

  getReview(review) {
    this.review = review
  }

  render() {
    return (
      <Comment.Group>
        <Header as='h3' dividing>Reviews</Header>

        {this.props.reviews !== undefined && this.props.reviews !== null  ?
          this.renderReviews() :
          null
        }

        <Form reply >
          <h4>Post your review here : </h4>
          <PrismEditor getCode={(code) => this.getReview(code)} language="javascript" for="review" />
          <Button content='Add Review' labelPosition='right' icon='edit' primary floated="right"
          onClick={() => this.props.postSnippetReview(
            this.props.id ,
            JSON.stringify(this.review),
            this.props.user
          )}
          className="spacing-top">
          POST REVIEW
        </Button>
        </Form>
      </Comment.Group>

    )
  }
}
