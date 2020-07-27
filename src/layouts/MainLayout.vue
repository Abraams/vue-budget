<template>
	<div>
		<Loader class="app-loader--center" v-if="isLoading" />

		<div class="app-main-layout " v-else>
			<Navbar @click="toggleSidebar" />
			<Sidebar :isOpen="isOpen" />

			<main class="app-content" :class="{ full: !isOpen }">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn" v-if="$route.path !== '/record'">
				<router-link to="/record" class="btn-floating btn-large blue">
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/app/Navbar.vue";
	import Sidebar from "@/components/app/Sidebar.vue";
	import messages from "@/utils/messages";

	export default {
		name: "mainLayout",
		components: {
			Navbar,
			Sidebar,
		},
		data() {
			return {
				isOpen: JSON.parse(localStorage.getItem("isSidebarOpen") || true),
				isLoading: true,
			};
		},
		methods: {
			toggleSidebar() {
				this.isOpen = !this.isOpen;
				localStorage.setItem("isSidebarOpen", JSON.stringify(this.isOpen));
			},
		},
		computed: {
			error() {
				return this.$store.getters.error;
			},
		},
		watch: {
			error(fbError) {
				this.$error(
					messages[fbError.code] || "Неизвестная ошибка. Повторите попытку"
				);
			},
		},
		async mounted() {
			if (!Object.keys(this.$store.getters.info).length) {
				await this.$store.dispatch("FETCH_USER_INFO_FROM_DB");
			}
			this.isLoading = false;
		},
	};
</script>
