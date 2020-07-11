import React from 'react';
import './TopHeadlines.css';

export default class TopHeadlines extends React.Component {
    state = {
        news: this.props.src,
        curArticleIndex: 0,
        intervalId: null
    }

    componentDidMount() {
        let intervalId = setInterval(() => {
            const {curArticleIndex, news} = this.state;
            const newIndex = curArticleIndex + 1;            
            this.setState({curArticleIndex:  newIndex < news.length ? newIndex : 0});
        }, 3000);

        this.setState({intervalId})
    }
    
    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    render() {
        const {news, curArticleIndex} = this.state;
        const article = news[curArticleIndex];

        return (
            <div className="Top-headlines">                    
                <Article 
                    urlToPage={article.url}
                    img={article.urlToImage}
                    title={article.title}
                    description={article.description}
                    publishData={article.publishedAt}
                ></Article>                
            </div>            
        );
    }
}

function Article(props) {
    return (
        <div className="Headlines-article col-container">
            <a className="col-container" href={props.urlToPage} target="_blank" rel="noopener noreferrer">
                <div className="headlines-article-img">
                    <img src={props.img} alt="article" onError={(evn) => {evn.target.src='/img/img-onError.jpg'}}></img>
                </div>
                <div className="headlines-article-body row-container">
                    <span className="headlines-article-title">{props.title}</span>               
                    <span className="headlines-article-description">{props.description}</span>
                </div>
            </a>            
        </div>
    );
}