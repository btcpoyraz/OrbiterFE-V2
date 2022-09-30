<template>
    <div class="time_line_box">
        <el-timeline :reverse="false">
            <el-timeline-item timestamp="2018/4/1" placement="top" v-if="step >= 1">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Arbitration Begins Lock Maker Deposit</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top" v-if="step >= 2">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Transaction sent to maker for processing</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top" v-if="step >= 3">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>maker timeout not processed</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/4" placement="top" v-if="step >= 4">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Apply for withdrawal deposit 0.123456ETH (0.112956 + 0.01 + 0.005)</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/5" placement="top" v-if="step >= 5">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Deposit sent to mainnet address</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/6" placement="top" v-if="step >= 6">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>Sending back to mainnet address  0x1234...5678</span>
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
        timeLineData: {
            type: Array
        },
        step: {
            type: Number,
            default: 0
        }
    },
    components: {
        SvgIconThemed
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