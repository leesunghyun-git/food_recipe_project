import { createStore } from "vuex";
import foods from "./food"
import recipes from "./recipe"
import boards from "./board";
export default createStore({
    modules:{foods,boards,recipes}
})