import React from 'react';
import Header from './components/header/Header.js';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home.js';
import Category from './components/category/Category.js';
import SearchResult from './components/searchResult/SearchResult.js';
import ContacUs from './components/contactUs/ContactUs.js';

class App extends React.Component {
  state = {
    searchedKeywod: '',
    isContactUsOpen: false
  }

  handleOnSearch = (searchedKeywod) => {
    this.setState({ searchedKeywod});
  }

  handleContactUs = () => {
    this.setState({isContactUsOpen: !this.state.isContactUsOpen});    
  }

  render() {
    const {searchedKeywod, isContactUsOpen} = this.state;

    return (<>
      <Header onSearch={this.handleOnSearch} onContactUsClick={this.handleContactUs}></Header>      
      {searchedKeywod && <SearchResult keyword={searchedKeywod} onClose={() => {this.handleOnSearch('')}}></SearchResult>}
      {isContactUsOpen && <ContacUs onClose={this.handleContactUs}></ContacUs>}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/category/:kind" component={Category}></Route>
      </Switch>
    </>);
  }
  
}

export default App;
