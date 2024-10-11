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
  },

  methods: {
    // запуск звука звонка
    playAudio() {
      this.audio.play();
    },

    async add_DB() {
      try {
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
        console.log("200");
      } catch {
        let Dat = new Date()
        if (Dat.getDay() == 6) {
          // Суббота
          this.timetable = JSON.parse(`[{"call_id":1,"enabled":true,"start_time":"09:00:00","end_time":"09:45:00"},{"call_id":2,"enabled":true,"start_time":"09:55:00","end_time":"10:40:00"},{"call_id":3,"enabled":true,"start_time":"11:00:00","end_time":"11:45:00"},{"call_id":4,"enabled":true,"start_time":"11:55:00","end_time":"12:40:00"},{"call_id":5,"enabled":true,"start_time":"12:50:00","end_time":"13:35:00"},{"call_id":6,"enabled":true,"start_time":"13:45:00","end_time":"14:30:00"},{"call_id":7,"enabled":true,"start_time":"14:40:00","end_time":"15:25:00"},{"call_id":8,"enabled":true,"start_time":"15:35:00","end_time":"16:20:00"},{"call_id":9,"enabled":true,"start_time":"16:30:00","end_time":"17:15:00"},{"call_id":10,"enabled":true,"start_time":"17:25:00","end_time":"18:10:00"}]`);
          this.timeCall = JSON.parse(`{"time":[1035,1045,1090,540,585,595,640,660,705,715,760,770,815,825,870,880,925,935,980,990],"timetable":[{"start_Lesson":540,"end_Lesson":585},{"start_Lesson":595,"end_Lesson":640},{"start_Lesson":660,"end_Lesson":705},{"start_Lesson":715,"end_Lesson":760},{"start_Lesson":770,"end_Lesson":815},{"start_Lesson":825,"end_Lesson":870},{"start_Lesson":880,"end_Lesson":925},{"start_Lesson":935,"end_Lesson":980},{"start_Lesson":990,"end_Lesson":1035},{"start_Lesson":1045,"end_Lesson":1090}]}`);
        } else if (Dat.getDay() == 0) {
          // Воскрисение: звонки и расписание отключено
          return
        } else {
          // Weekdays
          this.timetable = JSON.parse(`[{"call_id":1,"enabled":true,"start_time":"09:00:00","end_time":"09:45:00"},{"call_id":2,"enabled":true,"start_time":"09:55:00","end_time":"10:40:00"},{"call_id":3,"enabled":true,"start_time":"11:00:00","end_time":"11:45:00"},{"call_id":4,"enabled":true,"start_time":"11:55:00","end_time":"12:40:00"},{"call_id":5,"enabled":true,"start_time":"13:00:00","end_time":"13:45:00"},{"call_id":6,"enabled":true,"start_time":"14:05:00","end_time":"14:50:00"},{"call_id":7,"enabled":true,"start_time":"15:10:00","end_time":"15:55:00"},{"call_id":8,"enabled":true,"start_time":"16:05:00","end_time":"16:50:00"},{"call_id":9,"enabled":true,"start_time":"17:00:00","end_time":"17:45:00"},{"call_id":10,"enabled":true,"start_time":"17:55:00","end_time":"18:40:00"},{"call_id":11,"enabled":true,"start_time":"18:50:00","end_time":"19:35:00"}]`);
          this.timeCall = JSON.parse(`{"time":[1010,1020,1065,1075,1120,1130,1175,540,585,595,640,660,705,715,760,780,825,845,890,910,955,965],"timetable":[{"start_Lesson":540,"end_Lesson":585},{"start_Lesson":595,"end_Lesson":640},{"start_Lesson":660,"end_Lesson":705},{"start_Lesson":715,"end_Lesson":760},{"start_Lesson":780,"end_Lesson":825},{"start_Lesson":845,"end_Lesson":890},{"start_Lesson":910,"end_Lesson":955},{"start_Lesson":965,"end_Lesson":1010},{"start_Lesson":1020,"end_Lesson":1065},{"start_Lesson":1075,"end_Lesson":1120},{"start_Lesson":1130,"end_Lesson":1175}]}`);
        }

        this.audio = new Audio('../../public/Дзынь.mp3')
        if (this.timetable != undefined) {
          // Заполнение массива с временем звонка
          this.timetable.forEach(element => {
            this.arrCall.push(element.end_time)
            this.arrCall.push(element.start_time)
          });
        }
        console.log("400");
      }
    },


    // запуск таймеров
    startTimer() {
      window.setInterval(() => {
        this.date = new Date()
        this.time = `${this.CheckingZeroAdditionTime(this.date.getHours())}:${this.CheckingZeroAdditionTime(this.date.getMinutes())}:${this.CheckingZeroAdditionTime(this.date.getSeconds())}`;
        // this.time = '12:40:00'; //для проверки
        // this.time = prompt('введите время', '11:45:00'); //для проверки
        this.Call()

        if (this.time == '00:00:00') {
          this.add_DB();
        }
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

    timeEventListener_peremen(index) {
      const start_Lesson = this.timeCall.timetable[index + 1]?.start_Lesson;
      const end_Lesson = this.timeCall.timetable[index].end_Lesson;

      // Разбиваем время на часы и минуты
      const timeParts = this.time.split(':');
      // Преобразуем в минуты
      this.new_timeMinutes = timeParts[0] * 60 + parseInt(timeParts[1]);

      // Проверка на подстановку стилей
      if (end_Lesson <= this.new_timeMinutes && this.new_timeMinutes < start_Lesson) {
        return 'active';
      }
      return '';
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

      <el-row v-if="element.call_id != this.timetable.length" class="change container align-items-center peremen"
        :class="timeEventListener_peremen(index)">
        <div class="col">
          <hr>
        </div>
        <p class="peremena_text col-auto">
          {{ peremena_time(index) }}
          мин
        </p>
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

.peremen {
  border-radius: 25px;
  border: 2px solid #ffffff;
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

  p {
    color: #ffffff;
  }
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
