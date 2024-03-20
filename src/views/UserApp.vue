<script>
import axios from 'axios';

export default {
    data() {
        return {
            date: new Date(),
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
                    "сheckСall": "1",
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

            // timeLesson: [
            //     {
            //         Lesson: 1
            //         timeBeginning: Date(),
            //         timeEnd: Date(),
            //         сheckСall: true,
            //         college_id: 1, //Индекс колледжа
            //     }
            // ],
        }
    },

    // [
    //   {
    //     "ID": "1",
    //     "Lesson": "1",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   },
    //   {
    //     "ID": "2",
    //     "Lesson": "2",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   },
    //   {
    //     "ID": "3",
    //     "Lesson": "3",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   },
    //   {
    //     "ID": "4",
    //     "Lesson": "4",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   },
    //   {
    //     "ID": "5",
    //     "Lesson": "5",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   },
    //   {
    //     "ID": "6",
    //     "Lesson": "6",
    //     "timeBeginning": "00:00:00",
    //     "timeEnd": "00:00:00",
    //     "сheckСall": "1",
    //     "college_id": "1"
    //   }
    // ]

    mounted() {
        this.startTimer();
        this.taimengСreation();
        // this.gap_mySQL();
    },
    methods: {
        // Работа с серваком 
        async gap_mySQL() {
            let response = await axios.get('/');
            console.log(response);
            this.timeLesson = response.data;

            this.taimengСreation()

        },


        taimengСreation() {
            console.log(this.timeLesson);
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning.slice(0, 5)
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd.slice(0, 5)
            }
            console.log(this.timeLesson);
        },

        clawback_taimengСreation() {
            for (let i = 0; i < this.timeLesson.length; i++) {
                this.timeLesson[i].timeBeginning = this.timeLesson[i].timeBeginning + ':00'
                this.timeLesson[i].timeEnd = this.timeLesson[i].timeEnd + ':00'
            }
        },

        changeTime_counter(startTime, endTime) {
            console.log(this.timeLesson);
            console.log(startTime);
            console.log(endTime);
        },

        startTimer() {

            window.setInterval(() => {
                this.date = new Date()
            }, 1000);
        },
        CheckingZeroAdditionTime(getTupeDate) {
            if (getTupeDate < 10) {
                return "0"
            }
        }
    }
}
</script>

<template>

    <header class="row">
        <div class="name_college col">Басовская</div>
        <div class="time col">{{ CheckingZeroAdditionTime(this.date.getHours()) }}{{ this.date.getHours() }}:{{
            CheckingZeroAdditionTime(this.date.getMinutes()) }}{{ this.date.getMinutes() }}:{{
            CheckingZeroAdditionTime(this.date.getSeconds()) }}{{ this.date.getSeconds() }}</div>
        <div class="date col">{{ CheckingZeroAdditionTime(this.date.getDate()) }}{{ this.date.getDate() }}.{{
            CheckingZeroAdditionTime(this.date.getMonth() + 1) }}{{ this.date.getMonth() + 1 }}.{{
            this.date.getFullYear() }}</div>
    </header>

    <h2>Расписание <br> Звонков</h2>


    <el-container class="schedule">

        <div v-for=" (i, index) in timeLesson">
            <el-row class="lesson container align-items-center">

                <div class="num_lesson col-auto">
                    {{ i.Lesson }} урок
                </div>
                <div class="col">
                    <hr>
                </div>
                <div class="col-auto">
                    {{ i.timeBeginning }}-{{ i.timeEnd }}
                </div>

            </el-row>

            <el-row v-if="i.Lesson != this.timeLesson.length" class="change container align-items-center ">
                <div class="col">
                    <hr>
                </div>
                <div class="col-auto"> {{ changeTime_counter(this.timeLesson[index].timeEnd, this.timeLesson[index + 1].timeBeginning)}} мин</div>
                <div class="col">
                    <hr>
                </div>
            </el-row>


        </div>
    </el-container>

</template>






<style scoped>
* {
    margin: 0;
    padding: 0;
}

body {
    width: 1024px;
    height: 768px;
    max-width: 750px;
    margin: auto;
    border: 4px solid rgb(219, 43, 43);

}

h2 {
    margin-top: 35px;
    margin-bottom: 20px;
    text-align: center;
}

header {
    margin: 10px;
}

header div {
    font-size: 20px;
}

header .time {
    text-align: center;
    font-size: 30px;
}

header .date {
    text-align: end;
}

.schedule {
    text-align: center;
    margin-top: 15px;
}

.lesson,
.change {
    min-width: 300px;
    padding: 0 10px 0 10px;
    margin-bottom: 1px;
}

.lesson .col,
.change .col {
    padding: 10px;
}

.lesson {
    background-color: rgb(163, 163, 163);
    height: 50px;
    border-radius: 16px;
}

.change {
    height: 24px;
}

.schedule {
    display: flex;
    margin: auto;
    flex-direction: column;
    align-content: space-around;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
}
</style>
