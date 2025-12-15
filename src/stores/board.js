import axios from 'axios';
// 서버연결 ==== 데이터 읽기 ==== store에 저장
// -----------------------      -------------
//         actions                 mutations
export default{
    namespaced:true, // 독립적인 모듈을 만든다
    // 저장하는 데이터 설정
    /*
        vo = {no:1,name:'',subject:....}
        list=[{},{},{},...]


    */
    // 데이터를 저장한 후에 공유하는 데이터
    state:{
        board_list:{},
        board_detail:{}
    },
    // 서버에서 들어오는 데이터를 state에 저장하는 역할
    // mutation을 이용해서 state로 전송이 되면 => <template>에 있는 HTML에 바로 반영
    mutations:{
        SET_BOARD_LIST(state,payload){  
            state.board_list=payload
        },
        SET_BOARD_DETAIL(state,payload){
            state.board_detail=payload
        }
    },
    // => commit()
    // 서버와 연결 => 요청 결과값을 가지고 온다
    // => dispatch() => 각 component에서 작업
    /*
        component
            <template>
                HTML => 화면 UI  ==> View
            </template>
            <script>
                제어 => 데이터 제어 ==> ViewModel
            </script>
            <style>
            
            </style>
    */
   // 비동기 처리 : ResponseEntity : 비동기 
/*
    const sa={sabun:1,name:'',dept:''}
            sa.sabun
            sa.name
            sa.dept
        response={config:'',data:[],status:200}

*/
    actions:{
        // 목록
        async boardListData({commit},page){
            const {data} = await axios.get("http://localhost/board/list_vue/",{
                params:{
                    page
                }
            })
            commit('SET_BOARD_LIST',data)
        },
        async boardDetailData({commit},no){
            const {data} = await axios.get('http://localhost/board/detail_vue/',{
                params:{
                    no
                }
            })
            console.log(data)
            commit('SET_BOARD_DETAIL',data)
        },
        async boardInsert({dispatch},board){
            await axios.post('http://localhost/board/insert_vue/',board)
            dispatch('boardListData',1)
        }
    }
    /* 
        데이터 갱신 => commit : forward
        데이터 갱신이 없는 경우 : sendRedirect
        = dispatch

        commit : 데이터 읽기 
                1. 목록 2. 상세보기 3. 수정 데이터
                => forward
        dispatch : 데이터 처리
                1. 글쓰기 2. 수정 3. 삭제
                => redirect
    */
}