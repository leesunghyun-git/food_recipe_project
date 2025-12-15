<template>
    <div class="container">
        <div class="row">
            <select class="input-sm" v-model="column">
                <option value="all">전체목록</option>
                <option value="address">주소</option>
                <option value="name">맛집명</option>
                <option value="type">음식종류</option>
            </select>
            <input type="text" size="20" class="input-sm" v-model="ss"/>
            <button type="button" class="btn btn-sm btn-danger" @click="find()">검색</button>
        </div>
        <div class="row" style="margin-top:20px;">
            <div class="col-md-3" v-for="(vo, index) in food_find_data.list" :key="index">
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
                <li v-if="food_find_data.startPage != 1">
                    <a class="a-link" @click="pageChange(1)">&laquo;</a>
                </li>
                <li v-if="food_find_data.startPage > 1">
                    <a class="a-link" @click="pageChange(food_find_data.startPage-1)">&lt;</a>
                </li>
                <li v-for="i in range(food_find_data.startPage, food_find_data.endPage)"
                    :class="food_find_data.curPage == i ? 'active' : ''" :key="i">
                    <a class="a-link" @click="pageChange(i)">{{ i }}</a>
                </li>
                <li v-if="food_find_data.endPage < food_find_data.totalPage">
                    <a class="a-link" @click="pageChange(food_find_data.endPage+1)">&gt;</a>
                </li>
                <li v-if="food_find_data.endPage != food_find_data.totalPage">
                    <a class="a-link" @click="pageChange(food_find_data.totalPage)">&raquo;</a>
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
import {ref} from 'vue';
export default defineComponent({
    setup() {
        const ss=ref("")
        const column=ref("all") // v-model와 연결되는 변수
        const store = useStore()
        const food_find_data = computed(() => store.state.foods.food_find_data)
        // action 함수 호출
        const foodFindData = async (column,ss,page) => {
            console.log(ss+" "+typeof ss)
            console.log(column+" "+typeof column)
            await store.dispatch("foods/foodFindData",{column,ss,page})
            console.log(food_find_data.value)
        }   
        onMounted(() => {
            foodFindData(column.value,ss.value,1)    
        })
        return {
            food_find_data,
            foodFindData,
            ss,
            column
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
        },
        find(){
            this.foodFindData(this.column,this.ss,1)
        },
        pageChange(page){
            this.foodFindData(this.column,this.ss,page)
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