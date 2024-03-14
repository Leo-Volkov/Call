<script>


export default {
    data() {
        return {
            date: new Date(),

        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {

        startTimer() {

            window.setInterval(() => {
                this.date = new Date()
            }, 1000);
        },
        CheckingZeroAdditionTime (getTupeDate) {
            if (getTupeDate < 10) {
                return "0"
            }
        }
    }
}
</script>

<template>

    <header class=" row">
        <div class="name_college col">Басовская</div>
        <div class="time col">{{ CheckingZeroAdditionTime(this.date.getHours()) }}{{ this.date.getHours() }}:{{ CheckingZeroAdditionTime(this.date.getMinutes()) }}{{ this.date.getMinutes() }}:{{ CheckingZeroAdditionTime(this.date.getSeconds()) }}{{ this.date.getSeconds() }}</div>
        <div class="date col">{{ CheckingZeroAdditionTime(this.date.getDate()) }}{{ this.date.getDate() }}.{{ CheckingZeroAdditionTime(this.date.getMonth() + 1) }}{{ this.date.getMonth() + 1 }}.{{ this.date.getFullYear() }}</div>
    </header>

    <h2>Расписание <br> Звонков</h2>


    <div class="schedule container">
        <div class="lesson row container align-items-center">

            <div class="num_lesson col-auto">
                1 урок
            </div>
            <div class="col">
                <hr>
            </div>
            <div class="col-auto">
                9:55-10:40
            </div>

        </div>

        <div v-for=" i in 6">
            <div class="change row container align-items-center ">
                <div class="col">
                    <hr>
                </div>
                <div class="col-auto"> 10 мин</div>
                <div class="col">
                    <hr>
                </div>
            </div>

            <div class="lesson row container align-items-center">

                <div class="num_lesson col-auto">
                    {{ i + 1 }} урок
                </div>
                <div class="col">
                    <hr>
                </div>
                <div class="col-auto">
                    9:55-10:40
                </div>

            </div>

        </div>
    </div>

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
.change .col  {
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