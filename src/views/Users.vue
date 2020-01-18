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
                    :city="user.address.city" />
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

            this.axios.get("http://jsonplaceholder.typicode.com/users")
                .then((response) => {

                    this.users = response.data;
                    this.users.splice(0, 1);
                    console.log(this.users);

                });

        }
    }
</script>

<style scoped>

</style>