export function setAuthenticatedAsync({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    while (state.authenticated !== payload) {
      commit("setAuthenticated", payload);
    }
    if (state.authenticated === payload) resolve();
    else reject();
  });
}

export async function getToken({ commit }, payload) {
  try {
    const res = await this._vm.$api.post("/user/token", {
      username: payload.username,
      password: payload.password
    });
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("setToken", res.data.token);
    commit("setUserId", res.data.id);
  } catch (e) {
    commit("setToken", null);
    commit("setUserId", -1);
    throw e;
  }
}

export async function updateProfileImage({ getters, commit }) {
  try {
    const objectForm = getters["profileForm"];
    const form = new FormData();
    form.append("profile_img_file", objectForm.photo);
    const res = await this._vm.$api.patch(`/user/`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("assignProfileForm", {
      photo: null
    });
  } catch (e) {
    throw e;
  }
}

/*
export function someAction (context) {
}
*/
