<template>
  <q-page class="column PageAuthRegisterAccount">
    <div class="row Title">
      집사 계정 만들기
    </div>
    <div class="row Content">
      <q-input
        ref="inputEmail"
        @keyup.prevent="handleInputEmail"
        v-bind:value="email"
        type="email"
        outlined
        square
        color="black"
        class="InputEmail"
        placeholder="이메일"
        :rules="[checkDuplicatedEmail]"
        :loading="loadingEmail"
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
      <q-input
        outlined
        square
        v-model="passwordConfirmation"
        debounce="500"
        color="black"
        class="InputPasswordConfirmation"
        placeholder="패스워드 확인"
        type="password"
        :rules="[checkSamePassword]"
      ></q-input>
    </div>
    <div class="row Control">
      <q-btn
        @click="handleRegisterButton"
        unelevated
        size="lg"
        color="black"
        class="ButtonNext"
        :loading="loadingButton"
        :disable="!validatedEmail || !validatedSamePassword"
        >가입하기</q-btn
      >
    </div>
    <div class="row Description">
      <p>
        가입하기 버튼을 누르면, 냥중일기의 Terms of Service와 Privacy Policy에
        동의합니다.
      </p>
    </div>
  </q-page>
</template>

<script>
import { DebounceMixin } from "../../mixins/debounce";
export default {
  name: "PageAuthRegisterAccount",
  data() {
    return {
      email: null,
      password: null,
      passwordConfirmation: null,
      loadingEmail: false,
      loadingButton: false,
      validatedEmail: false,
      validatedPassword: false,
      validatedSamePassword: false
    };
  },
  mixins: [DebounceMixin],
  mounted() {
    this.$refs.inputEmail.focus();
  },
  methods: {
    async handleRegisterButton() {
      this.$store.commit("user/assignRegister", {
        username: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      });
      try {
        this.loadingButton = true;
        await this.$store.dispatch("user/register");
        this.$q
          .dialog({
            title: "🎉집사 등록 성공",
            message: "축하드려요! 로그인 화면으로 이동합니다.",
            ok: {
              label: "확인",
              unelevated: true,
              color: "black",
              dark: true
            },
            cancel: false,
            persistent: true
          })
          .onOk(() => {
            this.$router.push("/auth");
          })
          .onDismiss(() => {
            this.$router.push("/auth");
          });
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭집사 등록 실패",
            message: "고양이의 심술처럼 오류가 발생했습니다.",
            ok: {
              label: "확인",
              unelevated: true,
              color: "black",
              dark: true
            },
            cancel: false,
            persistent: true
          })
          .onOk(() => {
            this.$router.push("/gate");
          })
          .onDismiss(() => {
            this.$router.push("/gate");
          });
      } finally {
        this.loadingButton = false;
      }
    },
    handleInputEmail($event) {
      this.debounce(() => (this.email = $event.target.value), 500);
    },
    checkDuplicatedEmail(val) {
      this.loadingEmail = true;
      if (!val) {
        this.loadingEmail = false;
        this.validatedEmail = false;
        return "집사의 계정을 생성하기 위해 이메일이 필요합니다.";
      } else if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        ) === false
      ) {
        this.loadingEmail = false;
        this.validateEmail = false;
        return "올바른 이메일 주소가 아닙니다.";
      }
      return new Promise((resolve, reject) => {
        this.$api
          .get("/user", {
            params: {
              username: val
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.validatedEmail = true;
              resolve(true);
            } else {
              this.validatedEmail = false;
              throw new Error(res.status + " " + res.statusText);
            }
          })
          .catch(() => {
            resolve("집사야 니 가입한 적 있다!");
          })
          .finally(() => {
            this.loadingEmail = false;
          });
      });
    },
    checkSamePassword(val) {
      if (!val) {
        this.validatedSamePassword = false;
        return "원하는 패스워드를 정확히 입력했는지 확인해야 합니다.";
      }
      if (val !== this.password) {
        this.validatedSamePassword = false;
        return "일치하지 않는 패스워드입니다. 마치 집시와 고양이의 마음처럼...";
      }
      this.validatedSamePassword = true;
    }
  }
};
</script>

<style lang="scss">
.PageAuthRegisterAccount {
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
    .InputEmail {
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
