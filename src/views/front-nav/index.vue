<template>
  <div class="frontNav-container px-40 pt-40">
    <h2 class="title text-center text-white">小侯爷的网址导航</h2>
    <el-tabs v-model="activeName" class="tabs" :style="{ '--el-text-color-primary': '#fff' }">
      <el-tab-pane v-for="item in paneList" :key="item.id" class="pane" :label="item.name" :name="item.name">
        <div v-for="item2 in item.children" :key="item2.id" class="pane-box">
          <div class="pane-head flex flex-center text-white">
            <div>{{ item2.name }}</div>
          </div>
          <div v-for="item3 in item2.children" :key="item3.id" class="pane-content text-white">
            <el-tooltip placement="bottom" effect="light">
              <el-link class="pane-content-name" :underline="false" target="_blank" :href="item3.link">
                <div>{{ item3.name }}</div>
              </el-link>
              <template #content>
                <div>{{ item3.content }}</div>
                <div>{{ item3.link }}</div>
              </template>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { getCategoryListAll } from '@/api/menus'
import { ObjTy } from '~/common'

const state = reactive({
  activeName: '',
  paneList: []
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = () => {
  getCategoryListAll({}).then((response: ObjTy) => {
    state.paneList = response.data
    state.activeName = response.data.length !== 0 ? response.data[0].name : ''
  })
}

//导出属性到页面中使用
const { activeName, paneList } = toRefs(state)
</script>

<style scoped lang="scss">
.frontNav-container {
  height: 100vh;
  overflow-y: auto;
  background: #333;
}
.title {
  font-size: 32px;
  font-weight: bold;
}

.tabs {
  margin-top: 60px;
}

.pane {
  padding-top: 20px;
}

.pane-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 40px;
}

.pane-head {
  width: 110px;
  padding: 10px 20px;
  margin-right: 20px;
  border: 1px solid #fff;
  border-radius: 50px;
  box-shadow: 0px 2px 6px 0px rgba(27, 202, 233, 0.445);
  display: flex;
  align-items: center;
}

.pane-head-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.pane-content {
  margin-right: 40px;
}

.pane-content-name {
  display: flex;
  align-items: center;
  font-size: 18px;
}
</style>
<style lang="scss">
.frontNav-container {
  .el-tabs__item {
    font-size: 20px;
  }
  .el-link.el-link--default {
    color: #fff;
  }
  .el-link--inner {
    display: flex;
    align-items: center;
  }
}
</style>
