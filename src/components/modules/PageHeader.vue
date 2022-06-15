<template>
  <header id="headerblock">
    
    <h1 id="title" style="margin:0"><router-link to="/" >COVID-19 Japan</router-link></h1>
    <div id="subtitle">新型コロナウイルス対策ダッシュボード</div>
    
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  
}
</script>


<style lang="scss" type="text/css">
  #headerblock{
    background-color: #AD232F;
    color: white;
    a{
      cursor: pointer;
      color: inherit;
      text-decoration: none;
    }
    #title{
      text-align: center;
      padding: 0.3em;
      font-size: 8vmin;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
    
    }
    #subtitle{
      text-align: center;
      margin: 0 0 0.5em 0;
      padding: 0.3em;
      font-size: 3vmin;
    }

  }
  
  
</style>