import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";


function Chart(props) {
    const { data, currentBar } = props;
    const chartContainerRef = useRef();
    const chart = useRef();
    const candleSeriesRef = useRef();

    useEffect(() => {

        const handleResize = () => {
            chart.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        chart.current = createChart(chartContainerRef.current, {
            timeScale: {
                visible: true,
                timeVisible: true,
                secondsVisible: true,
            },
            layout: {
                background: { type: ColorType.Solid, color: 'white' },
                textColor: 'black',
            },
            grid: {
                vertLines: {
                    color: 'rgba(127, 127, 127, 0.4)',
                },
                horzLines: {
                    color: 'rgba(127, 127, 127, 0.4)',
                },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            rightPriceScale: {
                visible: false,
            },
            leftPriceScale: {
                visible: true,
            },
        });

        chart.current.timeScale().fitContent();

        //candle data
        candleSeriesRef.current = chart.current.addCandlestickSeries({
            upColor: '#469dcb',
            downColor: '#f1b45b',
            borderDownColor: '#f1b45b',
            borderUpColor: '#469dcb',
            wickDownColor: '#f1b45b',
            wickUpColor: '#469dcb',
        });

        candleSeriesRef.current.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.current.remove();
        };

    }, [data]);


    //hook for updating 
    useEffect(() => {
        if (currentBar !== null) {
            candleSeriesRef.current.update(currentBar)
        }
    }, [currentBar])

    return <div ref={chartContainerRef} className="chart" />;
}

export default Chart;