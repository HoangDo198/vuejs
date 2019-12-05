<template>
<v-card>
  <div class="home">
    <div class="container">
    <div class="panel panel-sm">
      <div class="panel-heading"> 
        <h4>CSV Import</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
          <div class="col-sm-9">
            <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </div>
   <v-col cols="12" v-if="success">
        <v-alert dismissible  type="success">
            Add New Successful
        </v-alert>
        </v-col>
        <v-col cols="12" v-if="error">
        <v-alert dismissible type="error">
            Add new Failse
        </v-alert>
    </v-col>
   <v-col cols="12">
        <v-btn @click.prevent="submit" color="error">Import</v-btn>
    </v-col>
</v-card>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'home',
  data: () => {
    return {
      channel_name: '',
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders:{},
      sortKey: '',
      success: false,
      error: false
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      var vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    },
    csvJSON(csv){
      var vm = this
      var lines = csv.split("\n")
      var result = []
      var headers = lines[0].split(",")
      vm.parse_header = lines[0].split(",") 
      lines[0].split(",").forEach(function (key) {
        vm.sortOrders[key] = 1
      })
      
      lines.map(function(line, indexLine){
        if (indexLine < 1) return // Jump header line
        
        var obj = {}
        var currentline = line.split(",")
        
        headers.map(function(header, indexHeader){
          obj[header] = currentline[indexHeader]
        })
        
        result.push(obj)
      })
      
      result.pop() // remove the last item because undefined values
      
      return result // JavaScript object
    },
    loadCSV(e) {
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        // Handle errors load
        reader.onload = function(event) {
          var csv = event.target.result;
          vm.parse_csv = vm.csvJSON(csv)
          
        };
        reader.onerror = function(evt) {
          if(evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert('FileReader are not supported in this browser.');
      }
    },
    submit () {
        axios.post('http://157.230.252.150/mails/',{
            email: this.parse_csv,
        }).then( res => {
            this.success = res.data
            console.log(res);
            
        }).catch ( err => {
            this.error = err
        })
    }
  }
   
}
</script>
