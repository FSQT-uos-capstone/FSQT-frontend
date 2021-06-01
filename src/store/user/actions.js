export async function signIn({ commit, dispatch }, payload) {
  try {
    await dispatch("auth/getToken", payload, { root: true });
  } catch (e) {
    commit("auth/setToken", null, { root: true });
    throw e;
  }
}

export async function getTarget({ commit }, userId) {
  try {
    const res = await this._vm.$api.get(`/user/${userId}`);
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("assignTarget", {
      id: userId,
      username: res.data.email,
      nickname: res.data.nickname,
      profile_img: res.data.profile_img
    });
  } catch (e) {
    commit("assignTarget", {
      id: null,
      nickname: null,
      username: null,
      profile_img: null
    });
    throw new Error(e);
  } finally {
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
