<template>
    <div class="tabs_box">
        <el-tabs v-model="active" @tab-click="handleClick">
            <el-tab-pane label="History" name="History"></el-tab-pane>
            <el-tab-pane label="Arbitration History" name="Arbitration"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'CommTabs',
    props: {
        tabsList: {
            type: Array,
            default: []
        },
        active: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            this.$emit('tabsChange', active)
        }
    }
}
</script>
<style lang="scss" scoped>
.tabs_box {

}
</style>