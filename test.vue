<template>
    <div class="">
        <ul class="test">
            <li>23456</li>
            <li class="23456"></li>
            <li>3456</li>
        </ul>
    </div>
</template>

<script>
export default {
components: {},
    data() {
        return {
            obj: {
                a: 1,
                b: 2,
                c: 3,
            },
        };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {},
    created() {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.test {
    color: red;
    font-size: 14px;
    font-weight: 400;
}
</style>
