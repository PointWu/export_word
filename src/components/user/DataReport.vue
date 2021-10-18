<template>
    <div>
        <!-- 侧边内容区域 -->
        <el-aside class="aside" width="200px">
            <el-card class="aside-card" body-style="padding-top:0px;">
                <!-- 按钮 -->
                <div v-bind:class="{ asideDiv:true,isActive:true }">
                    <i class="icon-data"></i>
                </div>
                <span class="qestype-title">数据分析</span>
            </el-card>
        </el-aside>
        <!-- 主体内容区域 -->
        <el-main class="main">
            <el-card class="data-summary" body-style="padding-bottom:15px;">
                <span class="ds-title">数据概述</span>
                <div class="data-specific">
                    <span>今日新增数据</span>
                    <span>数据收集总量</span>
                </div>
                <div class="num-specific">
                    <span>20</span>
                    <span>50</span>
                </div>
            </el-card>
            <div class="statistical-chart">
                <el-card class="sc-title">
                    <span class="title">统计图表</span>
                    <el-button type="primary" plain @click="exportWord">
                        <i class="icon-export"></i>
                        导出Word
                    </el-button>
                    <!-- <download-excel class="export-excel-wrapper" :data="json_data" :fields="json_fields" -->
                        <!-- name="远程诊断报告导出.xls"> -->
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button type="primary" plain>
                            <i class="icon-export"></i>
                            导出EXCEL
                        </el-button>
                    <!-- </download-excel> -->
                    <el-button type="primary" plain>
                        <i class="icon-export"></i>
                        导出SPSS
                    </el-button>
                </el-card>
                <el-card class="chart-subject" body-style="padding:0px;height:520px;">
                    <el-scrollbar style="height: 100%;">
                        <el-card class="chart-container">
                            <div class="container" v-for="item,index in chartData">
                                <div class="header">
                                    <span class="title">Q{{index+1}}{{item.title}}</span>
                                    <el-dropdown split-button class="select" size="mini" v-if="item.ifChart">
                                        {{item.componentName}}
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="changeChart('rectangle',index,'柱状图')">柱状图
                                            </el-dropdown-item>
                                            <el-dropdown-item @click.native="changeChart('linex',index,'折线图')">折线图
                                            </el-dropdown-item>
                                            <el-dropdown-item @click.native="changeChart('pie',index,'圆饼图')">圆饼图
                                            </el-dropdown-item>
                                            <el-dropdown-item @click.native="changeChart('redar',index,'雷达图')">雷达图
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                                <div class="content">
                                    <div :is="item.component" :index="index" :dataTitle="item.dataTitle"
                                        :title="item.title" :tableData="item.tableData" :dataNum="item.dataNum">
                                    </div>
                                </div>
                            </div>

                        </el-card>
                    </el-scrollbar>
                </el-card>
            </div>
        </el-main>
    </div>
</template>

<script>
    import redar from '../chartType/redar.vue'
    import linex from '../chartType/Line.vue'
    import pie from '../chartType/Pie.vue'
    import rectangle from '../chartType/rectangle.vue'
    import tablex from '../chartType/table.vue'
    import JSZipUtils from 'jszip-utils'
    import docxtemplater from 'docxtemplater'
    import { saveAs } from 'file-saver'
    import PizZip from 'pizzip'
    export default {
        data() {
            return {
                chartData: [
                    { id: 1, title: '小笨蛋', dataTitle: ['03.01', '03.02', '03.03',], dataNum: [5, 10, 3], tableData: [], component: 'rectangle', ifChart: true, componentName: '柱状图' },
                    {
                        id: 3, title: '小笨蛋', dataTitle: ['03.01', '03.02', '03.03',], dataNum: [5, 10, 3],
                        tableData: [{ name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' }, { name: '小戏精' },]
                        , component: 'tablex', ifChart: false, componentName: '表格'
                    },
                    { id: 2, title: '小笨蛋', dataTitle: ['03.01', '03.02', '03.03',], dataNum: [5, 7, 3], tableData: [], component: 'rectangle', ifChart: true, componentName: '柱状图' }
                ],
                imageListBase: [],
            }
        },
        computed: {
            option() {
                return echartConfig(this);
            },
            columns() {
                return tableConfig(this);
            }
        },
        methods: {
            changeChart(type, id, name) {
                this.chartData[id].component = type
                this.chartData[id].componentName = name
            },
            setImageBase(index, url) {
                this.imageListBase[index].url = url
                console.log(this.imageListBase)
            },
            // 点击导出成word文档
            base64DataURLToArrayBuffer(dataURL) {
                const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
                if (!base64Regex.test(dataURL)) {
                    return false;
                }
                const stringBase64 = dataURL.replace(base64Regex, "");
                let binaryString;
                if (typeof window !== "undefined") {
                    binaryString = window.atob(stringBase64);
                } else {
                    binaryString = new Buffer(stringBase64, "base64").toString("binary");
                }
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    const ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                }
                return bytes.buffer;
            },
            exportWord() {
                let ImageModule = require('docxtemplater-image-module-free');

                // 点击导出word
                let _this = this;
                // 读取并获得模板文件的二进制内容
                JSZipUtils.getBinaryContent("input.docx", function (error, content) {
                    if (error) {
                        throw error;
                    }
                    let opts = {}
                    opts.centered = true;  
                    opts.fileType = "docx";
                    opts.getImage = function (chartId) {
                        return _this.base64DataURLToArrayBuffer(chartId);
                    }
                    opts.getSize = function () {
                        return [734, 250]
                    }
                    let imageModule = new ImageModule(opts);
                    let zip = new PizZip(content);
                    let doc = new docxtemplater();
                    doc.attachModule(imageModule);
                    doc.loadZip(zip);
                    doc.setData({
                        imagelist: _this.imageListBase,
                    });

                    try {
                        doc.render();
                    } catch (error) {
                        let e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties
                        };
                        throw error;
                    }
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    saveAs(out, "echartsWord.docx");
                });
            }
        },
        created() {
            // 页面初始化时初始化数据
            for (let i = 0; i < this.chartData.length; i++) {
                let lis = {}
                lis.title = this.chartData[i].title
                lis.ifChart = !this.chartData[i].ifChart
                lis.tableData = this.chartData[i].tableData
                lis.url = ''
                this.imageListBase.push(lis)
            }
        },
        components: {
            redar,
            rectangle,
            linex,
            pie,
            tablex
        }
    }
</script>

<style lang='less' scoped>
    div {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    .main {
        width: 1390px;
        display: block;
        float: left;
        position: absolute;
        left: 140px;
        box-sizing: border-box;

        /* 数据概述 */
        .data-summary {
            width: 100%;
            display: block;
            box-sizing: border-box;
            margin-top: 30px;
            border-radius: 10px;

            .ds-title {
                display: block;
                margin-left: 40px;
                font-size: 24px;
            }

            /* 数据名 */
            .data-specific {
                width: 100%;
                display: flex;
                height: 40px;

                span {
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                }
            }

            /* 数据 */
            .num-specific {
                width: 100%;
                display: flex;

                span {
                    flex: 1;
                    text-align: center;
                    font-size: 30px;
                }
            }
        }

        /* 统计图表 */
        .statistical-chart {
            width: 100%;
            display: block;
            margin-top: 30px;

            /* 标题 */
            .sc-title {
                width: 100%;
                display: block;
                padding-bottom: 10px;

                .title {
                    font-size: 24px;
                    margin-left: 40px;
                    display: block;
                    float: left;
                }

                /* 按钮 */
                .el-button {
                    font-size: 16px;
                    display: block;
                    float: right;
                    position: relative;
                    bottom: 10px;
                    padding-left: 58px;
                    padding-right: 38px;
                    background-color: #fff;
                    border: 1px solid #999999;
                    color: #666666;
                    margin: 0;
                    margin-right: 20px;

                    .icon-export {
                        width: 18px;
                        height: 18px;
                        display: block;
                        position: absolute;
                        left: 38px;
                        top: 10px;
                        background: url(
                            ../../assets/img/icon/export.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }

        /* 图表容器 */
        .chart-subject {
            height: 520px;
            box-sizing: border-box;

            .el-scrollbar {
                height: 520px;

                /* 图表盒子 */
                .chart-container {
                    box-sizing: border-box;
                    display: block;
                    text-align: center;

                    .container {
                        width: 1200px;
                        margin: 0 auto;
                        display: block;
                        height: 450px;
                        border: 1px solid #e6e6e6;
                        box-sizing: border-box;
                        margin-top: 50px;

                        &:first-child {
                            margin-top: 0;
                        }

                        .header {
                            height: 40px;
                            width: 100%;
                            display: block;
                            background-color: #e6e6e6;

                            .title {
                                height: 40px;
                                display: block;
                                line-height: 40px;
                                width: 80px;
                                text-align: left;
                                margin-left: 20px;
                                float: left;
                            }

                            .select {
                                width: 120px;
                                margin-top: 6px;
                                margin-right: 20px;
                                display: block;
                                float: right;
                            }
                        }

                        .content {
                            height: 408px;
                            margin: 0;
                        }
                    }
                }
            }
        }
    }



    /* 侧边卡片 */
    .el-aside {
        overflow: hidden !important;
        width: 90px !important;
        display: block;
        float: left;

        .aside-card {
            height: 800px;
            overflow: none;
            box-sizing: border-box;
        }

    }

    /* 主体内容区域 */
    .el-main /deep/ {
        padding: 0;
        margin-left: 0px;
        overflow-y: hidden !important;
    }

    .el-main::-webkit-scrollbar {
        display: none;
    }

    /* 侧边栏题型按钮 */
    .asideDiv {
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        font-size: 32px;
        border-radius: 5px;
        overflow: hidden;
        transition: all .2s;
        cursor: pointer;
        margin-top: 10px;

        i {
            width: 32px;
            height: 32px;
            display: block;
            margin-left: 9px;
        }
    }

    /* 鼠标点击按钮 */
    .isActive {
        background-color: #027aff;
        transition: all .2s;

        .icon-data {
            background-image: url('../../assets/img/icon/data.png') !important;
            background-size: 100% 100%;
        }
    }



    /* 按钮标题 */
    .qestype-title {
        font-size: 12px;
        text-align: center;
        display: block;
        margin-top: 10px;
    }
</style>