<template>
    <div class="d-flex justify-center">
        <v-card width="500px" class="mt-12 pa-10" outlined>
            <v-card-title class="text-center mb-5" style="display: block !important;">
                Авторизация
            </v-card-title>
            <v-text-field
                    label="Введите логин"
                    v-model="login"
                    outlined
                    autofocus
            ></v-text-field>
            <v-text-field
                    label="Введите пароль"
                    v-model="password"
                    type="password"
                    outlined
            ></v-text-field>
            <v-btn @click="authenticate" large outlined>
                Войти
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login: "",
                password: ""
            }
        },
        methods: {
            authenticate() {

            }
        }
    }
</script>

<style scoped>

</style>