<template>
  <div class="app-container scroll-y nc-tag">
    <el-row class="nc-tag-main">
      <el-col :span="4" class="nc-tag-menu">
        <el-scrollbar>
          <el-button type="primary" size="small" class="mb-10" @click="() => openTagCategory()">添加分区</el-button>
          <div
            v-for="item in tagCategoryData"
            :key="item.id"
            :class="`nc-tag-menu-item flex flex-y-center py-14 ${item.id === tagCategoryId ? 'active' : ''}`"
            @click="checkTagCategory(item.id)"
          >
            <div class="mr-2">{{ item.name }}</div>
            <el-popover trigger="click" placement="bottom" :width="100">
              <template #reference>
                <el-icon><edit-pen /></el-icon>
              </template>
              <div class="operate-popover">
                <el-button type="primary" size="small" class="tag-button" @click="openTagCategory(item)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" class="tag-button" @click="deleteTagCategory(item)">
                  删除
                </el-button>
              </div>
            </el-popover>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="4" class="nc-tag-menu pl-20">
        <el-scrollbar>
          <el-button type="primary" size="small" class="mb-10" @click="() => openTagCategory(null, tagCategoryId)">
            添加栏目
          </el-button>
          <div
            v-for="item in tagNameData"
            :key="item.id"
            :class="`nc-tag-menu-item flex flex-y-center py-14 ${item.id === tagNameId ? 'active' : ''}`"
            @click="checkTagName(item)"
          >
            <div class="mr-2">{{ item.name }}</div>
            <el-popover trigger="click" placement="bottom" :width="100">
              <template #reference>
                <el-icon><edit-pen /></el-icon>
              </template>
              <div class="operate-popover">
                <el-button type="primary" size="small" class="tag-button" @click="openTagCategory(item, tagCategoryId)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" class="tag-button" @click="deleteTagCategory(item)">
                  删除
                </el-button>
              </div>
            </el-popover>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="16" class="px-20">
        <el-scrollbar style="height: 100%">
          <el-button type="primary" size="small" class="mb-10" @click="() => openTagCategory(null, tagNameId)">
            添加项目
          </el-button>
          <div
            v-for="item in tagValueData"
            :key="item.id"
            :class="`nc-tag-menu-item flex flex-y-center py-14 ${item.id === tagValueId ? 'active' : ''}`"
            @click="checkTagValue(item)"
          >
            <div class="mr-2">{{ item.name }}</div>
            <el-popover trigger="click" placement="bottom" :width="100">
              <template #reference>
                <el-icon><edit-pen /></el-icon>
              </template>
              <div class="operate-popover">
                <el-button type="primary" size="small" class="tag-button" @click="openTagCategory(item, tagNameId)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" class="tag-button" @click="deleteTagCategory(item)">
                  删除
                </el-button>
              </div>
            </el-popover>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
    <!--添加/编辑菜单分区-->
    <el-dialog v-model="dialogFormTagCategory" :title="tagCategoryForm.id ? '编辑' : '新增'" width="600px">
      <el-form :model="tagCategoryForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="tagCategoryForm.name" autocomplete="off" class="el_input_width" size="small" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="tagCategoryForm.link" autocomplete="off" class="el_input_width" size="small" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="tagCategoryForm.content" autocomplete="off" class="el_input_width" size="small" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormTagCategory = false">取 消</el-button>
        <el-button type="primary" @click="saveTagCategory">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getCategoryList, getNameList, categoryAdd, categoryDel, categoryEdit } from '@/api/menus'
import { ObjTy } from '~/common'
import { EditPen } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const state = reactive({
  tagCategoryData: [],
  tagNameData: [],
  tagValueData: [],
  tagCategoryId: 0,
  tagNameId: 0,
  tagValueId: 0,
  tagCategoryForm: {} as any,
  dialogFormTagCategory: false
})

onBeforeMount(() => {
  fetchData()
})

const checkTagCategory = (id) => {
  state.tagCategoryId = id
  toGetNameList()
}

const checkTagName = (row) => {
  state.tagNameId = row.id
  toGetValueList()
}

const checkTagValue = (row) => {
  state.tagValueId = row.id
}

const fetchData = () => {
  getCategoryList({})
    .then((response: ObjTy) => {
      state.tagCategoryData = response.data
      state.tagCategoryId = response.data.length !== 0 ? response.data[0].id : 0
    })
    .then(() => {
      toGetNameList()
    })
}

const toGetNameList = () => {
  const id = state.tagCategoryId
  getNameList({ id: id })
    .then((response: ObjTy) => {
      state.tagNameData = response.data
      state.tagNameId = response.data.length !== 0 ? response.data[0].id : 0
    })
    .then(() => {
      toGetValueList()
    })
}

const toGetValueList = () => {
  if (!state.tagNameId) {
    state.tagValueData = []
    state.tagValueId = 0
    return
  }
  const id = state.tagNameId
  getNameList({ id: id }).then((response: ObjTy) => {
    state.tagValueData = response.data
    state.tagValueId = response.data.length !== 0 ? response.data[0].id : 0
  })
}

const openTagCategory = (row, parent_id) => {
  if (row) {
    state.tagCategoryForm = { ...row }
  } else {
    state.tagCategoryForm = {
      name: '',
      parent_id: parent_id || 0
    }
  }
  state.dialogFormTagCategory = true
}

const saveTagCategory = () => {
  if (!state.tagCategoryForm.name) {
    ElMessage({
      message: '请输入名称',
      type: 'warning'
    })
    return
  }
  if (state.tagCategoryForm.id) {
    categoryEdit(state.tagCategoryForm).then((response: ObjTy) => {
      ElMessage({
        message: '编辑成功',
        type: 'success'
      })
      state.dialogFormTagCategory = false
      fetchData()
    })
  } else {
    categoryAdd(state.tagCategoryForm).then((response: ObjTy) => {
      ElMessage({
        message: '保存成功',
        type: 'success'
      })
      state.dialogFormTagCategory = false
      fetchData()
    })
  }
}

const deleteTagCategory = (row) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    categoryDel({ id: row.id }).then((response: ObjTy) => {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      fetchData()
    })
  })
}

//导出属性到页面中使用
const {
  tagCategoryData,
  tagNameData,
  tagValueData,
  tagCategoryId,
  tagNameId,
  tagValueId,
  dialogFormTagCategory,
  tagCategoryForm
} = toRefs(state)
</script>

<style scoped lang="scss">
.nc-tag {
  .nc-tag-menu {
    height: 100%;
    border-right: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .nc-tag-menu-item {
    width: 100%;
    color: #606266;
    cursor: pointer;
    &.active {
      color: #409eff;
    }
  }
}
</style>
