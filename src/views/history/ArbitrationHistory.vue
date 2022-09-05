<template>
    <div class="arbitration_box">
        <div class="table_box">
            <el-table
            :data="tableData"
            :highlight-current-row="false"
            style="width: 100%">
                <el-table-column prop="date" label="Time" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span class="table_span">7-26 14:12</span>
                    </template>
                </el-table-column>
                <el-table-column prop="from" label="From Tx" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span class="table_span">0x1234...5678</span>
                    </template>
                </el-table-column>
                <el-table-column prop="to" label="To Tx" width="170px" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span class="table_span">Transaction not found</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Arbitration status" align="center" width="170px">
                    <template slot-scope="scope">
                        <div class="table_status" v-if="scope.row.status == 1">
                            <svg-icon iconName="ar-pending" style="width: 16px;height: 16px"></svg-icon>
                            <span>Pending</span>
                        </div>
                        <div class="table_status" v-if="scope.row.status == 2">
                            <svg-icon iconName="ar-withdraw" style="width: 16px;height: 16px"></svg-icon>
                            <span>Withdraw</span>
                        </div>
                        <div class="table_status" v-if="scope.row.status == 3">
                            <svg-icon iconName="ar-processing" style="width: 16px;height: 16px"></svg-icon>
                            <span>Processing payment</span>
                        </div>
                        <div class="table_status" v-if="scope.row.status == 4">
                            <svg-icon iconName="ar-paid" style="width: 16px;height: 16px"></svg-icon>
                            <span>Paid</span>
                        </div>
                        <div class="table_status" v-if="scope.row.status == 5">
                            <!-- <svg-icon iconName="ar-closed" style="width: 16px;height: 16px"></svg-icon> -->
                            <SvgIconThemed icon="ar-closed" style="width: 16px;height: 16px"/>
                            <span>Closed</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <NoData
                v-if="tableData && tableData.length === 0"
                style="padding-top: 200px"
                >No history</NoData
            >
            <el-pagination
                v-if="tableData && tableData.length !== 0"
                @current-change="curChange"
                class="pagination"
                layout="prev, pager, next"
                :current-page="currentPage"
                :total="arbitrationListInfo.total"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { NoData, SvgIconThemed } from '../../components'
import { historyPanelState } from '../../composition/hooks'
export default {
    name: 'ArbitrationHistory',
    components: {
        NoData,
        SvgIconThemed
    },
    data() {
        return {
            
        }
    },
    computed: {
        currentPage() {
            return this.arbitrationListInfo.current
        },
        arbitrationListInfo() {
            return historyPanelState.arbitrationListInfo
        },
        tableData() {
            return historyPanelState.tableData
        },
    },
    methods: {
        curChange(cur) {

        },
    },
}
</script>
<style lang="scss" scoped>
.arbitration_box {
    // background-color: skyblue;
    .table_box {
        margin-top: 14px;
        font-size: 14px;
        .table_status {
            display: flex;
            align-items: center;
            padding-left: 10px;
            cursor: pointer;
            svg {
                margin-right: 6px;
            }
        }
    }
}
</style>
<style scoped>
.table_box >>> .el-table {
    background-color: transparent;
    color: #333;
}
.table_box >>> .el-table thead {
    background: #F5F5F5;
    border-radius: 8px;
    overflow: hidden;
    height: 32px;
}
.table_box >>> .el-table__header-wrapper {
    border-radius: 8px;
}
.table_box >>> .el-table td.el-table__cell {
    border-bottom: none;
}
.table_box >>> .el-table__empty-block {
    display: none;
}
.table_box >>> .el-table::before {
    display: none;
}
.table_box >>> .el-table tr {
    background-color: transparent;
}
.table_box >>> .el-table th.el-table__cell {
    background-color: transparent;
    padding: 0;
    font-size: 14px;
    color: rgba(51, 51, 51, 0.8);
    font-weight: normal;
}
.table_box >>> .el-table th.el-table__cell.is-leaf {
    border: none;
    padding: 0;
}
.table_box >>> .el-table .cell {
    padding: 0;
}
.table_box >>> .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background-color: transparent;
}
.table_box >>> .el-pagination {
    display: flex;
    justify-content: right;
}
</style>