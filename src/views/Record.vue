<template>
	<div>
		<div>
			<div class="page-title">
				<h3>Новая запись</h3>
			</div>
			<Loader v-if="isLoading" />

			<p v-else-if="!categories.length" class="center">
				Создайте категорию, чтобы продолжить.
				<router-link to="/categories">Создать категорию</router-link>
			</p>

			<form class="form" @submit.prevent="submitHandler" v-else>
				<div class="input-field">
					<select ref="select" v-model="current" class="blue-text">
						<option v-for="cat in categories" :key="cat.id" :value="cat.id">
							{{ cat.title }}
						</option>
					</select>
					<label>Выберите категорию</label>
				</div>

				<p>
					<label>
						<input
							class="with-gap"
							name="type"
							type="radio"
							value="income"
							v-model="type"
						/>
						<span>Доход</span>
					</label>
				</p>

				<p>
					<label>
						<input
							class="with-gap"
							name="type"
							type="radio"
							value="outcome"
							v-model="type"
						/>
						<span>Расход</span>
					</label>
				</p>

				<div class="input-field">
					<input
						id="amount"
						type="number"
						v-model.number="amount"
						:class="{
							invalid:
								($v.amount.$dirty && !$v.amount.required) ||
								($v.amount.$dirty && !$v.amount.minValue),
						}"
					/>
					<label for="amount">Сумма</label>
					<span
						class="helper-text invalid"
						v-if="
							($v.amount.$dirty && !$v.amount.required) ||
								($v.amount.$dirty && !$v.amount.minValue)
						"
						>Введите сумму корректно</span
					>
				</div>

				<div class="input-field">
					<input id="description" type="text" v-model="description" />
					<label for="description">Описание</label>
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
	import { minValue, required } from "vuelidate/lib/validators";
	import { mapGetters } from "vuex";

	export default {
		name: "record",
		metaInfo: {
			title: `Новая запись | ${process.env.VUE_APP_TITLE}`,
		},
		data() {
			return {
				select: null,

				categories: [],
				current: null,
				title: null,
				type: "outcome",
				amount: 100,
				description: "",

				isLoading: true,
			};
		},
		validations: {
			amount: { required, minValue: minValue(100) },
		},
		computed: {
			...mapGetters(["info"]),
			canCreateRecord() {
				if (this.type === "income") return true;

				return this.info.bill >= this.amount;
			},
		},
		methods: {
			async submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				if (this.canCreateRecord) {
					try {
						const record = await this.$store.dispatch("CREATE_RECORD", {
							categoryId: this.current,
							type: this.type,
							amount: this.amount,
							description: this.description,
							date: new Date().toJSON(),
						});

						const bill =
							this.type === "income"
								? (this.info.bill = this.info.bill + this.amount)
								: (this.info.bill = this.info.bill - this.amount);

						await this.$store.dispatch("UPDATE_INFO", { bill });

						this.$v.$reset();
						this.amount = this.$v.amount.$params.minValue.min;
						this.description = "";

						this.$message("Запись успешно создана");
					} catch (e) {}
				} else
					this.$error(
						`Недостаточно средств на счете (${this.amount - this.info.bill})`
					);
			},
		},
		async mounted() {
			try {
				this.categories = await this.$store.dispatch("FETCH_CATEGORIES");
				const { id, title } = this.categories[0];
				this.current = id;
				this.title = title;
			} catch (e) {}

			this.isLoading = false;

			setTimeout(() => {
				M.updateTextFields();
				this.select = M.FormSelect.init(this.$refs.select);
			}, 0);
		},
		beforeDestroy() {
			if (this.select && this.select.destroy) this.select.destroy();
		},
	};
</script>
