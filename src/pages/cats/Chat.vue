<template>
  <q-page class="flex Chat">
    <q-header class="Header">
      <q-toolbar class="Toolbar text-center">
        <q-btn
          v-if="$q.platform.is.capacitor"
          v-go-back
          flat
          round
          color="black"
          icon="eva-arrow-back-outline"
        />
        <q-btn
          v-else
          @click="$router.back()"
          flat
          round
          color="black"
          icon="eva-arrow-back-outline"
        />
        <q-toolbar-title class="text-subtitle1 text-weight-bold">
          {{ chatCats[catId].name }}
        </q-toolbar-title>
        <q-btn flat round disabled />
      </q-toolbar>
    </q-header>
    <div class="Messages">
      <div ref="content">
        <q-chat-message
          v-for="message in messages"
          :key="message.id"
          :name="message.name"
          :avatar="message.avatar"
          :text="[message.text]"
          :stamp="getStamp(now, message.time)"
          :sent="message.sent"
          :text-color="message.textColor"
          :bg-color="message.bgColor"
          text-sanitize
        >
        </q-chat-message>
      </div>
    </div>
    <q-footer class="Footer">
      <q-toolbar class="Toolbar text-center">
        <q-input
          ref="input"
          autogrow
          outlined
          color="black"
          class="Input"
          @keyup.prevent="$event => (myMessage = $event.target.value)"
          v-bind:value="myMessage"
        >
          <template v-slot:after>
            <q-btn
              round
              flat
              color="white"
              :ripple="false"
              class="SendButton"
              icon="eva-paper-plane-outline"
              :disable="myMessage === ''"
              @click="sendMessage"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { DebounceMixin } from "../../mixins/debounce";
import { mapGetters } from "vuex";

export default {
  name: "PageCatsChat",
  created() {
    this.timeInterval = setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },
  mounted() {
    this.$refs.input.focus();
  },
  mixins: [DebounceMixin],
  props: {
    catId: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      chatCats: "cat/listChat"
    })
  },
  data() {
    return {
      myMessage: "",
      messages: [],
      now: new Date(),
      timeInterval: null
    };
  },
  methods: {
    scrollToEnd() {
      const content = this.$refs.content;
      content.scrollTop = content.scrollHeight;
    },
    getStamp(now, date) {
      const offset = now.getTime() - date.getTime();
      if (offset < 1000 * 60) {
        return "방금 전";
      } else if (offset < 1000 * 60 * 60) {
        return `${parseInt(offset / (1000 * 60))}분 전`;
      } else {
        return `${parseInt(offset / (1000 * 60 * 60))}시간 전`;
      }
    },
    async sendMessage(e, go) {
      e.preventDefault();
      e.navigate = false;
      this.messages = [
        ...this.messages,
        {
          id: this.messages.length,
          name: "나",
          avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
          text: this.myMessage,
          sent: true,
          textColor: "white",
          bgColor: "purple-4",
          time: new Date()
        }
      ];
      const targetMessage = this.myMessage;
      this.myMessage = "";
      this.$refs.input.focus();
      this.debounce(() => {
        window.scrollTo(0, this.$refs.content.scrollHeight);
      }, 20);
      this.$chatbot
        .post(
          "",
          {
            catid: parseInt(this.catId) % 2,
            message: targetMessage
          },
          {
            crossDomain: true
          }
        )
        .then(response => {
          this.messages = [
            ...this.messages,
            {
              id: this.messages.length,
              name: this.chatCats[this.catId].name,
              avatar: "https://cataas.com/cat?type=sq",
              text: response.data.message,
              sent: false,
              textColor: "white",
              bgColor: "deep-orange-4",
              time: new Date()
            }
          ];
          this.debounce(() => {
            window.scrollTo(0, this.$refs.content.scrollHeight);
          }, 20);
        })
        .catch(error => {
          console.error(error);
          this.$q
            .dialog({
              title: "😭고양이가 부재 중입니다",
              message: "돌아올 때까지 기다려주세요!",
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
        });
    }
  }
};
</script>

<style lang="scss">
.Chat {
  .Header {
    background-color: #ffffff;
    color: #000000;
    border-bottom: 1px solid #cccccc;
    .Toolbar {
      height: 100%;
    }
  }
  .Messages {
    width: 100%;
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
  .Footer {
    background-color: #ffffff;
    color: #000000;
    .Toolbar {
      height: 100%;
      .Input {
        width: 100%;
        margin-top: 8px;
        margin-bottom: 8px;
        .SendButton {
          background: linear-gradient(#ff00d6, #ff4d00);
        }
      }
    }
  }
}
</style>
