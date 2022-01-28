<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="sidebar">
            <router-link to="/"> <i class="fa fa-fw fa-home"></i> Home </router-link>
            <router-link to="/users"> <i class="fa fa-fw fa-user"></i> Usuários </router-link>
            <router-link to="/tasks"> <i class="fa fa-fw fa-tasks"></i> Tarefas </router-link>
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    data: function() {
        return {}
    },
    methods: {
        carregaDropDown() {
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;

        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
            });
        }
        },
    },
    mounted() {
        if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
        }
        this.carregaDropDown();        
    },
    computed: {
        ...mapState(["isMenuVisible"]),
        notHavePermission() {
            document.getElementById("botao").setAttribute("disabled", true);
            return true
        },
    },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 295px;
  text-decoration: none;
  position: fixed;
  height: 100%;
  overflow: auto;
}

/* Sidebar links */
.sidebar a {
  display: block;
  color: #ffffff;
  padding: 16px;
  text-decoration: none;
}

/* Links on mouse-over */
.sidebar a:hover {
  background-color: #ffffff;
  color: #1e396e;
  text-decoration: none;
}

.sidebar .dropdown-btn {
  padding: 16px;
  text-decoration: none;
  color: #ffffff;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

.dropdown-btn:hover {
  padding: 16px;
  background-color: #ffffff;
  color: #1e396e;
  text-decoration: none;
}

.dropdown-container {
  display: none;
  padding-left: 10px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: left;
    float: none;
  }
}

.disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>
