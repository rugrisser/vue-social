<template>
    <v-app id="app">
        <v-navigation-drawer color="light-blue darken-1" dark expand-on-hover hide-overlay permanent right app>
            <v-list nav shaped dense>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img :src="'https://randomuser.me/api/portraits/men/' + (user_id === -1 ? 1 : user_id) + '.jpg'">
                    </v-list-item-avatar>
                    <v-list-item-content class="text-left">
                        <v-list-item-title class="font-weight-black">SocialLink</v-list-item-title>
                        <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="my-3"></v-divider>
                <v-list-item link to="/" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-home-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-left">Главная</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-bind:to="user_id === -1 ? '/login' : '/profile/' + user_id" exact>
                    <v-list-item-icon>
                        <v-icon>{{ user_id === -1 ? 'mdi-login-variant' : 'mdi-account-outline' }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-left">{{ user_id === -1 ? 'Вход' : 'Мой профиль' }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="user_id === -1" link to="/registration" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-login-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-left">Регистрация</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/users" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-account-multiple-plus-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-left">Найти друзей</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content class="px-12 py-3">
            <v-container fluid>
                <router-view v-on:login="updateUser"/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                user_id: -1,
                name: "Иван Иванов"
            }
        },
        methods: {
            updateUser(id) {

                this.user_id = id;
                this.axios.get("http://jsonplaceholder.typicode.com/users/" + id)
                    .then((response) => {
                        this.name = response.data.name;
                    });

            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
