import Web3 from 'web3'
import { contractMethod } from './request_tx'
import { linkNetwork } from './metamask'
import env from '../../env'
import chainList from '../config/chains.json'


export const maker_rpc = () => {
    const chainid = process.env.VUE_APP_MAKER_CHAIN_ID
    return env.localProvider[chainid]
}
export const default_config = () => {
    const chainid = process.env.VUE_APP_MAKER_CHAIN_ID
    const chainsItem = chainList.chainList.filter(item => item.chainId == chainid)
    return {
        chainid: chainsItem[0].chainId,
        name: chainsItem[0].name,
        symbol: chainsItem[0].nativeCurrency.symbol,
        decimals: chainsItem[0].nativeCurrency.decimals,
        rpcUrls: env.localProvider[chainid],
        blockExplorerUrls: chainsItem[0].blockExplorerUrls
    }
}

export const contract_config = {
    ORMakerDeposit: {
        abi: require('./abis/ORMakerDeposit.json')
    },
    ORMakerV1Factory: {
        addr: process.env.VUE_APP_CONTRACT_ORMAKER_V1FACTORY,
        abi: require('./abis/ORMakerV1Factory.json')
    },
    ORManager: {
        addr: process.env.VUE_APP_CONTRACT_OR_MANAGER,
        abi: require('./abis/ORManager.json')
    },
    ORProtocalV1: {
        abi: require('./abis/ORProtocalV1.json')
    }
}

export const contract_obj = async (name, addr = '') => {
    const web3 = await new Web3(maker_rpc());
    const contractObj = new web3.eth.Contract(contract_config[name].abi, addr === '' ? contract_config[name].addr : addr)
    return contractObj
}

export { contractMethod, linkNetwork }