<template>
    <v-card outlined>
        <v-container>
            <v-row>
                <v-col cols="3">
                    <v-avatar
                        class="ml-5"
                        width="90%"
                        height="auto">
                        <img :src="'https://randomuser.me/api/portraits/men/' + id + '.jpg'">
                    </v-avatar>
                </v-col>
                <v-col cols="9">
                    <v-card-title>{{ name }}</v-card-title>
                    <v-card-subtitle class="text-left">{{ city }}</v-card-subtitle>
                    <div class="mr-12 ml-4">
                        <v-btn
                                color="light-blue darken-1"
                                class="px-9 text-left"
                                :href="'/profile/' + id"
                                block left outlined>
                            <v-icon>mdi-account-badge-horizontal-outline</v-icon>
                            <span class="ml-3 body-1 text-uppercase font-weight-light">Перейти в профиль</span>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "User",
        props: ["id", "name", "city"]
    }
</script>

<style scoped>

</style>