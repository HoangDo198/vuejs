<template>
     <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
            <template v-slot:activator>
                <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
            </template>
        </v-list-group>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
            <template v-slot:activator>
                <v-list-item-content>
                <v-list-item-title>Action</v-list-item-title>
                </v-list-item-content>
            </template>
        </v-list-group>
     </v-list-group>
</template>