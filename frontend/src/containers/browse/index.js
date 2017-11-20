import React from 'react'
import Browser from '../../components/browser'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form , Dropdown} from 'semantic-ui-react'
import { languages , loginActivated } from '../../constants'

import {
	getSnippetsPage ,
	getPagesNumber,
	applyFilter
} from '../../modules/codeBrowser'

const handleLanguageChange = (event , data ) => {


}

const Browse = (props) => {
	if (!props.loggedIn && loginActivated ) {
		props.goToAuth()
	}
	return (
		<div>

			<h1>Browse Code Snippets</h1>


		{/* FILTERING
		//<div className="ui semantic segment"> <Form >
		// 	<Form.Field>
		// 		<label>Filter by language? </label>
		// 		<Dropdown
		// 			className='icon'
		// 			fluid
		// 			selection
		// 			options={languages}
		// 			search
		// 			placeholder='Select Language'
		// 			onChange={(event , data) => props.applyFilter(data.value)}
		// 		/>
		// 	</Form.Field>
		// </Form>	</div>*/}


    <Browser getSnippetsPage={(page , filter) => props.getSnippetsPage(page , filter)}
			getPagesNumber={() => props.getPagesNumber()}
    	snippets={props.snippets} page={props.page} pagesNumber={props.pagesNumber}/>
  </div>
	);
}

const mapStateToProps = state => ({
  page: state.codeBrowser.page,
  snippets: state.codeBrowser.snippets,
	pagesNumber : state.codeBrowser.pagesNumber,
	filter : state.codeBrowser.filter,
	loggedIn : state.auth.loggedIn
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getSnippetsPage,
	getPagesNumber,
	applyFilter,
	goToAuth: () => push('/auth')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse)
