<template>
    <div class="chart-box">

    </div>
</template>

<script>
    export default {
        props: ['index', 'dataTitle', 'dataNum', 'tableData'],
        data() {
            return {

            }
        },
        methods: {
            paint() {
                let chart = document.getElementsByClassName('chart-box')[this.index]
                let mychart = this.$echarts.init(chart)
                let option = {
                    color: ['#027aff'],

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: "10%",
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.dataTitle,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '选择数',
                            type: 'bar',
                            barWidth: '60%',
                            data: this.dataNum,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#027aff',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }
                        }
                    ]
                };


                mychart.setOption(option)
                let that = this
                setTimeout(function () {
                    that.getBaseImage(mychart)
                }, 1000)
            },
            getBaseImage(chart) {
                let url = chart.getDataURL({
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                })
                this.$parent.$parent.$parent.$parent.$parent.setImageBase(this.index,url)
            }
        },
        mounted() {
            this.paint()
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