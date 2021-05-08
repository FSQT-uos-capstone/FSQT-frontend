export async function signIn({ commit, dispatch }, payload) {
  try {
    await dispatch("auth/getToken", payload, { root: true });
  } catch (e) {
    commit("auth/setToken", null, { root: true });
    throw e;
  }
}

export async function register({ getters, commit }) {
  try {
    const register = getters["register"];
    const res = await this._vm.$api.post("/user/", {
      nickname: register.nickname,
      email: register.username,
      password: register.password,
      password_confirmation: register.passwordConfirmation
    });
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
  } catch (e) {
    throw new Error(e);
  } finally {
    commit("assignRegister", {
      nickname: null,
      username: null,
      password: null,
      passwordConfirmation: null
    });
  }
}

/*
export function someAction (context) {
}
*/
