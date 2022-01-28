<template>
    <div>
        <b-card-group deck>
            <b-card header="Novas tarefas" header-tag="header" header-bg-variant="secondary">
                <b-form>                    
                    <b-form-input type="text" placeholder="Título" autofocus/><br>
                    <b-form-select :options="usuarios"/><br><br>
                    <b-form-textarea placeholder="Descrição" rows="5"/><br>
                    <b-form-input type="date" placeholder="Data"/><br>
                    <div align="center">
                        <b-button variant="primary">Criar tarefa</b-button>
                    </div>
                </b-form>
            </b-card>

            <b-card header="Pendentes" header-tag="header" header-bg-variant="primary">
                <span v-for="pendente in pendentes" :key="pendente">
                    <TaskCard :task="pendente"/> 
                </span>                                  
            </b-card>

            <b-card header="Concluidas" header-tag="header" header-bg-variant="success">
                <span v-for="concluida in concluidas" :key="concluida">
                    <TaskCard :task="concluida"/>
                </span>
            </b-card>
        </b-card-group>
    </div>
</template>
<script>
import axios from "axios";
import Vue from "vue"
import { BCard, BFormTextarea } from 'bootstrap-vue'
import TaskCard from './TaskCard.vue'

Vue.component('b-card', BCard)
Vue.component('b-form-textarea', BFormTextarea)

export default {
    name: "Users",
    components: { TaskCard },
    data: function() {
        return {
            pendentes: [],
            concluidas: [],
            usuarios: [],
        }
    },
    async mounted() {
        await this.getPendentes()
        await this.getConcluidas()
    },
    methods: {
        async getPendentes() {
            const url = 'https://gorest.co.in/public/v1/todos'
            await axios.get(url).then((res) => {                
                this.pendentes = this.pendentes.concat(res.data.data.map(p => {
                    if (p.status === "pending") {                        
                        return p
                    }
                }))                            
            });
        },
        async getConcluidas() {
            const url = 'https://gorest.co.in/public/v1/todos'
            await axios.get(url).then((res) => {                
                this.concluidas = this.concluidas.concat(res.data.data.map(p => {
                    if (p.status === "completed") {                        
                        return p
                    }
                }))                            
            });
        }
    }
}
</script>