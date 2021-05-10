export async function getListDefault({ commit }) {
  try {
    const res = await this._vm.$api.get("/diary/");
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("setList", res.data["diary_list"]);
  } catch (e) {
    throw e;
  }
}

export async function createDiary({ getters, commit }) {
  try {
    const objectForm = getters["form"];
    const form = new FormData();
    form.append("photo", objectForm.photo);
    form.append("catId", objectForm.cat.value);
    const res = await this._vm.$api.post("/diary/", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit("assignForm", {
      photo: null,
      catId: null
    });
  } catch (e) {
    throw e;
  }
}

/*
export function someAction (context) {
}
*/
