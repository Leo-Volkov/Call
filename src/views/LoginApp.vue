<script>
import axios from 'axios';


import router from '../router.js';


export default {
  data() {
    return {
      img_display: "https://cdn-icons-png.flaticon.com/512/7794/7794218.png",
      display_password: "password",
      value_password: "",
      value_logen: "",
      verification_password: false,
      active_button: false
    }
  },
  methods: {
    async post_verification() {
      if (this.value_password.length >= 6 && this.value_logen != "") {
        // let response = await axios.get(`/login/verification?value_password=${this.value_password}`);
        // let response = await axios.post(`http://localhost:3005/login/verification?value_password=${this.value_password}`);
        let response = await axios.post(`/login/verification`, {
          value_password: this.value_password,
          value_logen: this.value_logen
        });
        if (response.data == true) {
          router.push('/admin');
        } else if (response.data == false) {
          this.verification_password = true;
        } else {
          console.log(response.data.mesendg);
        };
      }
    },

    click_ShowOrHide_password() {
      if (this.display_password == "password") {
        this.display_password = "text";
        this.img_display = "https://cdn-icons-png.flaticon.com/512/158/158746.png";
      } else {
        this.display_password = "password";
        this.img_display = "https://cdn-icons-png.flaticon.com/512/7794/7794218.png";
      };
    },

    value_inputLength() {
      this.value_password.length >= 6 && this.value_logen != ""
        ? this.active_button = true
        : this.active_button = false;
    }
  }
};
</script>




<template>
  <div class="form_center">
    <div class="form">
      <label class="form-label">Логин и пароль:</label>
      <input :type="value_logen" class="form-control" placeholder="Логин" v-model="this.value_logen"
      @input="value_inputLength()" @keyup.enter="post_verification()">
      <samp class="form_flax">
        <input :type="display_password" class="form-control" placeholder="*******" v-model="this.value_password"
          @input="value_inputLength()" @keyup.enter="post_verification()">

        <button class="button_ShowOrHide_password btn btn-secondary" type="button" @click="click_ShowOrHide_password()">
          <img :src="img_display" alt="Показать/скрыть пароль">
        </button>
      </samp>
      <div class="docer">
        <p v-if="verification_password">Пароль и/или Логин не верный, мошенник!</p>
      </div>
      <div style="display: flex; align-items: center; justify-content: center;">
        <button class="verification btn" :class="[this.active_button ? `btn-primary` : `btn-secondary`]"
          :disabled="!this.active_button" type="button" @click="post_verification()">
          К админке
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
body {
  box-sizing: border-box;
  padding: 0;
}

* {
  margin: 0;
}

.form_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form_flax {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.form {
  padding: 1.5rem 2rem;
  background: hsl(0, 0%, 100%);
  max-width: 450px;
  width: 87vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 15px -10px currentColor;
  /* border: 0.00001px solid black; */
  gap: 1.7vh;
}

.form label {
  display: block;
  font-weight: 700;
}

.form input {
  font-size: 1rem;
}

.form button {
  border: 1px solid black;

}

img {
  /* margin: 5; */
  padding: 5px;
  width: 30px;
}

.button_ShowOrHide_password {
  border-radius: 6.5px;
  margin-left: 12.5px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.verification {
  margin: 0;
  width: 80%;
}

.docer {
  margin-bottom: 9px;
  width: 80%;
}

p {
  position: relative;
  color: red;
  font-style: italic;
  margin: 0;
}
</style>