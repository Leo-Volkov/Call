<script lang="ts">

import { defineComponent } from "vue";
import { ref } from 'vue';
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

      startTime: "",
      endTime: "",
      shortenedDay_enabled: Boolean,

      timetables: {
        weekdays: {
          name: "weekdays",
          teble: [
            {
              call_id: Number,
              start_time: String,
              end_time: String,
              enabled: Boolean
            }
          ]
        },
        saturday: {
          name: "saturday",
          teble: [
            {
              call_id: Number,
              start_time: String,
              end_time: String,
              enabled: Boolean
            }
          ]
        },
        shortenedDay: {
          name: "shortenedDay",
          teble: [
            {
              call_id: Number,
              start_time: String,
              end_time: String,
              enabled: Boolean
            }
          ]
        },
      },
    }
  },
  mounted() {
    this.add_DB(); // Отправка запроса на сервер
  },
  methods: {

    async add_DB() { // Получение данных с сервера
      const response = await axios.get('/admin/schedule');
      this.timetables.weekdays.teble = response.data.weekdays
      this.timetables.saturday.teble = response.data.saturday
      this.timetables.shortenedDay.teble = response.data.shortenedDay
      this.melodies = response.data.melodies
      this.shortenedDay_enabled = response.data.shortenedDay_enabled
    },

    async save_DB() { // сохранение данных на сервер
      // Отправка данных на сервер
      // axios.post("/admin/save_DB", { "timetables": this.timetables, "melodies": this.melodies }).then((response) => {
      //   // Обработка ответа сервера
      //   response.data
      //     ? console.log("Данные успешно обновлены!")
      //     : console.log("Ошибка:", response.data);
      // });
    },

    onAdd_RowTable(indexTables: string) { // добавление нового урока в таблицу 
      const data_content_RowTebel = {
        call_id: this.timetables.weekdays.teble[this.timetables.weekdays.teble.length - 1].call_id + 1,
        start_time: "",
        end_time: "",
        enabled: true
      };

      switch (indexTables) {
        case "weekdays":
          this.timetables.weekdays.teble.push(data_content_RowTebel);
          break;
        case "saturday":
          this.timetables.saturday.teble.push(data_content_RowTebel);
          break;
        case "shortenedDay":
          this.timetables.shortenedDay.teble.push(data_content_RowTebel);
          break;
      };
    },

    delete_RowTable(indexTables: string) { // удаление урока из таблицы
      switch (indexTables) {
        case "weekdays":
          this.timetables.weekdays.teble.splice(this.timetables.weekdays.teble.length - 1);
          break;
        case "saturday":
          this.timetables.saturday.teble.splice(this.timetables.saturday.teble.length - 1);
          break;
        case "shortenedDay":
          this.timetables.shortenedDay.teble.splice(this.timetables.shortenedDay.teble.length - 1);
          break;
      };
    },

    fun_if(call_type: string, index_for: number) {
      if (call_type === "weekdays") {
        return index_for - 1 > 0 ? this.timetables.weekdays.teble[index_for - 2].end_time : `08:00`;
      } else if (call_type === "saturday") {
        return index_for - 1 > 0 ? this.timetables.saturday.teble[index_for - 2].end_time : `08:00`;
      } else if (call_type === "shortenedDay") {
        return index_for - 1 > 0 ? this.timetables.shortenedDay.teble[index_for - 2].end_time : `08:00`;
      }
    },
  }
})
</script>




<template>
  <h1>Админка</h1>
  <main class="table_panel">

    <section v-for="indexTables in this.timetables" class="table_col">

      <h2 v-if="indexTables.name === 'weekdays'">Расписание на будни</h2>
      <h2 v-else-if="indexTables.name === 'saturday'">Расписание на субботу</h2>
      <h2 v-else-if="indexTables.name === 'shortenedDay'" class="shortenedDay_batten">
        <span class="check_table_shortenedDay form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" call_id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Сокращённый день</label>
        </span>
      </h2>

      <el-table :data="indexTables.teble" border>
        <el-table-column prop="call_id" label="№" width="40" />

        <el-table-column prop="start_time" label="Начало урока">
          <template #default="scope">
            <el-time-select v-model="scope.row.start_time" :max-time="`${scope.row.end_time}`" class="mr-4"
              placeholder="Время начала" :start="`${this.fun_if(indexTables.name, scope.row.call_id)}`" step="00:05"
              end="19:30" />
          </template>
        </el-table-column>

        <el-table-column prop="end_time" label="Конец урока">
          <template #default="scope">
            <el-time-select v-model="scope.row.end_time" :min-time="`${scope.row.start_time}`"
              placeholder="Время окончания" :start="`${this.fun_if(indexTables.name, scope.row.call_id)}`" step="00:05"
              end="20:00" />
          </template>
        </el-table-column>

      </el-table>

      <el-row class="table_button_panel">
        <el-button type="info" class="col" @click="onAdd_RowTable(indexTables.name)">
          Добавить
        </el-button>
        <el-button type="info" class="col" @click="delete_RowTable(indexTables.name)">
          Удалить
        </el-button>
      </el-row>

    </section>


    <section class="melody_panel">
      <h2>Выбрать мелодию</h2>
      
      <el-radio-group class="radio_form-check" v-model="this.melodies.enabled">
        <el-radio name="melody" class="form-check" v-for=" x in melodies" :value="x" size="large" @click="{{ console.log(this.melodies);
         }}">
          {{ x }}
        </el-radio>
      </el-radio-group>

      <!-- https://sky.pro/wiki/html/obrabotka-sobytiya-vybora-fayla-v-html-input-type-file/ -->
    </section>

  </main>

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

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
}

section {
  width: 420px;

}

h1 {
  font-size: 32px;
  text-align: center;
  margin: 25px 0px 15px 0px;
}

h2 {
  font-size: 27px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 7px;
}

h2 .check_table_shortenedDay {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-left: 2em;
}

h2 .check_table_shortenedDay input {
  padding-bottom: 10px;
}

.table_col,
.melody_panel {
  padding: 15px;
}

/* список плееров */
.melody_panel .radio_form-check {
  display: flex;
  gap: 0px;
}

/* TODO стили для Таблиц */

.el-table {
  margin-left: 1px;
}

/* TODO стили кнопок и переключений  */
.table_button_panel {
  padding: 0 1vw;
  --bs-gutter-x: 0;
  display: flex;
  justify-content: center;
  margin-top: 7px;
}

.table_button_panel .el-button {
  width: 100%;
  width: 10vw;
  min-width: 145px;
}

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


@media (max-width: 768px) {
  .table_button_panel .el-button {
    font-size: 2.4vw;
  }
}
</style>