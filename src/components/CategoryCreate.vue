<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="submitHandler">
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
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minValue } from "vuelidate/lib/validators";
	export default {
		data() {
			return {
				title: "",
				limit: 1,
			};
		},
		validations: {
			title: { required },
			limit: { required, minValue: minValue(100) },
		},
		methods: {
			async submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}
				try {
					const category = await this.$store.dispatch("CREATE_CATEGORY", {
						title: this.title,
						limit: this.limit,
					});

					this.title = "";
					this.limit = this.$v.limit.$params.minValue.min;

					this.$v.$reset();
					this.$message("Категория была создана");

					this.$emit("created", category);
				} catch (e) {}
			},
		},
		mounted() {
			M.updateTextFields();
			this.limit = this.$v.limit.$params.minValue.min;
		},
	};
</script>
