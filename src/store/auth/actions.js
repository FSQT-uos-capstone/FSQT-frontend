export function setAuthenticatedAsync({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    while (state.authenticated !== payload) {
      commit("setAuthenticated", payload);
    }
    if (state.authenticated === payload) resolve();
    else reject();
  });
}

/*
export function someAction (context) {
}
*/
