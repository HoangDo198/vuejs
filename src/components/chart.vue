<template>
  <div id="Chart">
    <line-chart :data="data"></line-chart>
  </div>
</template>

<script>

export default {
  data: () => ({
    data: [
      {
        name: 'revenue', 
        data: {
          '2017-01-01': 3, 
          '2017-02-01': 4,
          '2017-03-01': 5, 
          '2017-04-01': 6,
          '2017-05-01': 3, 
          '2017-06-01': 4
        }
      },
      {
        name: 'Cost', 
        data: {
          '2017-01-01': 1, 
          '2017-02-01': 3,
          '2017-03-01': 1, 
          '2017-04-01': 2,
          '2017-05-01': 3, 
          '2017-06-01': 4
        }
      },
    ]
  })
}
</script>

<style scoped>
  div#Chart {
    margin-top: 30px;
    padding: 0 10px;
  }
</style>