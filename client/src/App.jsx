import { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './assets/logo.png'
import './App.css'
import Chart from './components/Chart'

function App() {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [historyData, setHistoryData] = useState([])


  useEffect(() => {
    let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
    API_URL = API_URL.replace(/\/$/, '')
  
    const fetchLive = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/arbitrage`)
        setData(res.data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch live data')
      }
    }
  
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/history`)
        setHistoryData(res.data)
      } catch (err) {
        console.error(err)
      }
    }
  
    fetchLive()
    fetchHistory() 
  
    const interval = setInterval(fetchLive, 3000)
    return () => clearInterval(interval)
  }, [])
  
  // useEffect(() => {

  //   const fetchData = async () => {

  //     try {
  //       let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  //       API_URL = API_URL.replace(/\/$/, '')
  //       API_URL = API_URL.replace(/\/api\/arbitrage$/, '')

  //       const [liveRes, historyRes] = await Promise.all([
  //         axios.get(`${API_URL}/api/arbitrage`),
  //         axios.get(`${API_URL}/api/history`)
  //       ]);

  //       setData(liveRes.data)
  //       setHistoryData(historyRes.data)
  //       setError(null)
  //     }
  //     catch (err) {
  //       console.error(err)
  //       setError('Failed to fetch data. Check the console !!!')
  //     }
  //   }

  //   fetchData()

  //   const interval = setInterval(fetchData, 3000)
  //   return () => clearInterval(interval)
  // }, [])

  if (error)
    return <div className="screen-center error">{error}</div>
  if (!data)
    return <div className="screen-center loading">INITIALIZING FEED...</div>

  return (
    <div className="dashboard">
      <header>
        <img src={logo} alt="Strader Logo" className="logo" />
        <div className="status-indicator">
          <span className="blink">●</span> LIVE
        </div>
        <div className="timestamp">
          UPTIME: {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      </header>

      <div className="ticker-tape">
        <span className="ticker-label">BTC/USDT {'>>'} </span>
        <span className="exchange-price">BINANCE: <span className="price">${data.prices.binance.ask}</span></span>
        <span className="separator">|</span>
        <span className="exchange-price">KRAKEN: <span className="price">${data.prices.kraken.ask}</span></span>
      </div>

      <div className="cards-container">
        <ArbitrageCard scenario={data.scenarios.A} label="SCENARIO A" />
        <ArbitrageCard scenario={data.scenarios.B} label="SCENARIO B" />
      </div>

      {historyData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">BINANCE VS KRAKEN PRICES (24H)</h3>
          <div className="chart-wrapper">
            <Chart data={historyData} />
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Strader. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/Vegapunk-debug" target="_blank" rel="noreferrer">GitHub</a>
          <span className="separator">•</span>
          <a href="https://www.linkedin.com/in/rohit-nair-p-7a535b251/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

function ArbitrageCard({ scenario, label }) {
  const isSpreadPositive = scenario.spread > 0;
  const netProfitPercent = scenario.spreadPercent - 0.2;
  const isNetProfitable = netProfitPercent > 0;

  return (
    <div className={`card ${isSpreadPositive ? 'border-green' : 'border-red'}`}>
      <div className="card-header">
        <h2>{label}</h2>
        <span className={`badge ${isSpreadPositive ? 'bg-green' : 'bg-red'}`}>
          {isSpreadPositive ? 'OPPORTUNITY' : 'NO SPREAD'}
        </span>
      </div>

      <div className="direction">{scenario.direction}</div>

      <div className="stats-grid">
        <div className="stat-item">
          <label>BUY AT</label>
          <div className="value">${scenario.buyPrice}</div>
        </div>
        <div className="stat-item">
          <label>SELL AT</label>
          <div className="value">${scenario.sellPrice}</div>
        </div>
        <div className="stat-item full-width">
          <label>GROSS SPREAD</label>
          <div className={`value ${isSpreadPositive ? 'text-green' : 'text-red'}`}>
            ${scenario.spread.toFixed(2)} ({scenario.spreadPercent.toFixed(3)}%)
          </div>
        </div>

        <div className="stat-item full-width net-profit-box">
          <label>NET PROFIT (Est. Fees 0.2%)</label>
          <div className={`value large ${isNetProfitable ? 'text-neon-green' : 'text-neon-red'}`}>
            {netProfitPercent.toFixed(4)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
