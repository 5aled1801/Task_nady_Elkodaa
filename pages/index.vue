<!-- eslint-disable no-console -->
<template>
  <v-row justify="center" align="center" class="mt-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="w-100" color="success">
        <v-icon color="white">mdi-done</v-icon
        ><v-card-title class="headline"> Dashboard </v-card-title>
        <v-card-text>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
            excepturi odit itaque ea dolor error praesentium pariatur nam nihil
            illo vel, inventore soluta saepe maxime repellat exercitationem
            quasi unde? Eaque.
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  setup() {
    definePageMeta({ middleware: ["auth"] });
  },
};
</script>
