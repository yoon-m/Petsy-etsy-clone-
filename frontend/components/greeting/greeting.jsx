import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.leaveFocus = this.leaveFocus.bind(this);
        this.enterFocus = this.enterFocus.bind(this);
        this.searchBox = null;
        this.searchObs = [];
    }

    handleDropdown() {
        $("#panel").slideToggle(100);
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value }, () => {
            this.props.searchProducts(this.state.searchValue);
        });
    }

    handleEnter(e) {
        if (e.keyCode == 13) {
            this.props.history.push(`/search=${e.target.value}`);
        }
    }

    leaveFocus(e) {
        $('.search-result-container').css('display', 'none');
    }

    enterFocus(e) {
        $('.search-result-container').css('display', 'block');
    }

    render() {
        let protectedButtons = null;
        let authButtons = null;
        let borders = null;

        if (this.props.searchResults) {
            if (this.state.searchValue === '') {
                this.searchBox = (
                    <div className='no-search-results'></div>
                );
            } else {
                this.searchObs = this.props.searchResults.slice(0, 5);
                this.searchBox = (
                    <div className='search-results'>
                        {this.searchObs.map(result => {
                            return (
                                <a key={result.id} href={`/#/products/${result.id}`}><p className='search-result' >{result.title}</p></a>
                            )
                        })}
                    </div>
                );
            }
        }

        if (this.props.currentUser) {
            borders = (
                <div className='vl'></div>
            );

            protectedButtons = (
                <>
                    <button
                        className='auth-buttons'
                    >
                        <Link to='/sell'>Sell on Petsy</Link>
                    </button>

                    {borders}

                    <div id='flip'>
                        <div className='nav-icons'>
                            <div className='avatar-dropdown' onClick={this.handleDropdown}>
                                <img src={'https://s3.amazonaws.com/aa-petsy-public/defaultAvatar.jpg'} className='avatar avatar-hover' />
                                <p>You <i className="fa fa-caret-down"></i></p>
                            </div>

                            <div className="dropdown-content" id='panel'>
                                <Link to='/profile'><div className='dropdown-content-top'>
                                    <img src={'https://s3.amazonaws.com/aa-petsy-public/defaultAvatar.jpg'} className='avatar' />
                                    {this.props.currentUser.first_name}
                                    <br />
                                    <button>View Profile</button>
                                </div></Link>
                                <hr />
                                <ul>
                                    <a href='#'><li>Favorites</li></a>
                                    <a href='#'><li>Conversations</li></a>
                                    <a href='#'><li>Purchases and Reviews</li></a>
                                    <a href='#'><li>Account Settings</li></a>
                                    <hr />
                                    <a href='#'><li onClick={this.props.logout}>Sign out</li></a>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {borders}

                    <div className="nav-icons">
                        <a href={`/#/cart/`}><i className="fas fa-shopping-cart"></i></a>
                        <p>Cart</p>
                    </div>
                </>
            );
        } else {
            authButtons = (
                <>
                    <button
                        onClick={() => this.props.openModal('signup')}
                        className='auth-buttons'
                    >
                        Register
                </button>

                    <button
                        onClick={() => this.props.openModal('login')}
                        className='auth-buttons sign-in'
                    >
                        Sign In
            </button>
                </>
            );
        }

        return (
            <nav className="nav" >
                <div className='search-result-container'>
                    {this.searchBox}
                </div>

                <div className="nav-left">
                    <a href="/"><img src={'https://s3.amazonaws.com/aa-petsy-public/petsyWhiteSquareCropped.png'} className='navLogo' /></a>
                    
                    <input 
                        type="text" 
                        placeholder="Search for items or shops"
                        className="search-text"
                        onChange={this.handleChange}
                        value={this.state.searchValue}
                        onKeyUp={this.handleEnter}
                        onBlur={this.leaveFocus}
                        onFocus={this.enterFocus}
                    />
    
                    <button
                        className='search-button'
                    >
                        Search
                    </button>
                </div>
    
                <div className="nav-right">
                    {authButtons}
    
                    <div className="nav-icons">
                        <a href='/'><i className="fas fa-briefcase"></i></a>
                        <p>Discover</p>
                    </div>
                    {borders}
                    
                    {protectedButtons}
                </div>
            </nav>
        );
    }
};

export default withRouter(Greeting);