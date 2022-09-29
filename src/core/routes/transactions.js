import axios from 'axios'
import env from '../../../env'

export async function getTransactionsHistoryApi(params = {}) {
  return await axios.get(`${env.baseTraddingUrl}/transactions/history`, { params })
}

export async function getArbitrationTxApi(params = {}) {
  return await axios.get(`${env.transitionUrl}/wallet/getTransferTransactions/appealable`, { params })
}

export async function getUserTransferProofApi(params = {}) {
  return await axios.get(`${env.transitionUrl}/wallet/getUncollectedPaymentProof`, { params })
}

export async function getMakerTransferProofApi(params = {}) {
  return await axios.get(`${env.transitionUrl}/wallet/getDelayTransferProof`, { params })
}