<template>
    <div id="Campaign">
        <v-container>
            <v-row>
                <ContactList></ContactList>
                <AddNew></AddNew>
            </v-row>
            <v-row>
                <CampaignList></CampaignList>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import AddNew from '../components/campaign/addNew';
import ContactList from '../components/sendEmail/listContact';
import CampaignList from '../components/campaign/listCampaign';
export default {
    name: "campaign",
    components: {
        AddNew,
        ContactList,
        CampaignList
    },
    data: () => ({
        
    })
}
</script>