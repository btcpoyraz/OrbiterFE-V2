import { ref, reactive } from './'
import { getArbitrationTxApi } from '../core/routes/transactions'

const defaultArbitrationData = {
    haxOptions: []
}
export const haxItem = ref('')
export const arbitrationData = reactive({...defaultArbitrationData})
export const isConfirm = ref(false)
export const detailStatus = ref(1)
export const isWithdraw = ref(true)
export const isClaim = ref(true)
export const isArbitration = ref(false)

const getDate = async (addr) => {
    let res = await getArbitrationTxApi({replyAccount: addr, pageSize: 100})
    const data = res.data.data.rows
    console.log('data ==>', data)
    return data
}
export const getArbitrationData = async (addr) => {
    let data = await getDate(addr)
    isConfirm.value = true
    data.map(v => {
        let subStr1 = v.hash.substr(0, 14)
        let subStr2 = v.hash.substr(v.hash.length - 12, 12)
        v.label = subStr1 + '...' + subStr2
        let fromTx1 = v.hash.substr(0, 6)
        let fromTx2 = v.hash.substr(v.hash.length - 4, 4)
        v.fromTx = fromTx1 + '...' + fromTx2
    })
    haxItem.value = data[0].hash
    arbitrationData.haxOptions = data
}
