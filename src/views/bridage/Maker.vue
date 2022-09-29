<template>
    <div class="Maker">
        <div class="maker-box-no">
            <div class="maker-title">Create a Market Maker Node</div>
            <div class="maker-content">
                <div class="maker-list">
                    <div class="maker-list-item">
                        <span class="maker-list-icon">1</span>
                        <span class="maker-list-details">Download the <a href="javascript:;">Market Maker Client</a> and rent a <a href="javascript:;">cloud service.</a></span>
                    </div>
                    <div class="maker-list-item">
                        <span class="maker-list-icon">2</span>
                        <span class="maker-list-details">Set Node parameters in the Market Maker Client webpage.</span>
                    </div>
                    <div class="maker-list-item">
                        <span class="maker-list-icon">3</span>
                        <span class="maker-list-details">Run the node and make sure to response to the users in time.</span>
                    </div>
                    <div class="maker-list-item">
                        <span class="maker-list-icon">4</span>
                        <span class="maker-list-details">Deposit Margin and keep enough liquidity in the node.</span>
                    </div>
                </div>
                <div class="maker-links">
                    <div class="maker-links-item">
                        <div class="maker-linksimg-box">
                            <SvgIconThemed icon="book-square" ></SvgIconThemed>
                        </div>
                        <a href="javascript:;">Docs for Market Maker</a>
                    </div>
                    <div class="maker-links-item">
                        <div class="maker-linksimg-box">
                            <SvgIconThemed icon="maker-discord" ></SvgIconThemed>
                        </div>
                        <a href="javascript:;">Get Help in Orbiter Discord</a>
                    </div>
                </div>
                <div class="maker-foot-btn">Download the Market Maker Client</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  SvgIconThemed,
} from '../../components'
export default {
    name: 'Maker',
    components: {
        SvgIconThemed
    }
}
</script>

<style lang="scss" scoped>
.app {
    .maker-box-no {
        width: 580px;
        .maker-content {
            .maker-foot-btn {
                width: 480px;
            }
        }
    }
}
.app-mobile {
    .maker-box-no {
        height: 100%;
        width: 100%;
    }
}
.Maker {
    .maker-box-no {
        padding: 34px 40px 38px;
        text-align: left;
        .maker-title {
            font-weight: 700;
            font-size: 20px;
            line-height: 20px;
        }
        .maker-content {
            font-family: 'Inter Regular';
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            margin-top: 30px;
            .maker-list {
                width: 100%;
                margin-bottom: 30px;
                .maker-list-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 17px;
                    .maker-list-icon {
                        display: inline-block;
                        color: #fff;
                        font-family: 'Itim';
                        background-color: #5EC2B7;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 16px;
                        list-style: none;
                        font-size: 12px;
                    }
                    .maker-list-details {
                        font-size: 14px;
                        margin-left: 12px;
                        a {
                            color: #5EC2B7;
                            text-decoration: underline;
                        }
                    }
                }
                & .maker-list-item:last-child {
                    margin: 0;
                }
            }
            .maker-links {
                width: 100%;
                margin-bottom: 37px;
                .maker-links-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                    .maker-linksimg-box {
                        width: 20px;
                        height: 20px;
                        margin-right: 11px;
                        svg, img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                    a {
                        font-size: 14px;
                        text-decoration: underline;
                    }
                }
                & .maker-links-item:last-child {
                    margin: 0;
                }
            }
            .maker-foot-btn {
                cursor: pointer;
                height: 50px;
                background: linear-gradient(90.46deg, #EB382D 4.07%, #BC3035 98.55%);
                box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.16);
                border-radius: 40px;
                font-weight: 700;
                font-size: 20px;
                line-height: 20px;
                color: #FFF;
                margin-top: 40px;
                text-align: center;
                line-height: 50px;
                font-family: 'Inter Bold';
                &:hover {
                background: #BC3035;
                box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.16);
                }
            }
        }
  }
}
</style>