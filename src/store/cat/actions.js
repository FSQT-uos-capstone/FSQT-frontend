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

/*
export function someAction (context) {
}
*/
