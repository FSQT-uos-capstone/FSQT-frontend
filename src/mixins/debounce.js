export const DebounceMixin = {
  data() {
    return {
      debounceTimeout: null
    };
  },
  methods: {
    debounce(func, delay) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        clearTimeout(this.debounceTimeout);
        func();
      }, delay);
    }
  }
};
