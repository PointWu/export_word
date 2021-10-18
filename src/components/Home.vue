<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="loginOut">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollpase">|||</div>
                <!-- 侧边栏菜单区-->
                <el-menu :default-active="activePath" :router="true" :collapse-transition="false" :collapse="isCollapse"
                    unique-opened background-color="#333744" text-color="#fff" active-text-color="#409cef">
                    <!-- 一级菜单-->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <!-- 图标-->
                            <i :class="iconObj[item.id]"></i>
                            <!-- 文本-->
                            <span>{{ nameObj[item.id] }}</span>
                        </template>
                        <!-- 二级菜单-->
                        <el-menu-item @click="saveNavState('/' + subItem.path)" :index="'/' + subItem.path"
                            v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <!-- 图标-->
                                <i class="el-icon-menu"></i>
                                <!-- 文本-->
                                <span>{{childName[subItem.id]}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                iconObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 是否折叠
                isCollapse: false,
                nameObj: {
                    '125': '用户管理',
                    '103': '权限管理',
                    '101': '商品管理',
                    '102': '订单管理',
                    '145': '数据统计'
                },
                childName: {
                    '110': '用户列表',
                    '111': '角色列表',
                    '112': '权限列表',
                    '104': '商品列表',
                    '115': '分类参数',
                    '121': '商品分类',
                    '107': '订单列表',
                    '146': '数据统计'
                },
                //被激活的链接地址
                activePath: '',
            }
        },
        methods: {
            // 退出登录
            loginOut() {
                window.sessionStorage.clear()
                this.$router.push("/login")
            },
            //获取所有的菜单
            async getMenuList() {
                // 发送请求
                const { data: res } = await this.$http.get('menus')
                // 请求失败返回错误信息
                if (res.meta.status !== 200) {
                    return this.$message.error(res)
                }
                // 请求成功存储数据
                this.menulist = res.data
            },
            //点击按钮切换菜单的折叠与展开
            toggleCollpase() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                this.activePath = activePath
                window.sessionStorage.setItem('activePath', activePath)
            }
        },
        // 初始化左侧菜单
        created() {
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        }

    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: white;
        font-size: 20px;

        >div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;

        .el-menu {
            border: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: white;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>