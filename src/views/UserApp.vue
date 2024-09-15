<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: new Date(),
      new_timeMinutes: new Date(),
      audio: '',
      timeCall: {},
      timetable: [],
      time: '',
      arrCall: [],
    }
  },

  mounted() {
    this.add_DB(); // Отправка запроса на сервер
    this.time = `${this.CheckingZeroAdditionTime(this.date.getHours())}:${this.CheckingZeroAdditionTime(this.date.getMinutes())}:${this.CheckingZeroAdditionTime(this.date.getSeconds())}`;
    this.startTimer(); // запуск таймеров и проигрования звонков

    document.addEventListener('keydown', (event) => {
      if (event.code == 'Space') {
        this.playAudio();
      };
    });

    window.setInterval(() => {
      this.add_DB();
    }, 600000);
  },

  methods: {
    // запуск звука звонка
    playAudio() {
      this.audio.play();
    },

    async add_DB() {
      const response = await axios.get('/user/schedule');
      this.audio = new Audio('../../public/Дзынь.mp3')
      // this.audio = new Audio(response.data.melodie)
      this.timetable = response.data.timetable;
      this.timeCall = response.data.timeCall;

      if (response.data.timetable != undefined) {
        // Заполнение массива с временем звонка
        this.timetable.forEach(element => {
          this.arrCall.push(element.end_time)
          this.arrCall.push(element.start_time)
        });
      }
    },


    // запуск таймеров
    startTimer() {

      window.setInterval(() => {
        this.date = new Date()
        this.time = `${this.CheckingZeroAdditionTime(this.date.getHours())}:${this.CheckingZeroAdditionTime(this.date.getMinutes())}:${this.CheckingZeroAdditionTime(this.date.getSeconds())}`;
        // this.time = '11:45:00'; //для проверки
        // this.time = prompt('введите время', '11:45:00'); //для проверки
        this.Call()
      }, 1000);

    },

    // функция для вызова мелодии звонка по времени 
    Call() {
      // Проверка на проигрования звонка
      this.arrCall.forEach(element => {
        if (this.time == element) this.playAudio();
      })
    },

    // подсветка события времени
    timeEventListener_calls(index) {
      const start_Lesson = this.timeCall.timetable[index].start_Lesson;
      const end_Lesson = this.timeCall.timetable[index].end_Lesson;

      // Разбиваем время на часы и минуты
      const timeParts = this.time.split(':');
      // Преобразуем в минуты
      this.new_timeMinutes = timeParts[0] * 60 + parseInt(timeParts[1]);

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

    conversion_to_time(time) {
      return time.slice(0, 5)
    },
  }
};
</script>


<template>
  <header class="row">
    <div class="name_college col">Басовская</div>

    <div class="time col">
      {{ this.time }}
    </div>

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
          {{ conversion_to_time(element.start_time) }}-{{ conversion_to_time(element.end_time) }}
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
  </el-container>
</template>






<style scoped>
* {
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 4.5vw;
  margin-top: 35px;
  margin-bottom: 20px;
  text-align: center;
}

header {
  margin: 10px;
  margin-top: 20px;

  div {
    font-size: 2vh;
  }

  .time {
    text-align: center;
    font-size: 2.6vh;
  }

  .date {
    text-align: end;
  }

  .schedule {
    text-align: center;
    margin-top: 15px;
  }
}


.lesson,
.change {
  min-width: 300px;
  width: 100%;
  padding: 0 15px;
  margin-bottom: 1px;
  font-size: 3.3vw;

  .col {
    padding: 10px;
  }
}


.peremena_text {
  font-size: 2.5vw;
}

.lesson {
  color: #ffffff;
  font-weight: 600;
  height: 9vw;
  border-radius: 16px;
}

.change {
  height: 4.4vw;
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
  height: 6vw;
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

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 600px;
  }
}
</style>
