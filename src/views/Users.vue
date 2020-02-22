<template>
    <v-container class="users">
        <v-row>
            <v-col
                cols="5"
                v-for="(user, index) in users"
                :key="index">
                <User
                    :id="user.id"
                    :name="user.name"
                    :photo="user.photo"
                    :city="user.city !== '' ? user.city : 'Город не указан'" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import User from "@/components/User";

    export default {
        name: "Users",
        components: {
            User
        },
        data() {
            return {
                users: []
            }
        },
        mounted() {

            this.axios.get('http://188.225.47.187/api/jsonstorage/4e5b70b015290d296c13945601023e8d')
                .then(
                    (response) => {

                        this.users = response.data;

                        for (let index in response.data)
                            this.users[index].id = parseInt(index) + 1;

                    }
                )

        }
    }
</script>

<style scoped>

</style>