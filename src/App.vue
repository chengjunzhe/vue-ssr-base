<template>
  <div id="app">
      <h1>{{msg}}</h1>
      <div><input type="text" v-model="msg"></div>
      <div>
          <button @click="onClick">单击</button>
      </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        msg:"hello"
    }
},
methods: {
    onClick(){
        console.log("hello");
    }
},
}
</script>

<style>

</style>