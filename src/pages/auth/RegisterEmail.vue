<template>
  <q-page class="column PageAuthRegisterEmail">
    <div class="row Title">
      집사 이메일 인증
    </div>
    <div class="row Content">
      <q-input
        outlined
        square
        v-model="email"
        debounce="500"
        color="black"
        class="InputEmail"
        placeholder="이메일"
        type="email"
        :rules="[checkDuplicatedEmail]"
        :loading="loading"
      ></q-input>
    </div>
    <div class="row Control">
      <q-btn unelevated size="lg" color="black" class="ButtonNext">다음</q-btn>
    </div>
    <div class="row Description">
      <p>
        완료하면 계정이 생성됩니다.<br />
        인증 메일을 통해 계정을 활성화할 수 있습니다.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageAuthRegisterEmail",
  data() {
    return {
      email: null,
      loading: false
    };
  },
  methods: {
    checkDuplicatedEmail(val) {
      this.loading = true;
      if (!val) {
        this.loading = false;
        return "이메일 주소가 있어야 집사의 계정을 생성할 수 있습니다.";
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false;
          if (val === "error") resolve("이미 등록된 이메일입니다.");
          resolve(!!val);
        }, 1000);
      });
    }
  }
};
</script>

<style lang="scss">
.PageAuthRegisterEmail {
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
