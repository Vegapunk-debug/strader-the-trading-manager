<div align="center">

# Strader 📈

### The Real-Time Crypto Arbitrage Monitor

> A full-stack application for monitoring Bitcoin arbitrage spreads between Binance and Kraken in real-time.

---

### ⚡ Built With NER Stack (Node, Express, React) ⚡

<p align="center">
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" /> </a>
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" /> </a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" /> </a>
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /> </a>
</p>

</div>

## Project Core

Strader is designed to identify "risk-free" profit opportunities by tracking price discrepancies across major crypto exchanges. It proves full-stack capability by handling high-frequency data fetching on the backend and visualizing complex financial data on the frontend.

## Essential Features

* **💵 Live Arbitrage Detection:** Instantly calculates price spreads between Binance and Kraken.
* **🚀 Real-Time Polling:** Fetches public market data every 3 seconds without rate limiting (CCXT).
* **📉 Spread Analysis:** Automatically highlights profitable trade scenarios (Green) vs losses (Red).
* **🌑 Financial Terminal UI:** A professional, matte-black dashboard optimized for data readability (Vanilla CSS).
* **📊 Net Profit Calculation:** Estimates real-world returns by accounting for exchange trading fees (0.2%).

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **Vite** (for frontend development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/strader.git
   cd client
   npm run dev: Starts the frontend development server.
   cd ..
   cd server
   npm start:  Starts the backend server.
   
