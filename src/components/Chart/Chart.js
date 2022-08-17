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
            timeVisible: true,
        secondsVisible: false,
        },
        layout: {
            background: { type: ColorType.Solid, color: 'white' },
            textColor: 'black',
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

    const lineSeries = chart.addLineSeries({color: '#469dcb'});
    lineSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
    };

  }, [data]);

  return <div ref={chartContainerRef} className="chart" />;
}

export default Chart;