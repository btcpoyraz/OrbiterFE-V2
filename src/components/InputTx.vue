<template>
    <div class="inputTx">
        <div class="input_box" @click.stop="stopPenetrate">
            <div class="topItem">
                <span>To Tx</span>
                <div @click="closerButton" style="position: absolute; top: 0; right: 0">
                    <SvgIconThemed
                        style="width: 20px; height: 20px; cursor: pointer"
                        iconName="close"
                    />
                </div>
            </div>
            <div class="inputItem">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder=""
                    v-model="toTextarea">
                </el-input>
            </div>
            <div class="btnItem" @click="submitTx">
                <CommBtn ref="paybackBtn" style="width: 120px;" :disabled="isDisabled">
                    Confirm
                </CommBtn>
            </div>
        </div>
    </div>
</template>
<script>
import { SvgIconThemed } from './'
import CommBtn from './CommBtn.vue'
import util from '../util/util'
export default {
    name: 'InputTx',
    props: {
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            toTextarea: '',
        }
    },
    components: {
        SvgIconThemed,
        CommBtn
    },
    methods: {
        stopPenetrate(e) {
            e.stopPropagation
        },
        closerButton() {
            this.$emit('closeInput')
        },
        submitTx() {
            if (this.toTextarea == '') {
                util.showMessage(
                    'Please enter a transaction Tx',
                    'error'
                )
                return
            }
            this.$emit('makerChange', this.toTextarea)
        }
    },
}
</script>
<style lang="scss" scoped>
.app {
  .inputTx {
    width: 320px;
    // height: 372px;
  }
}
.app-mobile {
  .inputTx {
    width: calc(100% - 30px);
    max-height: 90vh;
    // height: 372px;
  }
}
.inputTx {
    border-radius: 12px;
    width: 100px;
    height: 100px;
    position: relative;
    margin: 4.2rem auto;
    // background-color: #fff;
    height: calc(
        100% - 8.4rem - var(--top-nav-height) - var(--bottom-nav-height)
    );
    border-radius: 20px;
    padding: 20px 0;
    .input_box {
        position: relative;
        padding: 0 20px;
        .topItem {
            width: 100%;
            height: 2rem;
            font-size: 2rem;
            font-weight: bold;
            line-height: 2rem;
            display: flex;
            // justify-content: space-between;
            justify-content: center;
            padding: 0 1rem;
            margin-bottom: 18px;
            position: relative;
        }
        .inputItem {
            // height: 10rem;
            .el-textarea__inner {
                border-color: #ccc;
            }
        }
        .btnItem {
            margin-top: 20px;
        }
    }
}
</style>