<template>
    <div class="time_line_box">
        <el-timeline reverse>
            <el-timeline-item timestamp="2018/4/12" placement="top">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>test</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>test</span>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
                <template #dot>
                    <SvgIconThemed icon="union" style="width: 24px;height: 24px"></SvgIconThemed>
                </template>
                <span>test</span>
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
            type: Array,
            default: []
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
    padding-top: 6px;
}
.time_line_box >>> .el-timeline-item__timestamp {
    color: rgba(51, 51, 51, 0.4);
    font-size: 12px;
}
</style>