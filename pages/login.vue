<!-- eslint-disable no-console -->
<!-- Login.vue -->
<template>
  <div class="login-container">
    <h2 class="text-center">Login</h2>
    <v-sheet>
      <v-form @submit.prevent>
        <v-container>
          <v-row max-width="100">
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="passRules"
                label="Password"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn color="blue" type="submit" @click="submitForm()">Login</v-btn>
        <p class="pt-5 text-center text-red" v-if="errormessage">
          {{ this.errormessage }}
        </p>
      </v-form>

      <v-alert
        v-model="alert"
        color="error"
        type="error"
        style="position: fixed; top: -10%; width: 100%; left: 0"
      >
        {{ this.error }}
      </v-alert>
    </v-sheet>
  </div>
</template>

<script>
import { mapActions, mapState } from "~/node_modules/pinia/dist/pinia";
import { useAuthStore } from "../store/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      alert: false,
      alertDone: false,
      alertwarning: false,
      enter: false,
      success: "",
      // validation for form  submission

      passRules: [
        (value) => {
          if (value) return true;

          return "password is required.";
        },
        (value) => {
          if (value?.length >= 7) return true;

          return "Password must be more than 6 characters and numbers";
        },
      ],

      emailRules: [
        (value) => {
          if (value) return true;

          return "E-mail is requred.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "E-mail must be valid.";
        },
      ],
    };
  },
  mounted() {
    if (this.authenticated) {
      this.$router.push("/");
    }
  },
  computed: { ...mapState(useAuthStore, ["errormessage"]) },
  methods: {
    ...mapState(useAuthStore, ["authenticated"]),
    ...mapActions(useAuthStore, ["authenticateUser"]),

    async submitForm() {
      // check all fields is not empty
      if (this.email === "" || this.password === "") {
        this.error = "plz fill all fields";
        setTimeout(() => {
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          this.alert = true;
        }, 500);
      } else {
        this.authenticateUser(this.email, this.password);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  min-width: 50%;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  // top: 10%;
  transform: translate(-50%, 20%);
  min-height: 500px !important;
  h2 {
    font-size: 28px;
    font-family: sans-serif;
    font-weight: 500;
    color: rgb(0, 139, 225);
  }
  form {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 95%;
    button {
      left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
    }
  }
}
</style>
