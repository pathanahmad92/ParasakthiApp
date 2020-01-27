<template>
<div> 
               
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>Departments List</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-simple-table fixed-header height="400px">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Calories</th>
                            <th class="text-left">followed by</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Created Date</th>                            
                            <th class="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                            <td>{{ item.followedby }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.createddate }}</td>                            
                            <td>
                                <v-btn color="blue darken-1" text >Edit</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteDesert(item.id)">Delete</v-btn>
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
        <v-card-title>Select Country</v-card-title>
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
                  placeholder="Name"
                  v-model="name"
                />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Calories"
                v-model="calories"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Followed by"
                v-model="followedby"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
                v-model="email"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field                
                placeholder="Created Date"
                v-model="createddate"
              />
            </v-col>            
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addDesert">Save</v-btn>
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
export default{
    name : 'department',
    data :function(){
        return {
            dialog: false,
            id : '',
            name : '',
            calories : '',
            followedby :'',
            email:'',
            createddate :'',

            items: [
                {
                text: 'Dashboard',
                disabled: false,
                href: 'breadcrumbs_dashboard',
                },
                {
                text: 'Link 1',
                disabled: false,
                href: 'breadcrumbs_link_1',
                },
                {
                text: 'Link 2',
                disabled: true,
                href: 'breadcrumbs_link_2',
                },
            ],
            desserts: [
                {
                    id: 100,
                    name : 'Frozen Yogurt',
                    calories : 200,
                    followedby: 'Samba',
                    createddate:'24-Jan-2020',
                    email:'samba@gmail.com'
                }
                ],
        }
    },
    methods : {
        addDesert : function(){
            var id = this.desserts.sort(function(a,b){return b["id"] - a["id"]})[0].id;
            alert(id);
            var desert = {
                id : id+1,
                name : this.name,
                calories : this.calories,
                followedby : this.followedby,
                email : this.email,
                createddate : this.createddate,
            };
            this.desserts.push(desert);
            this.dialog = false;
        },
        editDesert : function(){

        },
        deleteDesert : function(id){
            
            var arr = this.desserts;
            var i = arr.length;
            while(i--){
                if( arr[i] 
                    && arr[i].hasOwnProperty("id") 
                    && (arr[i]["id"] == id ) ){ 
                    //alert(id);
                    arr.splice(i,1);

                }
            }
        }
    }
}
</script>