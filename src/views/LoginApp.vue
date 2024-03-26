<script>
import axios from 'axios';

export default {
    data() {
        return {
            img_ShowOrHide_password: "https://cdn-icons-png.flaticon.com/512/7794/7794218.png",
            type_ShowOrHide_password: "password",
            value_password: ""
        }
    },
    methods: {
        click_ShowOrHide_password(type) {
            if (this.type_ShowOrHide_password == "password") {
                this.type_ShowOrHide_password = "text";
                this.img_ShowOrHide_password = "https://cdn-icons-png.flaticon.com/512/158/158746.png";
            } else {
                this.type_ShowOrHide_password = "password";
                this.img_ShowOrHide_password = "https://cdn-icons-png.flaticon.com/512/7794/7794218.png";
            };
        },

        verification() {
            console.log(this.value_password);
            if (this.value_password === "123"){
                console.log("OK");
            }else{
                console.log("No");
            };
        }
    }
};
</script>

<template>
    <div class="form_center">
        <form>
            <label for="userPassword" class="form-label">Пароль:</label>
            <samp class="form_flax">
                <input :type="type_ShowOrHide_password" class="form-control" name="userPassword" id="userPassword"
                    placeholder="*******" v-model="this.value_password">
                <button class="button_ShowOrHide_password btn btn-secondary" type="button"
                 @click="click_ShowOrHide_password(this.type)">
                    <img :src="img_ShowOrHide_password" alt="Показать/скрыть пароль">
                </button>
            </samp>
            <div style="display: flex; align-items: center; justify-content: center;">
                <button class="verification btn btn-primary" type="button" @click="verification()">
                    К админке
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.form_center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form_flax {
    display: flex;
    align-items: center;
    flex-direction: row;
}

form {
    padding: 1.5rem 2rem;
    background: hsl(0, 0%, 100%);
    max-width: 450px;
    width: 87vw;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 15px -10px currentColor;
    /* border: 0.00001px solid black; */
}

form label {
    display: block;
    font-weight: 700;
}

form input {
    font-size: 1rem;
}

form button {
    border: 1px solid black;

}

img {
    /* margin: 5; */
    padding: 5px;
    width: 30px;
}

.button_ShowOrHide_password {
    border-radius: 6.5px;
    margin-left: 12.5px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
}

.verification {
    margin-top: 15px;
    width: 80%;
}

</style>