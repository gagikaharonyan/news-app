import React from 'react';
import './Category.css';
import Loading from '../loading/Loading';
import Article from '../article/Article.js'

export default class Category extends React.Component {
    state = {
        isLoaded: false,
        news: null,
        category: this.props.match.params.kind
    }

    componentDidMount() {       
        this.loadData();
    }
        

    componentWillReceiveProps(nextProps) {        
        if(this.props.match.params.kind !== nextProps.match.params.kind) {
            this.setState({category: nextProps.match.params.kind, isLoaded: false}, () => {
                this.loadData();
            });            
        }
    }

    loadData() {
        const {category} = this.state;

        const setNews = (news) => {
            this.setState({isLoaded: true, news});
        }

        window.client.getCategories((res) =>{
            if(res.includes(category)) {
                window.client.getArticlesByCategory(category, setNews);
            } else {
                window.client.getArticlesByKeyword(category, setNews);
            }
        });

       

        
    }

    render() {
        const {isLoaded, news} = this.state;

        return(
            <div className="Category page">
                {isLoaded
                ? news.map((n, i) => <Article key={i} src={n}></Article>)
                :<Loading></Loading>}
            </div>
        );
    }
}