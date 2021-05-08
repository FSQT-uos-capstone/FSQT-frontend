export function setAuthenticated(state, payload) {
  state.authenticated = payload;
}

export function setToken(state, payload) {
  state.token = payload;
  this._vm.$api.defaults.headers.common["Authorization"] = payload;
}

/*
export function someMutation (state) {
}
*/
