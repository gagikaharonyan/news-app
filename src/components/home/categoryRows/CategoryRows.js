import React from 'react';
import './CategoryRows.css';
import Loading from '../../loading/Loading.js';
import {Link} from 'react-router-dom';

export default class CategoryRows extends React.Component {
    state = {
        rows: []
    }

    componentDidMount() {
        let rows = [];
        
        let setRow = (articles, row) => {            
            this.setState({rows: this.state.rows.map(_row => 
                (_row.title === row.title) ? newRow(row.title, articles, row.isKeyword, true) : _row
            )});
        }

        let newRow = (title, articles, isKeyword, isLoaded) => {
           return  {title, articles, isKeyword, isLoaded}
        }

        window.client.getCategories((res) => { 
            rows.push(newRow('covid-19', null, true, false));

            res.forEach(category => {
               rows.push(newRow(category, null, false, false));
            });

            this.setState({rows}, () => {
                rows.forEach(row => {
                    if(row.isKeyword) {                        
                       window.client.getArticlesByKeyword(row.title, (res) => setRow(res, row));
                    }

                    window.client.getArticlesByCategory(row.title, (res) => setRow(res, row));
                });
            });        
        });       
    }

    render() {
        const{rows} = this.state;

        return(
            <div className="Category-rows row-container">
                {rows.length === 0
                ?<Loading></Loading>
                :rows.map((row, index) => <CategoryRow key={index} src={row}></CategoryRow>)}
            </div>);
    }
}

function CategoryRow(props) {   
    const row = props.src;

    function createContent(_articles) {
        const articles = _articles.slice(0, 5);

        return (            
            <div className="category-row-body col-container">
                {articles.map((article, index) => <RowArticle key={index} src={article}></RowArticle>)}
            </div>);
    }

    return(
        <div className="Category-row row-container">
            <div className="category-row-header col-container">
                <div className="col-10"></div>
                <span>{row.title}</span>
                <div className="col-80"></div>
            </div>
            {row.isLoaded
            ?createContent(row.articles)
            :<Loading></Loading>}
             <div className="category-row-footer col-container">
                 <Link to={`/category/${row.title}`}>
                    <button className="see-more-button">See more</button>
                 </Link>                
            </div>
        </div>);
}

function RowArticle(props) {
    const article = props.src;

    return(
        <div className="Row-article">
            <a className="row-container" href={article.url} target="_blank" rel="noopener noreferrer">
                <div className="row-article-img"><img src={article.urlToImage} alt="not found" 
                    onError={(evn) => {evn.target.src='/img/img-onError.jpg'}}></img></div>
                <div className="row-article-body row-container">
                    <span className="row-article-title">{article.title}</span>
                    <span className="row-article-description">{article.description}</span>
                </div>                
            </a>            
        </div>);
}