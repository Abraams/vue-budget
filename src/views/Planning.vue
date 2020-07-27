<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>{{ info.bill | currency() }}</h4>
		</div>

		<Loader v-if="isLoading" />

		<p v-else-if="!categories.length" class="center">
			Категорий пока нет.
			<router-link to="/categories">Добавить новую категорию</router-link>
		</p>

		<section v-else>
			<div v-for="cat in categories" :key="cat.id" v-tooltip="cat.tooltip">
				<p>
					<strong>{{ cat.title }}:</strong>
					{{ cat.spend | currency() }} из {{ cat.limit | currency() }}
				</p>
				<div class="progress">
					<div
						class="determinate"
						:class="[cat.progressColor]"
						:style="{ width: cat.progressPercent + '%' }"
					></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import currencyFilter from "@/filters/currency.filter";

	export default {
		name: "planning",
		metaInfo: {
			title: `Планирование | ${process.env.VUE_APP_TITLE}`,
		},
		data() {
			return {
				isLoading: true,
				categories: [],
			};
		},
		computed: {
			...mapGetters(["info"]),
		},
		async mounted() {
			const records = await this.$store.dispatch("FETCH_RECORDS");
			const categories = await this.$store.dispatch("FETCH_CATEGORIES");

			this.categories = categories.map((cat) => {
				const spend = records
					.filter((r) => r.categoryId === cat.id)
					.filter((r) => r.type === "outcome")
					.reduce((total, record) => {
						return (total += +record.amount);
					}, 0);

				const percent = (100 * spend) / cat.limit;
				const progressPercent = percent > 100 ? 100 : percent;

				const progressColor =
					percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

				const tooltipVal = cat.limit - spend;
				const tooltip = `${
					tooltipVal < 0 ? "Превышение на: " : "Осталось: "
				} ${currencyFilter(Math.abs(tooltipVal))}`;

				return { ...cat, progressPercent, progressColor, spend, tooltip };
			});

			this.isLoading = false;
		},
	};
</script>
