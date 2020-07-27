import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import datefilter from "@/filters/date.filter";
import currencyfilter from "@/filters/currency.filter";
import massagePlugin from "@/utils/message.plugin";
import tooltipDirective from "@/directives/tooltip.directive";
import Paginate from "vuejs-paginate";
import Loader from "@/components/app/Loader.vue";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(massagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta, { refreshOnceOnNavigation: true });

Vue.filter("date", datefilter);
Vue.filter("currency", currencyfilter);

Vue.directive("tooltip", tooltipDirective);

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

const config = {
	apiKey: "AIzaSyBYwIkQisTddmOxz3aU49A5la4a9vYn4PQ",
	authDomain: "vue-crm-a.firebaseapp.com",
	databaseURL: "https://vue-crm-a.firebaseio.com",
	projectId: "vue-crm-a",
	storageBucket: "vue-crm-a.appspot.com",
	messagingSenderId: "711527281566",
	appId: "1:711527281566:web:327e3cd157e84c62865c8f",
};

firebase.initializeApp(config);

let app;

firebase.auth().onAuthStateChanged(() => {
	if (app) return;

	app = new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount("#app");
});
