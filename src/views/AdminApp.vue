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
                    "Lesson": "1",
                    "timeBeginning": "09:00:00",
                    "timeEnd": "09:45:00",
                    "сheckСall": "1",
                    "college_id": "1"
                },
                {
                    "ID": "2",
                    "Lesson": "2",
                    "timeBeginning": "09:55:00",
                    "timeEnd": "10:40:00",
                    "сheckСall": "1",
                    "college_id": "1"
                },
                {
                    "ID": "3",
                    "Lesson": "3",
                    "timeBeginning": "11:00:00",
                    "timeEnd": "11:45:00",
                    "сheckСall": "1",
                    "college_id": "1"
                },
                {
                    "ID": "4",
                    "Lesson": "4",
                    "timeBeginning": "11:55:00",
                    "timeEnd": "12:40:00",
                    "сheckСall": "1",
                    "college_id": "1"
                },
                {
                    "ID": "5",
                    "Lesson": "5",
                    "timeBeginning": "13:00:00",
                    "timeEnd": "13:45:00",
                    "сheckСall": "0",
                    "college_id": "1"
                },
                {
                    "ID": "6",
                    "Lesson": "6",
                    "timeBeginning": "14:05:00",
                    "timeEnd": "14:50:00",
                    "сheckСall": "1",
                    "college_id": "1"
                }
            ],
            
        }
    },
    mounted() {
        this.entranceСheckCounterСall()
        // this.taimengСreation()
        this.gap_mySQL();
    },
    methods: {
        // Работа с серваком 
        async gap_mySQL() {
            let response = await axios.get('/');
            console.log(response);
            this.timeLesson = response.data;

            this.taimengСreation()

        },
        async save_mySQL() {

        }, 
        taimengСreation() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning.slice(0, 5);
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd.slice(0, 5);
                this.timeLesson[i].сheckСall = Boolean(Number(`${this.timeLesson[i].сheckСall}`));
            }
            console.log(this.timeLesson);
        },

        clawback_taimengСreation() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning + ':00'
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd + ':00'
            }

            // this.timeLesson[i].сheckСall = String(Number(  ))
        },

        abbTable() {
            // console.log()
            this.timeLesson.push({
                timeBeginning: Date(),
                timeEnd: Date(),
                сheckСall: true
            });
            this.counterСall++
            this.meterReadingСall()
        },
        daliteTable() {
            if (this.timeLesson.length > 0) {
                if (this.timeLesson[this.timeLesson.length - 1].сheckСall == true) {
                    this.counterСall--
                }
                this.timeLesson.pop();

                this.meterReadingСall()
            }
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
                this.counterСall = this.timeLesson.length
            } else {
                for (let i = 0; i < this.timeLesson.length; i++) {
                    this.timeLesson[`${i}`] = {
                        timeBeginning: this.timeLesson[`${i}`].timeBeginning,
                        timeEnd: this.timeLesson[`${i}`].timeEnd,
                        сheckСall: false
                    };
                };
                this.counterСall = 0
            }
            this.isIndeterminate = false
        },

        CounterСall(x) {
            if (x.сheckСall == true) {
                this.counterСall++
            } else {
                this.counterСall--
            };

            this.meterReadingСall()
        },

        meterReadingСall() {
            let z = this.timeLesson.length;
            let y = this.counterСall;

            if (z == y) {
                this.isIndeterminate = false
                this.allCheckСall = true;
            } else if (y == 0) {
                this.isIndeterminate = false
                this.allCheckСall = false;
            } else {
                this.isIndeterminate = true
            }
        },

        entranceСheckCounterСall() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                if (this.timeLesson[`${i}`].сheckСall == true) {
                    this.counterСall++
                }
            }
            this.meterReadingСall()
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
                        <th>Урок</th>
                        <th>Начало звонка</th>
                        <th>Конец звонка</th>
                        <th>Включить звонок</th>
                        <th class="input"><el-checkbox :indeterminate="isIndeterminate" v-model="allCheckСall"
                                @change="getAllCheckСall()" type="checkbox"></el-checkbox></th>
                        <!--- включение и выключение всех звонков  -->
                    </tr>

                    <tr v-for=" (x, index) in timeLesson">
                        <td>{{ index + 1 }}</td>
                        <td><input v-model="x.timeBeginning" type="time"></td>
                        <td><input v-model="x.timeEnd" type="time"></td>
                        <td><input v-model="x.сheckСall" type="checkbox"  @change="CounterСall(x)"></td>
                    </tr>

                </table>

                <el-row class="cntent_table_button">
                    <el-button type="info" class="col" @click="daliteTable()">Удалить последнее время звонка</el-button>
                    <el-button type="info" class="col" @click="abbTable()">Добавить новое время звонка</el-button>
                </el-row>

            </div>
        </div>

        <div class="col-lg col-md-auto">
            <h3>Выбрать мелодию</h3>

            <div>
                <el-radio-group class="radio_form-check" v-model="this.trueNnamePleers">
                    <el-radio class="form-check" v-for=" x in namePleers" :value="x" size="large" border>{{ x
                        }}</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
    <div class="button_save">
        <button type="button" class="btn btn-secondary" @click="save_mySQL()">
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
    min-width: 450px;
    padding: 0 10px;
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
}

h3 {
    margin-top: 25px;
    margin-bottom: 10px;
}

.radio_form-check {
    display: flex;
}

.button_save {
    display: flex;
}

.button_save button {

}

@media (max-width: 768px) {
    .radio_form-check {
        row-gap: 15px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
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