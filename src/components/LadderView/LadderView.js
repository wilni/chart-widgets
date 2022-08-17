import './LadderView.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function LadderView({pair}) {
    const [aggregate, setAggregate] = useState('0.01');
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);

    const loadOrderBook = () => {
        axios.get(`https://api.exchange.coinbase.com/products/${pair}/book?level=2`)
        .then(res => {
            let bids = res.data.bids.slice(0,11);
            let asks = res.data.asks.slice(0,11);
            setBids(bids);
            setAsks(asks);
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        setAggregate(prevAgg => {
            if(prevAgg === '0.01'){
                setAggregate('0.05');
            }else if(prevAgg === '0.05'){
                setAggregate('0.10')
            }else{
                setAggregate('0.01')
            }
        })
    }

    useEffect(() => {
        let intervalID;
        loadOrderBook();
        intervalID = setInterval(() => {
            loadOrderBook();
        }, 5000)

        return () => {clearInterval(intervalID)}
    },[pair] )


    return (
        <aside className='ladder-view'>
            <div className='ladder-view__title-holder'>
                <h3 className='ladder-view__title'>Order Book</h3>
            </div>
            <div className='ladder-view__asks'>
                <div className='ladder-view__nav'>
                    <p className='ladder-view__nav-item'>Market Size</p>
                    <p className='ladder-view__nav-item'>Price</p>
                    <p className='ladder-view__nav-item ladder-view__nav-item-last'>My Size</p>
                </div>
                <div className='ladder-view__data'>
                    {asks.map((ask, idx) => {
                        let prices = ask[0].split('.');
                        let size = ask[1].includes('.') ? ask[1].split('.'): ask[1]+".0000";
                        return (
                            <div key={idx} className='ladder-view__row'>
                                <p className='ladder-view__nav-item'>{typeof(size) === "object" ? size[0] +"."+ size[1].split("").slice(0,5).join("") : size}</p>
                                <p className='ladder-view__nav-item ladder-view__nav-item--ask'>{prices[0]}
                                    <span className='ladder-view__nav-item--ask--decimal'>.{prices[1]? prices[1].length === 1? prices[1]+'0': prices[1]: "00"}</span>
                                </p>
                                <p className='ladder-view__nav-item ladder-view__nav-item-last'>-</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='ladder-view__bids'>
                <div className='ladder-view__nav'>
                    <p className='ladder-view__nav-item'>USD Spread</p>
                    <p className='ladder-view__nav-item'>{aggregate}</p>
                    <p className='ladder-view__nav-item ladder-view__nav-item-last'></p>
                </div>
                <div className='ladder-view__data'>
                    {bids.map((bid, idx) => {
                        let prices = bid[0].split('.');
                        let size = bid[1].includes('.') ? bid[1].split('.'): bid[1] + ".0000";
                        return (
                            <div key={idx} className='ladder-view__row'>
                                <p className='ladder-view__nav-item'>{typeof(size) === "object" ? size[0] +"."+ size[1].split("").slice(0,5).join("") : size}</p>
                                <p className='ladder-view__nav-item ladder-view__nav-item--bid'>{prices[0]}
                                    <span className='ladder-view__nav-item--bid--decimal'>.{prices[1]? prices[1].length === 1? prices[1]+'0': prices[1]: "00"}</span>
                                </p>
                                <p className='ladder-view__nav-item ladder-view__nav-item-last'>-</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='ladder-view__nav ladder-view__nav--footer'>
                <p className='ladder-view__nav-item'>Aggregation</p>
                <p className='ladder-view__nav-item'>{aggregate}</p>
                <div className='ladder-view__nav-item ladder-view__nav-item-last'>
                    <button onClick={handleClick} className='btn'>+</button>
                </div>
            </div>

        </aside>
    )
}



export default LadderView;