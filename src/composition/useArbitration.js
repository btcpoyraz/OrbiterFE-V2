import { ref, reactive } from './'
import { getUserArbitrationHistory } from './useHistoryPanel'
import { getArbitrationTxApi } from '../core/routes/transactions'
import { GraphQLClient, gql } from 'graphql-request'
import env from '../../env'

const defaultArbitrationData = {
    haxOptions: []
}
export const haxItem = ref('')
export const arbitrationData = reactive({...defaultArbitrationData})
export const isConfirm = ref(false)
export const detailStatus = ref(1)
export const detailRow = reactive({})
export const isWithdraw = ref(true)
export const isClaim = ref(false)
export const isArbitration = ref(false)
export const isMakerArbitration = ref(false)

const getChainEntities = async () => {
    const endpoint = env.graphUrl
    const queryQl = gql`
    query MyQuery {
        chainEntities {
          id
          batchLimit
          maxReceiptTime
          maxDisputeTime
        }
    }
    `
    const graphQLClient = new GraphQLClient(endpoint, {})
    const resp = await graphQLClient.request(queryQl)
    return resp.chainEntities;
}   
const getDate = async (addr) => {
    let res = await getArbitrationTxApi({replyAccount: addr, pageSize: 100})
    if (res.data.data && res.data.data.rows) {
        const data = res.data.data.rows
        return data
    }
    return []
}
export const getArbitrationData = async (addr) => {
    let data = await getDate(addr)
    let resp = await getChainEntities()
    let history = await getUserArbitrationHistory(addr)
    isConfirm.value = true
    let arr = []
    if (data.length != 0) {
        data.map(v => {
            let chainItem = resp.filter(item => item.id == v.chainId)
            let timer = parseInt(new Date().getTime() / 1000)
            let endTime = Number(v.timestamp) + Number(chainItem[0].maxReceiptTime)
            let isHistory = history.filter(item => item.fromTx.id == v.hash)
            if (timer >= endTime && isHistory.length == 0) {
                let subStr1 = v.hash.substr(0, 14)
                let subStr2 = v.hash.substr(v.hash.length - 12, 12)
                v.label = subStr1 + '...' + subStr2
                let fromTx1 = v.hash.substr(0, 6)
                let fromTx2 = v.hash.substr(v.hash.length - 4, 4)
                v.fromTx = fromTx1 + '...' + fromTx2
                arr.push(v)
            }
        })
    }
    if (arr.length == 0) {
        isArbitration.value = false
    } else {
        haxItem.value = arr[0].hash
        arbitrationData.haxOptions = arr
    }
    return data;
}
