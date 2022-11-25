<template>
    <div class="arbitration-details">
        <div class="details_content">
            <CommBoxHeader :back="closerButton" :style="isMobile ? '' : 'margin-bottom:30px;'">Details</CommBoxHeader>
            <div class="close_box">
                <svg-icon @click.native="closerButton" class="close" iconName="close" style="width: 12px;height: 12px;"></svg-icon>
            </div>
            <div class="step_box">
                <el-steps :active="1" align-center v-if="status === 0">
                    <el-step title="Arbitration begins">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Lock the</p>
                                <p>maker deposit</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="Waiting for maker to process" description="(within 24 hours)">
                        <template #icon>
                            <SvgIconThemed icon="step-wait"></SvgIconThemed>
                        </template>
                    </el-step>
                </el-steps>
                <el-steps :active="1" align-center v-if="status === 2">
                    <el-step title="Arbitration begins">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Lock the</p>
                                <p>maker deposit</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="WIthdraw">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Send deposit</p>
                                <p>to mainnet</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="Sending back to mainnet address">
                        <template #icon>
                            <SvgIconThemed icon="step-wait"></SvgIconThemed>
                        </template>
                    </el-step>
                </el-steps>
                <el-steps :active="1" align-center v-if="status === 3">
                    <el-step title="Arbitration begins">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Lock the</p>
                                <p>maker deposit</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="Timeout not handled">
                        <template #icon>
                            <svg-icon iconName="step-closed"></svg-icon>
                        </template>
                    </el-step>
                </el-steps>
                <el-steps :active="1" align-center v-if="status === 4">
                    <el-step title="Arbitration begins">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Lock the</p>
                                <p>maker deposit</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="WIthdraw">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Send deposit</p>
                                <p>to mainnet</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="Sending back to mainnet address">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_tx">
                                <span @click="goToExplore(timeLineData)">Tx:{{timeLineData.showTotx}}</span>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
                <el-steps :active="1" align-center v-if="status === 1">
                    <el-step title="Arbitration begins">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_detail">
                                <p>Lock the</p>
                                <p>maker deposit</p>
                            </div>
                        </template>
                    </el-step>
                    <el-step title="Processed successfully">
                        <template #icon>
                            <svg-icon iconName="step-success"></svg-icon>
                        </template>
                        <template #description>
                            <div class="step_tx">
                                <span v-if="timeLineData.toTx != null">Tx:{{timeLineData.toTx.showid}}</span>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
            <div class="timer_line">
                <div class="line_box">
                    <CommTimeline :timeLineData="timeLineData" :step="step" :status="status"></CommTimeline>
                </div>
            </div>
            <div class="btn_box" v-if="status == 3">
                <CommBtn ref="WithdrawBtn" style="width: 200px;" :disabled="!isWithdraw" @click="getWithdraw">
                    {{isWithdraw ? 'Withdraw' : 'Waiting...'}}
                </CommBtn>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDateOnMDS } from '../../util'
import {
  SvgIconThemed,
  CommBoxHeader,
  CommBtn,
  CommTimeline
} from '../../components'
import {
  isMobile,
  isWithdraw,
  linkWallet,
  detailRow,
  historyPanelState,
  detailStatus,
  getArbitrationHistory
} from '../../composition/hooks'
import env from '../../../env'
import { GraphQLClient, gql } from 'graphql-request'
import { contractMethod, linkNetwork } from '../../contracts'

export default {
    name: 'ArbitrationDetails',
    props: {
        status: {
            type: Number,
            default: 1
        }
    },
    components: {
        SvgIconThemed,
        CommBoxHeader,
        CommBtn,
        CommTimeline
    },
    computed: {
        isMobile() {
            return isMobile.value
        },
        isWithdraw() {
            return isWithdraw.value
        },
        linkWallet() {
            return linkWallet.value
        },
        detailStatus() {
            return detailStatus.value
        },
        timeLineData() {
            let data = historyPanelState.timeLineData
            if (data.status == 1 && data.toTx != null) {
                let totx1 = data.toTx.id.substr(0, 6)
                let totx2 = data.toTx.id.substr(data.toTx.id.length - 4, 4)
                data.toTx.showid = totx1 + '...' + totx2
            } else {
                data.showid = ''
            }
            return historyPanelState.timeLineData
        },
        step() {
            let step = 0
            if (this.status == 0) {
                step = 2
            } else if (this.status == 1) {
                step = 3
            } else if (this.status == 3) {
                step = 3
            } else if (this.status == 2) {
                step = 5
            }  else if (this.status == 4) {
                step = 6
            }
            return step
        },
        detailRow() {
            return detailRow.value
        }
    },
    created() {
        this.initData()
    },
    methods: {
        goToExplore(txData) {
            console.log('tx', txData);
            if (txData?.fromTx?.chainId) {
                const url = this.$env.txExploreUrl[txData.fromTx.chainId] + txData.toTx.id;
                window.open(url, '_blank');
            }
        },
        initData() {
            let data = this.detailRow
            data.showCreateAt = formatDateOnMDS(data.createdAt * 1000)
            data.showfromTimeStamp = formatDateOnMDS(data.fromTx.timestamp * 1000)
            if (data.status == 1) {
                if (data.toTx == null) {
                    let usetWithdrawal = data.operations.filter(item => item.action == 'user:withdrawal')
                    data.showtoTimeStamp = formatDateOnMDS(usetWithdrawal[0].timestamp * 1000)
                } else {
                    data.showtoTimeStamp = formatDateOnMDS(data.toTx.timestamp * 1000)
                }
            } else if (data.status == 3) {
                data.showwaitingTime = formatDateOnMDS(data.waitingTime * 1000)
            }
            historyPanelState.timeLineData = data
        },
        closerButton() {
            isWithdraw.value = true
            this.$emit('stateChanged', 1)
        },
        async getLpinfos(lpid) {
            console.log('lpid ==>', lpid)
            const endpoint = env.graphUrl
            const queryQl = gql`
            query MyQuery {
                lpEntities(
                    where: {id: "${lpid}"}
                ) {
                    maxPrice
                    minPrice
                    gasFee
                    destPresion
                    sourcePresion
                    tradingFee
                    startTime
                    stopTime
                    maker {
                        id
                    }
                    pair {
                        id
                        ebcId
                        sourceChain
                        sourceToken
                        destChain
                        destToken
                    }
                }
            }`
            const graphQLClient = new GraphQLClient(endpoint, {})
            const resp = await graphQLClient.request(queryQl)
            const data = resp.lpEntities
            return data
        },
        async getWithdraw() {
            if (!isWithdraw.value) return
            isWithdraw.value = false
            this.step = 
            this.timeLineData.showWithDrawStartTime = formatDateOnMDS(new Date().getTime())
            console.log('timeLineData ==>', this.timeLineData)
            const resq = await this.getLpinfos(this.timeLineData.lp.id)
            // console.log('resq lpinfo ==>', resq)
            const userTx = {
                chainID: Number(this.timeLineData.fromTx.chainId),
                txHash: this.timeLineData.fromTx.id,
                lpid: this.timeLineData.lp.id,
                sourceAddress: this.timeLineData.fromTx.from,
                destAddress: this.timeLineData.fromTx.to,
                tokenAddress: this.timeLineData.fromTx.token,
                amount: this.timeLineData.fromTx.value,
                nonce: Number(this.timeLineData.fromTx.nonce),
                timestamp: Number(this.timeLineData.fromTx.timestamp),
                responseAmount: this.timeLineData.expectValue,
                responseSafetyCode: Number(this.timeLineData.fromTx.nonce),
                ebcid: Number(this.timeLineData.lp.pair.ebcId),
            }
            const lpinfo = {
                sourceChain: Number(resq[0].pair.sourceChain),
                destChain: Number(resq[0].pair.destChain),
                sourceTAddress: resq[0].pair.sourceToken,
                destTAddress: resq[0].pair.destToken,
                sourcePresion: Number(resq[0].sourcePresion),
                destPresion: Number(resq[0].destPresion),
                ebcid: Number(resq[0].pair.ebcId),
                minPrice: resq[0].minPrice,
                maxPrice: resq[0].maxPrice,
                gasFee: resq[0].gasFee,
                tradingFee: resq[0].tradingFee,
                startTime: Number(resq[0].startTime),
                // stopTime: Number(resq[0].stopTime),
            }
            console.log("maker userWithDraw ==>", userTx, lpinfo, JSON.stringify(userTx), JSON.stringify(lpinfo))
            const data = {
                name: 'userWithDraw',
                contractName: "ORMakerDeposit",
                contractAddr: this.timeLineData.makerId,
                arguments: [userTx, lpinfo]
            }
            console.log('userWithDraw data ==>', data)
            const isNetwork = await linkNetwork()
            if (isNetwork) {
                const result = await contractMethod(linkWallet.value, data).catch(err => {
                    // err
                    isWithdraw.value = true
                    console.log('userWithDraw err ==>', err)
                    return
                })
                if (result && result.code === 200) {
                    // success
                    detailStatus.value = 2
                    this.timeLineData.showWithDrawTime = formatDateOnMDS(new Date().getTime())
                    this.timeLineData.showExpectValue = this.$web3.utils.fromWei(this.timeLineData.expectValue , 'ether')
                    let timer = setInterval(async () => {
                        let res = await this.getFinish()
                        console.log("res finish data ==>", res[0])
                        let userWithDraw = res[0].operations.filter(item => item.action == 'user:withdrawal')
                        if (userWithDraw.length != 0) {
                            detailStatus.value = 4
                            this.timeLineData.showFinishTime = formatDateOnMDS(userWithDraw[0].timestamp * 1000)
                            // let totx1 = res[0].toTx.id.substr(0, 6)
                            // let totx2 = res[0].toTx.id.substr(res[0].toTx.id.length - 4, 4)
                            // this.timeLineData.toTx.showToaddr = totx1 + '...' + totx2
                            // this.timeLineData.toTx.showToaddr = ''
                            let totx1 = result.hax.substr(0, 6)
                            let totx2 = result.hax.substr(result.hax.length - 4, 4)
                            this.timeLineData.showTotx = totx1 + '...' + totx2
                            getArbitrationHistory()
                            clearInterval(timer)
                        } 
                    }, 2000);
                }
            } else {
                isWithdraw.value = true
            }
        },

        async getFinish() {
            const endpoint = env.graphUrl
            const queryQl = gql`
            query MyQuery {
                grievanceEntities(
                    where: {makerId: "${this.timeLineData.makerId}", hash: "${this.timeLineData.hash}"}
                ) {
                    operations {
                        id
                        action
                        content
                        timestamp
                        address
                    }
                    hash
                }
            }`
            const graphQLClient = new GraphQLClient(endpoint, {})
            const res = await graphQLClient.request(queryQl)
            
            return res.grievanceEntities
        }
    },
}
</script>
<style lang="scss" scoped>
.app {
    .arbitration-details{
        width: 600px;
        min-height: 570px;
        border-radius: 20px;
    }
}
.app-mobile {
    width: 100%;
    .arbitration-details{
        height: 100%;
        width: 100% !important;
    }
}
.arbitration-details {
    border-radius: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    .details_content{
        position: relative;
        .close_box {
            cursor: pointer;
            position: absolute;
            top: 14px;
            right: 26px;
        }
        .step_box {
            margin-bottom: 36px;
            svg {
                width: 40px;
                height: 40px;
            }
            .step_detail {
                width: 120px;
                position: absolute;
                right: -60px;
                top: -24px;
                font-size: 12px;
                p {
                    margin: 0;
                }
            }
            .step_tx {
                margin-top: 3px;
                span {
                    border-bottom: 1px solid;
                    font-size: 14px;
                }
            }
        }
        .timer_line {
            width: 100%;
            padding: 0 20px;
            .line_box {
                padding: 16px 32px 0;
                background-color: #F5F5F5;
                border-radius: 20px;
            }
        }
        .btn_box {
            margin-top: 60px;
        }
    }
}
</style>

<style scoped>
.step_box >>> .el-step__icon.is-text {
    border: none;
}
.step_box >>> .el-step__title {
    max-width: 140px;
    font-size: 16px;
    font-family: 'Inter Bold';
    margin: auto;
    color: #333;
    line-height: 26px;
}
.step_box >>> .el-step__icon {
    width: 40px;
    height: 40px;
}
.step_box >>> .el-step.is-horizontal .el-step__line{
    top: 20px;
}
.step_box >>> .el-step.is-center .el-step__description {
    padding: 0;
}
.step_box >>> .el-step.is-center .el-step__description{
    font-size: 14px;
    color: rgba(51, 51, 51, 0.8);;
}
</style>