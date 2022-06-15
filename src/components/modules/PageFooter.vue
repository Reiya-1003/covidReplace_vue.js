<template>
  <div id="footerarea">
      <a href="https://note.stopcovid19.jp/n/n0b078f2b3dce"><img  id="footeritem" alt="コロナの専門家" src="https://www.stopcovid19.jp/img/notestopcovid19-banner.png"></a>
      <a href="https://google.com"><img  id="footeritem" alt="元がIFrameなので作成不可" src=""></a>
      <a href="https://whowatch.tv/"><img  id="footeritem" alt="コロナの専門家" src="https://www.stopcovid19.jp/img/whowatch-banner.png"></a>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  
}
</script>


<style lang="scss" type="text/css">
  #footerarea{
    margin-top: 1em;
    text-align: center;
    #footeritem{
      display: inline-block;
      text-align: center;
      margin: 1vw;

    //   エリアを可視化するcss
    width: 430px;
    height: 98px;
    background-color: gray;
    }
  }
  
  
</style>