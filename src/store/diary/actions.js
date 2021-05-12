export async function getListDefault({ commit }) {
  try {
    const res = await this._vm.$api.get("/diary/");
    if (res.status !== 200) {
      throw new Error(res.status + " " + res.statusText);
    }
    commit(
      "setList",
      res.data["diary_list"].sort((x, y) => x.id > y.id)
    );
  } catch (e) {
    throw e;
  }
}

export async function createDiary({ getters, commit }) {
  try {
    if (getters["monitoringTarget"].length > 3)
      throw new Error("현재 3개 이상의 일기장을 처리 중입니다.");
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
    const monitor = () => {
      try {
        this._vm.$api
          .post(`/diary/${res.data.diary_id}`)
          .then(_res => {
            const target = getters["monitoringTarget"].filter(
              x => x.targetDiaryId === res.data.diary_id
            );
            clearTimeout(target.timeout);
            commit(
              "setMonitoringTarget",
              getters["monitoringTarget"].filter(
                x => x.targetDiaryId !== res.data.diary_id
              )
            );
            if (_res.status === 204) {
              console.log("waiting...");
              commit("appendMonitoringTarget", {
                targetDiaryId: res.data.diary_id,
                period: 15000,
                timeout: setTimeout(monitor, 15000)
              });
            } else {
              if (_res.status === 200) {
                this._vm.$q.notify({
                  timeout: 120000,
                  message: `고양이가 일기장을 올렸어요!`,
                  color: "white",
                  textColor: "black",
                  avatar: "https://cataas.com/cat?type=sq",
                  actions: [
                    {
                      label: "보러 가기",
                      color: "primary",
                      handler: () => {
                        if (this.$router.history.current.path !== "/")
                          this.$router.push("/");
                        else
                          this.dispatch("diary/getListDefault", null, {
                            root: true
                          });
                      }
                    },
                    {
                      label: "Dismiss",
                      color: "black",
                      handler: () => {
                        /* ... */
                      }
                    }
                  ]
                });
              } else {
                throw new Error("일기장 처리에 오류가 발생했습니다.");
              }
            }
          })
          .catch(e => {
            throw e;
          });
      } catch (e) {
        console.error(e);
      }
    };
    commit("appendMonitoringTarget", {
      targetDiaryId: res.data.diary_id,
      period: 15000,
      timeout: setTimeout(monitor, 15000)
    });
  } catch (e) {
    throw e;
  }
}

/*
export function someAction (context) {
}
*/
