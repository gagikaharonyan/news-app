import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import NavBar from '../navBar/NavBar.js'

export default class Header extends React.Component {
    state = {
        data: {isLoaded: false, categories: null}
    }

    componentDidMount() {
        window.client.getCategories((categories) => {
            this.setState({data: {isLoaded: true, categories}});
        });
    }

    render() {
        const {data} = this.state;
        const links =[{url: '/', title: 'Home'},
            ...(data.isLoaded?  data.categories.map(cat => {return {url: `/category/${cat}`, title: cat}}) : [])];

        return(
            <div className="Header">
                <AppLogo></AppLogo>
                <NavBar links={links}></NavBar>
                <ActionBar 
                    onSearch={this.props.onSearch}
                    onContactUsClick={this.props.onContactUsClick}>
                </ActionBar>
            </div>
        );
    }
}

function AppLogo (props) {
    return(<div className="App-logo">
            <Link to="/" className="header-category">NEWS APP</Link>
        </div>);
}

class ActionBar extends React.Component {
    state = {
        searchedKeywod: ''
    }

    handleOnSearch = (evn) => {
        this.setState({searchedKeywod: evn.target.value});
        this.props.onSearch(evn.target.value);
    }

    render () {
        return(<div className="Header-action-bar">
            <input className="search-input" type="text" placeholder="Search"
                onChange={this.handleOnSearch}
                value={this.state.searchedKeywod}></input>
            <button className="contact-us-button"
                onClick={this.props.onContactUsClick}>Contact us</button>
        </div>);
    }
}
