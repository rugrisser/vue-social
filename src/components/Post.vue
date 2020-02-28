<template>
    <v-card outlined>
        <v-container class="px-12 py-7">
            <v-row>
                <v-col cols="4" sm="3" lg="3" xl="2" md="2">
                    <v-avatar
                        width="90px"
                        height="90px">
                        <img :src="avatar">
                    </v-avatar>
                </v-col>
                <v-col cols="6">
                    <v-card-title>{{ title }}</v-card-title>
                    <v-card-subtitle>{{ 'автор ' + author }}</v-card-subtitle>
                </v-col>
                <v-col cols="2" sm="3" lg="3" xl="4" md="4">
                    <div class="text-right">
                        <div class="save" v-if="user_id !== -1">
                            <v-hover v-if="saved" v-slot:default="{ hover }">
                                <v-icon large>
                                    {{ hover ? 'mdi-bookmark-outline' : 'mdi-bookmark' }}
                                </v-icon>
                            </v-hover>
                            <v-hover v-else v-slot:default="{ hover }">
                                <v-icon large>
                                    {{ hover ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
                                </v-icon>
                            </v-hover>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <p class="ml-4 mr-6 mt-7 mb-9 headline font-weight-light">{{ text }}</p>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "Post",
        data() {
            return {
                user_id: -1
            }
        },
        props: ["avatar", "author", "title", "text", "saved"],
        mounted() {
            this.user_id = this.$store.state.id;
        }
    }
</script>

<style scoped>

    .save {
        cursor: pointer;
    }

</style>