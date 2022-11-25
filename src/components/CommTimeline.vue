<template>
    <div class="time_line_box">
        <el-timeline :reverse="false">
            <el-timeline-item :timestamp="timeLineData.showfromTimeStamp" placement="top" v-if="step >= 1">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Arbitration Begins Lock Maker Deposit</span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showCreateAt" placement="top" v-if="step >= 2">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Transaction sent to maker for processing</span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showtoTimeStamp" placement="top" v-if="status == 1 && step >= 3">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Maker processed</span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showwaitingTime" placement="top" v-if="step >= 3 && status != 1">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Maker timeout not processed</span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showWithDrawStartTime" placement="top" v-if="step >= 4">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Apply for withdrawal deposit {{timeLineData.showExpectValue}}ETH </span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showWithDrawTime" placement="top" v-if="step >= 5">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Deposit sent to mainnet address</span>
            </el-timeline-item>
            <el-timeline-item :timestamp="timeLineData.showFinishTime" placement="top" v-if="step >= 6">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Sending back to mainnet address <span @click="goToExplore(timeLineData)">{{timeLineData.showTotx}}</span></span>
            </el-timeline-item>
    </el-timeline>
    </div>
</template>
<script>
import {
    SvgIconThemed,
} from './'
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
    watch: {
        step(value) {
            return value
        }
    },
    components: {
        SvgIconThemed
    },
    created() {
        console.log('timeLineData ==>', this.timeLineData)
    },
    methods: {
        goToExplore(txData) {
            console.log('tx', txData);
            if (txData?.fromTx?.chainId) {
                const url = this.$env.txExploreUrl[txData.fromTx.chainId] + txData.toTx.id;
                window.open(url, '_blank');
            }
        },
    }
}
</script>
<style lang="scss" scoped>
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