export function setList(state, payload) {
  state.list = payload;
}

export function appendList(state, payload) {
  state.list = [...state.list, ...payload];
}

export function assignForm(state, payload) {
  Object.assign(state.form, payload);
}

export function setFormCat(state, payload) {
  state.form.cat = payload;
}

/*
export function someMutation (state) {
}
*/
