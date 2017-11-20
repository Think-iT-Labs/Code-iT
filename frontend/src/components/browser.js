import React, { Component } from 'react'
import { Loader , Item , Menu , Icon } from 'semantic-ui-react'
import {  Link } from 'react-router-dom'
import LanguageIcon from './LanguageIcon'
export default class Browser extends Component {
  state = {
    loading : false
  }

  componentDidMount() {
    if (this.props.pagesNumber === null) {
      this.props.getPagesNumber()
    }
    this.props.getSnippetsPage(1)
  }

  renderSnippets(){
    return this.props.snippets.map(function(snippet) {

      return (
        <Item className="browser-item" key={snippet.id}>
        <Item.Image >
          <LanguageIcon language={snippet.language} size={4} />

        </Item.Image >
        <Item.Content>
          <Item.Header as='a'>
            <Link to={"/snippet/"+snippet.id}>{snippet.title}</Link>
          </Item.Header>

          <Item.Extra>Tags : </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }
  renderPagination() {
    let pagesButtons = [] ;
    for (var i = 1; i <= this.props.pagesNumber  ; i++) {
      const page = i ;
      pagesButtons.push(
        <Menu.Item as='a' key={page} active={page === this.props.page} onClick={() => this.props.getSnippetsPage(page)}>{i}</Menu.Item>
      )
    }
    return (
      <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='left chevron' />
              </Menu.Item>
                {pagesButtons}
              <Menu.Item as='a' icon>
                <Icon name='right chevron' />
              </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { activeItem , loading } = this.state
    if (loading) {
      return (
          <Loader active inline='centered' size="big" />
      )
    }
    return (
        <div className="browser">

  <Item.Group>
      {this.renderSnippets()}
  </Item.Group>
    {this.renderPagination()}

        </div>
    )
  }
}
