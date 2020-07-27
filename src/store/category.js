import firebase from "firebase/app";

export default {
	actions: {
		async CREATE_CATEGORY({ commit, dispatch }, { title, limit }) {
			try {
				const uid = await dispatch("GET_UID");
				const category = await firebase
					.database()
					.ref(`/users/${uid}/categories`)
					.push({ title, limit });

				return { title, limit, id: category.key };
			} catch (e) {
				commit("SET_ERROR", e);
				throw e;
			}
		},
		async UPDATE_CATEGORY({ commit, dispatch }, { id, title, limit }) {
			try {
				const uid = await dispatch("GET_UID");
				await firebase
					.database()
					.ref(`/users/${uid}/categories`)
					.child(id)
					.update({ title, limit });
			} catch (e) {
				commit("SET_ERROR", e);
				throw e;
			}
		},
		async GET_CATEGORY_BY_ID({ commit, dispatch }, id) {
			try {
				const uid = await dispatch("GET_UID");

				return (
					(
						await firebase
							.database()
							.ref(`/users/${uid}/categories`)
							.child(id)
							.once("value")
					).val() || []
				);
			} catch (e) {
				commit("SET_ERROR", e);
				throw e;
			}
		},
		async FETCH_CATEGORIES({ dispatch }) {
			const uid = await dispatch("GET_UID");

			const categories =
				(
					await firebase
						.database()
						.ref(`/users/${uid}/categories`)
						.once("value")
				).val() || [];

			return Object.keys(categories).map((key) => ({
				...categories[key],
				id: key,
			}));
		},
	},
};
