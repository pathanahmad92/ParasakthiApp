<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>Invoice Generator</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="6">
                                    <v-select
                                    :items="firms"
                                    item-text="text"
                                    item-value="value"
                                    v-model="firm"
                                    label="Firm Name"
                                    :rules="[v => !!v || 'Please select Firm Name']"
                                    required
                                    dense
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-select
                                    :items="firms"
                                    item-text="text"
                                    item-value="value"
                                    v-model="shipper"
                                    label="Shipper"
                                    :rules="[v => !!v || 'Please select Shipper Name']"
                                    required
                                    dense
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                    :items="firms"
                                    item-text="text"
                                    item-value="value"
                                    v-model="consignee"
                                    label="Consignee"
                                    dense
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field
                                    label="Total Tons"
                                    v-model="totaltons"
                                    :rules="[v => !!v || 'Total Tons is required',v => /^[0-9]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    label="Ton Range From"
                                    v-model="tonrangefrom"
                                    :rules="[v => !!v || 'Ton range from is required',v => /^[0-9.]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    label="Ton Range To"
                                    v-model="tonrangeto"
                                    :rules="[v => !!v || 'Ton range to is required',v => /^[0-9.]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    label="Rate per MTS"
                                    v-model="ratepermts"
                                    :rules="[v => !!v || 'Rate per MTS is required',v => /^[0-9]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    label="GST %"
                                    v-model="gst"
                                    :rules="[v => !!v || 'GST % is required',v => /^[0-9]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field
                                    label="HSN code"
                                    v-model="hsncode"
                                    :rules="[v => !!v || 'HSN code is required',v => /^[0-9]+$/.test(v) || 'Only numbers are allowed']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field
                                    label="Particulars"
                                    v-model="particulars"
                                    :rules="[v => !!v || 'Particulars is required']"
                                    required
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-switch v-model="iscess" class="ma-2" label="Cess"></v-switch>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    :disabled="!iscess"
                                    label="Cess Rate"
                                    v-model="cessrate"
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <v-btn color="primary" 
                                        :disabled="!valid"
                                        @click="validate"
                                    >Generate Invoice</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-row >
                            <v-col cols="12">
                                <v-simple-table fixed-header>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <th class="text-left">Firm Name</th>
                                        <th class="text-left">MTS</th>
                                        <th class="text-left">Amount</th>
                                        <th class="text-left">Tax Amount</th>
                                        <th class="text-left">Amount With Tax</th>
                                        <th class="text-left">Date</th>
                                        <th class="text-left">Truck No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="invoice in invoicelist" :key="invoice._id">
                                        <td>{{ invoice.firmname }}</td>
                                        <td>{{ invoice.mts }}</td>
                                        <td>{{ invoice.amountWithoutTax }}</td>
                                        <td>{{ invoice.gst }}</td>                            
                                        <td><label v-bind:style="{color:(invoice.amountWithTax>50000 ? 'red':'black')}">{{ invoice.amountWithTax }}</label></td>
                                        <td></td>
                                        <td>{{invoice.truckno}}</td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row> 
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>   
    </div>
</template>

<script>
const FirmService = require('../services/firmService');
const TruckService = require('../services/truckService');

export default{
    name :'invoicegenerator',
    data : function(){
        return {
            firms : [],
            invoicelist : [],
            trucks :[],

            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],

            firm: "",
            shipper: "",
            shippergst: "",
            consignee: "",
            consigneegst: "",
            totaltons: "",
            tonrangefrom: "",
            tonrangeto: "",
            ratepermts: "",
            gst: "",
            particulars: "",
            hsncode: "",
            iscess: false,
            cessrate: "",
        }
    },
    methods : {
        validate : function(){
            if (this.$refs.form.validate()) {
                this.snackbar = true;
                this.generateInvoiceTable();
            }
        },
        generateInvoiceTable : function(){
            this.invoicelist=[];
            var totalTons = this.totaltons;

            var sumOfTons = 0;
            for(var i=0; sumOfTons<totalTons ;i++){            
                var tonRangeFrom = this.tonrangefrom;
                var tonRangeTo = this.tonrangeto;
                var tons = parseFloat(Math.random() * (parseFloat(tonRangeTo) - parseFloat(tonRangeFrom)) + parseFloat(tonRangeFrom)).toFixed(1);
                sumOfTons = sumOfTons+parseFloat(tons);

                var randTruck = this.trucks[Math.floor(Math.random() * this.trucks.length)];

                var gst = this.gst/100;
                var gstTotal = this.ratepermts * tons * (gst);
                var amountWithoutTax = parseFloat(this.ratepermts * tons).toFixed(1);
                var amountWithTax = parseFloat(amountWithoutTax + gstTotal).toFixed(1);

                var firmDetails = this.getFirmDetails(this.firm);
                var shipperDetails = this.getFirmDetails(this.shipper);
                var consigneeDetails = this.getFirmDetails(this.consignee);

                var invoiceObject ={
                    firmname : firmDetails.firmname,
                    firmtitleaddress : firmDetails.firmtitleaddress,
                    firmbriefaddress : firmDetails.firmbriefaddress,

                    shippername : shipperDetails.firmname,
                    shippertitleaddress : shipperDetails.firmtitleaddress,
                    shipperbriefaddress : shipperDetails.firmbriefaddress,

                    consigneename : consigneeDetails.firmname,
                    consigneetitleaddress : consigneeDetails.firmtitleaddress,
                    consigneebriefaddress : consigneeDetails.firmbriefaddress,

                    mts : tons,
                    amountWithTax : amountWithTax,
                    amountWithoutTax : amountWithoutTax,
                    gst : gstTotal,
                    gstone : gstTotal/2,
                    gsttwo : gstTotal/2,
                    hsncode : this.hsncode,
                    particulars : this.particulars,
                    date : "",
                    truckno: randTruck
                }
                this.invoicelist.push(invoiceObject);
            }
        },
        getFirmDetails : function(id){
            let firms =this.firms.filter(function(dt){
                return dt.value == id
            });
            if(firms.length>0)
                return  {
                    firmname : firms[0].text,
                    firmtitleaddress:firms[0].firmTitleAddress,
                    firmbriefaddress:firms[0].firmBriefAddress,
                    firmgst:firms[0].gst,
                    };

            return {
                firmname : "",
                firmtitleaddress:"",
                firmbriefaddress:"",
                firmgst:""
                };
        }
    },
    created : async function(){
        try{            
            let firms = await FirmService.getfirms();
            firms.data.forEach(element => {
                let firm ={
                    text : element.firmName+" - "+element.gstNo,
                    value : element._id,
                    firmName : element.firmName,
                    firmTitleAddress : element.firmTitleAddress,
                    firmBriefAddress : element.firmBriefAddress,
                    gst : element.gstNo,
                };
                this.firms.push(firm);
            });

            var that=this;
            TruckService.getTrucks().then(function(trucks){
                trucks.data.forEach(function(element){  
                    that.trucks.push(element.truckNumber);
                });
            });
        }
        catch(error){
            this.firms = [];
        }
    },
    computed:{
        firmgst : function(){
            var firm = this.firm;
            let firms =this.firms.filter(function(dt){
                return dt.value == firm
            });
            return firms.length > 0 ? firms[0].gst : "";
        }
    }
}
</script>