<!-- eslint-disable no-console -->
<template>
  <v-app>
    <v-container>
      <v-app-bar
        fixed
        app
        style="background-color: rgb(12 9 73) !important; left: 0"
      >
        <v-col cols="5" sm="8" md="8">
          <v-toolbar-title class="ml-5 text-white">{{ title }}</v-toolbar-title>
        </v-col>
        <v-col cols="4" class="d-flex justify-space-around">
          <NuxtLink v-if="!authenticated" to="/login" class="mr-6"
            >Login</NuxtLink
          >
          <NuxtLink v-if="!authenticated" to="/registration" class="pr-6"
            >Register</NuxtLink
          ><v-btn>
            <NuxtLink v-if="authenticated" to="/rest">Rest Password</NuxtLink>
          </v-btn>
          <v-btn v-if="authenticated" @click="logout()" color="white"
            >log out</v-btn
          >
        </v-col>
      </v-app-bar>
      <main><slot></slot></main>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "~/node_modules/pinia/dist/pinia";
import { useAuthStore } from "../store/auth";
export default {
  name: "DefaultLayout",
  data() {
    return {
      title: "Nady Elkodaa",
      user: "",
      d_log: false,
      logOut: false,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["authenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logUserOut"]),
    logout() {
      this.logUserOut();
      this.$router.push("/login");
    },
  },
  setup() {
    definePageMeta({ middleware: ["auth"] });
  },
};
</script>
<style lang="scss">
.vapp {
  background-color: black !important;
}
a {
  text-decoration: none !important;
  color: white !important;
}
.router-link-exact-active {
  color: rgb(0, 139, 225) !important;
}
</style>
