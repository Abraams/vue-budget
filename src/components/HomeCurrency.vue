<template>
	<div class="col s12 m6 l8">
		<div class="card blue bill-card">
			<div class="card-content white-text">
				<div class="card-header">
					<span class="card-title">Курс валют</span>
				</div>
				<table>
					<thead>
						<tr>
							<th>Валюта</th>
							<th>Курс</th>
							<th>Дата</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="cur in currencys" :key="cur">
							<td>{{ cur }}</td>
							<!-- <td>{{ rates[cur].toFixed(4) }}</td> -->
							<td>{{ getCurrency(cur) | currency(cur) }}</td>
							<td>{{ date | date("dateM") }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["rates", "date"],
		data() {
			return {
				currencys: ["RUB", "EUR", "USD"],
			};
		},
		computed: {
			base() {
				return this.rates["EUR"] / this.rates["USD"];
			},
		},
		methods: {
			getCurrency(currency) {
				return this.base * this.rates[currency];
			},
		},
	};
</script>
