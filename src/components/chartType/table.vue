<template>
    <div class="chart-box">
        <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column prop="name" :label="title">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['index', 'dataTitle', 'dataNum', 'tableData', 'title'],
        data() {
            return {
            }
        },
        methods: {
            paint() {

            },
        },
        mounted() {
        }
    }
</script>

<style lang='less' scoped>
    .chart-box {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>