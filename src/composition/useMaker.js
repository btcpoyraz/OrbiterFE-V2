import { ref, reactive } from './'

const defaultMakerDataStatus = {
    nodeList: [
        {
            localUintID: 1,
            time: '2022 Feb 15',
            margin: 35,
            totalRevenue: 1.235,
            APR: 56.12,
            previous_day: 0.535,
            last_ts: '15h ago',
            balanceList: [
                {
                    localChainID: 1,
                    balance: {
                        eth: 26.35,
                        usdc: 0,
                        usdt: 0
                    }
                },
                {
                    localChainID: 2,
                    balance: {
                        eth: 26.35,
                        usdc: 0,
                        usdt: 0
                    }
                },
            ],
            warning: 1,
            status: 1
        },
        {
            localUintID: 2,
            time: '2022 Feb 15',
            margin: 35,
            totalRevenue: 1.235,
            APR: 56.12,
            previous_day: 0.535,
            last_ts: '15h ago',
            balanceList: [
                {
                    localChainID: 77,
                    balance: {
                        eth: 26.35,
                        usdc: 66.88,
                        usdt: 0
                    }
                },
                {
                    localChainID: 99,
                    balance: {
                        eth: 26.35,
                        usdc: 66.88,
                        usdt: 0
                    }
                },
                {
                    localChainID: 2,
                    balance: {
                        eth: 26.35,
                        usdc: 66.88,
                        usdt: 0
                    }
                },
            ],
            warning: 2,
            status: 2
        },
    ]
}
const unit = {
    1: 'ETH',
    2: 'USDC',
    3: 'USDT',
    4: 'DAI',
    5: 'Metis'
}

export const isMaker = ref(true)
export const makerDataStatus = reactive({...defaultMakerDataStatus})
export const chainUnit = (localUintID) => {
    return unit[localUintID]
}

