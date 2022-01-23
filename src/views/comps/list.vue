<template>
<div class=''>
    <p>固定时间点</p>
    <el-time-select
        v-model="value"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="Select time"
    >
    </el-time-select>
    <p>树形控件</p>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            data: [
                {
                    label: 'Level one 1',
                    children: [
                        {
                            label: 'Level two 1-1',
                            children: [
                                {
                                    label: 'Level three 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Level one 2',
                    children: [
                        {
                            label: 'Level two 2-1',
                            children: [
                                {
                                    label: 'Level three 2-1-1'
                                }
                            ]
                        },
                        {
                            label: 'Level two 2-2',
                            children: [
                                {
                                    label: 'Level three 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Level one 3',
                    children: [
                        {
                            label: 'Level two 3-1',
                            children: [
                                {
                                    label: 'Level three 3-1-1'
                                }
                            ]
                        },
                        {
                            label: 'Level two 3-2',
                            children: [
                                {
                                    label: 'Level three 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }
};
</script>
<style lang='scss' scoped>
</style>