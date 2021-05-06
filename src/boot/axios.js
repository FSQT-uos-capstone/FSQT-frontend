import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

const api = axios.create({ baseURL: "http://3.36.71.58" });
const chatbot = axios.create({
  baseURL: "https://catchat-ftlwa.run.goorm.io/api/chat"
});

Vue.prototype.$api = api;
Vue.prototype.$chatbot = chatbot;

export { axios, api, chatbot };
