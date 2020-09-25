import axios from 'axios';
import {
    AUTH_ERROR,
    GET_NEWS,
    CLEAR_NEWS,
    FILTER_NEWS
} from './types';

// NOT IN USE
export const getNews = (e) => async dispatch => {

    try {
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"Trending News",
            "safeSearch":"false"
            }
            })

            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
          });
          console.log(err)
    }
}
export const filterNewsByKeyword = (keyword) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios.get('https://newsapi.org/v2/everything?' +
          `q=${keyword}&` +
          'pageSize=50&' +
          'sortBy=relevancy&' +
          'apiKey=81ff8b3105cd407286c41a082f639c89');

          dispatch({
              type: GET_NEWS,
              payload: res.data.articles
          });

    } catch (err) {
        console.error(err);
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
          });
    }
}
//
export const filterByBBC = () => async dispatch => {

    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:BBC.com",
            "safeSearch":"false"
            }
            })
            console.log(res.data.value)

            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    } catch (err) {
        console.error(err);
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }
}
export const filterByCNN = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:cnn.com",
            "safeSearch":"false"
            }
            })
            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }
}
export const filterByFox = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:foxnews.com",
            "safeSearch":"false"
                }
            })
            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }  
}
export const filterByWashPo = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:washingtonpost.com",
            "safeSearch":"false"
            }
            })

            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }
}
export const filterByNY = () => async dispatch => {

    try {

        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:nytimes.com",
            "safeSearch":"false"
            }
            })
            dispatch({
                type: GET_NEWS,
                payload: res.data.value
             });
    
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }
}
export const filterByBlaze = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:theblaze.com",
            "safeSearch":"false"
            }
            })
            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }   
}
export const filterByIndependent = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
            "headers":{
                "content-type": "application/json; charset=utf-8",
                "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true,
            "server": "RapidAPI-1.2.6",
            "x-rapidapi-region": "AWS - us-west-2",
            "x-rapidapi-version": "1.2.6",
            "x-ratelimit-requests-limit": "500",
            "x-ratelimit-requests-remaining": "483"
            },"params":{
            "autoCorrect":"true",
            "pageNumber":"1",
            "pageSize":"50",
            "q":"site:independent.co.uk/us",
            "safeSearch":"false"
            }
            })
            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });   
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
        });
    }  
}
//remove any duplicate objects in an array based off of the second parameter passed in
export const getUnique = (arr, comparison) => {

    // store the comparison  values in array
    const unique =  arr.map(e => e[comparison])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);

return unique;
}