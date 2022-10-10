import { default_config } from './'
import util from '../util/util'
import { utils } from 'web3'

export const linkNetwork = async () => {
    const ethereum = window.ethereum
    // console.log('ethereum.networkVersion ==>', ethereum.networkVersion)
    if (!ethereum) {
        return false
    }
    const chainInfo = default_config()
    if (ethereum.networkVersion != chainInfo.chainid) {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: utils.utils.toHex(chainInfo.chainid + '') }],
            });
            return true
        } catch (switchError) {
            if (switchError.code === 4902) {
                const result = await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: utils.toHex(chainInfo.chainid),
                            chainName: chainInfo.name,
                            nativeCurrency: {
                                name: chainInfo.symbol,
                                symbol: chainInfo.symbol,
                                decimals: chainInfo.decimals
                            },
                            rpcUrls: [chainInfo.rpcUrls],
                            blockExplorerUrls: [chainInfo.blockExplorerUrls]
                        }
                    ]
                }).catch(err => {
                    console.log('link network err ==>', err)
                    util.showMessage(
                        `${err.message}`,
                        'error'
                    )
                    return false
                })
                return result;
            }
        }
    } else {
        return true
    }
}