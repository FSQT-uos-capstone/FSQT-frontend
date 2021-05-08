// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  app.$q.iconSet.field.error = "eva-alert-circle-outline";
};
