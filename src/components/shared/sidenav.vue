<template>
<div>
    <v-app-bar
      app
      color="primary"
      dark      
      elevation
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Pantrin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card >
<v-navigation-drawer
        v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
    >

        <template v-slot:prepend>
            <v-list-item two-line>
            <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Jane Smith</v-list-item-title>
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>

      <v-divider></v-divider>
      <v-list dense>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-action>
                    <router-link to="/trucks">Trucks</router-link>
                </v-list-item-action>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-action>
                    <router-link to="/firms">Firms</router-link>
                </v-list-item-action>
            </v-list-item>   
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-action>
                    <router-link to="/invoicegenerator">Generate invoice</router-link>
                </v-list-item-action>
            </v-list-item>         
        </v-list>
    </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
  export default {
    name : "sidenav",
    methods :{
        getMenus: ()=>{
            var result = [];
            // foreach(menuItem in menus){
            //     var filteredMenus = menus.filter(function(dt){ return dt.parentid==menuItem.menuid});
            //     var menu = { menuid : menuItem.menuid, 
            //     menuname: menuItem.menuname, 
            //     parentid : menuItem.parentid,
            //     submenu : this.getMenus(filteredMenus)
            //     };
            //     result.push(menu);
            // }
            return result;
        }
    },
    data: () => ({
        drawer:null,
        menus : [
        { menuid : 1, menuname:"Menu - 1", parentid : 0},
        { menuid : 2, menuname:"Menu - 1 - 1", parentid : 1},
        { menuid : 3, menuname:"Menu - 1 - 2", parentid : 1},
        { menuid : 4, menuname:"Menu - 2", parentid : 0},
        { menuid : 5, menuname:"Menu - 2 - 1", parentid : 4},
        { menuid : 6, menuname:"Menu - 2 - 2", parentid : 4},
        { menuid : 7, menuname:"Menu - 2 - 3", parentid : 4},
        { menuid : 8, menuname:"Menu - 2 - 1 - 1", parentid : 5},
        { menuid : 9, menuname:"Menu - 2 - 1 - 2", parentid : 5},
        { menuid : 10, menuname:"Menu - 2 - 1 - 2 - 1", parentid : 9},
        { menuid : 11, menuname:"Menu - 2 - 1 - 2 - 2", parentid : 9},
        { menuid : 12, menuname:"Menu - 3", parentid : 0},
    ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
    }),
  }
</script>