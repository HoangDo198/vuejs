<template>
  <v-container>
    <v-row>
      <MailList></MailList>
      <AddNew></AddNew>
    </v-row>
  </v-container>
</template>

<script>
  import AddNew from '../components/Email/addNew'
  import MailList from '../components/Email/EmailList'
  export default {
    name: "ListEmail",
    components: {
      AddNew,
      MailList
    },
    data() {
      return {}
    },
  }
</script>