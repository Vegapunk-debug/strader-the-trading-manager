const ccxt = require('ccxt');
const binance = new ccxt.binance();
binance.fetchTicker('BTC/USDT').then(res => console.log('success')).catch(err => console.error('fail:', err.message));
