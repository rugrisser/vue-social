<template>
    <div class="posts">
        <v-container class="text-left mainBlock">
            <p class="light-blue--text text--darken-2 display-2 font-weight-bold">Последние публикации</p><br>
            <v-container class="mt-8">
                <v-row>
                    <v-col cols="10" sm="10" md="10" lg="5" xl="5">
                        <v-card v-if="id > 0" outlined class="mb-6">
                            <v-container class="px-12 py-12">
                                <div>
                                    <v-text-field
                                            v-model="newPost.title"
                                            outlined label="Заголовок"
                                            style="width: 100%;" />
                                    <v-textarea
                                            v-model="newPost.text"
                                            outlined style="width: 100%;"
                                            label="Что у вас нового?" />
                                    <v-btn
                                            class="px-9" x-large
                                            color="primary" @click="createPost"
                                            style="text-align: center;">Опубликовать</v-btn>
                                </div>
                            </v-container>
                        </v-card>
                        <div
                                :key="index"
                                v-for="(post, index) in posts.first">
                            <Post
                                    class="mb-6"
                                    v-on:update="getPosts"
                                    :post_id="post.id"
                                    :avatar="post.user.photo"
                                    :author="post.user.name"
                                    :text="post.text"
                                    :title="post.title"/>
                        </div>
                    </v-col>
                    <v-col cols="10" sm="10" md="10" lg="5" xl="5">
                        <Post
                                :key="index"
                                v-for="(post, index) in posts.second"
                                v-on:update="getPosts"
                                class="mb-6"
                                :post_id="post.id"
                                :avatar="post.user.photo"
                                :author="post.user.name"
                                :text="post.text"
                                :title="post.title"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
    import Post from "@/components/Post";

    export default {
        name: "Posts",
        components: {
            Post
        },
        data() {
            return {
                posts: {
                    count: 0,
                    data: [],
                    main: [],
                    first: [],
                    second: []
                },
                newPost: {
                    title: "",
                    text: ""
                },
                users: [],
                id: -1
            }
        },
        methods: {
            getPosts() {

                this.posts = {
                    count: 0,
                    data: [],
                    main: [],
                    first: [],
                    second: []
                };
                this.newPost = {
                    title: "",
                    text: ""
                };

                this.axios.get('http://188.225.47.187/api/jsonstorage/3aa45f3959e052317fba82f4096df045')
                    .then(
                        (response) => {

                            this.posts.main = response.data;
                            this.posts.data = response.data;
                            this.posts.count = this.posts.main.length;
                            this.posts.main.reverse();

                            this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                                .then(
                                    (response) => {

                                        this.users = response.data;

                                        for (const index in this.posts.main) {

                                            let author_id = this.posts.main[index].author;
                                            let author = this.users[author_id - 1];
                                            this.posts.main[index].user = author;
                                            this.posts.main[index].id = this.posts.count - 1 - index;

                                        }

                                        for (const index in this.posts.main) {

                                            switch (index % 2) {
                                                case 0:
                                                    if (this.id === -1)
                                                        this.posts.first.push(this.posts.main[index]);
                                                    else
                                                        this.posts.second.push(this.posts.main[index]);
                                                    break;
                                                case 1:
                                                    if (this.id === -1)
                                                        this.posts.second.push(this.posts.main[index]);
                                                    else
                                                        this.posts.first.push(this.posts.main[index]);
                                                    break;
                                            }

                                        }

                                    }
                                );

                        }
                    );

            },
            createPost() {

                if (this.id !== -1) {

                    const post = {
                        title: this.newPost.title,
                        text: this.newPost.text,
                        author: this.id
                    };

                    this.posts.data.push(post);

                    this.axios.put('http://188.225.47.187/api/jsonstorage/3aa45f3959e052317fba82f4096df045', JSON.stringify(this.posts.data))
                        .then(
                            () => {
                                this.getPosts();
                            }
                        );

                }

            }
        },
        mounted() {

            this.id = this.$store.state.id;
            this.getPosts();

        }
    }
</script>

<style scoped>

    .mainBlock {
        margin: 3% !important;
    }

</style>