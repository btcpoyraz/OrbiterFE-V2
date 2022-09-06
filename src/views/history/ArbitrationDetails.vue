<template>
    <div class="arbitration-details">
        <div class="details_content">
            <CommBoxHeader :back="closerButton" :style="isMobile ? '' : 'margin-bottom:30px;'">Details</CommBoxHeader>
            <div class="close_box">
                <svg-icon @click.native="closerButton" class="close" iconName="close" style="width: 12px;height: 12px;"></svg-icon>
            </div>
            <div class="step_box">
                <el-steps :active="1" align-center v-show="status === 1">
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
                <el-steps :active="1" align-center v-show="status === 2">
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
                <el-steps :active="1" align-center v-show="status === 3">
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
                <el-steps :active="1" align-center v-show="status === 4">
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
                                <span>Tx:0x1234...5678</span>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
                <el-steps :active="1" align-center v-show="status === 5">
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
                                <span>Tx:0x1234...5678</span>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
            <div class="timer_line">
                <div class="line_box">
                    <CommTimeline :timeLineData="timeLineData"></CommTimeline>
                </div>
            </div>
            <div class="btn_box" v-if="status == 3">
                <CommBtn ref="WithdrawBtn" style="width: 200px;" :disabled="!isWithdraw">
                    {{isWithdraw ? 'Withdraw' : 'Waiting...'}}
                </CommBtn>
            </div>
        </div>
    </div>
</template>
<script>
import {
  SvgIconThemed,
  CommBoxHeader,
  CommBtn,
  CommTimeline
} from '../../components'
import {
  isMobile,
  isWithdraw,
  historyPanelState
} from '../../composition/hooks'
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
        timeLineData() {
            return historyPanelState.timeLineData
        }
    },
    methods: {
        closerButton() {
            this.$emit('stateChanged', 1)
        },
    },
}
</script>
<style lang="scss" scoped>
.app {
    .arbitration-details{
        width: 600px;
        height: 570px;
        border-radius: 20px;
    }
}
.app-mobile {
    .arbitration-details{
        width: 100%;
    }
}
.arbitration-details {
    .details_content{
        position: relative;
        .close_box {
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
                padding: 16px 32px;
                background-color: #F5F5F5;
                border-radius: 20px;
            }
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
.step_box >>> .el-step.is-center .el-step__description{
    font-size: 14px;
    color: rgba(51, 51, 51, 0.8);;
}
</style>