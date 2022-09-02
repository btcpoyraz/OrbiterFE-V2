import { ref, reactive } from './'

const defaultMakerDataStatus = {

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
