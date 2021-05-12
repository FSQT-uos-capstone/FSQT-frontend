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

export function setMonitoringTarget(state, payload) {
  state.monitoringTarget = payload;
}

export function appendMonitoringTarget(state, payload) {
  state.monitoringTarget = [...state.monitoringTarget, payload];
}

export function assignMonitoringTargetOf(state, payload) {
  Object.assign(state.monitoringTarget[payload.idx], payload.target);
}

/*
export function someMutation (state) {
}
*/
