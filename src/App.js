import './App.scss';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import LadderView from './components/LadderView/LadderView.js';
import BestBidAsk from './components/BestBidAsk/BestBidAsk.js';
import Chart from './components/Chart/Chart.js';

const data = [
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  { time: "2019-04-13", value: 76.64 },
  { time: "2019-04-14", value: 81.89 },
  { time: "2019-04-15", value: 74.43 },
  { time: "2019-04-16", value: 80.01 },
  { time: "2019-04-17", value: 96.63 },
  { time: "2019-04-18", value: 76.64 },
  { time: "2019-04-19", value: 81.89 },
  { time: "2019-04-20", value: 74.43 }
]


function App() {
// state for selected currency pair, price and history
const [currencies, setCurrencies] = useState([]);
const [pair, setPair] = useState('ETH-USD');
const [price, setPrice] = useState(() => '0.00');
const [pairHistory, setPairHistory] = useState([]);
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
          "name": "ticker",
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
  console.log('Successfully connected to Coinbase Websocket API!');
  ws.current.send(JSON.stringify(msg));
});

ws.current.addEventListener('message', function (event) {
  let priceData = JSON.parse(event.data);
  console.log("price data",priceData.price);
  setPrice(priceData.price)
});
}, [])


// hook to render order book info into top of book
useEffect(() => {
  axios.get(`https://api.exchange.coinbase.com/products/${pair}/book`)
  .then(res => {
    console.log('res form order book', res.data)
    console.log('res form order book 2', res.data.bids[0], res.data.asks[0])
    setBestBid(res.data.bids[0][0]);
    setBestBidQty(res.data.bids[0][1]);
    setBestAsk(res.data.asks[0][0]);
    setBestAskQty(res.data.asks[0][1]);
  })

  axios.get(`https://api.coinbase.com/v2/prices/${pair}/historic`)
  .then(res => {
    let data = res.data.data.prices
    let parsedData = data.map(el => {
      console.log('el', el)
      let timeStr = el.time.split("").splice(0,10).join('') //+ " " + el.time.split("").splice(11,5).join('');
      return {
        time: timeStr,
        price: el.price
      }
    })
    setPairHistory(data);
    console.log("console from price history",parsedData);
  })
}, [pair])


  return (
    <main className="App">
      <section className='content'>
          <nav className='content__nav'>
            <span className='content__label'>Real Time Chart</span>
          <select name="pairs" id="pair-select" className='content__dropdown'>
                <option value="">--Please choose an option--</option>
                <option value="BTC">BTC-USD</option>
                <option value="ETH">ETH-USD</option>
                <option value="LTC">LTC-USD</option>
                <option value="BCH">BCH-USD</option>
            </select>
          </nav>
          <div className='bestBidAsk'> 
            <BestBidAsk type="Bid" price={bestBid} quantity={bestBidQty} by={'itbit'} />
            <BestBidAsk type="Ask" price={bestAsk} quantity={bestAskQty} by={'kraken'} />
          </div>
          <Chart data={pairHistory}/>
      </section>
      <LadderView className="aside"/>
    </main>
  );
}

export default App;
