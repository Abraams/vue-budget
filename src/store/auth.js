import firebase from "firebase/app";

export default {
	actions: {
		async LOGIN({ commit }, { email, password }) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password);
			} catch (e) {
				commit("SET_ERROR", e);
				throw e;
			}
		},

		async REGISTER({ dispatch, commit }, { email, password, name }) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password);
				const uid = await dispatch("GET_UID");

				await firebase
					.database()
					.ref(`/users/${uid}/info`)
					.set({
						name,
						bill: 10000,
					});
			} catch (e) {
				commit("SET_ERROR", e);
				throw e;
			}
		},

		GET_UID() {
			const user = firebase.auth().currentUser;
			return user ? user.uid : null;
		},

		async LOGOUT({ commit }) {
			await firebase.auth().signOut();
			commit("CLEAR_INFO");
		},
	},
};
