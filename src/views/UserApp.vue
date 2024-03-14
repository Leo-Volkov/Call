<script>


export default {
    data() {
        return {
            date: new Date(),

        }
    },
    mounted() {
        this.startTimer ();
    },
    methods: {
        
        startTimer() {
            window.setInterval(() => {
                this.date = new Date()
            }, 1000)
        }
    }
}
</script>

<template>

    <header class=" row">
        <div class="name_college col">Басовская</div>
        <div class="time col">{{ this.date.getHours() }}:{{ this.date.getMinutes() }}:{{ this.date.getSeconds() }}</div>
        <div class="date col">{{ this.date.getDate() }}.{{ this.date.getMonth() }}.{{ this.date.getFullYear() }}</div>
    </header>

    <h2>Расписание <br> Звонков</h2>


    <div class="schedule container">
        <div style="display: inline-block;">
            <div class="lesson row container text-center align-items-center">

                <div class="num_lesson col-md-auto">
                    1 урок
                </div>
                <div class="col">
                    <hr>
                </div>
                <div class="col-md-auto">
                    9:55-10:40
                </div>

            </div>
        </div>
        <div v-for=" i in 6">
            <div style="display: inline-block;">
                <div class="change row container text-center align-items-center ">
                    <div class="col">
                        <hr>
                    </div>
                    <div class="col-md-auto"> 10 мин</div>
                    <div class="col">
                        <hr>
                    </div>
                </div>
            </div>
            <div style="display: inline-block;">
                <div class="lesson row container text-center align-items-center">

                    <div class="num_lesson col-md-auto">
                        {{ i + 1 }} урок
                    </div>
                    <div class="col">
                        <hr>
                    </div>
                    <div class="col-md-auto">
                        9:55-10:40
                    </div>

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

.lesson {
    background-color: rgb(163, 163, 163);
    width: 643px;
    height: 50px;
    border-radius: 16px;
}

.change {
    width: 643px;
    height: 24px;
}
</style>