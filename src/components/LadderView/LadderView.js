import './LadderView.scss';
import { useState } from 'react';
import axios from 'axios';

function LadderView() {
    const [aggregate, setAggregate] = useState('0.01');
    const [bids, setBids] = useState([
        [
            "24362.63",
            "0.0008475",
            2
        ],
        [
            "24360.32",
            "0.00038423",
            1
        ]]);
    const [asks, setAsks] = useState([
        [
            "24362.63",
            "0.0008475",
            2
        ],
        [
            "24360.32",
            "0.00038423",
            1
        ]]);


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
                    {asks.map(ask => {
                        return (
                            <div className='ladder-view__row'>
                                <p className='ladder-view__nav-item'>{ask[1]}</p>
                                <p className='ladder-view__nav-item ladder-view__nav-item--ask'>{ask[0]}</p>
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
                {bids.map(bid => {
                        return (
                            <div className='ladder-view__row'>
                                <p className='ladder-view__nav-item'>{bid[1]}</p>
                                <p className='ladder-view__nav-item ladder-view__nav-item--bid'>{bid[0]}</p>
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
                    <button className='btn'>+</button>
                </div>
            </div>

        </aside>
    )
}



export default LadderView;