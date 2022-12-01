<template>
    <div class="arbitration_box">
        <template> 
            <div class="table_box">
                <el-table
                ref="singleTable"
                :data="tableData"
                :highlight-current-row="false"
                style="width: 100%">
                    <template #append>
                        <CommLoading
                            v-if="isArbitrationLoading"
                            style="margin: auto; margin-top: 5rem"
                            width="4rem"
                            height="4rem"
                        />
                    </template>
                    <el-table-column prop="date" label="Time" header-align="center" align="center" width="130px">
                        <template slot-scope="scope">
                            <span class="table_span" @click="toDetails(scope.row)">{{scope.row.showCreatedAt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="from" label="From Tx" width="150px" header-align="center" align="center">
                        <template slot-scope="scope">
                            <span class="table_span" @click="toDetails(scope.row)">{{scope.row.showFromTx}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="to" label="To Tx" width="150px" header-align="center" align="center">
                        <template slot-scope="scope">
                            <span class="table_span" v-if="!scope.row.toTx" @click="toDetails(scope.row)">Transaction not found</span>
                            <span @click="goToExplore(scope.row)" :class="$store.state.themeMode + '-to_hax table_span'" v-else>{{scope.row.showToTx}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Status" header-align="center" align="center" width="130px" v-if="activeName === 'Arbitration'">
                        <template #default="{ row }">
                            <div class="table_status" v-if="row.status == 0" @click="toDetails(row)">
                                <svg-icon iconName="ar-pending" style="width: 16px;height: 16px"></svg-icon>
                                <span>Pending</span>
                            </div>
                            <div class="table_status" v-if="row.status == 2" @click="toDetails(row)">
                                 <svg-icon iconName="ar-withdraw" style="width: 16px;height: 16px"></svg-icon>
                                <span>Withdraw</span>
                                <span class="red_dot"></span>
                            </div>
                            <div class="table_status" v-if="row.status == 3" @click="toDetails(row)">
                                <svg-icon iconName="ar-processing" style="width: 16px;height: 16px"></svg-icon>
                                <span>Processing payment</span>
                            </div>
                            <div class="table_status" v-if="row.status == 4" @click="toDetails(row)">
                                <svg-icon iconName="ar-paid" style="width: 16px;height: 16px"></svg-icon>
                                <span>Paid</span>
                            </div>
                            <div class="table_status" v-if="row.status == 1" @click="toDetails(row)">
                                <!-- <svg-icon iconName="ar-closed" style="width: 16px;height: 16px"></svg-icon> -->
                                <SvgIconThemed icon="ar-closed" style="width: 16px;height: 16px"/>
                                <span>Closed</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Arbitration status" align="center" width="170px" v-if="activeName === 'MakerArbitration'">
                        <template #default="{ row }">
                            <div class="table_status_btn" @click="showInp(row)">
                                <CommBtn ref="WithdrawBtn" style="width: 120px;" :disabled="isDisabled && row.status != 0">
                                    {{row.status == 0 ? 'Payback' : 'Payback'}}
                                </CommBtn>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <NoData
                    v-if="!isArbitrationLoading && tableData && tableData.length === 0"
                    style="padding-top: 200px"
                    >No history</NoData
                >
                <el-pagination
                    v-if="!isArbitrationLoading && tableData && tableData.length !== 0"
                    @current-change="curChange"
                    class="pagination"
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :total="arbitrationListInfo.total"
                >
                </el-pagination>
            </div>
            <CommDialog ref="inputInputPopupref">
                <div slot="PoperContent" style="width: 100%">
                    <InputTx @closeInput="closeInputTxPopupClick" @makerChange="makerChange" :isDisabled="isConfirm"></InputTx>
                </div>
            </CommDialog>
        </template>
    </div>
</template>
<script>
import { formatDateMD } from '../../util'
import { NoData, SvgIconThemed, CommBtn, CommDialog } from '../../components'
import { historyPanelState, pageStatus, detailStatus, detailRow, linkWallet, activeName, isDisabled, getMakerArbitrationHistory } from '../../composition/hooks'
import { getMakerTransferProofApi } from '../../core/routes/transactions'
import InputTx from '../../components/InputTx.vue'
import { contractMethod, linkNetwork } from '../../contracts'
import util from '../../util/util'

export default {
    name: 'ArbitrationHistory',
    components: {
        NoData,
        SvgIconThemed,
        CommBtn,
        CommDialog,
        InputTx
    },
    data() {
        return {
            chooseItem: null,
            isConfirm: false
        }
    },
    computed: {
        isArbitrationLoading() {
            return historyPanelState.isArbitrationLoading
        },
        currentPage() {
            return this.arbitrationListInfo.current
        },
        arbitrationListInfo() {
            return historyPanelState.arbitrationListInfo
        },
        tableData() {
            let tableList = historyPanelState.tableData
            tableList.map(v => {
                v.showCreatedAt = formatDateMD(v.createdAt * 1000)
                let fromStr1 = v.fromTx.id.substr(0, 6)
                let fromStr2 = v.fromTx.id.substr(v.hash.length - 4, 4)
                v.showFromTx = fromStr1 + '...' + fromStr2
                if (v.toTx && v.toTx.id != '') {
                    let toStr1 = v.toTx.id.substr(0, 6)
                    let toStr2 = v.toTx.id.substr(v.hash.length - 4, 4)
                    v.showToTx = toStr1 + '...' + toStr2
                }
            })
            return historyPanelState.tableData
        },
        linkWallet() {
            return linkWallet.value
        },
        activeName() {
            return activeName.value
        },
        isDisabled() {
            return isDisabled.value
        }
    },
    created() {
        // getArbitrationHistory(linkWallet.value)
    },
    methods: {
        handleCurrentChange(row){
            this.toDetails(row);
            this.$refs.singleTable.setCurrentRow();
        },
        goToExplore(txData) {
            if (txData?.fromTx?.chainId) {
                const url = this.$env.txExploreUrl[process.env.VUE_APP_MAKER_CHAIN_ID] + txData.toTx.id;
                window.open(url, '_blank');
            }
        },
        curChange(cur) {
        },
        toDetails(row) {
            pageStatus.value = 2
            detailStatus.value = row.status
            detailRow.value = row
        },
        showInputTxPopupClick() {
            this.$refs.inputInputPopupref.showCustom()
        },
        // close selectChain
        closeInputTxPopupClick() {
            this.$refs.inputInputPopupref.maskClick()
        },
        showInp(row) {
            // if (row != 0)  return
            this.chooseItem = row
            this.showInputTxPopupClick()
        },
        async makerChange(toTx) {
            this.isConfirm = true
            try {
                let txinfo = {
                    chainID: Number(this.chooseItem.fromTx.chainId),
                    txHash: this.chooseItem.fromTx.id,
                    lpid: this.chooseItem.lp.id,
                    sourceAddress: this.chooseItem.fromTx.from,
                    destAddress: this.chooseItem.fromTx.to,
                    tokenAddress: this.chooseItem.fromTx.token,
                    amount: this.chooseItem.fromTx.value,
                    nonce: Number(this.chooseItem.fromTx.nonce),
                    timestamp: Number(this.chooseItem.fromTx.timestamp),
                    responseAmount: this.chooseItem.expectValue,
                    responseSafetyCode: Number(this.chooseItem.fromTx.nonce),
                    ebcid: Number(this.chooseItem.ebcId),
                }
                let params = {
                    fromChain: this.chooseItem.fromTx.chainId,
                    fromTxId: this.chooseItem.fromTx.id,
                    toTxId: toTx
                }
                const res = await getMakerTransferProofApi(params)
                if (res.data && res.data.data) {
                    const txproof = res.data.data.proof
                    const toinfo = res.data.data.tx
                    const toTxinfo = {
                        chainID: Number(toinfo.chain),
                        txHash: toTx,
                        lpid: toinfo.lpId,
                        sourceAddress: toinfo.from,
                        destAddress: toinfo.to,
                        tokenAddress: toinfo.token,
                        amount: toinfo.value,
                        nonce: Number(toinfo.nonce),
                        timestamp: toinfo.timestamp,
                        responseAmount: toinfo.expectValue,
                        responseSafetyCode: Number(toinfo.expectSafetyCode),
                        ebcid: Number(toinfo.ebcId),
                    }
                    const data = {
                        name: 'makerChallenger',
                        contractName: "ORMakerDeposit",
                        contractAddr: this.chooseItem.makerId,
                        arguments: [txinfo, toTxinfo, txproof]
                    }
                    const isNetwork = await linkNetwork()
                    if (isNetwork) {
                        const result = await contractMethod(linkWallet.value, data).catch(err => {
                            // err
                            this.isConfirm = false
                            console.log('makerChallenger err ==>', err)
                            return
                        })
                        if (result && result.code === 200) {
                            // success
                            this.closeInputTxPopupClick()
                            getMakerArbitrationHistory()
                            this.isConfirm = false
                        }
                    } else {
                        this.isConfirm = false
                    }
                } else {
                    util.showMessage(
                        `${res.data.errmsg}`,
                        'error'
                    )
                    this.isConfirm = false
                }
            } catch(err) {
                console.log("makerChallenger err ==>", err)
                this.isConfirm = false
            }
            
        }
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
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 10px;
            cursor: pointer;
            svg {
                margin-right: 6px;
            }
        }
        .dark-to_hax {
            border-bottom: 1px solid #ffffff;
            cursor: pointer;
        }
        .light-to_hax {
            border-bottom: 1px solid #333;
            cursor: pointer;
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
.table_span{
    cursor: pointer;
}
.red_dot{ display:block; background:#f00; border-radius:50%; width:0.4em; height:0.4em; top:10px; right:10px; position:absolute; }
</style>