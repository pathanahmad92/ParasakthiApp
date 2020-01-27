<template>

  <v-app>
    <HeaderComponent/>

    <SidenavComponent></SidenavComponent>

    <v-content>
      <v-container
        fluid
      >
      <v-row>
                <v-col cols="12">
          <router-view/>
                </v-col>
      </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HeaderComponent from './components/shared/header';
import SidenavComponent from './components/shared/sidenav';
import router from './routes/router';

export default {
  name: 'App',

  components: {
    HeaderComponent,
    SidenavComponent
  },

  data: () => ({
    //
  }),
  router
};
</script>
