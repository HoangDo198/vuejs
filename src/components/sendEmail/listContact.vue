<template>
<v-col cols="6">
  <h1>Email Contact</h1>
<div id="list-contact">
  <v-card>
    <v-text-field
    v-model="message1"
    label="Search"
    clearable
    ></v-text-field>
    <v-list shaped>
      <v-list-item-group
        v-model="datas"
        multiple
      >
        <template v-for="(item, i) in items">
          <v-divider
            v-if="!item"
            :key="`divider-${i}`"
          ></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :true-value="item"
                  color="deep-purple accent-4"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>

      </v-list-item-group>
    </v-list>
  </v-card>
  <v-btn large color="error" id="confirm"  @click.prevent="sendData">Confirm</v-btn>
  <v-btn large color="error" id="confirm"  @click.prevent="Reset">Reset</v-btn>
</div>
</v-col>
</template>

<script>
import EventBus from '../EventBus'
    export default {
        data: () => ({
        items: [
            'Phongdo123@gmail.com',
            'Phongdo234@gmail.com',
            'Phongdo345@gmail.com',
            'Phongdo567@gmail.com',
            'Phongdo789@gmail.com',
            'Phongdo891@gmail.com',
            'Phongdo912@gmail.com',
            'Phongdo1231@gmail.com',
            'Phongdo1232@gmail.com',
        ],
        datas: [],
        }),
      methods: {
        sendData(){
          EventBus.$emit('Data', this.datas);
        },
        Reset(){
          this.datas = [];
        }
      }
    }
</script>

<style scoped>
  h1 {
      font-size: 18px;
      font-weight: bold;
      font-family: sans-serif;
  }
  .v-card {
    height: 300px;
    overflow-y: scroll;
    padding-bottom: 2px;
  }
  #confirm {
    margin: 10px 20px 0 0 ;
    cursor: pointer
  }
  .v-text-field {
    margin: 0 5px;
  }
</style>