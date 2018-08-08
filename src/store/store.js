/**
 * Created by Kotori on 2017/8/7.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    position:''
}
const mutations={
	position(state,n){
	    state.pos=n;
	}
}
const store = new Vuex.Store({
	start,mutations
})

export default store
