<template>
  <q-page class="column PageAuthRegisterNickname">
    <div class="row Title">
      집사 이름 고르기
    </div>
    <div class="row Content">
      <q-input
        ref="inputNickname"
        @keyup.prevent="handleInputNickname"
        v-bind:value="nickname"
        type="text"
        maxlength="12"
        outlined
        square
        debounce="500"
        color="black"
        class="InputNickname"
        :rules="[checkDuplicatedNickname]"
        :loading="loading"
      ></q-input>
    </div>
    <div class="row Control">
      <q-btn
        @click="handleNextButton"
        to="/auth/register/account"
        unelevated
        size="lg"
        color="black"
        class="ButtonNext"
        :disable="loading || !validated"
        >다음</q-btn
      >
    </div>
    <div class="row Description">
      <p>
        깨끗한 커뮤니티 문화를 위해 집사 이름에 유의해주세요.<br />
        나중에 언제든지 변경할 수 있습니다.
      </p>
    </div>
  </q-page>
</template>

<script>
import { DebounceMixin } from "../../mixins/debounce";
export default {
  name: "PageAuthRegisterNickname",
  data() {
    return {
      nickname: null,
      loading: false,
      validated: false
    };
  },
  mixins: [DebounceMixin],
  mounted() {
    this.$refs.inputNickname.focus();
  },
  methods: {
    handleInputNickname($event) {
      this.debounce(() => (this.nickname = $event.target.value), 500);
    },
    handleNextButton() {
      this.$store.commit("user/assignRegister", { nickname: this.nickname });
    },
    checkDuplicatedNickname(val) {
      this.loading = true;
      if (!val) {
        this.loading = false;
        this.validated = false;
        return "집사 이름이 있어야 고양님이 집사를 구분할 수 있습니다.";
      }
      return new Promise((resolve, reject) => {
        this.$api
          .get("/user", {
            params: {
              nickname: val
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.validated = true;
              resolve(true);
            } else {
              this.validated = false;
              throw new Error(res.status + " " + res.statusText);
            }
          })
          .catch(() => {
            resolve("다른 집사가 고양이처럼 재빠르게 채간 이름입니다.");
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style lang="scss">
.PageAuthRegisterNickname {
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
    .InputNickname {
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
