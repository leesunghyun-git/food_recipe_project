<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/vue/main">Vuex Router</router-link>
            </div>
            <ul class="nav navbar-nav">
                <li class="active"><router-link to="/vue/main">Home</router-link></li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">맛집<span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><router-link to="/vue/food/find">맛집 검색</router-link></li>
                        <li><a href="#">음식별 검색</a></li>
                    </ul>
                </li>
                <li><a href="#">레시피 목록</a></li>
                <li><router-link to="/vue/board/list?page=1">커뮤니티</router-link></li>
            </ul>
        </div>
    </nav>
</template>