<template>
	<div class="col s12 m6 l4">
		<div class="card blue darken-1 bill-card">
			<div class="card-content white-text">
				<span class="card-title">Счет в валюте</span>

				<p v-for="cur in currencys" :key="cur" class="currency-line">
					<span>
						{{ getCurrency(cur) | currency(cur) }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["rates"],
		data() {
			return {
				currencys: ["RUB", "EUR", "USD"],
			};
		},
		computed: {
			base() {
				return (
					this.$store.getters.info.bill /
					(this.rates["RUB"] / this.rates["EUR"])
				);
			},
		},
		methods: {
			getCurrency(currency) {
				return this.base * this.rates[currency];
			},
		},
	};
</script>
