<template>
    <v-container class="profile text-left mt-6">
        <span class="light-blue--text text--darken-2 display-2 font-weight-bold"><v-icon color="light-blue darken-2" x-large>mdi-account-outline</v-icon> {{ profile.name }}</span>
        <v-container class="py-10">
            <v-row>
                <v-col lg="2" md="3" sm="4">
                    <v-avatar
                        width="200px"
                        height="200px">
                        <img :src="profile.photo">
                    </v-avatar>
                </v-col>
                <v-col cols="8" class="body-1">
                    <br><span>Веб-сайт: <a :href="'https://' + profile.website" target="_blank">{{ profile.website }}</a></span><br><br>
                    <span>E-mail: <a :href="'mailto:' + profile.email">{{ profile.email }}</a> </span><br><br>
                    <span>Город: {{ profile.city }}</span><br><br>
                    <span>Место работы: {{ profile.company }}</span>
                </v-col>
            </v-row>
        </v-container>
        <v-divider class="py-7 mr-12"></v-divider>
        <span class="display-1 font-weight-bold">Публикации</span>
        <v-container class="mt-8">
            <v-row>
                <v-col xl="5" lg="5" md="5" sm="10" col="10">
                    <Post
                            v-for="(post, index) in posts.first"
                            class="mb-6"
                            :key="index"
                            :post_id="index"
                            :title="post.title"
                            :text="post.text"
                            :author="profile.name"
                            :avatar="profile.photo" />
                </v-col>
                <v-col xl="5" lg="5" md="5" sm="10" col="10">
                    <Post
                            v-for="(post, index) in posts.second"
                            class="mb-6"
                            :key="index"
                            :post_id="index"
                            :title="post.title"
                            :text="post.text"
                            :author="profile.name"
                            :avatar="profile.photo" />
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
                    city: "London",
                    company: "Apple",
                    photo: "https://vk.com/images/camera_200.png"
                },
                posts: {
                    data: [],
                    main: [],
                    first: [],
                    second: []
                }
            }

        },
        watch: {
            $route: {
                handler() {

                    let id = parseInt(this.$route.params.id);

                    if (isNaN(id))
                        this.$router.push('/users');

                    this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                        .then(
                            (response) => {

                                if (response.data.length < id)
                                    this.$router.push('/users');
                                else
                                    this.profile = response.data[id - 1];

                            }
                        );

                    this.axios.get('http://188.225.47.187/api/jsonstorage/3aa45f3959e052317fba82f4096df045')
                        .then(
                            (response) => {

                                this.posts.data = response.data;
                                this.posts.main = this.posts.data.filter(post => post.author === id);
                                this.posts.main.reverse();

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

                },
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>