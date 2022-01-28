<template>
    <div>
        <b-card-group deck>
            <b-card :header="task.title" header-tag="header">                
            </b-card>                       
        </b-card-group>
        <br>
    </div>
</template>
<script>
import Vue from "vue"
import { BCard } from 'bootstrap-vue'
Vue.component('b-card', BCard)

export default {
    name: 'TaskCard',
    props: ['task']    
}
</script>