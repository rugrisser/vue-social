<template>
    <div class="d-flex justify-center">
        <v-card width="500px" class="mt-12 pa-10" outlined>
            <v-card-title class="text-center mb-5" style="display: block !important;">
                Авторизация
            </v-card-title>
            <v-alert v-if="auth_error" class="mb-10" type="error" outlined>Ошибка авторизации</v-alert>
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
                password: "",
                auth_error: false
            }
        },
        methods: {
            authenticate() {
                this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                    .then(
                        (response) => {

                            let users = response.data;
                            let found = false;

                            this.auth_error = false;

                            for (let index in users) {
                                if ((this.login === users[index].login) && (this.password === users[index].password)) {

                                    const user_id = parseInt(index) + 1;
                                    this.$router.push('/profile/' + user_id);
                                    found = true;
                                    break;

                                }
                            }

                            if (!found)
                                this.auth_error = true;

                        }
                    )
            }
        }
    }
</script>

<style scoped>

</style>