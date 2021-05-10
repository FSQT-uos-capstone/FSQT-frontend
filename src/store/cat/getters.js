export function target(state) {
  return state.target;
}

export function list(state) {
  return state.list;
}

export function listChat(state) {
  return state.listChat;
}

export function chatCatOf(state) {
  return id => {
    return state.listChat.filter(x => x.id === id)[0];
  };
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
