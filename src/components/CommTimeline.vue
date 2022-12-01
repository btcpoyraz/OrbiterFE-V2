<template>
    <div class="time_line_box">
        <el-timeline :reverse="false">
            <el-timeline-item class="time_line" :timestamp="timeLineData.showfromTimeStamp" placement="top" v-if="step >= 1">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Arbitration Begins Lock Maker Deposit</span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="timeLineData.showCreateAt" placement="top" v-if="step >= 2">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Transaction sent to maker for processing</span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="timeLineData.showtoTimeStamp" placement="top" v-if="status == 1 && step >= 3">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Maker processed</span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="showWaitingTime" placement="top" v-if="step >= 3 && status != 1">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Maker timeout not processed</span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="showWithDrawStartTime" placement="top" v-if="status > 2 && depositValue">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Apply for withdrawal deposit {{depositValue}}ETH </span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="showWithDrawStartTime" placement="top" v-if="status > 2">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Deposit sent to mainnet address</span>
            </el-timeline-item>
            <el-timeline-item class="time_line" :timestamp="showWithDrawStartTime" placement="top" v-if="step >= 6">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Sending back to mainnet address <span style="text-decoration: underline" @click="goToExplore(timeLineData)">{{showToTx}}</span></span>
            </el-timeline-item>
    </el-timeline>
    </div>
</template>
<script>
import {
    SvgIconThemed,
} from './'
import { formatDateOnMDS } from "../util";
import etherscan from '../core/actions/etherscan';
export default {
    name: 'CommTimeline',
    props: {
        status: {
            type: Number,
            default: 0
        },
        timeLineData: {
            type: Object
        },
        step: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            depositValue: 0
        };
    },
    watch: {
        step(value) {
            return value
        }
    },
    computed: {
        showToTx() {
            const tx = this.timeLineData?.toTx?.to;
            if (tx) {
                const toTx1 = tx.substr(0, 6);
                const totTx2 = tx.substr(tx.length - 4, 4);
                return toTx1 + '...' + totTx2;
            }
            return '';
        },
        showWaitingTime() {
            const data = this.timeLineData;
            const events = data.events;
            if (events && events.length) {
                const event = events.find(item => item.action === 'launch');
                if (event?.createdAt) return formatDateOnMDS(+event.createdAt * 1000);
            }
            return '';
        },
        showWithDrawStartTime() {
            const data = this.timeLineData;
            const events = data.events;
            if (events && events.length) {
                const event = events.find(item => item.action === 'user:withdrawal');
                if (event?.createdAt) return formatDateOnMDS(+event.createdAt * 1000);
            }
            return '';
        },
    },
    components: {
        SvgIconThemed
    },
    async created() {
        console.log('timeLineData ==>', this.timeLineData);
        if(this.timeLineData?.toTx?.id){
            const tx = await this.$web3.eth.getTransaction(this.timeLineData.toTx.id);
            if (tx?.blockNumber) {
                const { result } = await etherscan.getTxListInternal({
                    address: this.timeLineData.toTx.to,
                    startBlock: tx.blockNumber, endBlock: tx.blockNumber
                }, process.env.VUE_APP_MAKER_CHAIN_ID);
                if (result && result.length) {
                    for (const data of result) {
                        if (+data.value) {
                            this.depositValue = this.$web3.utils.fromWei(data.value, 'ether');
                        }
                    }
                }
            }
        }
    },
    methods: {
        goToExplore(txData) {
            if (txData?.fromTx?.chainId) {
                const url = this.$env.accountExploreUrl[process.env.VUE_APP_MAKER_CHAIN_ID] + txData.toTx.to;
                window.open(url, '_blank');
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .time_line{
        margin-bottom: -10px;
    }
.time_line_box {
    text-align: left;
    ul{
        padding: 0;
    }
}
</style>

<style scoped>
.time_line_box >>> .el-timeline-item__dot {
    background-color: #f5f5f5;
}
.time_line_box >>> .el-timeline-item__tail {
    left: 11px;
}
.time_line_box >>> .el-timeline-item__timestamp.is-top {
    padding-top: 10px;
}
.time_line_box >>> .el-timeline-item__timestamp {
    color: rgba(51, 51, 51, 0.4);
    font-size: 12px;
}
.time_line_box >>> .el-timeline-item__content {
    font-size: 12px;
}
</style>