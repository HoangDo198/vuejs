<template>
  <v-app>
    <v-content>
      
      <ToolBar></ToolBar>

      <Drawer></Drawer>

      <Views></Views>

      <Footer></Footer>

    </v-content>
  </v-app>  
</template>

<script>
import Drawer from '../components/drawers';
import ToolBar from '../components/ToolBar';
import Views from '../components/Views';
import Footer from '../components/Footer'

export default {
  name: 'App',
  components: {
    Drawer,
    ToolBar,
    Views,
    Footer
  },
  data: () => ({
    
  }),
};
</script>
