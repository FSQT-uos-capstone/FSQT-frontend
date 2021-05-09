export function list(state) {
  return state.list;
}

export function listSelect(state) {
  return state.list.map(element => {
    return {
      label: element.name,
      value: element.id
    };
  });
}

/*
export function someGetter (state) {
}
*/
