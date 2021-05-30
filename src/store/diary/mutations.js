export function setList(state, payload) {
  state.list = payload;
}

export function appendList(state, payload) {
  state.list = [...state.list, ...payload];
}

export function setEmotionOnDiary(state, payload) {
  const emotions = {
    like: 1,
    happy: 2,
    sad: 3
  };
  const diaryIdx = state.list.findIndex(x => x.id === payload.diaryId);
  if (diaryIdx === -1) return;
  const emotionIdx = state.list[diaryIdx].emotions.findIndex(
    x => x.user_id === payload.userId
  );
  let newEmotion = emotions[payload.status];
  if (emotionIdx !== -1) {
    if (state.list[diaryIdx].emotions[emotionIdx].emotion === newEmotion)
      newEmotion = 0;
    state.list[diaryIdx].emotions = state.list[diaryIdx].emotions.filter(
      x => x.id !== state.list[diaryIdx].emotions[emotionIdx].id
    );
  }
  state.list[diaryIdx].emotions = [
    ...state.list[diaryIdx].emotions,
    {
      created: "PUFF",
      diary_id: payload.diaryId,
      emotion: newEmotion,
      id: state.list[diaryIdx].emotions.length,
      modified: "PUFF",
      user_id: payload.userId
    }
  ];
}

export function assignForm(state, payload) {
  Object.assign(state.form, payload);
}

export function setFormTags(state, payload) {
  state.form.tags = payload;
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
