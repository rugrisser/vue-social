<template>
    <div class="d-flex justify-center">
        <v-card width="500px" class="mt-12 pa-10" outlined>
            <v-card-title class="text-center mb-5" style="display: block !important;">
                Регистрация
            </v-card-title>
            <v-alert v-if="service.errors.login_found" class="mb-10" type="error" outlined>Такой логин или e-mail уже существует</v-alert>
            <v-alert v-if="service.errors.password_not_compared" class="mb-10" type="error" outlined>Пароли не совпадают</v-alert>
            <v-alert v-if="service.errors.not_filled" class="mb-10" type="error" outlined>Заполните все поля</v-alert>
            <v-text-field
                    label="Введите логин"
                    v-model="user.login"
                    outlined
                    autofocus
                    required />
            <v-text-field
                    label="Введите почту"
                    v-model="user.email"
                    outlined
                    required />
            <v-text-field
                    label="Введите пароль"
                    v-model="user.password"
                    outlined
                    :type="service.pass_show ? 'text' : 'password'"
                    :append-icon="service.pass_show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="service.pass_show = !service.pass_show"
                    required />
            <v-text-field
                    label="Повторите пароль"
                    v-model="service.repeat_password"
                    outlined
                    :type="service.pass_repeat_show ? 'text' : 'password'"
                    :append-icon="service.pass_repeat_show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="service.pass_repeat_show = !service.pass_repeat_show"
                    required />
            <v-text-field
                    label="Фамилия и имя"
                    v-model="user.name"
                    outlined
                    required />
            <v-text-field
                    label="URL аватарки"
                    v-model="user.photo"
                    outlined />
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Дополнительная информация</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                label="Город"
                                v-model="user.city"
                                outlined />
                        <v-text-field
                                label="Веб-сайт"
                                v-model="user.website"
                                outlined />
                        <v-text-field
                                label="Место работы"
                                v-model="user.company"
                                outlined />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-btn
                    @click="createAccount"
                    class="mt-9"
                    large outlined>
                Зарегистрироваться
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data() {
            return {
                user: {
                    login: "",
                    password: "",
                    name: "",
                    website: "",
                    email: "",
                    city: "",
                    company: "",
                    photo: ""
                },
                service: {
                    repeat_password: "",
                    pass_show: false,
                    pass_repeat_show: false,
                    errors: {
                        login_found: false,
                        password_not_compared: false,
                        not_filled: false
                    }
                }
            }
        },
        methods: {
            createAccount() {

                const default_photo = 'https://vk.com/images/camera_200.png';

                for (let key in this.service.errors)
                    this.service.errors[key] = false;

                if ((this.user.login !== "") && (this.user.password !== "") && (this.user.email !== "") && (this.user.name !== "")) {
                    if (this.user.password === this.service.repeat_password) {

                        this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                            .then(
                                (response) => {

                                    let users = response.data;

                                    this.auth_error = false;

                                    for (let index in users) {
                                        if ((this.user.login === users[index].login) || (this.user.email === users[index].email)) {
                                            this.service.errors.login_found = true;
                                            break;
                                        }
                                    }

                                    if (!this.service.errors.login_found) {

                                        if (this.user.photo === "")
                                            this.user.photo = default_photo;

                                        users.push(this.user);

                                        this.axios.put('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d', JSON.stringify(users))
                                            .then(
                                                () => {
                                                    this.$router.push('/login');
                                                }
                                            );

                                    }

                                }
                            );

                    } else
                        this.service.errors.password_not_compared = true;
                } else
                    this.service.errors.not_filled = true;

            }
        }
    }
</script>

<style scoped>

</style>