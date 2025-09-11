import { USDMClient } from 'binance';


const API_KEY = 'ixdXvqni0TsSpwFThki6Rd7YPEMn0aHj0opux4wGBWI5ZZ0YeVopxS4pah2PY3xd';
const API_SECRET = 'DVguRPa7IQTy5tCmFzSsJhFvHzGf5xbabGHYccNegafDOumb24VoC5VrKF5ezB38';

const client = new USDMClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
  // Connect to testnet environment
  // testnet: true,
});

// client
//   .getBalance()
//   .then((result) => {
//     console.log('getBalance result: ', result);
//   })
//   .catch((err) => {
//     console.error('getBalance error: ', err);
//   });

// client
//   .submitNewOrder({
//     side: 'SELL',
//     symbol: 'MEMEUSDT',
//     type: 'MARKET',
//     quantity: 1800,
//     priceProtect: true,
//   })
//   .then((result) => {
//     console.log('submitNewOrder result: ', result);
//   })
//   .catch((err) => {
//     console.error('submitNewOrder error: ', err);
//   });

// client
//   .getPositionsV3({
//     symbol: 'MEMEUSDT',
//   })
//   .then((result) => {
//     console.log('getOpenOrders result: ', result);
//   })
//   .catch((err) => {
//     console.error('getOpenOrders error: ', err);
//   });

client
  .getSymbolPriceTickerV2 ({
    symbol: 'MEMEUSDT',
  })
  .then((result) => {
    console.log('getOpenOrders result: ', result);
  })
  .catch((err) => {
    console.error('getOpenOrders error: ', err);
  });

