<template>
  <q-page class="flex Chat">
    <q-header class="Header">
      <q-toolbar class="Toolbar text-center">
        <q-btn
          v-go-back
          flat
          round
          color="black"
          icon="eva-arrow-back-outline"
        />
        <q-toolbar-title class="text-subtitle1 text-weight-bold">
          {{ catId }}
        </q-toolbar-title>
        <q-btn flat round disabled />
      </q-toolbar>
    </q-header>
    <div class="Messages">
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
    <q-footer class="Footer">
      <q-toolbar class="Toolbar text-center">
        <q-input
          autogrow
          outlined
          color="black"
          class="Input"
          v-model="myMessage"
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
  props: {
    catId: {
      type: String,
      default: ""
    }
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
      e.navigate = false;
      this.messages = [
        ...this.messages,
        {
          id: this.messages.length,
          name: "나",
          avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
          text: this.myMessage,
          sent: true,
          textColor: "white",
          bgColor: "purple",
          time: new Date()
        }
      ];
      this.myMessage = "";
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
      });
      this.messages = [
        ...this.messages,
        {
          id: this.messages.length,
          name: this.catId,
          avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          text: "ACK",
          sent: false,
          textColor: "white",
          bgColor: "deep-orange",
          time: new Date()
        }
      ];
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
