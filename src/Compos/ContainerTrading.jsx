import React, {useState, useEffect} from 'react'
import './index.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from "axios"


const ContainerTrading = () => {

  const [activeCrypto, setActiveCrypto] = useState('bitcoin');
  const [loader, setLoader] = useState(false);
  const [updateEffect, setupdateEffect] = useState(false);
  const [chartData, setChartData] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setupdateEffect(!updateEffect);
    }, 1000); 
    return () => {
      clearInterval(intervalId);
    };
  }, [updateEffect]);

  const cryptocurrencies = [
    { name: 'bitcoin', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png' },
    { name: 'ethereum', icon: 'https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png' },
    { name: 'binancecoin', icon: 'https://w7.pngwing.com/pngs/1007/775/png-transparent-bnb-cryptocurrencies-icon.png' },
    { name: 'solana', icon: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' }
  ];

  const handleClickCrypto = (crypto) => {
    setActiveCrypto(crypto);
  };
  

  const fetchData = async (crypto) => {
    try {
      setLoader(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '30'
        },
      });
      setChartData(response.data.prices);
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoader(false);
    }
  };



  useEffect(() => {
    fetchData(activeCrypto);
  }, [activeCrypto]);



  return (
    <div className='ContainerTrading'>
        <div className="hojid">
        {
          window.innerWidth > 500 ? (
            <>
            {cryptocurrencies.map((crypto) => (
            <button
              key={crypto.name}
              onClick={() => handleClickCrypto(crypto.name)}
              className={activeCrypto === crypto.name ? `${crypto.name} addColor${crypto.name}` : crypto.name}
            >
              <img src={crypto.icon} alt={crypto.name} /> {crypto.name}
            </button>
          ))}
            </>
          ) : (
            <>
            {cryptocurrencies.map((crypto) => (
            <button
              key={crypto.name}
              onClick={() => handleClickCrypto(crypto.name)}
              className={activeCrypto === crypto.name ? `${crypto.name} nowidht addColor${crypto.name}` : `${crypto.name} nowidht`}
            >
              <img src={crypto.icon} alt={crypto.name} /> 
            </button>
          ))}
            </>
          )
        }
        </div>
        <div className="chart-container">
          {chartData.length > 0 && (
            <ResponsiveContainer className="zojqd" width="94%" height="94%">
              {!loader ? (
                <LineChart data={chartData} className='idk' >
                  <CartesianGrid strokeDasharray="1 4" className='zojqdfls'/>
                  <XAxis hide={true} /> 
                  <YAxis
                    domain={['dataMin', 'dataMax']}
                    ticks={['dataMin', 'dataMax']}
                  />
                  <Tooltip />
                  <Line type="step" dataKey="1" stroke="blueviolet" dot={false} />
                </LineChart>
              ) : (
                <div className="LoaderComponent">Loading Chart...</div>
              )}
            </ResponsiveContainer>
          )}
        </div>
    </div>
  )
}

export default ContainerTrading