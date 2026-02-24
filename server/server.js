const express = require('express')
const ccxt = require('ccxt')
const cors = require('cors')

const app = express()
const Port = process.env.PORT || 5001

app.use(cors())

const binance = new ccxt.binance({ 
    enableRateLimit: true,
    options: { 'defaultType': 'spot' } 
})

const kraken = new ccxt.kraken({ 
    enableRateLimit: true 
})

app.get('/api/arbitrage', async (req, res) => {
    const now = Date.now()
    
    if (cachedData && (now - lastFetchTime < 10000)) {
        return res.json(cachedData)
    }
    
    try {
        const symbol = 'BTC/USDT'

        const [binanceTicker, krakenTicker] = await Promise.all([
            binance.fetchTicker(symbol),
            kraken.fetchTicker(symbol)
        ])

        const binanceAsk = binanceTicker.ask
        const binanceBid = binanceTicker.bid
        const krakenAsk = krakenTicker.ask
        const krakenBid = krakenTicker.bid

        // 1 : Buy Kraken (Ask) -> Sell Binance (Bid)
        const spreadA = binanceBid - krakenAsk;
        const spreadPercentA = ((spreadA / krakenAsk) * 100 )

        // 2 : Buy Binance (Ask) -> Sell Kraken (Bid)
        const spreadB = krakenBid - binanceAsk;
        const spreadPercentB = ((spreadB / binanceAsk) * 100 )

        const responseData = {
            timestamp: new Date().toISOString(),
            prices: {
                binance: { ask: binanceAsk, bid: binanceBid },
                kraken: { ask: krakenAsk, bid: krakenBid }
            },
            scenarios: {
                A: {
                    direction: "Buy Kraken => Sell Binance",
                    buyPrice: krakenAsk,
                    sellPrice: binanceBid,
                    spread: spreadA,
                    spreadPercent: spreadPercentA
                },
                B: {
                    direction: "Buy Binance => Sell Kraken",
                    buyPrice: binanceAsk,
                    sellPrice: krakenBid,
                    spread: spreadB,
                    spreadPercent: spreadPercentB
                }
            }
        }
        cachedData = responseData
        lastFetchTime = now
        res.json(responseData)

    } catch (error) {
        if (cachedData) return res.json(cachedData)
        console.error('Arbitrage Fetch Error:', error.message)
        const status = error.message.includes('DDoS') ? 429 : 500
        res.status(status).json({ error: error.message || 'Failed to fetch market data' })
    }
});

app.get('/api/history', async (req, res) => {
    try {
        console.log("Fetching data...")

        const binanceHistory = await binance.fetchOHLCV(symbol, '1h', undefined, 24)
        const krakenHistory = await kraken.fetchOHLCV(symbol, '1h', undefined, 24)

        // const graphData = []
        const graphData = binanceHistory.map((candleB, i) => {
            const candleK = krakenHistory[i]
            if (!candleK) return null

            return {
                time: new Date(candleB[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                binance: candleB[4],
                kraken: candleK[4],
                spread: Math.abs(candleB[4] - candleK[4])
            }
        }).filter(item => item !== null)

        res.status(200).json(graphData)
    } catch (error) {
        console.error('History Fetch Error:', error.message)
        res.status(500).json({ error: "Failed to fetch history" });
    }
})


app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`)
})

