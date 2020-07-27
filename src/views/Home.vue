<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>

			<button
				class="btn waves-effect waves-blue btn-small blue"
				@click="refresh"
			>
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="isLoading" />

		<p v-else-if="!currency">
			Откройте доступ к загрузке скриптов по незащищенному http протоклу, чтобы
			увидеть информацию о валютах.
		</p>

		<div class="row" v-else>
			<HomeBill :rates="currency.rates" />

			<HomeCurrency :rates="currency.rates" :date="currency.date" />
		</div>
	</div>
</template>

<script>
	import HomeBill from "@/components/HomeBill.vue";
	import HomeCurrency from "@/components/HomeCurrency.vue";
	export default {
		name: "Home",
		components: {
			HomeBill,
			HomeCurrency,
		},
		metaInfo: {
			title: `Счет | ${process.env.VUE_APP_TITLE}`,
		},
		data() {
			return {
				isLoading: true,
				currency: null,
			};
		},
		methods: {
			async refresh() {
				this.isLoading = true;

				this.currency = await this.$store.dispatch("FETCH_CURRENCY");
				this.isLoading = false;
			},
		},
		async mounted() {
			this.currency = await this.$store.dispatch("FETCH_CURRENCY");

			this.isLoading = false;
		},
	};
</script>
