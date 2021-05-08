<template>
  <q-page class="column PageSignIn">
    <div class="row Title">
      로그인
    </div>
    <div class="row Content">
      <q-input
        ref="inputUsername"
        outlined
        square
        v-model="username"
        debounce="500"
        color="black"
        class="InputUsername"
        placeholder="아이디"
        :loading="loadingUsername"
      ></q-input>
      <q-input
        outlined
        square
        v-model="password"
        debounce="500"
        color="black"
        class="InputPassword"
        placeholder="패스워드"
        type="password"
      ></q-input>
    </div>
    <div class="row Control">
      <q-btn
        @click="handleSignInButton"
        unelevated
        size="lg"
        color="black"
        class="ButtonNext"
        >로그인</q-btn
      >
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageSignIn",
  data() {
    return {
      username: null,
      password: null,
      loadingUsername: false
    };
  },
  mounted() {
    this.$refs.inputUsername.focus();
  },
  methods: {
    async handleSignInButton() {
      try {
        this.loadingButton = true;
        await this.$store.dispatch("user/signIn", {
          username: this.username,
          password: this.password
        });
        this.$router.push("/");
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭집사 로그인 실패",
            message: "집사야 니 계정 맞나!",
            ok: {
              label: "확인",
              unelevated: true,
              color: "black",
              dark: true
            },
            cancel: false,
            persistent: true
          })
          .onOk(() => {})
          .onDismiss(() => {});
      } finally {
        this.loadingButton = false;
      }
    }
  }
};
</script>

<style lang="scss">
.PageSignIn {
  background-color: #ffffff;
  padding: 16px;
  .Title {
    color: #000000;
    font-size: 2.27rem;
    font-weight: medium;
    padding-left: 4px;
    padding-bottom: 36px;
  }
  .Content {
    padding: 0px;
    .InputUsername {
      min-width: 100%;
      max-width: 100%;
      .q-field__control::before {
        border: 2px solid #000000;
      }
      padding-bottom: 28px;
    }
    .InputPassword {
      min-width: 100%;
      max-width: 100%;
      .q-field__control::before {
        border: 2px solid #000000;
      }
      padding-bottom: 8px;
    }
    .InputPasswordConfirmation {
      min-width: 100%;
      max-width: 100%;
      .q-field__control::before {
        border: 2px solid #000000;
      }
    }
  }
  .Control {
    padding-top: 8px;
    .ButtonNext {
      min-width: 100%;
      max-width: 100%;
      font-weight: bold;
      .q-btn__content {
        font-size: 0.9rem;
      }
    }
  }
  .Description {
    padding-top: 8px;
  }
}
</style>
