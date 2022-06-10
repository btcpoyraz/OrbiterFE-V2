import Axios from '../utils/Axios'
Axios.axios()

const nowMakerList = [
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 1,
    c2ID: 2,
    c1Name: 'mainnet',
    c2Name: 'arbitrum',
    t1Address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    t2Address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 3,
    c2TradingFee: 12,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 1,
    c2ID: 3,
    c1Name: 'mainnet',
    c2Name: 'zksync',
    t1Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    t2Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2.5,
    c2TradingFee: 12,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 1,
    c2ID: 6,
    c1Name: 'mainnet',
    c2Name: 'polygon',
    t1Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    t2Address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 12,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 1,
    c2ID: 7,
    c1Name: 'mainnet',
    c2Name: 'optimism',
    t1Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    t2Address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2.5,
    c2TradingFee: 12,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 2,
    c2ID: 3,
    c1Name: 'arbitrum',
    c2Name: 'zksync',
    t1Address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    t2Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 3,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 2,
    c2ID: 6,
    c1Name: 'arbitrum',
    c2Name: 'polygon',
    t1Address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    t2Address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 1.5,
    c2TradingFee: 3,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 2,
    c2ID: 7,
    c1Name: 'arbitrum',
    c2Name: 'optimism',
    t1Address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    t2Address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 3,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 6,
    c2ID: 3,
    c1Name: 'polygon',
    c2Name: 'zksync',
    t1Address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    t2Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 1.5,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 7,
    c2ID: 3,
    c1Name: 'optimism',
    c2Name: 'zksync',
    t1Address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    t2Address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 2,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
  {
    makerAddress: '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
    c1ID: 6,
    c2ID: 7,
    c1Name: 'polygon',
    c2Name: 'optimism',
    t1Address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    t2Address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    tName: 'USDT',
    c1MinPrice: 0.1,
    c1MaxPrice: 1000,
    c2MinPrice: 0.1,
    c2MaxPrice: 1000,
    precision: 6,
    c1AvalibleDeposit: 1000,
    c2AvalibleDeposit: 1000,
    c1TradingFee: 2,
    c2TradingFee: 1.5,
    c1GasFee: 0.5,
    c2GasFee: 0.5,
    c1AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
    c2AvalibleTimes: [
      {
        startTime: 1654790400,
        endTime: 99999999999999,
      },
    ],
  },
]

export default {
  getMakerInfo: function (req, next) {
    return new Promise((resolve, reject) => {
      var res = {}
      res.code = 0
      res.data = nowMakerList
      if (next) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  },
  getAllMakerList: function (req, next) {
    return new Promise((resolve, reject) => {
      var res = {}
      res.code = 0
      res.data = []
      // push now makerList
      res.data = res.data.concat(nowMakerList)

      if (next) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  },
}
