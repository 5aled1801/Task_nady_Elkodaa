<!-- registr.vue -->
<template>
  <div class="login-container">
    <h2 class="text-center">Registration</h2>

    <!-- form secion  -->
    <v-form @submit.prevent>
      <v-container>
        <v-row max-width="100">
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newEmail"
              :rules="emailRules"
              label="E-mail"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="NewPassword"
              :rules="passRules"
              label="Password"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :rules="passRulesConfirm"
              label="confirm Password"
              type="password"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-container>
      <v-btn color="blue" type="submit" @click="registerUser()">Regester</v-btn>
    </v-form>

    <!-- alert secion  -->
    <v-alert
      v-model="alert"
      color="error"
      type="error"
      style="position: fixed; top: -10%; width: 100%; left: 0"
    >
      {{ error }}
    </v-alert>
    <v-alert
      v-model="alertDone"
      color="success"
      type="success"
      style="position: fixed; top: -10%; width: 100%; left: 0"
    >
      {{ successMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      newEmail: "",
      NewPassword: "",
      confirmPassword: "",
      alert: false,
      alertDone: false,

      error: "",
      successMessage: "",
      // validation for form  submission
      nameRules: [
        (value) => {
          if (value) return true;

          return "Name is required.";
        },
        (value) => {
          if (value?.length >= 4) return true;

          return "Name must be more than 4 characters ";
        },
      ],
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
      passRulesConfirm: [
        (value) => {
          if (value) return true;

          return "Confirm is required.";
        },
        (value) => {
          if (value?.length >= 7) return true;

          return "Password must be more than 6 characters and numbers";
        },
        (value) => {
          if (value === this.NewPassword) return true;

          return "this password not matched";
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

  methods: {
    async registerUser() {
      if (
        this.NewPassword === "" ||
        this.confirmPassword === "" ||
        this.newEmail === "" ||
        this.name === ""
      ) {
        this.error = "Plz Fill All Fields";
        setTimeout(() => {
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          this.alert = true;
        }, 500);
        return;
      }

      if (this.NewPassword !== this.confirmPassword) {
        this.error = "Passwords do not match";
        setTimeout(() => {
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          this.alert = true;
        }, 500);
        return;
      }

      try {
        const response = await fetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",

              "X-DID KEY": "1234",
            },
            body: JSON.stringify({
              name: this.name,
              email: this.newEmail,
              password: this.NewPassword,
            }),
          }
        );
        if (response.status === 201) {
          this.registrationMessage = "Registration successful!";
          // Redirect to login page or perform any other action upon successful registration
        } else {
          this.registrationMessage = "Registration failed. Please try again.";
        }
      } catch (error) {
        console.error("Error:", error);
        this.registrationMessage = "An error occurred. Please try again later.";
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
  min-height: 650px !important;
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
