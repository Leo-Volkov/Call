<script>
import axios from 'axios';

export default {
    data() {
        return {
            namePleers: [`Ко-ло-ло`, `Ла-лам-лам`, `ddd3`, `ddd2`, `ddd1`],
            trueNnamePleers: ``,

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
        // this.add_mySQL();
        this.received_formattingData();
        this.entranceСheckCounterСall();
    },
    methods: {

        // Работа с серваком 
        async add_mySQL() {
            let response = await axios.get('/add_mySQL.php');
            this.timeLesson = response.data;
            console.log(response);
            this.received_formattingData();
        },

        async save_mySQL() {
            this.clawback_formattingData();

            // Отправка данных на сервер
            axios.post("/save_mySQL.php", JSON.stringify(this.timeLesson)).then((response) => {
                // Обработка ответа сервера
                response.data.success
                    ? console.log("Данные успешно обновлены!")
                    : console.log("Ошибка:", response.data.error);
            });
            this.counterСall = 0
            this.entranceСheckCounterСall();
            this.received_formattingData();
        },

        received_formattingData() {
            this.timeLesson.forEach(element => {
                element.timeBeginning = element.timeBeginning.slice(0, 5);
                element.timeEnd = element.timeEnd.slice(0, 5);
                element.сheckСall = Boolean(Number(`${element.сheckСall}`));
            });
            this.trueNnamePleers = this.timeLesson[0].melody
            console.log(this.timeLesson);
            console.log(this.trueNnamePleers);
        },

        clawback_formattingData() {
            this.timeLesson.forEach(element => {
                element.timeBeginning = element.timeBeginning + ':00';
                element.timeEnd = element.timeEnd + ':00';
                element.сheckСall = String(Number(element.сheckСall));
            });
        },

        abbTable() {
            this.timeLesson.push({
                ID: String(this.timeLesson.length),
                timeBeginning: `00:00`,
                timeEnd: `00:00`,
                сheckСall: true,
                melody: this.trueNnamePleers,
                college_id: "1"
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
            this.trueNnamePleers = x;
            this.timeLesson.forEach(element => {
                element.melody = x;
            });
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

    <div class="row">
        <div class="col">
            <h3>Расписание</h3>
            <div class="cntent_table">
                <table>

                    <tr>
                        <th>№</th>
                        <th>Начало звонка</th>
                        <th>Конец звонка</th>
                        <!--- включение и выключение всех звонков  -->
                        <th class="input"><el-checkbox :indeterminate="isIndeterminate" v-model="allCheckСall"
                                @change="getAllCheckСall()" type="checkbox"></el-checkbox></th>

                    </tr>

                    <tr v-for=" (x, index) in timeLesson" :key="timeLesson.ID">
                        <td class="td_row_1">{{ index + 1 }}</td>
                        <td class="td_row_2"><input name="timeBeginning" v-model="x.timeBeginning" type="time"></td>
                        <td class="td_row_3"><input name="timeEnd" v-model="x.timeEnd" type="time"></td>
                        <td class="td_row_4"><input name="сheckСall" v-model="x.сheckСall" type="checkbox" @change="CounterСall(x)"></td>
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
                <el-radio name="melody" class="form-check" v-for=" x in namePleers" :value="x" size="large"
                    @click="changelPayer(x)">
                    {{ x }}
                </el-radio>
            </el-radio-group>

        </div>
    </div>
    <div class="button_save">
        <button class="btn btn-secondary" @click="save_mySQL()">
            Сохранить
        </button>
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
.td_row_2 input, .td_row_3 input {
    width: 100%;
    text-align: center;
    border: 0px solid black;
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