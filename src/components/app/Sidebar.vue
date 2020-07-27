<template>
	<ul class="sidenav app-sidenav" :class="{ open: isOpen }">
		<router-link
			v-for="link in links"
			:key="link.url"
			tag="li"
			active-class="active"
			:to="link.url"
			:exact="link.exact"
		>
			<a href="#" class="waves-effect waves-blue pointer">{{ link.title }}</a>
		</router-link>
	</ul>
</template>

<script>
	export default {
		name: "Sidebar",
		props: {
			isOpen: {
				type: Boolean,
				required: true,
				default: true,
			},
		},
		data() {
			return {
				links: [
					{
						title: "Счет",
						url: "/",
						exact: true,
					},
					{
						title: "История",
						url: "/history",
						exact: null,
					},
					{
						title: "Планирование",
						url: "/planning",
						exact: null,
					},
					{
						title: "Новая запись",
						url: "/record",
						exact: null,
					},
					{
						title: "Категории",
						url: "/categories",
						exact: null,
					},
				],
			};
		},
		mounted() {},
	};
</script>
