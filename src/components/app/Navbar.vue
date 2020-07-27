<template>
	<nav class="navbar blue darken-1">
		<div class="nav-wrapper">
			<div class="navbar-left">
				<a href="#" @click.prevent="$emit('click')">
					<i class="material-icons ">dehaze</i>
				</a>
				<span class="">{{ date | date("date") }}</span>
			</div>

			<ul class="right hide-on-small-and-down">
				<li>
					<a
						class="dropdown-trigger "
						href="#"
						data-target="dropdown"
						ref="dropdown"
					>
						{{ userName }}
						<i class="material-icons right">arrow_drop_down</i>
					</a>

					<ul id="dropdown" class="dropdown-content">
						<li>
							<router-link to="/profile" class="blue-text">
								<i class="material-icons">account_circle</i>Профиль
							</router-link>
						</li>
						<li class="divider" tabindex="-1"></li>
						<li>
							<a href="#" class="blue-text" @click.prevent="logout">
								<i class="material-icons">assignment_return</i>Выйти
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
		name: "Navbar",
		data() {
			return {
				date: new Date(),
				interval: null,
				dropdown: null,
			};
		},
		computed: {
			userName() {
				return this.$store.getters.info.name;
			},
		},
		methods: {
			async logout() {
				await this.$store.dispatch("LOGOUT");
				this.$router.push("/login?message=logout");
			},
		},
		mounted() {
			this.interval = setInterval(() => (this.date = new Date()), 1000);
			this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
				coverTrigger: false,
				constrainWidth: false,
				alignment: "right",
			});
		},
		beforeDestroy() {
			clearInterval(this.interval);
			if (this.dropdown && this.dropdown.destroy) this.dropdown.destroy();
		},
	};
</script>
