import React, { useState, useEffect } from 'react';
import countryList from './countryList'; 

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${fromCurrency.toLowerCase()}.json`);
      const data = await response.json();
      const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
      setExchangeRate(rate);
    } catch (error) {
      console.error("Fetch error: ", error);
      setMessage("Failed to fetch exchange rate. Please try again.");
    }
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (exchangeRate) {
      const finalAmount = amount * exchangeRate;
      setMessage(`${amount} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`);
    }
  };

  const updateFlag = (currency) => {
    return `https://flagsapi.com/${countryList[currency]}/flat/64.png`;
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form onSubmit={handleConvert}>
        <div className="amount">
          <p>Enter Amount</p>
          <input type="number" placeholder="Enter your amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              <img src={updateFlag(fromCurrency)} alt={`${fromCurrency} flag`} />
              <select name="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {Object.keys(countryList).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <div className="to">
            <p>To</p>
            <div className="select-container">
              <img src={updateFlag(toCurrency)} alt={`${toCurrency} flag`} />
              <select name="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {Object.keys(countryList).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="msg">{message}</div>
        <button type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default CurrencyConverter;
