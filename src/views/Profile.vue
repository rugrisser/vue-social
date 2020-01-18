<template>
    <v-container class="profile text-left mt-6">
        <span class="light-blue--text text--darken-2 display-2 font-weight-bold"><v-icon color="light-blue darken-2" x-large>mdi-account-outline</v-icon> {{ profile.name }}</span>
        <v-container class="py-10">
            <v-row>
                <v-col cols="3">
                    <v-avatar
                        width="200px"
                        height="200px">
                        <img :src="'https://randomuser.me/api/portraits/men/' + $route.params.id + '.jpg'">
                    </v-avatar>
                </v-col>
                <v-col cols="9" class="body-1">
                    <br><span>Веб-сайт: <a :href="'https://' + profile.website" target="_blank">{{ profile.website }}</a></span><br><br>
                    <span>E-mail: <a :href="'mailto:' + profile.email">{{ profile.email }}</a> </span><br><br>
                    <span>Город: {{ profile.address.city }}</span><br><br>
                    <span>Место работы: {{ profile.company.name }}</span>
                </v-col>
            </v-row>
        </v-container>
        <v-divider class="py-7"></v-divider>
        <span class="display-1 font-weight-bold">Публикации</span>
        <v-container class="mt-8">
            <v-row>
                <v-col
                        cols="10"
                        v-for="(post, index) in posts"
                        :key="index">
                    <Post
                        :avatar="'https://randomuser.me/api/portraits/men/' + $route.params.id + '.jpg'"
                        :author="profile.name"
                        :title="post.title"
                        :text="post.body" />
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    import Post from "@/components/Post";

    export default {
        name: "Profile",
        components: {
            Post
        },
        data() {

            return {

                profile: {
                    name: "Иван Иванов",
                    website: "example.com",
                    email: "example@example.com",
                    address: {
                        city: "London"
                    },
                    company: {
                        name: "Apple"
                    }
                },
                posts: []

            }

        },
        watch: {
            $route: {
                handler() {

                    let id = parseInt(this.$route.params.id);

                    if (isNaN(id)) {

                        window.location = '/profile/1';
                        id = 1;

                    }

                    this.axios.get("http://jsonplaceholder.typicode.com/users/" + id)
                        .then((response) => {

                            console.log(response);
                            this.profile = response.data;

                        });
                    this.axios.get("http://jsonplaceholder.typicode.com/posts?userId=" + id)
                        .then((response) => {

                            this.posts = response.data;
                            this.posts.reverse();
                            console.log(this.posts);

                        });

                },
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>