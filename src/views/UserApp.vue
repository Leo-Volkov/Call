<script>
import axios from 'axios';

export default {
    data() {
        return {
            date: new Date(),
            new_timeCall: new Date(),
            melodie: '',

            timeCall: [],

            timetable: [],
        }
    },

    mounted() {
        this.startTimer();
        this.add_DB();
        this.call()

        document.addEventListener('keydown', function (event) {
            if (event.code == 'Space') {
                let audio = document.querySelector("audio");
                audio.play();
            };
        });

    },
    methods: {
        playAudio() {
            let audio = document.querySelector("audio");
            audio.play();
        },
        call() {

        },

        // Работа с серваком 
        async add_DB() {
            const response = await axios.get('/user/schedule');
            console.log(response);
        },

        // изменение Счетчик времени
        changeTime_counter(startTime, endTime) {
            // Разбиваем время на часы и минуты
            const startParts = startTime.split(':');
            const endParts = endTime.split(':');

            // Преобразуем в минуты
            const startMinutes = startParts[0] * 60 + parseInt(startParts[1]);
            const endMinutes = endParts[0] * 60 + parseInt(endParts[1]);

            // Вычисляем разницу
            let difference = endMinutes - startMinutes;

            // Обрабатываем отрицательную разницу
            if (difference < 0) {
                difference += 24 * 60;
            };

            return difference;
        },

        // Включение времени
        startTimer() {
            window.setInterval(() => {
                this.date = new Date()
            }, 1000);

            window.setInterval(() => {
                this.new_timeCall = new Date()
            }, 60000);
        },

        CheckingZeroAdditionTime(getTupeDate) {
            if (getTupeDate < 10) {
                return "0" + getTupeDate;
            } else {
                return getTupeDate;
            };
        },


        timeEventListener_calls(index) {
            let timeBeginning = this.timeLesson[index].timeBeginning;
            let startTime;
            index - 1 === -1
                ? startTime = this.timeLesson[index].timeBeginning
                : startTime = this.timeLesson[index - 1].timeEnd;
            let endTime = this.timeLesson[index].timeEnd;

            // Настоящее время
            let time = `${this.CheckingZeroAdditionTime(this.new_timeCall.getHours())}:${this.CheckingZeroAdditionTime(this.new_timeCall.getMinutes())}`;
            // let time = '13:00';


            // Разбиваем время на часы и минуты
            const startParts = startTime.split(':');
            const endParts = endTime.split(':');
            const timeParts = time.split(':');
            const timeBeginningParts = timeBeginning.split(':');

            // Преобразуем в минуты
            const startMinutes = startParts[0] * 60 + parseInt(startParts[1]);
            const endMinutes = endParts[0] * 60 + parseInt(endParts[1]);
            const timeMinutes = timeParts[0] * 60 + parseInt(timeParts[1]);
            const timeBeginningMinutes = timeBeginningParts[0] * 60 + parseInt(timeBeginningParts[1]);

            // Проверка на проигрования звонка
            if ((timeMinutes == endMinutes || timeMinutes == timeBeginningMinutes) && this.timeLesson[index].сheckСall == "1") {
                this.playAudio();
            };

            // Проверка на подстановку стилей
            switch (true) {
                case endMinutes <= timeMinutes:
                    return 'past';
                case startMinutes <= timeMinutes && timeMinutes < endMinutes:
                    return 'active';
                case startMinutes > timeMinutes:
                    return "planet";
            };
        }
    }
};
</script>




<template>
    <header class="row">
        <!-- Название организации -->
        <div class="name_college col">Басовская</div>

        <!-- Часы -->
        <div class="time col">
            {{ CheckingZeroAdditionTime(this.date.getHours()) }}:
            {{ CheckingZeroAdditionTime(this.date.getMinutes()) }}:
            {{ CheckingZeroAdditionTime(this.date.getSeconds()) }}
        </div>

        <!-- Дата -->
        <div class="date col">
            {{ CheckingZeroAdditionTime(this.date.getDate()) }}.
            {{ CheckingZeroAdditionTime(this.date.getMonth() + 1) }}.
            {{ this.date.getFullYear() }}
        </div>
    </header>

    <h2>Расписание <br> Звонков</h2>


    <el-container class="schedule">

        <div v-for=" (i, index) in timeLesson" class="container">

            <el-row class="lesson container align-items-center" :class="timeEventListener_calls(index)">
                <div class="num_lesson col-auto">
                    {{ i.ID }} урок
                </div>
                <div class="col">
                    <hr>
                </div>
                <div class="col-auto">
                    {{ i.timeBeginning }}-{{ i.timeEnd }}
                </div>
            </el-row>

            <el-row v-if="i.ID != this.timeLesson.length" class="change container align-items-center ">
                <div class="col">
                    <hr>
                </div>
                <div class="peremena_text col-auto">
                    {{ changeTime_counter(this.timeLesson[index].timeEnd, this.timeLesson[index + 1].timeBeginning) }}
                    мин
                </div>
                <div class="col">
                    <hr>
                </div>
            </el-row>
        </div>

        <!-- <button type="button" class="button_call btn btn-secondary" @click="playAudio()">
            Звонить
        </button> -->
    </el-container>

    <!-- Проигрователь музыки -->
    <!-- https://alexbruni.ru/afx/sound_file/zvon-shkolnogo-kolokolchika-posledniy-zvonok-66.mp3  - колокольчик -->
    <!-- https://alexbruni.ru/afx/sound_file/zvuk-yaponskogo-shkolnogo-zvonka-elektronnyy-77.mp3  - спокойный -->
    <!-- https://alexbruni.ru/afx/sound_file/korotkiy-zvonok-shkolnogo-zvonka-35.mp3              - класичиский -->
    <!-- <audio :src="this.melodie"></audio> -->
    <audio src="https://alexbruni.ru/afx/sound_file/zvuk-yaponskogo-shkolnogo-zvonka-elektronnyy-77.mp3"></audio>

</template>






<style scoped>
* {
    margin: 0;
    padding: 0;
}

h2 {
    font-size: 3vh;
    margin-top: 35px;
    margin-bottom: 20px;
    text-align: center;
}

header {
    margin: 10px;
    margin-top: 20px;
}

header div {
    font-size: 2vh;
}

header .time {
    text-align: center;
    font-size: 2.6vh;
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
    width: 100%;
    padding: 0 10px 0 10px;
    margin-bottom: 1px;
    font-size: 2vh;
}

.lesson .col,
.change .col {
    padding: 10px;
}

.peremena_text {
    font-size: 1.5vh;
}

.lesson {
    color: #ffffff;
    font-weight: 600;
    height: 6vh;
    border-radius: 16px;
}

.change {
    height: 3vh;
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

.button_call {
    margin: 20px;
    height: 6vh;
    font-size: 2vw;
}

/* подставные класы */
.past {
    background-color: rgb(87, 133, 208);
}

.active {
    background-color: rgb(255, 145, 0);
}

.planet {
    background-color: rgb(0, 0, 255);
}

@media (min-width: 800px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl {
        max-width: 600px;
    }
}
</style>
