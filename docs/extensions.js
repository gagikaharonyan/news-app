window.client = (function() {

    function getCategories(onsuccess) {
        const res = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
        setTimeout(() => {onsuccess(res)}, 100);
    }

    function getArticlesByKeyword(keyword, onsuccess) {
        fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=ed74f76935cf4ce7be01835ea02bbaa3`, {
            headers: {
              Accept: 'application/json'
            }})
        .then((res) => {
            if (res.status === 426) {
                setTimeout(() => {onsuccess(filterResult(customRes, 'title', 'urlToImage'));}, 100);
            } else {
                return checkStatus(res);
            }
            
        }, 
        () => {
            setTimeout(() => {onsuccess(filterResult(customRes, 'title', 'urlToImage'));}, 100);
        })
        .then(parseJSON)
        .then((res) => {
            onsuccess(filterResult(res.articles, 'title', 'urlToImage'));
        });
    }

    function getArticlesByCategory(category, onsuccess) {
        fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=ed74f76935cf4ce7be01835ea02bbaa3`, {
            headers: {
              Accept: 'application/json'
            }})
        .then((res) => {
            if (res.status === 426) {
                setTimeout(() => {onsuccess(filterResult(customRes, 'title', 'urlToImage'));}, 100);
            } else {
                return checkStatus(res);
            }
        }, 
        () => {
            setTimeout(() => {onsuccess(filterResult(customRes, 'title', 'urlToImage'));}, 100);
        })
        .then(parseJSON)
        .then((res) => {
           onsuccess(filterResult(res.articles, 'title', 'urlToImage'));
        });
        
        
    }

    function filterResult (res, comp, notNull) {
        function getUnique(arr, comp) {
            const unique =  arr.map(e => e[comp])
                .map((e, i, final) => final.indexOf(e) === i && i)
                .filter((e) => arr[e]).map(e => arr[e]);
            return unique;
        }
    
        return getUnique(res, comp).filter((i) => i[notNull])
    }
 
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 426) {
            response.body.customRes
            return response;
        } else {
          const error = new Error(`HTTP Error ${response.statusText}`);
          error.status = response.statusText;
          error.response = response;
          console.log(error);
          throw error;
        }
    }

    function parseJSON(response) {
        return response.json();
    }
    
    return {
        getCategories,
        getArticlesByKeyword,
        getArticlesByCategory
    }
})();


