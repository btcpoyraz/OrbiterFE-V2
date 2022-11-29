<template>
  <div
    class="header-ops"
    :style="`flex-direction: ${verical ? 'column' : 'row'};`"
  >
    <CommBtn
      ref="connectBtn"
      v-if="!isLogin && !isMobile"
      @click="connectAWallet"
      class="ops-item not-mode"
      style="margin-right: 10px"
      >Connect a Wallet</CommBtn
    >
    <template v-if="isLogin">
      <CommBtn
              ref="MakerArbitration"
              v-if="isMakerArbitration"
              @click="toDashBoardUrl"
              style="margin-right: 10px"
      >Maker Arbitration</CommBtn
      >
      <CommBtn
        ref="ClaimBtn"
        v-if="isClaim"
        @click="toClaim"
        style="margin-right: 10px"
        >Claim</CommBtn
      >
      <CommBtn
        ref="ArbitrationBtn"
        v-if="isArbitration"
        @click="toArbitration"
        style="margin-right: 10px"
        >Arbitration</CommBtn
      >
      <span @click="showHistory" class="ops-item">History</span>
      <div
        v-if="isSelectedStarkNet"
        ref="connectedStarkNetBtn"
        @click="connectStarkNetWallet"
        class="ops-item center"
        style="display: inline-flex"
      >
        <svg-icon
          style="width: 2rem; height: 2rem"
          iconName="sknlogo"
        ></svg-icon>
        <span class="address">{{
          starkAddress === 'not connected' ? 'connect starknet' : starkAddress
        }}</span>
      </div>
      <div
        ref="connectedBtn"
        @click="connectAWallet"
        class="ops-item center"
        style="display: inline-flex"
      >
        <svg-icon
          style="width: 2rem; height: 2rem"
          :iconName="
            globalSelectWalletConf.walletType &&
            globalSelectWalletConf.walletType.toLowerCase()
          "
        ></svg-icon>
        <span class="address">{{ showAddress }}</span>
      </div>
    </template>
    <div @click="toggleThemeMode" class="ops-mode">
      <SvgIconThemed class="mode-icon" icon="mode" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CommBtn, SvgIconThemed } from '../'
import { transferDataState, isMobile, linkWallet, arbitrationData } from '../../composition/hooks';
import {
  compatibleGlobalWalletConf,
  walletIsLogin,
} from '../../composition/walletsResponsiveData'
import {
  setStarkNetDialog,
  setSelectWalletDialogVisible,
} from '../../composition/hooks'
import { connectStarkNetWallet } from '../../util/constants/starknet/helper.js'
import {
  starkAddress,
  showAddress,
  saveSenderPageWorkingState,
  isClaim,
  isArbitration,
  isMakerArbitration,
  historyPanelState,
  setActiveName,
  getArbitrationData
} from '../../composition/hooks'
import { GraphQLClient, gql } from 'graphql-request'
import { nowMakerList } from "../../core/actions/thegraph";

export default {
  name: 'HeaderOps',
  components: { CommBtn, SvgIconThemed },
  props: {
    verical: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isMobile() {
      return isMobile.value
    },
    globalSelectWalletConf() {
      return compatibleGlobalWalletConf.value
    },
    isLogin() {
      return walletIsLogin.value
    },
    isSelectedStarkNet() {
      return (
        transferDataState.fromChainID == 4 ||
        transferDataState.fromChainID == 44 ||
        transferDataState.toChainID == 4 ||
        transferDataState.toChainID == 44
      )
    },
    starkAddress() {
      return starkAddress()
    },
    showAddress() {
      return showAddress()
    },
    linkWallet() {
      return linkWallet.value
    },
    isClaim() {
      return isClaim.value
    },
    isMakerArbitration() {
      return isMakerArbitration.value;
    },
    isArbitration() {
      return isArbitration.value
    }
  },
  data() {
    const selectedWallet = JSON.parse(
      localStorage.getItem('selectedWallet') || '{}'
    )
    return {
      selectedWallet
    }
  },
  watch: {
    linkWallet() {
      this.getIsArbitration()
      this.getIsClaim()
    }
  },
  created() {
    this.dashBoardUrl = this.$env.dashBoardUrl + '/maker';
  },
  methods: {
    ...mapMutations(['toggleThemeMode']),
    toDashBoardUrl() {
      window.open(this.dashBoardUrl);
    },
    async connectStarkNetWallet() {
      if (this.starkAddress === 'not connected') {
        await connectStarkNetWallet()
        return
      }
      setStarkNetDialog(true)
      setSelectWalletDialogVisible(true)
    },
    connectAWallet() {
      setStarkNetDialog(false)
      setSelectWalletDialogVisible(true)
      this.$emit('closeDrawer')
    },
    async getIsArbitration() {
      const arbitrationDataCount = (await getArbitrationData(this.linkWallet)).length;
      const haxOptionsCount  = arbitrationData.haxOptions.length;
      if (haxOptionsCount && arbitrationDataCount) {
        isArbitration.value = true
      } else {
        isArbitration.value = false
      }
      isMakerArbitration.value = !!((haxOptionsCount || arbitrationDataCount) && nowMakerList.find(item => item.makerAddress.toLowerCase() === linkWallet.value.toLowerCase()));
    },
    async getIsClaim() {
      const endpoint = this.$env.graphUrl
      const queryQl = gql`
      query MyQuery {
        grievanceEntities(where: {fromTx_: {from: "${linkWallet.value}"}}){
          id
          expectToken
          expectValue
          hash
          status
          createdAt
          latestReplyTime
          fromTx {
            from
            id
            timestamp
            value
          }
          toTx {
            id
            timestamp
            value
          }
        }
      }`
      const graphQLClient = new GraphQLClient(endpoint, {})
      const resp = await graphQLClient.request(queryQl)
      let data = resp.grievanceEntities
      let timer = parseInt(new Date().getTime() / 1000)
      if (data && data.find(v =>v.status === 0 && timer >= v.latestReplyTime)) {
        isClaim.value = true
      } else {
        isClaim.value = false
      }
    },
    async toClaim() {
      const route = this.$route
      setActiveName('Arbitration')
      historyPanelState.activeName = 'Arbitration'
      route.path !== '/history' &&
        this.$router.push({
          path: '/history',
        })
    },
    toArbitration() {
      const route = this.$route
      route.path !== '/arbitration' &&
        this.$router.push({
          path: '/arbitration',
        })
    },
    showHistory() {
      this.$emit('closeDrawer')
        setActiveName('History')
       historyPanelState.activeName == 'History'
      const route = this.$route
      route.path !== '/history' &&
        localStorage.setItem(
          'last_page_before_history',
          JSON.stringify({
            path: route.path,
            params: route.params,
            query: route.query,
          })
        )
      if (route.path === '/') {
        saveSenderPageWorkingState()
      }
      route.path !== '/history' &&
        this.$router.push({
          path: '/history',
        })
    },
  },
}
</script>

<style scoped lang="scss">
.header-ops {
  margin-right: 16px;
  display: flex;
  align-items: center;
  .ops-mode {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .mode-icon {
      width: 16px;
      height: 16px;
    }
  }
  .ops-item {
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    margin-right: 10px;
    cursor: pointer;
    .address {
      margin-left: 4px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
.app {
  .header-ops {
    height: 40px;
  }
}
.app-mobile {
  .header-ops {
    margin-top: 19px;
    .ops-item {
      width: 100%;
      margin-bottom: 30px;
    }
  }
}
</style>
