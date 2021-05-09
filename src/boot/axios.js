import axios from "axios";

export default ({ store, Vue }) => {
  Vue.prototype.$axios = axios;

  const api = axios.create({ baseURL: "http://3.36.179.76" });
  if (store.getters["auth/token"] !== null) {
    api.defaults.headers.common["Authorization"] =
      "Token " + store.getters["auth/token"];
  }
  const chatbot = axios.create({
    baseURL: "https://catchat-ftlwa.run.goorm.io/api/chat"
  });

  Vue.prototype.$api = api;
  Vue.prototype.$chatbot = chatbot;
};
