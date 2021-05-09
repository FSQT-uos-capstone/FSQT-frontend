export function setAuthenticated(state, payload) {
  state.authenticated = payload;
}

export function setToken(state, payload) {
  state.token = payload;
  if (payload)
    this._vm.$api.defaults.headers.common["Authorization"] = "Token " + payload;
}

export function setUserId(state, payload) {
  state.userId = payload;
}

/*
export function someMutation (state) {
}
*/
