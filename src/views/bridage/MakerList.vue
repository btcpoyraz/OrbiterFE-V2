<template>
    <div class="MakerList">
        <div class="node_box" v-for="(item, index) in nodeList" :key="index">
            <div class="node_top clearfix">
                <div class="node_icon fl">
                    <span>Node {{index + 1}}</span>
                    <svg-icon :iconName="showChainIcon(1)" style="width: 24px; height: 24px"></svg-icon>
                    <span>{{showChainUnit(item.localUintID)}}</span>
                </div>
                <div class="node_status fl">
                    <div class="node_success" v-if="item.status == 1">
                        <svg-icon iconName="yes-icon" style="width: 17px; height: 17px"></svg-icon>
                        <span>Stable operating</span>
                    </div>
                    <div class="node_warning" v-if="item.status == 2">
                        <svg-icon iconName="warning-h" style="width: 17px; height: 17px"></svg-icon>
                        <span>Node Client is offline!</span>
                        <img src="../../assets/data/setting_icon.png" alt="" srcset="">
                    </div>
                </div>
                <!-- <div class="node_price fr">
                    <span>2022 Feb 15</span>
                    <span>|</span>
                    <span>Margin</span>
                    <span>35 {{showChainUnit(item.localUintID)}}</span>
                </div> -->
            </div>
            <!-- <div class="node_total">
                <div class="total_left clearfix fl">
                    <div class="total_item fl">
                        <span>Total Revenue</span>
                        <b>1.235 {{showChainUnit(item.localUintID)}}</b>
                    </div>
                    <div class="total_item fl">
                        <span>APR</span>
                        <b>56.12%</b>
                    </div>
                </div>
                <div class="total_right fr">
                    <div class="total_date">
                        <span>Previous day revenue</span>
                        <b>0.535 {{showChainUnit(item.localUintID)}}</b>
                        <SvgIconThemed class="seconds" icon="forward-15-seconds" style="width: 14px;height: 14px"/>
                        <span>15h ago</span>
                    </div>
                </div>
            </div> -->
            <!-- <div class="node_item clearfix">
                <div class="item_left fl">
                    Network & Balance
                </div>
                <div class="item_right fl clearfix">
                    <div class="item_list fl" v-for="(val, idx) in item.balanceList" :key="idx">
                        <svg-icon :iconName="showChainIcon(val.localChainID)" style="width: 19px; height: 19px"></svg-icon>
                        <span v-show="val.balance.eth && val.balance.eth != 0">{{val.balance.eth}}ETH</span> <span v-show="val.balance.usdc">&nbsp;,&nbsp;</span>
                        <span v-show="val.balance.usdc && val.balance.usdc != 0">{{val.balance.usdc}}USDC</span> <span v-show="val.balance.usdt">&nbsp;,&nbsp;</span>
                        <span v-show="val.balance.usdt && val.balance.usdt != 0">{{val.balance.usdt}}USDT</span> <span v-show="val.balance.dai">&nbsp;,&nbsp;</span>
                        <span v-show="val.balance.dai && val.balance.dai != 0">{{val.balance.dai}}DAI</span> <span v-show="val.balance.metis">&nbsp;,&nbsp;</span>
                        <span v-show="val.balance.metis && val.balance.metis != 0">{{val.balance.metis}}Metis</span>
                    </div>
                </div>
            </div> -->
            <!-- <div class="node_warning">
                <div class="warning_text" v-show="item.warning == 1">
                    <svg-icon iconName="warning-h" style="width: 17px; height: 17px"></svg-icon>
                    <span>2 To_Txns have been missed for more than 30 mins!</span>
                </div>
                <div class="warning_text" v-show="item.warning == 2">
                    <span class="warning_icon">WARNING</span>
                    <span>You've reveived 2 arbitrations!</span>
                </div>
                <div class="to_handle">
                    <span>Handle</span>
                    <svg-icon iconName="export_icon" style="width: 15px;height: 15px;"></svg-icon>
                </div>
            </div> -->
        </div>
        <div class="create_setting">
            <div class="create_box">
                <SvgIconThemed icon="add-circle" style="width: 24px;height: 24px"/>
                <a :href="dashBoardUrl" target="_blank">New Node</a>
            </div>
            <div class="setting_box">
                <SvgIconThemed icon="setting-2" style="width: 24px;height: 24px"/>
                <a :href="dashBoardUrl" target="_blank">Set</a>
            </div>
        </div>
    </div>
</template>

<script>
import {
  SvgIconThemed,
} from '../../components'
import {
  makerDataStatus,
  chainUnit,
  myMaker
} from '../../composition/hooks'
import { chain2icon } from '../../util'
import SvgIcon from '../../components/SvgIcon/SvgIcon.vue'
import { GraphQLClient, gql } from 'graphql-request'


export default {
    name: 'MakerList',
    data() {
        return {
            dashBoardUrl: ''
        }
    },
    created () {
        this.getLpNodes()
        this.dashBoardUrl = this.$env.dashBoardUrl + '/makerNode';
    },
    computed: { 
        nodeList() {
            return makerDataStatus.nodeList
        }
    },
    components: {
        SvgIconThemed,
        SvgIcon
    },
    methods: {
        showChainIcon(localChainID) {
            return chain2icon(localChainID)
        },
        showChainUnit(localUintID) {
            return chainUnit(localUintID)
        },
        async getLpNodes() {
            const endpoint = this.$env.graphUrl
            const query = gql`
                query MyQuery {
                    lpEntities(where: {maker_contains: "${myMaker.value}", status: 1, stopTime: null}) {
                        maxPrice
                        minPrice
                        gasFee
                        destPresion
                        sourcePresion
                        tradingFee
                        startTime
                        stopTime
                        status
                        maker {
                            id
                        }
                        pair {
                            id
                            sourceChain
                            sourceToken
                            destChain
                            destToken
                        }
                    }
                }
            `
            const graphQLClient = new GraphQLClient(endpoint, {})
            const resp = await graphQLClient.request(query)
            const data = resp.lpEntities
            // console.log("resp data ==>", data)
            let networkList = []
            data.map(v => {
                if (!networkList.includes(Number(v.pair.destChain))) {
                    networkList.push(Number(v.pair.destChain))
                }
            })
            
        }
    },
}
</script>

<style lang="scss" scoped>
.app {
    .MakerList {
        width: 1000px;
    }
}
.app-mobile {
    .MakerList {
        width: 100%;
        height: 100%;
    }
}
.MakerList {
    position: relative;
    .node_box {
        padding: 25px 40px 30px;
        width: 100%;
        border-radius: 20px;
        margin-bottom: 30px;
        .node_top {
            margin-bottom: 30px;
            .node_icon {
                font-size: 20px;
                display: flex;
                align-items: center;
                svg {
                    margin: 0 11px 0 30px;
                }
            }
            .node_status {
                margin-left: 30px;
                line-height: 30px;
                .node_success, .node_warning {
                    display: flex;
                    align-items: center;
                    svg {
                        height: 17px;
                    }
                    span {
                        display: inline-block;
                        margin-left: 8px;
                        color: #5EC2B7;
                        font-size: 14px;
                    }
                }
                .node_warning {
                    span {
                        color: #DF2E2D;
                        margin-right: 5px;
                    }
                    img {
                        height: 17px;
                    }
                }
            }
            .node_price {
                display: flex;
                align-items: center;
                text-align: right;
                margin-left: auto;
                span {
                    font-family: 'Inter';
                    font-size: 12px;
                }
                & span:nth-of-type(2) {
                    margin: 0 9px;
                }
                & span:nth-of-type(4) {
                    font-family: 'Inter Bold';
                    font-size: 18px;
                    margin-left: 20px;
                }
            }
        }
        .node_total {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            .total_left {
                display: flex;
                align-items: center;
                .total_item {
                    margin-right: 40px;
                    display: flex;
                    align-items: center;
                    span {
                        font-family: 'Inter';
                        font-size: 12px;
                        margin-right: 13px;
                    }
                    b {
                        font-size: 18px;
                    }
                }
                & .total_item:last-child {
                    margin: 0;  
                }
            }
            .total_right {
                margin-left: auto;
                .total_date {
                    display: flex;
                    align-items: center;
                    span {
                        font-size: 12px;
                        font-family: 'Inter';
                    }
                    b {
                        font-size: 18px;
                        margin-left: 13px;
                    }
                    svg {
                        width: 14px;
                        margin: 0 5px 0 10px;
                    }
                }
            }

        }
        .node_item {
            .item_left {
                text-align: left;
                width: 140px;
                font-family: 'Inter';
                font-size: 12px;
                line-height: 24px;
            }
            .item_right {
                width: calc(100% - 150px);
                .item_list {
                    margin-bottom: 25px;
                    margin-right: 40px;
                    display: flex;
                    align-items: center;
                    svg {
                        margin-right: 10px;
                    }
                    span {
                        font-size: 16px;
                        color: rgba(51, 51, 51, 0.6);
                    }
                }
            }
        }
        .node_warning {
            display: flex;
            align-items: center;
            .warning_text {
                display: flex;
                align-items: center;
                color: #DF2E2D;
                svg {
                    width: 16px;
                    margin-right: 11px;
                    margin-top: -2px;
                }
                span {
                    font-size: 14px;
                }
                .warning_icon {
                    color: #fff;
                    padding: 0 10px;
                    background-color: #DF2E2D;
                    margin-right: 6px;
                    border-radius: 20px;
                }
            }
            .to_handle {
                margin-left: auto;
                cursor: pointer;
                height: 40px;
                padding: 0 34px;
                background: #DF2E2D;
                box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.16);
                border-radius: 40px;
                display: flex;
                align-items: center;
                span {
                    font-size: 20px;
                    color: #fff;
                }
                svg {
                    margin-left: 7px;
                    height: 15px;
                }
            }
        }
    }
    & .node_box:last-child {
        margin: 0;
    }

    .create_setting {
        position: absolute;
        top: -55px;
        right: 15px;
        display: flex;
        align-items: center;
        .create_box, .setting_box {
            cursor: pointer;
            display: flex;
            align-items: center;
            svg {
                height: 24px;
                margin-right: 6px;
            }
            span {
                font-size: 16px;
                color: rgba(51, 51, 51, 0.8);
            }
        }
        .create_box {
            margin-right: 24px;
        }
    }
 }
</style>