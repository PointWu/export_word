<template>
    <div class="chart-box">

    </div>
</template>

<script>
    export default {
        props: ['index', 'dataTitle', 'dataNum', 'tableData'],
        data() {
            return {
                data: []
            }
        },
        methods: {
            paint() {
                let chart = document.getElementsByClassName('chart-box')[this.index]
                let mychart = this.$echarts.init(chart)
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    grid: {
                        top: "10%",
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    legend: {
                        left: 'center',
                        top: 'bottom',
                        data: this.dataTitle
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            }
                        }
                    },
                    series: [
                        {
                            name: '选项',
                            type: 'pie',
                            center: ['50%', '50%'],
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: this.data,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: '{b} : {c} ({d}%)'
                                    },
                                    labelLine: { show: true }
                                }
                            },
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
                this.$parent.$parent.$parent.$parent.$parent.setImageBase(this.index, url)
            }
        },
        mounted() {
            let that = this
            this.dataTitle.forEach((item, index) => {
                let jsonData = {}
                jsonData.name = item
                jsonData.value = that.dataNum[index]
                that.data.push(jsonData)
            });
            // console.log(this.data)
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