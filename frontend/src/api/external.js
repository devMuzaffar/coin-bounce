import axios from "axios";

// 
// from newsAPI.org - everything
// 
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&pageSize=15&apiKey=${NEWS_API_KEY}`;

export const getNews = async () => {
    let response;
    try {
        response = await axios.get(NEWS_API_ENDPOINT);
        response = response.data.articles;
    } catch (error) {
        return error;
    }
    return response;
}



// 
// CoinGecko Market Coins List
// 

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const COINGECKO_API_ENDPOINT = "https://api.coingecko.com/api/v3/coins/markets";
const cgOptions = {
    params: {vs_currency: 'usd', per_page: '10'},
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': COINGECKO_API_KEY
    }
};

export const getCrypto = async () => {
    let response;
    try {
        response = await axios.get(COINGECKO_API_ENDPOINT, cgOptions);
        response = response.data;
    } catch (error) {
        return error;
    }
    return response;
}