<template>
	<div>
		<div class="page-title">
			<h3>Профиль</h3>
		</div>

		<form class="form" @submit.prevent="submitHandler">
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="userName"
					:class="{
						invalid:
							($v.userName.dirty && !$v.userName.required) ||
							($v.userName.dirty && !$v.userName.minLength),
					}"
				/>
				<label for="description">Имя</label>
				<small
					class="helper-text invalid"
					v-if="$v.userName.dirty && !$v.userName.required"
				>
					Введите имя
				</small>
				<small
					class="helper-text invalid"
					v-else-if="$v.userName.dirty && !$v.userName.minLength"
				>
					Имя не может содержать меньше
					{{ $v.userName.$params.minLength.min }} символов
				</small>
			</div>

			<button class="btn waves-effect waves-light blue" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { required, minLength } from "vuelidate/lib/validators";
	export default {
		name: "user-profile",
		metaInfo: {
			title: `Профиль | ${process.env.VUE_APP_TITLE}`,
		},
		data() {
			return {
				userName: "",
			};
		},
		validations: {
			userName: { required, minLength: minLength(3) },
		},
		computed: {
			...mapGetters(["info"]),
		},
		methods: {
			submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}
				this.$store.dispatch("UPDATE_INFO", { name: this.userName });
			},
		},
		mounted() {
			this.userName = this.info.name;

			setTimeout(() => {
				M.updateTextFields();
			}, 0);
		},
	};
</script>
