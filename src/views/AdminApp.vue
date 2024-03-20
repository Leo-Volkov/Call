<script>
import axios from 'axios';

export default {
    data() {
        return {
            namePleers: [`Ко-ло-ло`, `Ла-лам-лам`, `ddd3`, `ddd2`, `ddd1`],
            trueNnamePleers: `Ко-ло-ло`,
            timeLesson: {},
            allCheckСall: false,
            counterСall: 0,
            isIndeterminate: false
            // timeLesson: {
            //     "1": {
            //         timeBeginning: Date(),
            //         timeEnd: Date(),
            //         сheckСall: true
            //     }
            // },
        }
    },
    mounted() {
        this.entranceСheckCounterСall()
    },
    methods: {
        // Работа с серваком 
        async gap_mySQL() {
            let response = await axios.get('/');
            console.log(response);
            this.timeLesson = response.data;


        },

        abbTable() {
            // console.log()
            this.timeLesson[`${Object.keys(this.timeLesson).length + 1}`] = {
                timeBeginning: Date(),
                timeEnd: Date(),
                сheckСall: true
            }
            this.counterСall++
            this.meterReadingСall()
        },
        daliteTable() {
            if (Object.keys(this.timeLesson).length > 1) {
                if (this.timeLesson[`${Object.keys(this.timeLesson).length}`].сheckСall == true) {
                    this.counterСall--
                }
                delete this.timeLesson[`${Object.keys(this.timeLesson).length}`]

                this.meterReadingСall()
            }
        },

        getAllCheckСall() {
            if (this.allCheckСall == true) {
                for (let i = 1; i <= Object.keys(this.timeLesson).length; i++) {
                    this.timeLesson[`${i}`] = {
                        timeBeginning: this.timeLesson[`${i}`].timeBeginning,
                        timeEnd: this.timeLesson[`${i}`].timeEnd,
                        сheckСall: true
                    };
                };
                this.counterСall = Object.keys(this.timeLesson).length
            } else {
                for (let i = 1; i <= Object.keys(this.timeLesson).length; i++) {
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
            console.log(x.сheckСall);
            if (x.сheckСall == true) {
                this.counterСall++
            } else {
                this.counterСall--
            };

            this.meterReadingСall()
        },

        meterReadingСall() {
            console.log(this.counterСall);
            let z = Object.keys(this.timeLesson).length;
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
            for (let i = 1; i <= Object.keys(this.timeLesson).length; i++) {
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
                        <td>{{ index }}</td>
                        <td><input v-model="x.timeBeginning" type="time"></td>
                        <td><input v-model="x.timeEnd" type="time"></td>
                        <td><input v-model="x.сheckСall" type="checkbox" @change="CounterСall(x)"></td>
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