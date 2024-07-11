<script>
import axios from 'axios';

export default {
  data() {
    return {
      melodies: [
        {
          title: String,
          enabled: Boolean
        }
      ],

      allCheckСall: {
        weekdays: Boolean,
        saturday: Boolean,
        shortenedDay: Boolean
      },
      counterСall: {
        weekdays: Number,
        saturday: Number,
        shortenedDay: Number
      },
      isIndeterminate: {
        weekdays: Boolean,
        saturday: Boolean,
        shortenedDay: Boolean
      },

      allCheckСall: false,
      counterСall: 0,
      isIndeterminate: false,


      shortenedDay_enabled: Boolean,

      timetables: {
        weekdays: [
          {
            call_id: Number,
            start_time: String,
            end_time: String,
            enabled: Boolean
          }
        ],
        saturday: [
          {
            call_id: Number,
            start_time: String,
            end_time: String,
            enabled: Boolean
          }
        ],
        shortenedDay: [
          {
            call_id: Number,
            start_time: String,
            end_time: String,
            enabled: Boolean
          }
        ],
      },
    }
  },
  mounted() {
    this.add_DB(); // Отправка запроса на сервер
  },
  methods: {

    async add_DB() { // Получение данных с сервера
      const response = await axios.get('/admin/schedule');
      this.timetables.weekdays = response.data.weekdays
      this.timetables.saturday = response.data.saturday
      this.timetables.shortenedDay = response.data.shortenedDay
      this.melodies = response.data.melodies
      this.shortenedDay_enabled = response.data.shortenedDay_enabled
    },


    async save_DB() { // сохранение данных на сервер
      // Отправка данных на сервер
      axios.post("/admin/save_DB", { "timetables": this.timetables, "melodies": this.melodies }).then((response) => {
        // Обработка ответа сервера
        // response.data
        //   ? console.log("Данные успешно обновлены!")
        //   : console.log("Ошибка:", response.data);
      });
      this.counterСall = 0
    },

    abbTable() { // добавление нового урока
      this.timetables.push({
        call_id: this.timetables.length,
        start_time: `00:00`,
        end_time: `00:00`,
        enabled: true,
      });

      this.counterСall++

      this.meterReadingСall();
    },

    daliteTable() { // удаление урока
      if (this.timetables.length > 0) {
        if (this.timetables[this.timetables.length - 1].enabled == true) {
          this.counterСall--
        };
        this.timetables.pop();

        this.meterReadingСall();
      };
    },

    // changelPayer(x) { 
    //   this.melodie_trueID = x;
    //   this.timetables.forEach(element => {
    //     element.melody = x;
    //   });
    //   console.log(this.timetables);
    // },

    getAllCheckСall() { // включение и выключение всех звонков
      if (this.allCheckСall == true) {
        for (let i = 0; i < this.timetables.length; i++) {
          this.timetables[`${i}`] = {
            start_time: this.timetables[`${i}`].start_time,
            end_time: this.timetables[`${i}`].end_time,
            enabled: true
          };
        };

        this.counterСall = this.timetables.length;
      } else {
        for (let i = 0; i < this.timetables.length; i++) {
          this.timetables[`${i}`] = {
            start_time: this.timetables[`${i}`].start_time,
            end_time: this.timetables[`${i}`].end_time,
            enabled: false
          };
        };

        this.counterСall = 0;
      };

      this.isIndeterminate = false;
    },

    CounterСall(x) {
      x.enabled == true ?
        this.counterСall++ :
        this.counterСall--;

      this.meterReadingСall();
    },

    meterReadingСall() {
      let z = this.timetables.length;
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
      for (let i = 0; i < this.timetables.length; i++) {
        if (this.timetables[`${i}`].enabled == true) {
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

    <div class="schedule_weekdays_panel col">
      <h3>Расписание на будни</h3>
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

          <tr v-for=" (x, index) in timetables" :key="timetables.call_id">
            <td class="td_row_1">{{ index + 1 }}</td>
            <td class="td_row_2"><input name="start_time" v-model="x.start_time" type="time"></td>
            <td class="td_row_3"><input name="end_time" v-model="x.end_time" type="time"></td>
            <td class="td_row_4"><input name="enabled" v-model="x.enabled" type="checkbox" @change="CounterСall(x)">
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


    <div class="schedule_saturday_panel col-lg">
      <h3>Расписание на субботу</h3>
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
          <tr v-for=" (x, index) in timetables" :key="timetables.call_id">
            <td class="td_row_1">{{ index + 1 }}</td>
            <td class="td_row_2"><input name="start_time" v-model="x.start_time" type="time"></td>
            <td class="td_row_3"><input name="end_time" v-model="x.end_time" type="time"></td>
            <td class="td_row_4"><input name="enabled" v-model="x.enabled" type="checkbox" @change="CounterСall(x)">
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
  </div>


  <div class="row">

    <div class="schedule_shortenedDay_panel col">
      <h3 class="shortenedDay_batten">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" call_id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Сокращённый день</label>
        </div>
      </h3>
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
          <tr v-for=" (x, index) in timetables" :key="timetables.call_id">
            <td class="td_row_1">{{ index + 1 }}</td>
            <td class="td_row_2"><input name="start_time" v-model="x.start_time" type="time"></td>
            <td class="td_row_3"><input name="end_time" v-model="x.end_time" type="time"></td>
            <td class="td_row_4"><input name="enabled" v-model="x.enabled" type="checkbox" @change="CounterСall(x)">
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


    <div class="melody_panel col-lg col-md-auto">
      <h3>Выбрать мелодию</h3>
      <el-radio-group class="radio_form-check" v-model="this.melodies.enabled">
        <el-radio name="melody" class="form-check" v-for=" x in melodies" :value="x" size="large"
          @click="changelPayer(x)">
          {{ x }}
        </el-radio>
      </el-radio-group>

      <label class="add_melody input-file">
        <input type="file" name="file" accept=".mp3">
        <span>Выберите файл</span>
        <!-- https://sky.pro/wiki/html/obrabotka-sobytiya-vybora-fayla-v-html-input-type-file/ -->
      </label>
    </div>

  </div>


  <div class="button_save">
    <button class="btn btn-secondary" @click="save_DB()">
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
  margin: 30px 30px 25px 30px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 10px;
  margin-left: 7px;
}

.schedule_shortenedDay_panel,
.schedule_saturday_panel,
.schedule_weekdays_panel,
.melody_panel {
  margin-top: 15px;
}

/* список плееров */
.melody_panel .radio_form-check {
  display: flex;
  gap: 0px;
}

.melody_panel .radio_form-check .form-check {
  max-width: 610px;
  overflow: auto;
}


/* TODO стили для Таблиц */
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

.td_row_2 input,
.td_row_3 input {
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

.schedule_shortenedDay_panel th {
  background-color: rgb(182, 175, 49);
}



/* TODO стили кнопок и переключений  */
.button_save {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.button_save button {
  width: 70%;
}


h3 input {
  transform: scale(0.7);
}

.shortenedDay_batten .form-check {
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

/* TODO кнопка выбора файла */
.input-file {
  position: relative;
  display: inline-block;
}

.input-file span {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-size: 14px;
  vertical-align: middle;
  color: rgb(255 255 255);
  text-align: center;
  border-radius: 4px;
  background-color: #5c5a5f;
  line-height: 22px;
  height: 40px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  margin: 0;
  transition: background-color 0.2s;
}

.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}

/* Focus */
.input-file input[type=file]:focus+span {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
}

/* Disabled */
.input-file input[type=file]:disabled+span {
  background-color: #eee;
}

/* \\\\\\\\\\ */


/* TODO медиа раздел */
@media (max-width: 768px) {
  .radio_form-check {
    row-gap: 0px;
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
    gap: 0px;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
  }
}
</style>