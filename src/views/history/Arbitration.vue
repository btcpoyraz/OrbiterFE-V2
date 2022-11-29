<template>
    <div class="arbitration-page">
        <div class="arbitration_box">
            <div class="title">Initiate  Arbitration</div>
            <div class="hax_box">
                <div class="hax_title">
                    TransactionID
                </div>
                <el-select v-model="hax" placeholder="" @change="selectChange" no-data-text="No data">
                    <el-option style="background-color: #ffffff;"
                        v-for="item in haxOptions"
                        :key="item.hash"
                        :label="item.label"
                        :value="item.hash">
                    </el-option>
                </el-select>
            </div>
            <div class="table_box">
                <div class="table_title">
                    <span>Time</span>
                    <span>Value</span>
                    <span>From Tx</span>
                    <span>To Tx</span>
                </div>
                <div class="table_content">
                    <div class="table_item">
                        <span>{{showItem.timestamp}}</span>
                        <span>{{showItem.value}}{{showItem.symbol}}</span>
                        <span @click="goToExplore(showItem.fromTx)"><div class="line_text">{{showItem.fromTx}}</div></span>
                        <span>No Matched Txn</span>
                    </div>
                </div>
            </div>
            <div class="details_box">
                <div class="detail_item clearfix">
                    <div class="fl detail_svg">
                        <svg-icon iconName="ar-pending" style="width: 16px; height: 16px;"></svg-icon>
                    </div>
                    <div class="fl detail_text">
                        <span>A <span class="warning_text">0.001</span> ETH is required to be deposited in the MDC contract to initiate the arbitration.This will be used as a security deposit for the arbitration.</span>
                    </div>
                </div> 
                <div class="detail_item clearfix">
                    <div class="fl detail_svg">
                        <svg-icon iconName="ar-pending" style="width: 16px; height: 16px;"></svg-icon>
                    </div>
                    <div class="fl detail_text">
                        <span>The MDC contract will notify the maker to process it. If the maker does not process it within the agreed time, you can apply for withdrawal.</span>
                    </div>
                </div> 
                <div class="detail_item clearfix">
                    <div class="fl detail_svg">
                        <svg-icon iconName="ar-pending" style="width: 16px; height: 16px;"></svg-icon>
                    </div>
                    <div class="fl detail_text">
                        <span>After the withdrawal, you can receive the currency on the main network, which includes your deposit and maker deposit (send-back tokens and compensation).</span>
                    </div>
                </div> 
            </div>
            <div class="btn_box">
                <CommBtn ref="ConfirmBtn" style="width: 200px;" :disabled="!isConfirm" @click="confirm">
                    {{isConfirm ? 'Confirm' : 'Waiting...'}}
                </CommBtn>
            </div>
        </div>
        <div class="closed_icon">
            <svg-icon
                @click.native="closeDialog"
                class="close"
                iconName="close"
            ></svg-icon>  
        </div>
    </div>
</template>
<script>
import { CommBtn } from '../../components'
import { arbitrationData, haxItem, isConfirm, linkWallet, getArbitrationData } from '../../composition/hooks'
import { formatDateMD } from '../../util'
import { getUserTransferProofApi } from '../../core/routes/transactions'
import { contractMethod, contract_obj, linkNetwork } from '../../contracts'

export default {
    name: 'Arbitration',
    data() {
        return {
            selectItem: null,
            showItem: {
                "hash": "",
                "from": "",
                "to": "",
                "chainId": 0,
                "symbol": "",
                "value": "",
                "status": false,
                "timestamp": "",
                "side": 0,
            }
        }
    },
    components: {
        CommBtn,
    },
    computed: {
        hax: {
            get(){
                return haxItem.value;
            },
            set(v) {
                haxItem.value = v
            }
        },
        haxOptions() {
            return arbitrationData.haxOptions
        },
        isConfirm() {
            return isConfirm.value
        },
        linkWallet() {
            return linkWallet.value
        }
    },  
    watch: {
        selectItem() {
            this.showItem = JSON.parse(JSON.stringify(this.selectItem))
            this.showItem.timestamp = formatDateMD(this.selectItem.timestamp * 1000)
            this.showItem.value = this.$web3.utils.fromWei(this.selectItem.value, 'ether')
            this.showItem.symbol =this.selectItem.symbol
        },
        linkWallet() {
            this.getTxData()
        }
    },
    created() {
        this.getTxData()
    },
    methods: {
        goToExplore(tx) {
            console.log('tx', tx);
            if (tx) {
                const url = this.$env.txExploreUrl[this.selectItem.chainId] + tx;
                window.open(url, '_blank');
            }
        },
        async getTxData() {
            await getArbitrationData(linkWallet.value)
            if (this.haxOptions.length != 0) {
                this.selectItem = this.haxOptions.find(item => item.hash == this.hax)
                this.showItem = JSON.parse(JSON.stringify(this.selectItem))
                this.showItem.timestamp = formatDateMD(this.selectItem.timestamp * 1000)
                this.showItem.value = this.$web3.utils.fromWei(this.selectItem.value, 'ether')
                this.showItem.symbol =this.selectItem.symbol
            } else {
                this.$router.back()
            }
        },
        closeDialog() {
            this.$router.back()
        },
        selectChange(val) {
            this.selectItem = this.haxOptions.find(item => item.hash == val)
            console.log("selectItem ==>", this.selectItem)
        },

        async confirm() {
            isConfirm.value = false
            let txinfo = {
                chainID: Number(this.selectItem.chainId),
                txHash: this.selectItem.hash,
                lpid: this.selectItem.lpId,
                sourceAddress: this.selectItem.from,
                destAddress: this.selectItem.to,
                tokenAddress: this.selectItem.tokenAddress,
                amount: this.selectItem.value,
                nonce: Number(this.selectItem.nonce),
                timestamp: this.selectItem.timestamp,
                responseAmount: this.selectItem.expectValue,
                responseSafetyCode: Number(this.selectItem.expectSafetyCode),
                ebcid: Number(this.selectItem.ebcId),
            }
            const res = await getUserTransferProofApi({chainId: txinfo.chainID, txid: txinfo.txHash})
            const txproof = res.data.data
            const contract_manager = await contract_obj('ORManager')
            const ebcAddr = await contract_manager.methods.getEBC(txinfo.ebcid).call()
            const contract_ORProtocalV1 = await contract_obj('ORProtocalV1', ebcAddr)
            const value = await contract_ORProtocalV1.methods.challengePledgedAmount().call()
            console.log("confirm ==>", txinfo, txproof, value, JSON.stringify(txinfo))
            const data = {
                name: 'userChallenge',
                contractName: "ORMakerDeposit",
                contractAddr: this.selectItem.makerId,
                value,
                arguments: [txinfo, txproof]
            }
            console.log('userChallenge data ==>', data)
            const isNetwork = await linkNetwork()
            if (isNetwork) {
                const result = await contractMethod(linkWallet.value, data).catch(err => {
                    // err
                    isConfirm.value = true
                    console.log('userChallenge err ==>', err)
                    return
                })
                if (result && result.code === 200) {
                    // success
                    this.getTxData()
                    if (this.haxOptions.length == 0) {
                        this.$router.back()
                    }
                    isConfirm.value = true
                }
            } else {
                isConfirm.value = true
            }
            location.reload();
        }
    },
}
</script>
<style lang="scss" scoped>
.app {
    .arbitration-page{
        width: 700px;
        height: 570px;
        margin: auto;
        border-radius: 20px;
        
    }
}
.app-mobile {
    .arbitration-page{
        width: 100%;
    }
}
.arbitration-page {
    position: relative;
    .arbitration_box {
        padding: 20px;
        width: 100%;
        height: 100%;
        .title {
            font-size: 18px;
            margin-bottom: 38px;
        }
        .hax_box {
            text-align: left;
            margin-bottom: 20px;
            .hax_title {
                font-size: 14px;
                font-family: 'Inter';
                margin-bottom: 8px;
            }
        }
        .table_box {
            width: 100%;
            box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            font-size: 14px;
            margin-bottom: 40px;
            font-family: 'Inter';
            .table_title {
                background: #F5F5F5;
                height: 32px;
                line-height: 32px;
                display: flex;
                span {
                    flex: 1;
                }
            }
            .table_content {
                padding: 12px 0;
                .table_item {
                    height: 24px;
                    line-height: 24px;
                    display: flex;
                    span {
                        flex: 1;
                    }
                    .line_text {
                        display: inline-block;
                        border-bottom: 1px solid;
                        height: 22px;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .details_box {
            margin-bottom: 40px;
            .detail_item {
                font-family: 'Inter';
                text-align: left;
                margin-bottom: 12px;
                .detail_svg {
                    line-height: 0;
                }
                .detail_text {
                    font-size: 12px;
                    width: calc(100% - 16px);
                    padding-left: 6px;
                    box-sizing: border-box;
                    span {
                        color: rgba(51, 51, 51, 0.4);
                    }
                    .warning_text {
                        font-weight: bold;
                    }
                }
            }
            & .detail_item:last-child {
                margin: 0;
            }
        }
        .btn_box {
            .disabled {
                background-color: rgba(51, 51, 51, 0.2);
                &:hover {
                    background: none;
                    background-color: rgba(51, 51, 51, 0.3);
                }
            }
        }
    }
    .closed_icon {
        position: absolute;
        top: 15px;
        right: 26px;
        .close {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
}
</style>

<style scoped>
.arbitration_box >>> .el-select {
    width: 260px;
    height: 40px;
}
.arbitration_box >>> .el-input--suffix .el-input__inner {
    border: none;
    background-color: #F5F5F5;
    padding-left: 8px;
    border-radius: 12px;
    font-family: 'Inter';
}
.el-select-dropdown .el-select-dropdown__item {
    font-weight: normal;
    font-size: 14px;
}
</style>