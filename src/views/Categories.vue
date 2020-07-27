<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<Loader v-if="isLoading" />
			<div class="row" v-else>
				<CategoryCreate @created="addNewCat" />

				<CategoryEdit
					:categories="categories"
					@updated="categoryUpdated"
					:key="categories.length + updateCoutn"
					v-if="categories.length"
				/>
			</div>
		</section>
	</div>
</template>

<script>
	import CategoryCreate from "@/components/CategoryCreate.vue";
	import CategoryEdit from "@/components/CategoryEdit.vue";

	export default {
		name: "Categories",
		components: {
			CategoryCreate,
			CategoryEdit,
		},
		data() {
			return {
				categories: [],
				isLoading: true,
				updateCoutn: 0,
			};
		},
		metaInfo: {
			title: `Категории | ${process.env.VUE_APP_TITLE}`,
		},
		methods: {
			addNewCat(category) {
				this.categories.push(category);
			},
			categoryUpdated(category) {
				const idx = this.categories.findIndex((cat) => cat.id === category.id);

				this.categories[idx].title = category.title;
				this.categories[idx].limit = category.limit;

				this.updateCoutn++;
			},
		},
		async mounted() {
			try {
				this.categories = await this.$store.dispatch("FETCH_CATEGORIES");
			} catch (e) {}

			this.isLoading = false;
		},
	};
</script>
