<template>
    <div class="chart-box">

    </div>
</template>

<script>
    export default {
        props: ['index', 'dataTitle', 'dataNum', 'tableData'],
        data() {
            return {
                // 图标数据
                days: ['03.01', '03.02', '03.03',],
                data: [5, 7, 3]
            }
        },
        methods: {
            paint() {
                let chart = document.getElementsByClassName('chart-box')[this.index]
                let mychart = this.$echarts.init(chart)
                let option = {
                    tooltip: {
                        trigger: 'axis'
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
                            boundaryGap: false,
                            data: this.dataTitle,
                            axisLabel: {
                                textStyle: {
                                    color: "rgba(0,0,0,.5)",
                                    fontSize: 12
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(0,0,0,.1)"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            // 坐标轴刻度
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(0,0,0,.1)"
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgba(0,0,0,.5)",
                                    fontSize: 12
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(0,0,0,.1)"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '选择数',
                            type: 'line',
                            // 填充颜色

                            // 蛇者拐点 小圆点
                            symbol: "circle",
                            // 拐点大小
                            symbolSize: 5,
                            itemStyle: {
                                color: '#027aff',
                                borderColor: '#027aff',
                                borderWidth: 12
                            },
                            data: this.dataNum,
                            lineStyle: {
                                color: "#027aff",
                                width: 2
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        color: '#027aff',
                                        borderColor: '#027aff',
                                    },
                                    labelLine: { show: true },
                                    color: '#027aff',
                                    borderColor: '#027aff',
                                }
                            },
                            // 开始不显示拐点，鼠标经过显示
                        }
                    ]
                };

                mychart.setOption(option)
                let that = this
                // 延时获取图片，因为有动画效果，立即获取回导致获取的照片显示不全
                setTimeout(function () {
                    that.getBaseImage(mychart)
                }, 1000)
            },
            getBaseImage(chart) {
                let url = chart.getDataURL({
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                })
                // 向父组件传图片base64格式
                this.$parent.$parent.$parent.$parent.$parent.setImageBase(this.index, url)
            }
        },
        mounted() {
            // console.log(this.dataNum)
            this.paint()
        }
    }
</script>

<style lang='less' scoped>
    .chart-box {
        width: 100%;
        height: 100%;
        display: block;
        color: rgb(2, 122, 255);
    }
</style>