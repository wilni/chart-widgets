import './BestBidAsk.scss';

function BestBidAsk({ price, quantity, type, by }) {
    return (
        <div className='data-box'>
            <div className={`data-box__header data-box__header--${type === 'Ask' ? 'ask' : 'bid'}`}>
                <h4>{`Best ${type}:`}</h4>
            </div>
            <div className='data-box__content'>
                <div className='data-box__content-details data-box__content-details--left'>
                    <span className='data-box__content-info' >{price}</span>
                    <sub  className='data-box__content-sub'>{`${type} Price`}</sub>
                </div>
                <div className='data-box__content-details data-box__content-details--right'>
                <span className='data-box__content-info'>{quantity}</span>
                    <sub  className='data-box__content-sub'>{`${type} Quantity`}</sub>
                </div>
            </div>
        </div>
    )
}






export default BestBidAsk;