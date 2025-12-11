<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="(vo, index) in food_data.list" :key="index">
                <div class="thumbnail">
                    <router-link class="a-link" :to="{name:'food_detail',params:{fno:vo.fno}}">
                        <img :src="vo.poster" style="width:240px;height:180px" :title="vo.address">
                        <div class="caption">
                            <p>{{ vo.name }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top:20px;">
            <ul class="pagination">
                <li v-if="food_data.startPage != 1">
                    <a class="a-link" @click="foodListData(1)">&laquo;</a>
                </li>
                <li v-if="food_data.startPage > 1">
                    <a class="a-link" @click="foodListData(food_data.startPage-1)">&lt;</a>
                </li>
                <li v-for="i in range(food_data.startPage, food_data.endPage)"
                    :class="food_data.curPage == i ? 'active' : ''" :key="i">
                    <a class="a-link" @click="foodListData(i)">{{ i }}</a>
                </li>
                <li v-if="food_data.endPage < food_data.totalPage">
                    <a class="a-link" @click="foodListData(food_data.endPage+1)">&gt;</a>
                </li>
                <li v-if="food_data.endPage != food_data.totalPage">
                    <a class="a-link" @click="foodListData(food_data.totalPage)">&raquo;</a>
                </li>   
            </ul>
        </div>
    </div>
</template>
<script>
/*
    Controller = router/index.js
                    | food.js = index.js = store에 저장
                    | 변수 = state
    main.html = public / index.html
        | include : App.vue
    home.html = Home.vue
    header.html = Header.vue
    
    화면 UI
      |
    이벤트 = 메뉴 클릭 / 버튼 클릭
      |
    food.js / recipe.js
      |
    store = state변수에 저장
      |
    해당 vue에서 store에 있는 state를 읽어서 출력

*/
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
        const store = useStore()
        const food_data = computed(() => store.state.foods.food_data)
        // action 함수 호출
        const foodListData = async (page) => {
            await store.dispatch("foods/foodListData", page)
            console.log(food_data.value)
        }
        onMounted(() => {
            foodListData(1)
        })
        return {
            food_data,
            foodListData
        }

    },
    methods: {
        range(start, end) {
            let arr = [];
            let len = end - start;
            for (let i = 0; i <= len; i++) {
                arr[i] = start
                start++
            }
            return arr
        }
    }
})
</script>
<style scoped>
.row {
    margin: 0px auto;
    width: 960px;
}

p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.a-link{
    cursor:pointer;
}
</style>