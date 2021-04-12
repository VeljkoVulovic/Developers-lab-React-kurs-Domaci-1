import React, { useState } from "react";
import axios from "axios";

function App() {
  const [values, setValues] = useState({
    amount: "",
    from: "EUR",
    to: "USD",
  });
  const [resultExchange, setResultExchange] = useState("");
  const [subbmitted, setSubbmited] = useState(false);
  const [valid, setValid] = useState(false);

  const handleChange = (event) => {
    setValid(false);
    let name = event.target.name;
    let value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.amount > 0) {
      setValid(true);
      const options = {
        method: "GET",
        url: "https://currency-converter5.p.rapidapi.com/currency/convert",
        params: {
          format: "json",
          from: values.from,
          to: values.to,
          amount: values.amount,
        },
        headers: {
          "x-rapidapi-key":
            "11c8762c0dmsh3db27c847867a79p195e47jsne624e421a65f",
          "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then((response) => {
          setResultExchange(response.data.rates[values.to].rate_for_amount);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    setSubbmited(true);
  };

  return (
    <div className="App text-center">
      <div className="container convertor shadow-lg mb-4 mt-5">
        <h1 className="pt-3">
          <i>Convertor</i>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <input
                className="form-control mt-3"
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="Input amount"
              />
              {subbmitted && !values.amount ? (
                <div>
                  <small className="text-danger">You must input amount</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <label>From:</label>
              <select
                className="mb-2 custom-select"
                name="from"
                value={values.from}
                onChange={handleChange}
              >
                <option value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="GBP">British Pound</option>
                <option value="RUB">Russian Ruble</option>
                <option value="JPY">Japanese Yen</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label>To:</label>
              <select
                className="mb-2 custom-select"
                name="to"
                value={values.to}
                onChange={handleChange}
              >
                <option value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="GBP">British Pound</option>
                <option value="RUB">Russian Ruble</option>
                <option value="JPY">Japanese Yen</option>
              </select>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <button id="submit" className="btn btn-info mt-3 mb-3">
            Convert
          </button>
        </form>
      </div>
      {subbmitted && valid ? (
        <div className="container w-50">
          <div className="shadow-lg pt-2 pb-2 result">
            {values.amount} ({values.from}) --&gt; {resultExchange} ({values.to}
            )
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
