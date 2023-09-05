<template>
  <div style="text-align: center">
    <h1>WEB APP DEMO</h1>
    <form class="form-group" @submit.prevent="sendAccessToken" style="width: 1000px; margin: auto; margin-bottom: 20px">
      <textarea class="form-control"
                placeholder="access_token"
                v-model="accessToken"
      ></textarea>
      <div style="text-align: left">
        <button type="submit" class="btn btn-sm btn-primary" :disabled="connected">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import {StringeeClient, StringeeChat2, StringeeServiceType} from "stringee";
export default {
  name: 'App',
  data() {
    return {
      accessTokensInit: [
          'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHLTE2OTMyMTI3NDkiLCJpc3MiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHIiwiZXhwIjoxNjk1ODA0NzQ5LCJ1c2VySWQiOiJsaW5oNCJ9.2U6lZhAEnBAlvtmh_R9DFg71-2LqXjKG5qQBhAjDEgg',
          'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHLTE2OTMyMTI4MDkiLCJpc3MiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHIiwiZXhwIjoxNjk1ODA0ODA5LCJ1c2VySWQiOiJsaW5oNSJ9.PwmXHRb_-N7UW_Q0cH5FkgfVVWY9nryWwFWsG16wfxo'
      ],

      accessToken: '',
      connected: false
    }
  },
  mounted() {
    this.accessToken = this.accessTokensInit[Math.floor(Math.random() * this.accessTokensInit.length)];

    // let chatBoxScript = document.createElement('script')
    // chatBoxScript.setAttribute('id', 'stringeeXChatWidget');
    // chatBoxScript.setAttribute('src', 'http://localhost:3001/StringeeXChatBox.js?key=eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHLTE2OTMyMTI4MDkiLCJpc3MiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHIiwiZXhwIjoxNjk1ODA0ODA5LCJ1c2VySWQiOiJsaW5oNSJ9.PwmXHRb_-N7UW_Q0cH5FkgfVVWY9nryWwFWsG16wfxo')
    // document.head.appendChild(chatBoxScript)
  },
  methods: {
    addScriptIframe() {
      let chatScript = document.createElement('script')
      chatScript.setAttribute('src', 'http://localhost:3001/StringeeChat.js')
      document.head.appendChild(chatScript);
    },
    sendAccessToken() {
      this.connected = true;

      if (!this.accessToken) {
        this.addScriptIframe();
        return true;
      }

      window.StringeeServiceType = StringeeServiceType;

      const STRINGEE_SERVER_ADDRS = [
        "wss://v1.stringee.com:6899/",
        "wss://v2.stringee.com:6899/"
      ];
      let client = new StringeeClient(STRINGEE_SERVER_ADDRS);
      window.StringeeClient = client;
      // const client = window.StringeeClient;
      // const access_token = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHLTE2OTMyMTI4MDkiLCJpc3MiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHIiwiZXhwIjoxNjk1ODA0ODA5LCJ1c2VySWQiOiJsaW5oNSJ9.PwmXHRb_-N7UW_Q0cH5FkgfVVWY9nryWwFWsG16wfxo";
      client.connect(this.accessToken);

      client.on("connect", () => {
        console.log("++++++++++++++ connected");
        StringeeChat2.init(client);
      });
      client.on("disconnect", () => {
        console.log("++++++++++++++ disconnected");
      });

      client.on('authen', (res) => {
        console.log('authen', res);
        window.authStringee = res;

        this.addScriptIframe();
      });
    }
  }
}
</script>

<style>
  iframe {
    border: inset;
  }
</style>
