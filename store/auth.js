// store/auth.js

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    errormessage: "",
  }),
  actions: {
    async authenticateUser({ email, password }) {
      try {
        const response = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-DID KEY": "1234",
            },
            body: {
              email,
              password,
            },
          }
        );
        console.log(response);
        if (!response.ok) {
          // Handle non-successful response (HTTP status code other than 2xx)
          throw new Error("Login failed");
        }

        const data = await response; // Parse response body as JSON

        // Log the response data to inspect its structure
        console.log(data);

        if (data && data.token) {
          // Assuming token is directly available in response data
          const token = useCookie("token");
          token.value = data.token; // Access token directly if available
        } else {
          this.errormessage = "Token not found in response";
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error during login:", error);
        this.errormessage = "An error occurred during login";
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
