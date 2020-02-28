<template>
    <div class="bookmarks">
        <v-container class="text-left mainBlock">
            <p class="light-blue--text text--darken-2 display-2 font-weight-bold">Закладки</p><br>
            <v-container class="mt-8">
                <v-row>
                    <v-col cols="10" sm="10" md="10" lg="5" xl="5">
                        <Post
                                v-for="(post, index) in posts.first"
                                v-on:update="update"
                                :key="index"
                                :post_id="post.id"
                                :title="post.title"
                                :text="post.text"
                                :author="users[post.author - 1].name"
                                :avatar="users[post.author - 1].photo"
                                :saved="true" />
                    </v-col>
                    <v-col cols="10" sm="10" md="10" lg="5" xl="5">
                        <Post
                                v-for="(post, index) in posts.second"
                                v-on:update="update"
                                :key="index"
                                :post_id="post.id"
                                :title="post.title"
                                :text="post.text"
                                :author="users[post.author - 1].name"
                                :avatar="users[post.author - 1].photo"
                                :saved="true" />
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
    import Post from '@/components/Post';

    export default {
        name: "Bookmarks",
        components: {
            Post
        },
        data() {
            return {
                id: -1,
                posts: {
                    data: [],
                    main: [],
                    first: [],
                    second: []
                },
                profile: {
                    bookmarks: []
                },
                users: []
            }
        },
        methods: {
            update() {

                this.posts.first = [];
                this.posts.second = [];
                this.posts.main = [];

                this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                    .then(
                        (response) => {

                            this.users = response.data;
                            this.profile = response.data[this.id - 1];
                            this.axios.get('http://188.225.47.187/api/jsonstorage/3aa45f3959e052317fba82f4096df045')
                                .then(
                                    (response) => {

                                        this.posts.data = response.data;

                                        for (const index of this.profile.bookmarks) {
                                            console.log(this.posts.data[index]);
                                            this.posts.data[index].id = index;
                                            this.posts.main.push(this.posts.data[index]);
                                        }

                                        for (const index in this.posts.main) {

                                            switch (index % 2) {
                                                case 0:
                                                    this.posts.first.push(this.posts.main[index]);
                                                    break;
                                                case 1:
                                                    this.posts.second.push(this.posts.main[index]);
                                                    break;
                                            }

                                        }

                                    }
                                );

                        }
                    );

            }
        },
        mounted() {

            this.id = this.$store.state.id;

            if (this.id === -1)
                this.$router.push('/login');
            else
                this.update();

        }
    }
</script>

<style scoped>

    .mainBlock {
        margin: 3% !important;
    }

</style>