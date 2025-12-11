import { createStore } from "vuex";
import foods from "./food"
import recipe from "./recipe"
export default createStore({
    modules:{foods,recipe}
})