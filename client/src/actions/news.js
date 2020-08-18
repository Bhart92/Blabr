import axios from 'axios';
import {
    AUTH_ERROR,
    GET_NEWS,
    CLEAR_NEWS,
    FILTER_NEWS
} from './types';


// export const getNews = (e) => async dispatch => {

//     try {
//         const res = await axios({
//             "method":"GET",
//             "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
//             "headers":{
//             "content-type":"application/octet-stream",
//             "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
//             "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
//             "useQueryString":true
//             },"params":{
//             "autoCorrect":"false",
//             "pageNumber":"1",
//             "pageSize":"10",
//             "q":"Top News",
//             "safeSearch":"false"
//             }
//             })

//             dispatch({
//                type: GET_NEWS,
//                payload: res.data.value
//             });
//     } catch (err) {
//         dispatch({
//             type: AUTH_ERROR,
//             payload: { msg: 'something went wrong' }
//           });
//           console.log(err)
//     }
// }
export const filterNewsByKeyword = (keyword) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios.get('https://newsapi.org/v2/everything?' +
          `q=${keyword}&` +
          'pageSize=100&' +
          'sortBy=relevancy&' +
          'apiKey=81ff8b3105cd407286c41a082f639c89');

          dispatch({
              type: GET_NEWS,
              payload: res.data.articles,
              outlet: keyword
          });

    } catch (err) {
        console.error(err);
        dispatch({
            type: AUTH_ERROR,
            payload: { msg: 'something went wrong' }
          });
    }
}
export const filterByBBC = () => async dispatch => {

    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:BBC.com Top News",
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
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:cnn.com Top News",
            "safeSearch":"false"
            }
            })

            dispatch({
               type: GET_NEWS,
               payload: res.data.value
            });
    
    } catch (err) {
        console.error(err);
        // dispatch({
        //     type: AUTH_ERROR,
        //     payload: { msg: 'something went wrong' }
        // });
    }
    
}
export const filterByFox = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:foxnews.com Top News",
            "safeSearch":"false"
            }
            })

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
export const filterByWashPo = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:washingtonpost.com Top News",
            "safeSearch":"false"
            }
            })

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
export const filterByNY = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:nytimes.com Top News",
            "safeSearch":"false"
            }
            })

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
export const filterByBlaze = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:theblaze.com Top News",
            "safeSearch":"false"
            }
            })

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
export const filterByIndependent = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_NEWS
         });
        const res = await axios({
            "method":"GET",
            "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":"b80b7f5ba4msha721601e212bb87p13d871jsne41b690e5822",
            "useQueryString":true
            },"params":{
            "autoCorrect":"false",
            "pageNumber":"1",
            "pageSize":"10",
            "q":"site:nationalreview.com top news",
            "safeSearch":"false"
            }
            })

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