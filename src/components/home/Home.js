import React from 'react';
import './Home.css';
import Loading from '../loading/Loading.js';
import TopHeadlines from './topHeadlines/TopHeadlines.js';
import CategoryRows from './categoryRows/CategoryRows.js';


export default class Home extends React.Component {
    state = {
        data: {isLoaded: false, news: null}
    }

    componentDidMount() {
        window.client.getArticlesByCategory('general', (news) => {
            this.setState({data: {isLoaded: true, news}});
        });
    }
    render() {
        const {data: {isLoaded, news}} = this.state
        return (
            <div className="Home-page page">
                {isLoaded 
                ?<TopHeadlines src={news}></TopHeadlines>
                :<Loading></Loading>}
                <CategoryRows></CategoryRows>
            </div>
        );
    }
}

