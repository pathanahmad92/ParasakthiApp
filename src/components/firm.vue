<template>
<div> 
               
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>Firms List</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-simple-table fixed-header height="400px">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Firm Name</th>
                            <th class="text-left">Firm Title Addres</th>
                            <th class="text-left">Firm Breif Addres</th>
                            <th class="text-left">GST No</th>
                            <th class="text-left">Created Date</th>
                            <th class="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="firm in firms" :key="firm._id">
                            <td>{{ firm.firmName }}</td>
                            <td>{{ firm.firmTitleAddress }}</td>
                            <td>{{ firm.firmBriefAddress }}</td>
                            <td>{{ firm.gstNo }}</td>
                            <td>{{ firm.createdDate }}</td>                            
                            <td>
                                <v-btn color="blue darken-1" text @click="editFirm(firm._id)">Edit</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteFirm(firm._id)">Delete</v-btn>
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
        <v-card-title>Add Firm</v-card-title>
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
                <v-text-field
                  placeholder="Firm Name"
                  v-model="firmName"
                />
              </v-row>
            </v-col>   
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-text-field
                  placeholder="Firm Title Address"
                  v-model="firmTitleAddress"
                />
              </v-row>
            </v-col>   
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-text-field
                  placeholder="Firm Breif Address"
                  v-model="firmBriefAddress"
                />
              </v-row>
            </v-col>     
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-text-field
                  placeholder="GST No"
                  v-model="gstNo"
                />
              </v-row>
            </v-col>                     
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false; id ='' ">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addFirm" v-if="!id">Save</v-btn>
          <v-btn color="blue darken-1" text @click="updateFirm" v-if="id">Update</v-btn>
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
const FirmService = require('../services/firmService');
export default{
    name : 'firm',
    data :function(){
        return {
            dialog: false,
            id : '',
            firmName : '',
            firmTitleAddress : '',
            firmBriefAddress : '',
            gstNo : '',
            firms: [],
        }
    },
    methods : {
        addFirm : async function(){
            try{
                let savedFirm = await FirmService.savefirms({
                    firmName : this.firmName,
                    firmTitleAddress : this.firmTitleAddress,
                    firmBriefAddress : this.firmBriefAddress,
                    gstNo : this.gstNo,
                });
                
                this.firms.push(savedFirm.data.data);
                this.id = '',
                this.firmName = '',
                this.firmTitleAddress = '',
                this.firmBriefAddress = '',
                this.gstNo = '',
                this.dialog = false;
            }
            catch(error){
                alert(error)
            }
        },
        updateFirm : async function(){
            try{
                await FirmService.updatefirms({
                    firmName : this.firmName,
                    firmTitleAddress : this.firmTitleAddress,
                    firmBriefAddress : this.firmBriefAddress,
                    gstNo : this.gstNo,
                },this.id);
                
                let firms = await FirmService.getfirms();
                this.firms = firms.data;

                this.id = '',
                this.firmName = '',
                this.firmTitleAddress = '',
                this.firmBriefAddress = '',
                this.gstNo = '',
                this.dialog = false;
            }
            catch(error){
                alert(error)
            }
        },
        editFirm : function(id){
            this.dialog = true;
            let firm = this.firms.filter(function(dt){
                return dt._id == id;
            })[0];
            this.id = id;
            this.firmName = firm.firmName;
            this.firmTitleAddress = firm.firmTitleAddress;
            this.firmBriefAddress = firm.firmBriefAddress;
            this.gstNo = firm.gstNo;
        },
        deleteFirm : async function(id){
            try{
                alert(id)
                await FirmService.deletefirms(id);
                let firms = await FirmService.getfirms();
                this.firms = firms.data;
            }
            catch(error){
                this.firms = [];
            }
        }
    },
    beforeMount : async function() {        
        try{            
            let firms = await FirmService.getfirms();
            this.firms = firms.data;
        }
        catch(error){
            this.firms = [];
        }
    },
}
</script>