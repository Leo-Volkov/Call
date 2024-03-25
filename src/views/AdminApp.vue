<script>
import axios from 'axios';

export default {
    data() {
        return {
            namePleers: [`Ко-ло-ло`, `Ла-лам-лам`, `ddd3`, `ddd2`, `ddd1`],
            trueNnamePleers: `Ко-ло-ло`,

            allCheckСall: false,
            counterСall: 0,
            isIndeterminate: false,

            timeLesson: [
            {
                    "ID": "1",
                    "timeBeginning": "09:00:00",
                    "timeEnd": "09:45:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "2",
                    "timeBeginning": "09:55:00",
                    "timeEnd": "10:40:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "3",
                    "timeBeginning": "11:00:00",
                    "timeEnd": "11:45:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "4",
                    "timeBeginning": "11:55:00",
                    "timeEnd": "12:40:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "5",
                    "timeBeginning": "13:00:00",
                    "timeEnd": "13:45:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "6",
                    "timeBeginning": "14:05:00",
                    "timeEnd": "14:50:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                },
                {
                    "ID": "7",
                    "timeBeginning": "15:10:00",
                    "timeEnd": "15:55:00",
                    "сheckСall": "1",
                    "melody": "Ко-ло-ло",
                    "college_id": "1"
                }
            ],
        }
    },
    mounted() {
        this.entranceСheckCounterСall();
        this.received_formattingData();
        // this.add_mySQL();
    },
    methods: {

        // Работа с серваком 
        async add_mySQL() {
            let response = await axios.get('/');

            this.timeLesson = response.data;
            console.log(response);

            this.received_formattingData();
        },

        async save_mySQL() {
            this.clawback_formattingData();

            // Отправка данных на сервер
            axios.post("/save", this.timeLesson).then((response) => {

                // Обработка ответа сервера
                response.data.success ?
                    console.log("Данные успешно обновлены!") :
                    console.log("Ошибка:", response.data.error);
            });
        },

        received_formattingData() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning.slice(0, 5);
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd.slice(0, 5);
                this.timeLesson[i].сheckСall = Boolean(Number(`${this.timeLesson[i].сheckСall}`));
            };

            console.log(this.timeLesson);
        },

        clawback_formattingData() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning + ':00';
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd + ':00';
                this.timeLesson[i].сheckСall = String(Number(this.timeLesson[i].сheckСall));
            };
        },

        abbTable() {
            this.timeLesson.push({
                timeBeginning: Date(),
                timeEnd: Date(),
                сheckСall: true
            });

            this.counterСall++

            this.meterReadingСall();
        },

        daliteTable() {
            if (this.timeLesson.length > 0) {
                if (this.timeLesson[this.timeLesson.length - 1].сheckСall == true) {
                    this.counterСall--
                };
                this.timeLesson.pop();

                this.meterReadingСall();
            };
        },

        changelPayer(x) {
            console.log(x);

            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].melody = x;
            };
            console.log(this.timeLesson);
        },

        getAllCheckСall() {
            if (this.allCheckСall == true) {
                for (let i = 0; i < this.timeLesson.length; i++) {
                    this.timeLesson[`${i}`] = {
                        timeBeginning: this.timeLesson[`${i}`].timeBeginning,
                        timeEnd: this.timeLesson[`${i}`].timeEnd,
                        сheckСall: true
                    };
                };

                this.counterСall = this.timeLesson.length;
            } else {
                for (let i = 0; i < this.timeLesson.length; i++) {
                    this.timeLesson[`${i}`] = {
                        timeBeginning: this.timeLesson[`${i}`].timeBeginning,
                        timeEnd: this.timeLesson[`${i}`].timeEnd,
                        сheckСall: false
                    };
                };

                this.counterСall = 0;
            };

            this.isIndeterminate = false;
        },

        CounterСall(x) {
            x.сheckСall == true ?
                this.counterСall++ :
                this.counterСall--;

            this.meterReadingСall();
        },

        meterReadingСall() {
            let z = this.timeLesson.length;
            let y = this.counterСall;

            if (z == y) {
                this.isIndeterminate = false;
                this.allCheckСall = true;
            } else if (y == 0) {
                this.isIndeterminate = false;
                this.allCheckСall = false;
            } else {
                this.isIndeterminate = true;
            };
        },

        entranceСheckCounterСall() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                if (this.timeLesson[`${i}`].сheckСall == true) {
                    this.counterСall++
                };
            };

            this.meterReadingСall();
        }

    }
}
</script>




<template>
    <h1>Админка</h1>

    <form action="http://localhost/index.php">
        <div class="row">
            <div class="col">
                <h3>Расписание</h3>
                <div class="cntent_table">
                    <table>

                        <tr>
                            <th>Урок</th>
                            <th>Начало звонка</th>
                            <th>Конец звонка</th>
                            <th>Включить звонок</th>

                            <!--- включение и выключение всех звонков  -->
                            <th class="input"><el-checkbox :indeterminate="isIndeterminate" v-model="allCheckСall"
                                    @change="getAllCheckСall()" type="checkbox"></el-checkbox></th>
                        </tr>

                        <tr v-for=" (x, index) in timeLesson" :key="timeLesson.ID">
                            <td>{{ index + 1 }}</td>
                            <td><input name="timeBeginning" v-model="x.timeBeginning" type="time"></td>
                            <td><input name="timeEnd" v-model="x.timeEnd" type="time"></td>
                            <td><input name="сheckСall" v-model="x.сheckСall" type="checkbox" @change="CounterСall(x)">
                            </td>
                        </tr>

                    </table>

                    <el-row class="cntent_table_button">
                        <el-button type="info" class="col" @click="daliteTable()">
                            Удалить последнее время звонка
                        </el-button>
                        <el-button type="info" class="col" @click="abbTable()">
                            Добавить новое время звонка
                        </el-button>
                    </el-row>

                </div>
            </div>

            <div class="col-lg col-md-auto">
                <h3>Выбрать мелодию</h3>

                <el-radio-group class="radio_form-check" v-model="this.trueNnamePleers">
                    <el-radio name="melody" class="form-check" v-for=" x in namePleers"
                     :value="x" size="large" @click="changelPayer(x)" border>
                        {{ x }}
                    </el-radio>
                </el-radio-group>

            </div>
        </div>
        <div class="button_save">
            <button type="submit" class="btn btn-secondary" @click="save_mySQL()">
                Сохранить
            </button>
        </div>
    </form>
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
    padding: 0 10px;
    margin-left: 1px;
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
    display: flex;
    justify-content: center;
    margin-top: 7px;
}

.cntent_table_button .el-button {
    width: 100%;
    width: 10vw;
    min-width: 145px;
}

h3 {
    margin-top: 25px;
    margin-bottom: 10px;
}

.radio_form-check {
    display: flex;
}

.button_save {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
}

.button_save button {
    width: 70%;
}

@media (max-width: 768px) {
    .radio_form-check {
        row-gap: 15px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    table {
        font-size: 2vw;
    }

    .cntent_table_button .el-button {
        font-size: 2.4vw;
    }
}

@media (min-width: 769px) {
    .radio_form-check {
        gap: 5px;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
    }
}
</style>