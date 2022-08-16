import './App.scss';
import LadderView from './components/LadderView/LadderView.js';
import BestBidAsk from './components/BestBidAsk/BestBidAsk.js';

function App() {
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
            <BestBidAsk type="Bid" price={'43979.000000'} quantity={'0.01058'} by={'itbit'} />
            <BestBidAsk type="Ask" price={'4396.4000000'} quantity={'0.02500000'} by={'kraken'} />
          </div>
      </section>
      <LadderView className="aside"/>
    </main>
  );
}

export default App;
