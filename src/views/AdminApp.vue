<script lang="ts">

import { defineComponent } from "vue";
import { ref } from 'vue';
// const dayjs = require('dayjs')
import axios from 'axios';

export default defineComponent({
  components: {

  },
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

      // allCheckСall: false,
      // counterСall: 0,
      // isIndeterminate: false,


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

    // async save_DB() { // сохранение данных на сервер
    //   // Отправка данных на сервер
    //   axios.post("/admin/save_DB", { "timetables": this.timetables, "melodies": this.melodies }).then((response) => {
    //     // Обработка ответа сервера
    //     // response.data
    //     //   ? console.log("Данные успешно обновлены!")
    //     //   : console.log("Ошибка:", response.data);
    //   });
    //   this.counterСall = 0
    // },

    onAdd_RowTable(indexTables: string) { // добавление нового урока в таблицу 
      const data_content_RowTebel = {
        call_id: this.timetables.weekdays[this.timetables.weekdays.length - 1].call_id + 1,
        start_time: "00:00",
        end_time: "00:00",
        enabled: true
      };

      switch (indexTables) {
        case "weekdays":
          this.timetables.weekdays.push(data_content_RowTebel);
          break;
        case "saturday":
          this.timetables.saturday.push(data_content_RowTebel);
          break;
        case "shortenedDay":
          this.timetables.shortenedDay.push(data_content_RowTebel);
          break;
      };
    },

    delete_RowTable(indexTables: string) { // удаление урока из таблицы
      switch (indexTables) {
        case "weekdays":
          this.timetables.weekdays.splice(this.timetables.weekdays.length - 1);
          break;
        case "saturday":
          this.timetables.saturday.splice(this.timetables.saturday.length - 1);
          break;
        case "shortenedDay":
          this.timetables.shortenedDay.splice(this.timetables.shortenedDay.length - 1);
          break;
      };
    },


  }
})
</script>




<template>
  <h1>Админка</h1>

  <div class="row">

    <div class="schedule_weekdays_panel col">
      <h2>Расписание на будни</h2>
      <div class="cntent_table">
        <el-table :data="timetables.weekdays" border>
          <el-table-column prop="call_id" label="№" width="50" />
          <el-table-column prop="start_time" label="Начало урока">
            <template #default="scope">
              <!-- https://element-plus.org/en-US/component/time-select.html -->
            </template>
          </el-table-column>
          <el-table-column prop="end_time" label="Конец урока">
            <template #default="scope">
              <input name="end_time" v-model="scope.row.end_time" type="time">
            </template>
          </el-table-column>
        </el-table>

        <el-row class="cntent_table_button">
          <el-button type="info" class="col" @click="onAdd_RowTable('weekdays')">
            Добавить
          </el-button>
          <el-button type="info" class="col" @click="delete_RowTable('weekdays')">
            Удалить
          </el-button>
        </el-row>
      </div>
    </div>


    <div class="schedule_saturday_panel col-lg">
      <h2>Расписание на субботу</h2>
      <div class="cntent_table">

      </div>
    </div>
  </div>


  <div class="row">

    <div class="schedule_shortenedDay_panel col">
      <h2 class="shortenedDay_batten">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" call_id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Сокращённый день</label>
        </div>
      </h2>

      <div class="cntent_table">

      </div>
    </div>


    <div class="melody_panel col-lg col-md-auto">
      <h2>Выбрать мелодию</h2>
      <!-- <el-radio-group class="radio_form-check" v-model="this.melodies.enabled">
        <el-radio name="melody" class="form-check" v-for=" x in melodies" :value="x" size="large"
          @click="changelPayer(x)">
          {{ x }}
        </el-radio>
      </el-radio-group> -->

      <!-- <label class="add_melody input-file">
        <input type="file" name="file" accept=".mp3">
        <span>Выберите файл</span>
      </label> -->
      <!-- https://sky.pro/wiki/html/obrabotka-sobytiya-vybora-fayla-v-html-input-type-file/ -->
    </div>

  </div>


  <div class="button_save">
    <!-- <button class="btn btn-secondary" @click="save_DB()">
      Сохранить
    </button> -->
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

h2 {
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


h2 input {
  transform: scale(0.7);
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

@media (max-width: 768px) {
  .cntent_table_button .el-button {
    font-size: 2.4vw;
  }
}
</style>