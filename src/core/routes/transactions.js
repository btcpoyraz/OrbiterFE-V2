import axios from 'axios'
import env from '../../../env'

export async function getTransactionsHistoryApi(params = {}) {
  return await axios.get(`${env.historyApiBase}/transactions/history`, { params })
}

export async function getArbitrationTxApi(params = {}) {
  return await axios.get(`${env.spvApiBase}/wallet/getTransferTransactions/appealable`, { params })
}

export async function getUserTransferProofApi(params = {}) {
  return await axios.get(`${env.spvApiBase}/wallet/getUncollectedPaymentProof`, { params })
}

export async function getMakerTransferProofApi(params = {}) {
  return await axios.get(`${env.spvApiBase}/wallet/getDelayTransferProof`, { params })
}

export async function getMakerArbitrationTxCountApi(params = {}) {
  return await axios.get(`${env.spvApiBase}/wallet/makerTransactions/count`, { params })
}