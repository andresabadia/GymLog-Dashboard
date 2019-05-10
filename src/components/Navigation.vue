<template>
    <div id="nav">
        <div class="navigation-left">
            <router-link to="/dashboard">
                <div class="navigation-icon"><i class="fas fa-chart-pie"></i></div> 
                <div class="navigation-text">Tablero</div>
            </router-link>
            <router-link to="/excel-export">
                <div class="navigation-icon"><i class="fas fa-file-excel"></i></div> 
                <div class="navigation-text">Exportar Excel</div>
            </router-link>
            <router-link to="/tutorials">
                <div class="navigation-icon"><i class="fab fa-youtube"></i></div> 
                <div class="navigation-text">Video Tutoriales</div>
            </router-link>            
        </div>
        <div class="navigation-right">
             <div class="navigation-user">
                <div class="navigation-user-gym">{{$store.state.glUser.gym_name}}</div>
                <div class="navigation-user-owner">{{$store.state.glUser.gym_owner}}</div>
                <div class="navigation-user-last-update">Actualizado {{date($store.state.glUser.date)}}</div>
            </div>
            <div class="navigation-logout" @click="logout()">
                <div class="navigation-icon"><i class="fas fa-sign-out-alt"></i></div> 
                <div class="navigation-text">Logout</div>
            </div>
        </div>
       
    </div>
</template>
<script>
import Spinner from './Spinner.vue'
export default {
    components:{
        Spinner
    },
    methods:{
        date(date) {
            return moment(date).fromNow();
        },
        logout(){
            localStorage.removeItem('glm-user')
            sessionStorage.removeItem('glm-user')
            this.$store.commit('resetUser')
            this.$store.commit('checkUserId')
            this.$router.push('login')
        }
    }    
}
</script>
<style scoped>
#nav {
    padding: 5px;
    display: flex;
    background: #000000b6;
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 5;
}
.navigation-left{
    display:flex;
    z-index: 6;
}
.navigation-right{
    display:flex;
    position: absolute;
    right: 0;
}
.navigation-user{
    text-align: right;
    border-right: solid 2px white;
    margin-right: 2px;
    padding-right: 4px;
    font-size: 0.6rem;
    color: white;
}
.navigation-user-gym{    
    font-size: 0.8rem;
    color: #ffaa00; 
    font-weight: bold;
}
.navigation-user-owner{

}
.navigation-user-last-update{

}
#nav a, .navigation-logout {
    color: white;
    margin-right: 10px;
    width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.navigation-logout{
    cursor:pointer;
}
#nav a:hover, .navigation-logout:hover{
    text-decoration:none;     
    font-weight: bold;
    color: #ffaa0075; 
}
#nav a.router-link-exact-active {
  color: #ffab00;  
  font-weight: bold;
}
.navigation-icon{
    height: 30px;
    width: 30px;
    background-color: #424242;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
}
.navigation-text{
    font-size:0.6rem;
    line-height: 1;
    transform: translateY(1px);
}
@media only screen and (min-width: 576px) {  

}
@media only screen and (min-width: 768px) {  

}
@media only screen and (min-width: 992px) {  

}
@media only screen and (min-width: 1200px) {  

}
</style>
