<template>
    <v-container class="profile text-left mt-6">
        <span class="light-blue--text text--darken-2 display-2 font-weight-bold"><v-icon color="light-blue darken-2" x-large>mdi-account-outline</v-icon> {{ profile.name }}</span>
        <v-container class="py-10">
            <v-row>
                <v-col cols="3">
                    <v-avatar
                        width="200px"
                        height="200px">
                        <img :src="profile.photo">
                    </v-avatar>
                </v-col>
                <v-col cols="9" class="body-1">
                    <br><span>Веб-сайт: <a :href="'https://' + profile.website" target="_blank">{{ profile.website }}</a></span><br><br>
                    <span>E-mail: <a :href="'mailto:' + profile.email">{{ profile.email }}</a> </span><br><br>
                    <span>Город: {{ profile.city }}</span><br><br>
                    <span>Место работы: {{ profile.company }}</span>
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
                        :avatar="'https://randomuser.me/api/portraits/men/' + parseInt($route.params.id) + '.jpg'"
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
                    city: "London",
                    company: "Apple",
                    photo: "https://vk.com/images/camera_200.png"
                },
                posts: []
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
                        )

                },
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>