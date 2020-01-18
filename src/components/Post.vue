<template>
    <v-card outlined>
        <v-container class="px-12 py-7">
            <v-row>
                <v-col cols="1">
                    <v-avatar
                        width="90px"
                        height="90px">
                        <img :src="avatar">
                    </v-avatar>
                </v-col>
                <v-col cols="11">
                    <v-card-title>{{ title }}</v-card-title>
                    <v-card-subtitle>{{ 'автор ' + author }}</v-card-subtitle>
                </v-col>
            </v-row>
            <p class="ml-4 mr-6 mt-7 mb-9 headline font-weight-light">{{ text }}</p>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "Post",
        props: ["avatar", "author", "title", "text"]
    }
</script>

<style scoped>

</style>