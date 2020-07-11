import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
    state = {
        isMenuOpen: false
    }

    handleToggleClick() {
        this.displayNavMenu(!this.state.isMenuOpen);
    }

    displayNavMenu(open) {
        document.body.classList = open ? 'fixed-position' : '';
        this.setState({isMenuOpen: open});
    }

    render() {
        const {isMenuOpen} = this.state;

        return (
            <div className="Nav-bar">
                <ul className={isMenuOpen ? 'nav-menu toggle-clicked' : 'nav-menu'} onClick={() => {this.displayNavMenu(false)}}>
                    {this.props.links.map((link, index) => 
                        <li key={index}onClick={() => {this.displayNavMenu(false)}}>
                            <Link to={link.url}>{link.title}</Link>
                        </li>
                    )}
                </ul>
                <span className="nav-toggle" onClick={() => {this.handleToggleClick()}}>
                    <i className={isMenuOpen ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'}></i>
                </span>
            </div>);
    }

}