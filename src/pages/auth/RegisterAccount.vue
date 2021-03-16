<template>
  <q-page class="column PageAuthRegisterAccount">
    <div class="row Title">
      집사 계정 만들기
    </div>
    <div class="row Content">
      <q-input
        outlined
        square
        v-model="username"
        debounce="500"
        color="black"
        class="InputUsername"
        placeholder="아이디"
        hint="8-15글자. 알파벳 대소문자. 숫자."
        :rules="[checkDuplicatedUsername]"
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
      <q-input
        outlined
        square
        v-model="passwordConfirmation"
        debounce="500"
        color="black"
        class="InputPasswordConfirmation"
        placeholder="패스워드 확인"
        type="password"
        hint="패스워드를 원하는 대로 정확히 입력했는지 확인하세요."
        :rules="[checkSamePassword]"
      ></q-input>
    </div>
    <div class="row Control">
      <q-btn
        to="/auth/register/email"
        unelevated
        size="lg"
        color="black"
        class="ButtonNext"
        >다음</q-btn
      >
    </div>
    <div class="row Description">
      <p>
        가입하기 버튼을 누르면, 고양이 일기장의 Terms of Service와 Privacy
        Policy에 동의합니다.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageAuthRegisterAccount",
  data() {
    return {
      username: null,
      password: null,
      passwordConfirmation: null,
      loadingUsername: false
    };
  },
  methods: {
    checkDuplicatedUsername(val) {
      this.loading = true;
      if (!val) {
        this.loading = false;
        return "반드시 아이디가 있어야 집사의 계정을 생성할 수 있습니다.";
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false;
          if (val === "error")
            resolve("다른 집사가 고양이처럼 재빠르게 채간 아이디입니다.");
          resolve(!!val);
        }, 1000);
      });
    },
    checkSamePassword(val) {
      if (!val) return "원하는 패스워드를 정확히 입력했는지 확인해야 합니다.";
      if (val !== this.password)
        return "일치하지 않는 패스워드입니다. 마치 집시와 고양이의 마음처럼...";
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
