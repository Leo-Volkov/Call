<script>

export default {
    data() {
        return {
            namePleers: [`Ко-ло-ло`, `Ла-лам-лам`],
            trueNnamePleers: ``,
            timeLesson: {
                "1": {
                    timeBeginning: Date(),
                    timeEnd: Date(),
                    сheckСall: true
                }
            },
            allCheckСall: true
        }
    },
    mounted() {

    },
    methods: {
        abbTable() {
            // console.log()
            this.timeLesson[`${Object.keys(this.timeLesson).length + 1}`] = {
                timeBeginning: Date(),
                timeEnd: Date(),
                сheckСall: true
            }
        },
        daliteTable() {
            delete this.timeLesson[`${Object.keys(this.timeLesson).length}`]
        },

        getAllCheckСall() {

        }

    }
}
</script>




<template>
    <h1>Админка</h1>

    <div class="row">
        <div class="col">
            <div class="cntent_table">

                <table>

                    <tr>
                        <th>Урок</th>
                        <th>Начало звонка</th>
                        <th>Конец звонка</th>
                        <th>Включить звонок</th>
                        <th class="input"><el-checkbox :indeterminate="isIndeterminate" v-model="allCheckСall" @click="getAllCheckСall()" type="checkbox"></el-checkbox></th> <!--- включение и выключение всех звонков  -->
                    </tr>

                    <tr v-for=" (x, index) in timeLesson">
                        <td>{{ index }}</td>
                        <td><input v-model="x.timeBeginning" type="time"></td>
                        <td><input v-model="x.timeEnd" type="time"></td>
                        <td><input v-model="x.сheckСall" type="checkbox"></td>
                    </tr>

                </table>

                <div class="cntent_table_button row">
                    <el-button type="info" class="col" @click="abbTable()">Добавить новое время звонка</el-button>
                    <el-button type="info" class="col" @click="daliteTable()">Удалить последнее время звонка</el-button>
                </div>
            
            </div>
        </div>

        <div class="col-lg col-md-auto">
            <h3>Выбрать звук</h3>

            <div class="form-check" v-for=" x in namePleers">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    {{ x }}
                </label>
            </div>

        </div>
    </div>
</template>






<style scoped>
* {
    margin: 0;
}


h1 {
    text-align: center;
    margin: 30px 30px 45px 30px;
}

.cntent_table {
    width: 450px;
}

table {
    width: 100%;
}

td,
th {
    border: 1px solid black;
    text-align: center;
}

th {
    background-color: azure;
}
tr .input {
    background-color: rgb(255, 255, 255);
}
th input {
    width: 25px;
    height: 25px;
}

.cntent_table_button {
    --bs-gutter-x: 0;
}

h3 {
    margin-top: 25px;
    margin-bottom: 10px;
}
</style>