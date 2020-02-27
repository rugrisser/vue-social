<template>
    <div class="posts">
        <v-container class="text-left mainBlock">
            <p class="light-blue--text text--darken-2 display-2 font-weight-bold">Последние публикации</p><br>
            <div v-if="id > 0">
                <v-text-field
                        solo label="Заголовок"
                        style="width: 40%;" />
                <v-textarea
                        solo style="width: 40%;"
                        label="Что у вас нового?" />
                <v-btn class="px-9" x-large color="primary">Опубликовать</v-btn>
            </div>
            <v-container class="mt-8">
                <v-row>
                    <v-col
                            cols="10"
                            v-for="(post, index) in posts"
                            :key="index">
                        <Post
                                :author="profile.name"
                                :title="post.title"
                                :text="post.body" />
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
                posts: [],
                users: [],
                id: -1
            }
        },
        mounted() {



            this.axios.get('http://188.225.47.187/api/jsonstorage/3aa45f3959e052317fba82f4096df045')
                .then(
                    (response) => {
                        this.posts = response.data;
                    }
                );
            this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                .then(
                    (response) => {
                        this.users = response.data;
                    }
                );

        },
        watch: {
            $route: {
                handler() {
                    this.id = parseInt(this.$route.params.id);
                    console.log(this.$route.params.id);
                },
                immediate: true
            }
        }
    }
</script>

<style scoped>

    .mainBlock {
        margin: 3% !important;
    }

</style>