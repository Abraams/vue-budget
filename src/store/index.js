import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		error: null,
	},
	mutations: {
		SET_ERROR(state, error) {
			state.error = error;
		},
		CLEAR_ERROR(state) {
			state.error = null;
		},
	},
	actions: {
		async FETCH_CURRENCY() {
			try {
				const KEY = process.env.VUE_APP_FIXER;
				const res = await fetch(
					`http://data.fixer.io/api/latest?access_key=${KEY}&symbols=USD,EUR,RUB`
				);
				return await res.json();
			} catch (e) {
				console.log(e);
				return false;
			}
		},
	},
	getters: {
		error: (s) => s.error,
	},
	modules: {
		auth,
		info,
		category,
		record,
	},
});
