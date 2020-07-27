<template>
	<div>
		<div>
			<div class="breadcrumb-wrap">
				<router-link to="/history" class="breadcrumb">История</router-link>
				<a class="breadcrumb" @click.prevent>
					{{ record.typeText }}
				</a>
			</div>

			<Loader v-if="isLoading" />
			<div class="row" v-else>
				<div class="col s12 m6">
					<div class="card" :class="[record.typeClass]">
						<div class="card-content white-text">
							<p>Описание: {{ record.description || "Без описания" }}</p>
							<p>Сумма: {{ record.amount | currency }}</p>
							<p>Категория: {{ record.categoryName }}</p>

							<small>{{ record.date | date }}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "detail",
		data() {
			return {
				record: [],
				isLoading: true,
			};
		},
		metaInfo: {
			title: `Подробнее | ${process.env.VUE_APP_TITLE}`,
		},
		async mounted() {
			const record = await this.$store.dispatch(
				"GET_RECORD_BY_ID",
				this.$route.params.id
			);
			const category = await this.$store.dispatch(
				"GET_CATEGORY_BY_ID",
				record.categoryId
			);

			this.record = {
				...record,
				categoryName: category.title,
				typeText: record.type === "outcome" ? "Расход" : "Доход",
				typeClass: record.type === "outcome" ? "red" : "green",
			};

			this.isLoading = false;
		},
	};
</script>
