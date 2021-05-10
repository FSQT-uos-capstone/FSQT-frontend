export function setList(state, payload) {
  state.list = payload;
}

export function assignTarget(state, payload) {
  Object.assign(state.target, payload);
}

/*
export function someMutation (state) {
}
*/
