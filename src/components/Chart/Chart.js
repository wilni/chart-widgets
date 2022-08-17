import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";


function Chart(props) {
const {data} = props;
  const chartContainerRef = useRef();

  useEffect(() => {

    const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
        timeScale: {
            visible:true,
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
        rightPriceScale:{
            visible: false,
        },
          leftPriceScale: {
              visible: true,
          },
    });

    chart.timeScale().fitContent();
    console.log("chart log",chart);

    //candle data
    var candleSeries = chart.addCandlestickSeries({
        upColor: '#469dcb',
        downColor: '#f1b45b',
        borderDownColor: '#f1b45b',
        borderUpColor: '#469dcb',
        wickDownColor: '#f1b45b',
        wickUpColor: '#469dcb',
      });

      candleSeries.setData(data);


    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
    };

  }, [data]);

  return <div ref={chartContainerRef} className="chart" />;
}

export default Chart;