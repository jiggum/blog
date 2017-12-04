<template>
  <div class="hello">
    <h2>This is just a normal POST</h2> 
    <div>Enter a new item in the text box and hit Submit to save it to the database</div>
    <form action="/quotes" method="POST">
      <input type="text" placeholder="item" name="item">
      <button type="submit">Submit</button>
    </form>
    <hr>
    <h2>GraphQL Test</h2>
    <hr>
    <div>
      <a href="localhost:3000/graphql?query={todo(itemId:1){itemId,item}}">GraphQL Test</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
