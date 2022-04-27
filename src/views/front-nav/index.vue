<template>
  <div class="frontNav-container px-40 pt-40">
    <h2 class="title text-center text-white">流光导航</h2>
    <el-tabs v-model="activeName" class="mt-60" :style="{ '--el-text-color-primary': '#fff' }">
      <el-tab-pane v-for="item in paneList" :key="item.id" class="pt-20" :label="item.name" :name="item.name">
        <div v-for="item2 in item.children" :key="item2.id" class="flex mb-40">
          <div class="pane-head flex flex-center mr-20 text-white">
            <div>{{ item2.name }}</div>
          </div>
          <div class="flex wrap">
            <div v-for="item3 in item2.children" :key="item3.id" class="pane-item flex flex-center mb-16 mr-40 text-white">
              <el-tooltip placement="bottom" effect="light">
                <el-link class="pane-content-name flex flex-center" :underline="false" target="_blank" :href="item3.link">
                  <div>{{ item3.name }}</div>
                </el-link>
                <template #content>
                  <div>{{ item3.content }}</div>
                  <div>{{ item3.link }}</div>
                </template>
              </el-tooltip>
            </div>
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
.pane-head {
  min-width: 110px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 50px;
  box-shadow: 0px 2px 6px 0px rgba(27, 202, 233, 0.445);
}
.pane-item {
  height: 40px;
}
.pane-content-name {
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
