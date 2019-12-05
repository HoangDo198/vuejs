<template>
  <div class="about">
      <v-container>
        <v-row>
          <ContactList></ContactList>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn large color="error"  @click.prevent="getData">Send</v-btn>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import EventBus from '../components/EventBus'
import ContactList from '../components/sendEmail/listContact';
export default {
  name: "About",
  components: {
    ContactList
  },
  created () {
    EventBus.$on('Data', (datas) => {
      this.listContact = datas;
    })
  },
  data: () => ({
    listContact: []
  }),
  methods: {
    getData() {
      console.log(this.listContact);
      
    }
  }
}
</script>