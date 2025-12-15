<template>
    <div class="container">
        <div class="row">
            <h3 class="text-center">게시판</h3>
            <table class="table">
                <tbody>
                    <tr>
                        <td class="text-left">
                            <router-link to="/vue/board/insert" class="btn btn-sm btn-warning">새글</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr class="danger">
                        <th class="text-center" width=10%>번호</th>
                        <th class="text-center" width=45%>제목</th>
                        <th class="text-center" width=15%>이름</th>
                        <th class="text-center" width=20%>작성일</th>
                        <th class="text-center" width=10%>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(vo,key) in board_list.list' :key="key" class="dataTr" @click="goDetail(vo.no)">
                        <td class="text-center" width=10%>{{ vo.no }}</td>
                        <td width=45% class="text-left">{{vo.subject}}</td>
                        <td class="text-center" width=15%>{{ vo.name }}</td>
                        <td class="text-center" width=20%>{{vo.dbday}}</td>
                        <td class="text-center" width=10%>{{vo.hit}}</td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-center">
                            <span
                                class="btn btn-sm btn-info a-link" @click="back(board_list.curPage)">이전</span>
                            {{board_list.curPage}} page / {{board_list.totalPage}} pages
                            <span 
                                class="btn btn-sm btn-info a-link" @click="next(board_list.curPage,board_list.totalPage)">다음</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import {onMounted ,computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store=useStore()
const router=useRouter()
const board_list=computed(()=>store.state.boards.board_list)
const boardListData=(page)=>{
    store.dispatch('boards/boardListData',page)
}
const next=(curPage)=>{
    if (curPage>1)
    {
        boardListData(curPage-1)
    }
}
const back=(curPage,totalPage)=>{
    if (curPage<totalPage)
    {
        boardListData(curPage+1)
    }
}
onMounted(()=>{
    store.dispatch('boards/boardListData',1)
})
const goDetail=(no)=>{
    router.push(`/vue/board/detail/${no}`)
}
</script>
<style scoped>
.row {
    margin: 0px auto;
    width: 800px;
}
.a-link{
    cursor:pointer;
}
.dataTr:hover{
    cursor:pointer;
    background-color:rgb(214, 214, 214)
}
</style>