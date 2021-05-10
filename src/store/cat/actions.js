export async function getList({ commit }) {
  try {
    const res = await this._vm.$api.get("/cat");
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("setList", res.data);
  } catch (e) {
    throw e;
  }
}

export async function getTarget({ commit }, catId) {
  try {
    const res = await this._vm.$api.get(`/cat/${catId}`);
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("assignTarget", {
      id: catId,
      name: res.data.name,
      gender: res.data.gender,
      age: res.data.age
    });
  } catch (e) {
    commit("assignTarget", {
      id: null,
      name: res.data.name,
      gender: res.data.gender,
      age: res.data.age
    });
    throw new Error(e);
  } finally {
  }
}
/*
export function someAction (context) {
}
*/
