<template>
<div> 
               
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>Trucks List</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-simple-table fixed-header height="400px">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Truck Number</th>
                            <th class="text-left">Created Date</th>                            
                            <th class="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="truck in trucks" :key="truck._id">
                            <td>{{ truck.truckNumber }}</td>
                            <td>{{ truck.createdDate }}</td>                            
                            <td>
                                <v-btn color="blue darken-1" text @click="editTruck(truck._id,truck.truckNumber)">Edit</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteTruck(truck._id)">Delete</v-btn>
                            </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-divider></v-divider>
                
            </v-card>
        </v-col>
    </v-row>    

    <v-dialog v-model="dialog" scrollable persistent max-width="500px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-card-title>Add Truck</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <!-- <v-avatar
                  size="40px"
                  class="mx-3"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar> -->
                <v-text-field
                  placeholder="Truck Number"
                  v-model="truckNumber"
                />
              </v-row>
            </v-col>                       
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false; id ='' ">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addTruck" v-if="!id">Save</v-btn>
          <v-btn color="blue darken-1" text @click="updateTruck" v-if="id">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
</div>
</template>

<script>
const TruckService = require('../services/truckService');
export default{
    name : 'truck',
    data :function(){
        return {
            dialog: false,
            id : '',
            truckNumber : '',                       
            trucks: [],
        }
    },
    methods : {
        addTruck : async function(){
            try{
                let savedTruck = await TruckService.saveTrucks({
                    truckNumber : this.truckNumber
                });
                
                this.trucks.push(savedTruck.data.data);
                this.truckNumber="";
                this.dialog = false;
                this.id="";
            }
            catch(error){
                alert(error)
            }
        },
        updateTruck : async function(){
            try{
                await TruckService.updateTrucks({
                    truckNumber : this.truckNumber
                },this.id);
                
                let trucks = await TruckService.getTrucks();
                this.trucks = trucks.data;

                this.truckNumber="";
                this.dialog = false;
                this.id="";
            }
            catch(error){
                alert(error)
            }
        },
        editTruck : function(id,truckNumber){
            this.dialog = true;
            this.id=id;
            this.truckNumber=truckNumber;
        },
        deleteTruck : async function(id){
            try{
                await TruckService.deleteTrucks(id);
                let trucks = await TruckService.getTrucks();
                this.trucks = trucks.data;
            }
            catch(error){
                this.trucks = [];
            }
        }
    },
    beforeMount : async function() {        
        try{            
            let trucks = await TruckService.getTrucks();
            this.trucks = trucks.data;
        }
        catch(error){
            this.trucks = [];
        }
    },
}
</script>