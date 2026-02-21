const ccxt = require('ccxt');
const binanceus = new ccxt.binanceus();
binanceus.fetchTicker('BTC/USDT').then(res => console.log('success binanceus:', res.last)).catch(err => console.error('fail:', err.message));
