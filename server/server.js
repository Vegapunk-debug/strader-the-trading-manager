const express = require('express')
const ccxt = require('ccxt')
const cors = require('cors')

const app = express()
const Port = process.env.PORT || 5001

app.use(cors())

const binance = new ccxt.binance()
const kraken = new ccxt.kraken()

app.get('/api/arbitrage', async (req, res) => {
    try {
        const [binanceTicker, krakenTicker] = await Promise.all([
            binance.fetchTicker('BTC/USDT'),
            kraken.fetchTicker('BTC/USDT')
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
        res.json(responseData)

    } catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: 'Failed to fetch market data' })
    }
});


app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
})

