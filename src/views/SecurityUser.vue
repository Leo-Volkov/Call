<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: new Date(),
      new_timeMinutes: new Date(),
      melodie: '',
      timeCall: {},
      timetable: [],
    }
  },

  mounted() {
    this.add_DB(); // Отправка запроса на сервер

    // событие проигрования звонка при нажатие на пробел
    document.addEventListener('keydown', function (event) {
      if (event.code == 'Space') {
        this.playAudio()
      };
    });

  },
  methods: {
    // запуск звука звонка
    playAudio() {
      const audio = document.querySelector("audio");
      audio.play();
    },

    // Работа с серваком 
    async add_DB() {
      const response = await axios.get('/user/schedule');
      this.melodie = response.data.melodie;
      this.timetable = response.data.timetable;
      this.timeCall = response.data.timeCall;
      this.startTimer(); // запуск таймеров и проигрования звонков
    },

    // запуск таймеров
    async startTimer() {
      this.Call()
      window.setInterval(() => {
        this.Call()
      }, 60000);
      window.setInterval(() => {
        this.date = new Date()
      }, 1000);
    },

    // функция для вызова мелодии звонка по времени 
    Call() {
      // Настоящее время
      const new_time = new Date()
      const time = `${this.CheckingZeroAdditionTime(new_time.getHours())}:${this.CheckingZeroAdditionTime(new_time.getMinutes())}`;
      // let time = '13:00'; //для проверки

      // Разбиваем время на часы и минуты
      const timeParts = time.split(':');

      // Преобразуем в минуты
      this.new_timeMinutes = timeParts[0] * 60 + parseInt(timeParts[1]);

      // Проверка на проигрования звонка
      this.timeCall.time.forEach(element => {
        if (this.new_timeMinutes == element) { this.playAudio() };
      })
    },

    // подсветка события времени
    timeEventListener_calls(index) {
      const start_Lesson = this.timeCall.timetable[index].start_Lesson;
      const end_Lesson = this.timeCall.timetable[index].end_Lesson;

      // Проверка на подстановку стилей
      switch (true) {
        case end_Lesson <= this.new_timeMinutes:
          return 'past';
        case start_Lesson <= this.new_timeMinutes && this.new_timeMinutes < end_Lesson:
          return 'active';
        case start_Lesson > this.new_timeMinutes:
          return "planet";
      };
    },

    // Делает формат врепни правельнм 
    CheckingZeroAdditionTime(getTupeDate) { return getTupeDate < 10 ? "0" + getTupeDate : getTupeDate },

    // подсчёт времени на перемену
    peremena_time(index) { return this.timeCall.timetable[index + 1].start_Lesson - this.timeCall.timetable[index].end_Lesson },
  }
};
</script>



<template>
  <main>
    <header class="row">
      <!-- Название организации -->
      <div class="name_college col">Басовская</div>

      <!-- Часы -->
      <div class="time col">
        <samp>{{ CheckingZeroAdditionTime(this.date.getHours()) }}</samp>:
        <samp style="margin-left: -1.2vh;">{{ CheckingZeroAdditionTime(this.date.getMinutes()) }}</samp>:
        <samp style="margin-left: -1.2vh;">{{ CheckingZeroAdditionTime(this.date.getSeconds()) }}</samp>
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

      <div v-for=" (element, index) in timetable" class="container">

        <el-row class="lesson container align-items-center" :class="timeEventListener_calls(index)">
          <div class="num_lesson col-auto">
            {{ element.call_id }} урок
          </div>
          <div class="col">
            <hr>
          </div>
          <div class="col-auto">
            {{ element.start_time }}-{{ element.end_time }}
          </div>
        </el-row>

        <el-row v-if="element.call_id != this.timetable.length" class="change container align-items-center ">
          <div class="col">
            <hr>
          </div>
          <div class="peremena_text col-auto">
            {{ peremena_time(index) }}
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
    <!-- <audio :src="this.trueNnamePleers"></audio> -->
    <audio src="https://alexbruni.ru/afx/sound_file/zvuk-yaponskogo-shkolnogo-zvonka-elektronnyy-77.mp3"></audio>

  </main>
</template>




<style scoped>
* {
  margin: 0;
  padding: 0;
}

main {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(68, 66, 66);
}

h2 {
  font-size: 3.3vh;
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
}

header {
  padding: 0 20px;
  padding-top: 20px;
}

header div {
  font-size: 2.7vh;
  font-weight: 600;
}

header .time {
  text-align: center;
  font-weight: 600;
  font-size: 5vh;
}

header .date {
  text-align: end;
}

.schedule {
  display: flex;
  text-align: center;
  margin-top: 15px;
}

.container_for {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}

.lesson,
.change {
  min-width: 300px;
  width: 50%;
  padding: 0 10px 0 10px;
  margin-bottom: 1px;
  font-size: 1.6vh;
}

.lesson .col,
.change .col {
  padding: 0 15px;
}

.peremena_text {
  font-weight: 600;
  font-size: 1.5vh;
}

.lesson {
  color: #989696;
  font-weight: 600;
  height: 5vh;
  border-radius: 16px;
}

.change {
  height: 2.5vh;
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
  background-color: rgb(38, 55, 81);
}

.active {
  background-color: rgb(49, 102, 155);
}

.planet {
  background-color: rgb(38, 55, 81);
}
</style>
