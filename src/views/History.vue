<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<Loader v-if="isLoading" />

		<p v-else-if="!records.length" class="center">
			Записей пока нет.
			<router-link to="/record">Добавить новую запись</router-link>
		</p>

		<section v-else>
			<HistoryTable :records="items" />
			<Paginate
				v-model="page"
				:pageCount="pageCount"
				:clickHandler="pageChangeHandler"
				:prevText="'Назад'"
				:nextText="'Вперед'"
				:containerClass="'pagination'"
				:page-class="'page-item waves-effect'"
				:active-class="'active blue'"
				v-if="pageCount > 1"
			/>
		</section>
	</div>
</template>

<script>
	import paginationMixin from "@/mixins/pagination.mixin.js";
	import HistoryTable from "@/components/HistoryTable";
	export default {
		name: "history",
		components: { HistoryTable },
		mixins: [paginationMixin],
		metaInfo: {
			title: `История | ${process.env.VUE_APP_TITLE}`,
		},
		data() {
			return {
				records: [],
				isLoading: true,
			};
		},
		methods: {},
		async mounted() {
			this.records = await this.$store.dispatch("FETCH_RECORDS");
			const categories = await this.$store.dispatch("FETCH_CATEGORIES");

			this.setupPagination(
				this.records.map((record) => {
					return {
						...record,
						categoryName: categories.find((c) => c.id === record.categoryId)
							.title,
						typeText: record.type === "outcome" ? "Расход" : "Доход",
						typeClass: record.type === "outcome" ? "red" : "green",
					};
				})
			);

			this.isLoading = false;
		},
	};
</script>
