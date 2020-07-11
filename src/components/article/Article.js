import React from 'react';
import './Article.css';

export default function Article(props) {
    const news = props.src

    return (
        <div className="Article col-container">
            <a className="col-container" href={news.url} target="_blank" rel="noopener noreferrer">
                <div className="article-img">
                    <img src={news.urlToImage} alt="article" onError={(evn) => {evn.target.src='/img/img-onError.jpg'}}></img>
                </div>
                <div className="article-body row-container">
                    <span className="article-title">{news.title}</span>               
                    <span className="article-description">{news.description}</span>
                </div>
            </a>            
        </div>
    );    
}