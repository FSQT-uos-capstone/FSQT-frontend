<template>
  <q-layout class="MainLayout" view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog
      v-model="uploader"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="my-card">
        <q-card-section class="row items-center">
          <q-btn icon="eva-close" flat round dense v-close-popup />
        </q-card-section>
        <q-stepper
          ref="stepper"
          v-model="step"
          vertical
          color="black"
          active-color="pink-13"
          done-color="black"
          animated
          keep-alive
        >
          <q-step
            :name="1"
            title="고양이 사진 고르기"
            icon="eva-image-outline"
            :done="step > 1"
          >
            Drag, pinch and zoom으로 올라갈 사진을 간단하게 바꿔보세요!

            <croppa
              v-model="myCroppa"
              placeholder="고양이 사진을 선택해주세요"
              placeholder-color="#000"
              canvas-color="transparent"
              :show-loading="true"
            ></croppa>

            <q-stepper-navigation>
              <q-btn
                unelevated
                @click="selectFile"
                color="black"
                label="다음"
                :disable="myCroppa.chosenFile === null"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="해시태그 넣기"
            icon="eva-color-picker-outline"
            :done="step > 2"
          >
            이 사진 속 고양이는 누구인가요? 덧붙일 단어가 떠오르시나요?
            해시태그를 통해 알려주세요! <code>Enter</code> 를 통해 추가하실 수
            있습니다.

            <q-select
              ref="inputTags"
              @input="setDiaryFormTags"
              @new-value="checkHashOnTag"
              :rules="[
                val =>
                  val.lastIndexOf('#') <= 0 || '올바르지 않은 해시태그입니다.'
              ]"
              v-bind:value="diaryForm.tags"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="toggle"
              stack-label
              color="black"
            />
            <q-stepper-navigation>
              <q-btn
                outline
                class="q-mr-xs"
                @click="step = 1"
                color="black"
                label="이전"
              />
              <q-btn
                unelevated
                @click="uploadCatPhoto"
                color="black"
                label="업로드"
                :loading="loadingUpload"
                :disable="
                  diaryForm.tags === null ||
                    diaryForm.tags.length === 0 ||
                    preventUpload
                "
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="3"
            title="업로드 완료!"
            icon="eva-checkmark-circle-outline"
          >
            집사가 찍어준 사진을 고양이가 보고 일기를 쓰는데 시간이 걸립니다.
            고양이가 일기를 올리면 알려줄게요!

            <q-stepper-navigation>
              <q-btn
                unelevated
                @click="
                  uploader = false;
                  step = 1;
                "
                color="black"
                label="완료"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
    <q-footer class="Footer row">
      <q-toolbar class="Toolbar justify-around">
        <q-btn
          to="/"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-home-outline"
        />
        <q-btn
          to="/search"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-search-outline"
        />
        <q-btn
          @click="uploader = true"
          unelevated
          rounded
          :ripple="false"
          icon="eva-plus-outline"
          class="col-2 PostButton"
        />
        <q-btn
          to="/cats"
          flat
          round
          :ripple="false"
          color="black"
          icon="img:data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='var(--ci-primary-color, currentColor)' d='M374.762,186.866h0a54.1,54.1,0,0,0-51.305-36.706H280V21.552l-18.263,2.609c-41.429,5.918-73.7,26.912-95.907,62.4-16.011,25.581-23.454,53.8-26.908,74.906-23.847,18.348-44.593,43.611-61.738,75.2-14.449,26.618-26.41,57.816-35.552,92.729-15.447,58.99-17.538,107.921-17.619,109.975L24.005,496H56V440.364c.4-8.231,10.476-188.35,107.032-256.936l5.66-4.021.93-6.881C174.437,136.9,191.077,78.058,248,59.971V182.16h75.457a22.12,22.12,0,0,1,21,14.974h0c12.757,37.656,34.677,84.777,68.839,106.921l-10.274,38.528a62.688,62.688,0,0,1-62.54,46.87c-28.668-.86-58.506,2.88-88.689,11.111L240,403.779V496h32V428.468a265.353,265.353,0,0,1,67.52-7.03,94.97,94.97,0,0,0,94.418-70.61l17.088-64.081L438.3,281.293C414.5,271.093,391.936,237.558,374.762,186.866Z' class='ci-primary'/></svg>"
        />
        <q-btn
          :to="`/users/profile/${authUserId}`"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-person-outline"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import "vue-croppa/dist/vue-croppa.css";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      authUserId: "auth/userId",
      catListSelect: "cat/listSelect",
      diaryForm: "diary/form"
    })
  },
  async mounted() {
    try {
      await this.$store.dispatch("cat/getList");
    } catch (e) {
      console.error(e);
      this.$q
        .dialog({
          title: "😭고양이 조회 실패",
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
        .onOk(() => {})
        .onDismiss(() => {});
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      uploader: false,
      myCroppa: {},
      step: 1,
      loadingCats: false,
      loadingUpload: false,
      preventUpload: false
    };
  },
  methods: {
    setDiaryFormTags(payload) {
      this.$store.commit("diary/setFormTags", payload);
    },
    checkHashOnTag(val, done) {
      if (val.indexOf("#") === -1) {
        done("#" + val);
        this.$refs.inputTags.resetValidation();
        this.preventUpload = false;
      } else if (val.lastIndexOf("#") !== 0) {
        done();
        this.preventUpload = !this.$refs.inputTags.validate(val);
      } else {
        done(val);
        this.$refs.inputTags.resetValidation();
        this.preventUpload = false;
      }
    },
    async selectFile() {
      const blob = await this.myCroppa.promisedBlob("image/png", 0.8);
      let file = new File(
        [blob],
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 18) + ".png",
        { type: "image/png" }
      );
      this.$store.commit("diary/assignForm", { photo: file });
      this.step = 2;
    },
    async uploadCatPhoto() {
      try {
        this.loadingUpload = true;
        await this.$store.dispatch("diary/createDiary");
        this.step = 3;
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭고양이 사진 업로드 실패",
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
          .onOk(() => {})
          .onDismiss(() => {});
      } finally {
        this.loadingUpload = false;
      }
    }
  }
};
</script>

<style lang="scss">
.croppa-container {
  background: transparent;
  width: 75vw;
  height: 75vw;
  canvas {
    width: 75vw !important;
    height: 75vw !important;
  }
}
.MainLayout {
  .Footer {
    background-color: #ffffff;
    color: #000000;
    height: 8vh;
    border-top: 1px solid #cccccc;
  }
  .Toolbar {
    height: 100%;
    .PostButton {
      background: linear-gradient(#ff00d6, #ff4d00);
      color: #ffffff;
    }
  }
}
</style>
