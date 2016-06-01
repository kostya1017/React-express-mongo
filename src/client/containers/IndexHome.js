import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
//import { setName, resetResponse } from '../actions/response';

/**
 * Container for /
 */
class IndexHome extends Component {
  constructor(props) {
    super(props);

  }

  

  render() {
    return (
      <header id="header">
			<div class="homebanner">
				<div class="container self-container">
					<ul class="top-nav list-unstyled">
						<li><a href="#" class="brand-agencies">brand + agencies</a></li>
						<li>
							<a href="#" class="login">login</a>
							<a href="#" class="get-started">Get Started</a>
						</li>
					</ul>
					<div class="banner-logo">
						<a href="#">
							<span>
							<object type="image/svg+xml" data="images/main-logo.svg" class="banner-log">
								<img src="images/main-logo.svg" alt="main logo" />
							</object>
							</span>
						</a>
					</div>
					<div class="text-center">
						<h2><b>Get paid</b> for your <b>Instragram posts.</b></h2>
						<a href="#" class="big-get-start">get started</a>
					</div>
				</div>
			</div>
		</header>
    );
  }
}

IndexHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  response: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default IndexHome;
