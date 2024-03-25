<script>
import axios from 'axios';

export default {
    data() {
        return {
            img_ShowOrHide_password: "https://cdn-icons-png.flaticon.com/512/7794/7794218.png",
            type: "password"
        }
    },
    methods: {
        click_ShowOrHide_password(type) {
            if (type == "password") {
                this.type = "text";
                this.img_ShowOrHide_password = "https://cdn-icons-png.flaticon.com/512/158/158746.png";
            } else {
                this.type = "password";
                this.img_ShowOrHide_password = "https://cdn-icons-png.flaticon.com/512/7794/7794218.png";
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
                <input :type="type" class="form-control" name="userPassword" id="userPassword"
                    placeholder="*******">
                <button class="button_ShowOrHide_password btn btn-secondary" type="button" @click="click_ShowOrHide_password(this.type)">
                    <img :src="img_ShowOrHide_password" alt="Показать/скрыть пароль">
                </button>
            </samp>
            <div style="display: flex; align-items: center; justify-content: center;">
                <button class="verification btn btn-primary" type="button">К админке</button>
            </div>
        </form>
    </div>

    <!-- 
<div class="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
    <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled" data-shrink="true" for="password" id="password-label">
        Пароль
    </label>
    <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd">
        <input autocomplete="current-password" id="password" name="password" type="password" dir="ltr" inputmode="text" aria-label="Пароль" aria-errormessage="password-error" maxlength="1000" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd" value="FFV" style="text-align: inherit;"><div class="MuiInputAdornment-root MuiInputAdornment-positionEnd"><button class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button" id="toggle-password" aria-label="Show/hide password"><span class="MuiIconButton-label"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg></span></button></div><fieldset aria-hidden="true" class="jss25 MuiOutlinedInput-notchedOutline"><legend class="jss27 jss28"><span>Пароль</span></legend></fieldset></div></div>
     
     -->
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
    width: 150vw;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 10px -8px currentColor;
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