<template>
    <v-navigation-drawer id="app-drawer" app dark floating persistent mobile-break-point="991" permanent>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Mail Marketing
                </v-list-item-title>
                <v-list-item-subtitle>
                    fast and furious
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
            <v-list-item-group v-model="model" active-class="border" color="white">
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        data: () => ({
            items: [
                {
                    to: '/Dashboard',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard',
                },
                {
                    to: 'email-list',
                    icon: 'mdi-account-box-multiple',
                    text: 'Contact list',
                },
                {
                    to: 'campaign',
                    icon: 'mdi-chart-donut',
                    text: 'campaign list',
                },
            ],
            model: 1,
        }),
    }
</script>