import './App.scss';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import LadderView from './components/LadderView/LadderView.js';
import BestBidAsk from './components/BestBidAsk/BestBidAsk.js';
import Chart from './components/Chart/Chart.js';
const timestamp = require('unix-timestamp');
timestamp.round = true;

function App() {
  const currencies = ['BTC-USD', 'ETH-USD', 'BCH-USD', 'LTC-USD'];
  // state for selected currency pair, price and history
  const [pair, setPair] = useState('BTC-USD');
  const [pairHistory, setPairHistory] = useState([]);
  const [timeFrame, setTimeFrame] = useState('60');
  const [currentBar, setCurrentBar] = useState(null);
  const ws = useRef(null);

  //state for best bid and ask and thier quantity
  const [bestAsk, setBestAsk] = useState('0.00');
  const [bestBid, setBestBid] = useState('0.00');
  const [bestBidQty, setBestBidQty] = useState('0.00');
  const [bestAskQty, setBestAskQty] = useState('0.00');

  let msg = {
    "type": "subscribe",
    "channels": [
      {
        "name": "ticker_batch",
        "product_ids": [
          `${pair}`,
        ]
      }
    ]
  };

  //hook for initial render 
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    ws.current.addEventListener('open', function (event) {
      console.log('connected to Coinbase Websocket API');
      ws.current.send(JSON.stringify(msg));
    });

    ws.current.addEventListener('message', function (event) {
      // let priceData = JSON.parse(event.data);
      //update candle data to add live ticks
      // console.log("price data", priceData);

      // if(priceData.type === "ticker"){
      //   let ticker = {
      //     time: timestamp.fromDate(priceData.time),
      //     high: priceData.high_24h,
      //     low: priceData.low_24h,
      //     open: priceData.open_24h,
      //     close: priceData.low_24h
      //   }
      //   setCurrentBar(ticker)
      // }
    });
  }, [])


  // hook to render and set chart data
  useEffect(() => {
    axios.get(`https://api.exchange.coinbase.com/products/${pair}/candles/?granularity=${timeFrame}`)
      .then(res => {
        let data = res.data;
        data = data.map(el => {
          return (
            {
              time: el[0],
              low: el[1],
              high: el[2],
              open: el[3],
              close: el[4]
            }
          )
        }).sort((x, y) => {
          return x.time - y.time;
        })
        setPairHistory(data);
      })
  }, [pair, timeFrame])

  // hook to update best bid/ ask real-time
  useEffect(() => {
    axios.get(`https://api.exchange.coinbase.com/products/${pair}/book`)
      .then(res => {
        setBestBid(res.data.bids[0][0]);
        setBestBidQty(res.data.bids[0][1]);
        setBestAsk(res.data.asks[0][0]);
        setBestAskQty(res.data.asks[0][1]);
      })
  })

  const handleTimeChange = (e) => {
    setTimeFrame(e.target.value)
  }
  const handlePairChange = (e) => {
    setPair(e.target.value)
  }

  return (
    <main className="App">
      <section className='content'>
        <nav className='content__nav'>
          <span className='content__label'>Real Time Chart</span>
          <select name="pairs" id="pair-select" className='content__dropdown' onChange={handlePairChange}>
            {currencies.map((el, idx) => {
              return (
                <option key={idx} value={el}>{el}</option>
              )
            })}
          </select>
          <select name="timeFrames" id="time-select" className='content__dropdown' onChange={handleTimeChange}>
            <option value="60">1m</option>
            <option value="300">5m</option>
            <option value="900">15m</option>
            <option value="3600">1h</option>
            <option value="21600">6h</option>
            <option value="86400">1d</option>
          </select>
        </nav>
        <div className='bestBidAsk'>
          <BestBidAsk type="Bid" price={bestBid} quantity={bestBidQty}  />
          <BestBidAsk type="Ask" price={bestAsk} quantity={bestAskQty}  />
        </div>
        <Chart data={pairHistory} currentBar={currentBar} />
      </section>
      <LadderView className="aside" pair={pair} />
    </main>
  );
}

export default App;
