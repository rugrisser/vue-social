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
                            <v-hover v-if="marked" v-slot:default="{ hover }">
                                <v-icon @click="deleteBookmark" large>
                                    {{ hover ? 'mdi-bookmark-outline' : 'mdi-bookmark' }}
                                </v-icon>
                            </v-hover>
                            <v-hover v-else v-slot:default="{ hover }">
                                <v-icon @click="createBookmark" large>
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
                user_id: -1,
                marked: false
            }
        },
        methods: {
            createBookmark() {

                this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                    .then(
                        (response) => {

                            let users = response.data;
                            users[this.user_id - 1].bookmarks.push(this.post_id);

                            this.axios.put('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d', JSON.stringify(users))
                                .then(
                                    () => {
                                        this.$emit('update');
                                    }
                                );

                        }
                    );

            },
            deleteBookmark() {

                this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                    .then(
                        (response) => {

                            let users = response.data;
                            users[this.user_id - 1].bookmarks.splice(users[this.user_id - 1].bookmarks.indexOf(this.post_id, 0), 1);

                            this.axios.put('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d', JSON.stringify(users))
                                .then(
                                    () => {
                                        this.$emit('update');
                                    }
                                );

                        }
                    );

            }
        },
        props: ["post_id", "avatar", "author", "title", "text", "saved"],
        mounted() {

            this.user_id = this.$store.state.id;

            if (this.user_id !== -1) {

                this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                    .then(
                        (response) => {

                            let profile = response.data[this.user_id - 1];

                            if (profile.bookmarks.indexOf(this.post_id) !== -1)
                                this.marked = true;
                            else
                                this.marked = false;

                        }
                    );

            }

        }
    }
</script>

<style scoped>

    .save {
        cursor: pointer;
    }

</style>