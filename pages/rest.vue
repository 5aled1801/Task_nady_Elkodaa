<template>
  <div class="password-reset-container">
    <h2 class="text-center pt-5">Reset Password</h2>

    <v-form @submit.prevent>
      <v-container v-if="!resetComplete">
        <v-row max-width="100">
          <v-col cols="12">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="phone Number"
              type="text"
            ></v-text-field>
          </v-col>
          <div class="d-flex justify-space-evenly w-100">
            <v-btn color="green" type="submit" @click="resetPassword()"
              >Reset</v-btn
            >
            <v-btn color="blue" @click="returnBack()">Back</v-btn>
          </div>
          <p v-if="errorMessage" class="pt-5 text-red">
            {{ errorMessage }}
          </p>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row max-width="100">
          <v-col cols="12">
            <v-text-field
              v-model="newPassword"
              :rules="passRules"
              label="New Password"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex">
            <span class="pl-2">OTP</span>
            <v-otp-input
              variant="underlined"
              label="OTP"
              v-model="OTP"
            ></v-otp-input>
          </v-col>
        </v-row>
        <div class="btns">
          <v-btn color="green" type="submit" @click="confirmReset()"
            >Reset</v-btn
          >
          <v-btn color="blue" @click="returnBack()">Back</v-btn>
        </div>
        <p v-if="resetConfirmationMessage" class="pt-5 text-red">
          {{ resetConfirmationMessage }}
        </p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({ middleware: ["auth"] });
  },

  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      OTP: "",
      alert: false,
      alertDone: false,
      phone: "",
      errorMessage: "",
      resetComplete: false,
      resetConfirmationMessage: "",
      // validation for form  submission
      phoneRules: [
        (value) => {
          if (value) return true;

          return "Phone Number is required.";
        },
        (value) => {
          if (value?.length >= 7) return true;

          return "Phone Number must be 11 number.";
        },
      ],
      passRules: [
        (value) => {
          if (value) return true;

          return "Password is required.";
        },
        (value) => {
          if (value?.length >= 7) return true;

          return "Password must be at least 7 characters long.";
        },
      ],
      passRulesConfirm: [
        (value) => {
          if (value) return true;

          return "Confirm password is required.";
        },
        (value) => {
          if (value === this.newPassword) return true;

          return "Passwords do not match.";
        },
      ],
    };
  },
  methods: {
    async resetPassword() {
      try {
        // Send reset request to backend
        const response = await fetch(
          "https://elkodaa.chd-staging.tech/api/c/account/me",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "X-DID KEY": "1234", // Corrected header name
            },
          }
        );

        // Handle response
        if (response.ok) {
          // Assuming response.ok is used for checking if response status is in the range 200-299
          this.resetComplete = true;
          this.errorMessage = "";
        } else {
          // Get the error message from the response
          const responseData = await response.json();
          this.errorMessage = responseData.message || "Unknown error occurred.";
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        this.errorMessage =
          "An error occurred while resetting password. Please try again later.";
      }
    },
    async confirmReset() {
      try {
        // Send reset confirmation to backend
        const response = await fetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-DID KEY": "1234",
            },
            body: {
              phone: this.phone,
              dial_code: 20,
              identity: "1234",
              otp: this.OTP,
              fcm_token: "636",
            },
          }
        );

        // Handle response
        if (response.status === 201) {
          this.resetConfirmationMessage =
            "Password reset successful. You can now login with your new password.";
          // Optionally redirect to home page
          this.$router.push("/");
          this.resetComplete = false;
        } else {
          this.resetConfirmationMessage = response.message;
        }
      } catch (error) {
        console.error("Error confirming password reset:", error);
        this.resetConfirmationMessage =
          "An error occurred while resetting password. Please try again later.";
      }
    },
    returnBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.password-reset-container {
  min-width: 50%;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
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
    .btns {
      display: flex;
      position: absolute;
      width: 100%;
      left: 0;
      justify-content: space-evenly;
    }
  }
}
</style>
