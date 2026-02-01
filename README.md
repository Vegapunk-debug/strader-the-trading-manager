<div align="center">

# Strader 📈

### The Real-Time Crypto Arbitrage Monitor

> A high-frequency financial dashboard for monitoring Bitcoin arbitrage spreads between Binance and Kraken.

<br />

<p align="center">
  <a href="https://reactjs.org/" target="_blank"> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" /> </a>
  <a href="https://nodejs.org/en/" target="_blank"> <img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" /> </a>
  <a href="https://expressjs.com/" target="_blank"> <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" /> </a>
  <a href="https://vitejs.dev/" target="_blank"> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /> </a>
  <a href="https://github.com/ccxt/ccxt" target="_blank"> <img src="https://img.shields.io/badge/CCXT-Library-black?style=for-the-badge" alt="CCXT" /> </a>
</p>

[View Live Demo](https://strader-the-trading-manager.vercel.app/) · [Report Bug](https://github.com/Vegapunk-debug/strader/issues) · [Request Feature](https://github.com/Vegapunk-debug/strader/issues)

</div>

---

## Project Overview

**Strader** is a quantitative finance tool designed to identify "risk-free" profit opportunities by tracking price discrepancies across major crypto exchanges. Unlike standard trackers, Strader focuses on the **execution reality** of arbitrage—accounting for bid/ask spreads and exchange fees to calculate the *true* net profit.

This project demonstrates full-stack capability by handling high-frequency data fetching on the backend (using CCXT) and visualizing complex financial data on a React frontend with low latency.

### Key Features
* **Real-Time Arbitrage Detection:** Polls market data every 3 seconds to capture fleeting price differences.
* **Bid/Ask Spread Analysis:** Calculates spreads based on actual order book depth (Ask vs. Bid), not just last traded price.
* **Net Profit Estimation:** Automatically deducts a 0.2% trading fee (0.1% buy + 0.1% sell) to show realistic ROI.
* **24-Hour History:** Visualizes spread volatility over time using OHLCV data.
* **Financial Terminal UI:** A professional, dark-mode dashboard designed for long-session monitoring.

---

## The Arbitrage Model (Math)

To ensure trading viability, Strader uses the following logic to detect opportunities between Binance and Kraken:

**1. Identification:**
We monitor two scenarios simultaneously:
* **Scenario A:** Buy on Kraken ($Ask_{Kr}$) $\to$ Sell on Binance ($Bid_{Bn}$)
* **Scenario B:** Buy on Binance ($Ask_{Bn}$) $\to$ Sell on Kraken ($Bid_{Kr}$)

**2. Gross Spread Calculation:**
$$Spread = P_{Bid}^{SellingExchange} - P_{Ask}^{BuyingExchange}$$

**3. Net Profit (ROI):**
To filter out "fake" opportunities where fees eat the profit, we apply a standard 0.2% fee model:
$$Net\% = \left( \frac{Spread}{BuyPrice} \times 100 \right) - 0.2\%$$

*If $Net\% > 0$, the dashboard highlights the opportunity in **Neon Green**.*

---

## Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | High-performance UI with fast HMR |
| **Styling** | Vanilla CSS3 | Custom "Financial Terminal" theme |
| **Backend** | Node.js + Express | REST API handling |
| **Data Feed** | CCXT | Unified API for crypto exchanges |
| **Deployment** | Vercel (FE) / Render (BE) | CI/CD Pipeline |

---
```bash
strader/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Chart, Cards, UI Elements
│   │   ├── App.jsx         # Main Logic & State
│   │   └── App.css         # Dashboard Styling
│   └── .env                # API Endpoint Config
│
└── server/                 # Express Backend
    ├── index.js            # API Routes & CCXT Logic
    └── package.json        # Dependencies
```
    
## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* **Node.js** (v16 or higher)
* **npm** (Node Package Manager)

### Installation

**1. Clone the Repository**
```bash
git clone [https://github.com/Vegapunk-debug/strader.git](https://github.com/Vegapunk-debug/strader.git)
cd strader
cd server
npm install
npm start
cd client
npm install
# In client/.env
VITE_API_URL=http://localhost:5001
