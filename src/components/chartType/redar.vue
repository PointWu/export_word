<template>
    <div class="chart-box">

    </div>
</template>

<script>
    export default {
        props: ['index', 'dataTitle', 'dataNum', 'tableData'],
        data() {
            return {
                max: 0,
                data: [],
                array: []
            }
        },
        methods: {
            paint() {
                let chart = document.getElementsByClassName('chart-box')[this.index]
                let mychart = this.$echarts.init(chart)
                let option = {
                    tooltip: {},
                    grid: {
                        top: "10%",
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: this.data
                    },
                    series: [
                        {

                            type: 'radar',
                            areaStyle: { normal: {} },
                            data: [
                                {
                                    value: this.dataNum,
                                    name: '选项'
                                }
                            ],
                            itemStyle: {
                                normal: {
                                    color: '#027aff',
                                    label: {
                                        show: true,
                                        color: 'red',
                                    },
                                    labelLine: { show: true }
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
                this.$parent.$parent.$parent.$parent.$parent.setImageBase(this.index, url)
            }
        },
        mounted() {
            let that = this
            // window.sessionStorage.setItem('redarNum',JSON.stringify(this.dataNum))
            // this.dataNum.sort((num1, num2) => {
            //     return num1 - num2 < 0
            // })

            this.max = Math.max.apply(null, this.dataNum)
            // this.dataNum = JSON.parse(window.sessionStorage.getItem('redarNum'))
            console.log(this.dataNum)
            this.dataTitle.forEach((item, index) => {
                let jsonData = {}
                jsonData.name = item
                jsonData.max = that.max
                that.data.push(jsonData)
            });
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