<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<form @submit.prevent="submitHandler">
				<div class="input-field">
					<select ref="select" v-model="current">
						<option v-for="cat in categories" :key="cat.id" :value="cat.id">
							{{ cat.title }}</option
						>
					</select>
					<label>Выберите название</label>
				</div>

				<div class="input-field">
					<input
						id="name"
						type="text"
						v-model="title"
						:class="{ invalid: $v.title.$dirty && !$v.title.required }"
					/>
					<label for="name">Название</label>
					<span
						class="helper-text invalid"
						v-if="$v.title.$dirty && !$v.title.required"
					>
						Введите название категории
					</span>
				</div>

				<div class="input-field">
					<input
						id="limit"
						type="number"
						v-model.number="limit"
						:class="{
							invalid:
								($v.limit.$dirty && !$v.limit.required) ||
								($v.limit.$dirty && !$v.limit.minValue),
						}"
					/>
					<label for="limit">Лимит</label>
					<span
						class="helper-text invalid"
						v-if="$v.limit.$dirty && !$v.limit.minValue"
						>Минимальный лимит {{ $v.limit.$params.minValue.min }}₽</span
					>
				</div>

				<button class="btn waves-effect waves-light blue" type="submit">
					Обновить
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minValue } from "vuelidate/lib/validators";
	export default {
		props: {
			categories: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
				select: null,
				current: null,
				title: "",
				limit: 1,
			};
		},
		validations: {
			title: { required },
			limit: { required, minValue: minValue(100) },
		},
		watch: {
			current(id) {
				const { title, limit } = this.categories.find((cat) => cat.id === id);
				this.title = title;
				this.limit = limit;
			},
		},
		methods: {
			async submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				const category = {
					id: this.current,
					title: this.title,
					limit: this.limit,
				};
				try {
					await this.$store.dispatch("UPDATE_CATEGORY", category);

					this.$message("Категория успешно обновлена");
					this.$emit("updated", category);
				} catch (e) {}
			},
		},
		created() {
			const { id, title, limit } = this.categories[0];
			this.current = id;
			this.title = title;
			this.limit = limit;
		},
		mounted() {
			M.updateTextFields();

			this.limit = this.$v.limit.$params.minValue.min;
			this.select = M.FormSelect.init(this.$refs.select);
		},
		beforeDestroy() {
			if (this.select && this.select.destroy) this.select.destroy();
		},
	};
</script>
