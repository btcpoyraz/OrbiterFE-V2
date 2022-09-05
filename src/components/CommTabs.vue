<template>
    <div class="tabs_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in tabsList" :key="index"></el-tab-pane>
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
    data() {
        return {
            activeName: ''
        }
    },
    created() {
        this.activeName = this.active
    },
    methods: {
        handleClick(tab, event) {
            this.$emit('tabsChange', this.activeName)
        }
    }
}
</script>
<style lang="scss">
.tabs_box {
    .el-tabs__header {
        margin: 0;
    }
    .el-tabs__item {
        font-family: 'Inter Bold';
        height: 48px;
        padding: 0;
        margin-right: 48px;
        color: rgba(51, 51, 51, 0.8);;
    }
    .el-tabs__item:hover {
        color: #DF2E2D;
    }
    .is-active {
        position: relative;
        &::after {
            content: '';
            display: block;
            width: 40px;
            height: 6px;
            background-color: #DF2E2D;
            border-radius: 11px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .el-tabs__item.is-active {
        color: #DF2E2D;
    }
    
    .el-tabs__active-bar {
        display: none;
        
    }
    .el-tabs__nav-wrap::after {
        display: none;
    }
}
</style>