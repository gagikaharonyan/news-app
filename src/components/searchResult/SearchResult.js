import React from 'react';
import './SearchResult.css';
import Loading from '../loading/Loading.js';
import {Link} from 'react-router-dom';

export default class SearchResult extends React.Component {
    state = {
        isLoaded: false,
        articles: null,
        keyword: this.props.keyword
    }

    componentDidMount() {
        this.loadData();
        document.body.classList = 'fixed-position';
    }

    componentWillReceiveProps(props) {
        
        this.setState({keyword: props.keyword}, () => {
            this.loadData();
        });        
    }

    componentWillUnmount() {
        document.body.classList = '';
    }

    loadData() {
        window.client.getArticlesByKeyword(this.state.keyword, (articles) => {
            this.setState({isLoaded: true, articles});
        });
    }

    render() {
        const {isLoaded, articles} = this.state;

        return(
            <div className="muted-wrapper" onClick={(evn) => {
                if(evn.target.className === 'muted-wrapper') 
                    this.props.onClose();
                }}>
                <div className="Search-result"> 
                    <div className="search-result-header">
                        <Link className="see-full" to={`/category/${this.state.keyword}`} onClick={() => {this.props.onClose()}}>See on full page</Link>
                    </div>                    
                    {isLoaded
                    ?articles.map((article, index) => <SearchedArticle key={index} src={article}></SearchedArticle>)
                    :<Loading></Loading>}
                </div>  
            </div>          
        );
    }
}

function SearchedArticle(props) {
    const news = props.src

    return (
        <div className="Searched-article col-container">
            <a className="col-container" href={news.url} target="_blank" rel="noopener noreferrer">
                <div className="searched-article-img">
                    <img src={news.urlToImage} alt="searchArticle" onError={(evn) => {evn.target.src='/img/img-onError.jpg'}}></img>
                </div>
                <div className="searched-article-body row-container">
                    <span className="searched-article-title">{news.title}</span>               
                    <span className="searched-article-description">{news.description}</span>
                </div>
            </a>            
        </div>
    );    
}