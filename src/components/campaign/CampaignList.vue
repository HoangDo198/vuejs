<template>
    <v-col cols="6">
        <v-data-table :headers="headers" :items="desserts" sort-by="stt" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Campign List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-col>
</template>

<script>
import axios from 'axios'
  export default {
    name: "EmailList",
    data: () => ({
      dialog: false,
      headers: [
        { text: 'STT', value: 'stt' },
        { text: 'Email', value: 'email'},
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        email: ''
      },
      defaultItem: {
        email: '',
        stt: 0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get('http://157.230.252.150/mails').then( res => {
          let datas =  res.data.map( (val, index) => {
            var obj = {};
            obj.stt = index+1;
            obj.email = val.email;
            obj.id = val._id;
            return obj;
          })
          this.desserts = datas
          console.log(this.desserts);
          
        }).catch(errors => {
          console.log(errors);
        })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        axios.patch('http://157.230.252.150/',{
          params: {
            id: this.desserts[this.editedIndex].id
          }
        }).then ( (res) => {
          alert("Edit Successed!!!")
          console.log(res);
          
        }).catch ( () => {
          alert("Edit Faild!!!")
        })
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        axios.delete('http://157.230.252.150/',{
          params: {
            id: this.desserts[index].id
          }
        }).then ( (res) => {
          alert("Delete Successed!!!")
          console.log(res);
          
        }).catch ( () => {
          alert("Delete Faild!!!")
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>