import React, { Component } from 'react'
import { Menu , Image } from 'semantic-ui-react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MenuHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item header>
          <Image src='http://www.c-pictures.com/C+LOGO.png' size='mini' />
        </Menu.Item>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} >
                <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick} >
                <Link to="/browse">Browse</Link>
        </Menu.Item>
        <Menu.Item name='aboutUs' active={activeItem === 'aboutUs'} onClick={this.handleItemClick} >
                <Link to="/about-us">About</Link>
        </Menu.Item>
        <Menu.Item name='auth' position="right" active={activeItem === 'auth'} onClick={this.handleItemClick} >
                {!this.props.loggedIn ? <Link to="/auth">Login</Link> : <Image src={this.props.user.avatar_url} alt={this.props.user.login} size='mini' />  }
        </Menu.Item>

      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn : state.auth.loggedIn,
  user : state.auth.user
})

export default connect(
  mapStateToProps,
  null
)(MenuHeader)
