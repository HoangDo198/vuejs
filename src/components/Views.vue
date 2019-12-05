<template>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: "Mail Marketing"
    }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>