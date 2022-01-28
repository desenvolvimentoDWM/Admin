<template>
    <div>
        <b-row>
            <b-col xs="6" align="right">
                <b-form-input type="text" placeholder="Pesquisar..." autofocus/>
            </b-col>
            <b-button variant="primary" @click="openModal()">Novo usuário</b-button>
        </b-row>
        <br/>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="status" slot-scope="data">
                <span v-if="data.item.status === 'active'" class="ativo">Ativo</span>
                <span v-else class="inativo">Inativo</span>
            </template>
            <template slot="actions" slot-scope="data">
                <b-button variant="primary" class="mr-2" @click="open(data.item)">
                    Abrir
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="total" :per-page="limit" align="center"/>

        <b-modal ref="modal-novo-usuario" hide-footer>            
            <div class="d-block text-center">
                <b-form>
                    <b-form-group label="Nome:">
                        <b-form-input type="text" placeholder="Informe o nome" v-model="name" autofocus/>
                    </b-form-group>
                    <b-form-group label="Gênero:">
                        <b-form-select :options="generos" v-model="gender"/>
                    </b-form-group>
                    <b-form-group label="E-mail:">
                        <b-form-input type="email" placeholder="Informe o e-mail" v-model="email" autofocus/>
                    </b-form-group>
                    <b-form-group label="Status:">
                        <b-form-select :options="status" v-model="statusUser"/>
                    </b-form-group>
                
                    <b-button variant="danger" @click="closeModal()">Cancelar</b-button>
                    <b-button variant="primary" class="ml-2" @click="closeModal()" :disabled="!validUser">Criar</b-button>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "Users",
    data: function() {
        return {
            users: [],
            total: 0,
            pages: 0,
            page: 0,
            limit: 0,
            name: null,
            gender: null,
            email: null,
            statusUser: null,
            fields: [
                { key: "id", label: "ID", sortable: true },
                { key: "name", label: "Nome", sortable: true },
                { key: "gender", label: "Gênero", sortable: true },
                { key: "email", label: "E-mail", sortable: true },
                { key: "status", label: "Status", sortable: true },
                { key: "actions", label: "Ações" }
            ],
            generos: [
                { value: "male", text: "Masculino" },
                { value: "female", text: "Feminino" }
            ],
            status: [
                { value: "active", text: "Ativo" },
                { value: "inactive", text: "Inativo" }
            ],
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            const url = 'https://gorest.co.in/public/v1/users'
            axios.get(url).then(res => {                
                this.users = res.data.data
                this.total = res.data.meta.pagination.total
                this.pages = res.data.meta.pagination.pages
                this.page = res.data.meta.pagination.page
                this.limit = res.data.meta.pagination.limit                
            });
        },
        openModal() {            
            this.$refs["modal-novo-usuario"].show();
        },
        closeModal() {            
            this.$refs["modal-novo-usuario"].hide();
        },
        open() {            
        }
    },
    computed: {
        validUser() {
            if (!this.name) return false
            if (!this.gender) return false
            if (!this.email) return false
            if (!this.statusUser) return false
            return true
        }
    }
}
</script>
<style>
.ativo {
    background-color: green;
    color: white;
}

.inativo {
    background-color: darkgray;
}
</style>