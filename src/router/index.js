import Vue from "vue";
import VueRouter from "vue-router";

import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/categories",
		name: "categories",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/Categories.vue"),
	},
	{
		path: "/detail-record/:id",
		name: "DetailRecord",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/DetailRecord.vue"),
	},
	{
		path: "/record",
		name: "Record",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/Record.vue"),
	},
	{
		path: "/history",
		name: "History",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/History.vue"),
	},
	{
		path: "/planning",
		name: "Planning",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/Planning.vue"),
	},
	{
		path: "/profile",
		name: "Profile",
		meta: {
			layout: "Main",
			auth: true,
		},
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/login",
		name: "login",
		meta: {
			layout: "Empty",
		},
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		meta: {
			layout: "Empty",
		},
		component: () => import("@/views/Register.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requireAuth = to.matched.some((record) => record.meta.auth);

	if (requireAuth && !currentUser) {
		next("/login?message=login");
	} else {
		next();
	}
});

export default router;
