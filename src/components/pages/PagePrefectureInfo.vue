<template>
<!-- アニメーションは消す気がする -->
<div id="detail" style="display: block; animation: 0.2s ease 0s 1 normal none running fadein;">
  <div class="chartjs-size-monitor">
  <div class="chartjs-size-monitor-expand">
  <div class=""></div>
</div>
<div class="chartjs-size-monitor-shrink">
  <div class=""></div>
  </div>
</div>


<div id="detailtitle">{{Prefilter[0].都道府県名}} 現在患者数/対策病床数 {{Math.floor(Prefilter[0].ncurrentpatients / (Number(Prefilter[0].入院患者受入確保病床) + Number(Prefilter[0].宿泊施設受入可能室数)) * 100)}}%</div>
  <MaruChart :chartData="maruItems" :options="maruchartOptions" :height="height"/>
<!-- 円グラフの場所 -->

<div id="detaildesc">
  <span class="sum">累積陽性者: {{Prefilter[0].npatients | numberFormat}}人 累積退院者: {{Prefilter[0].nexits | numberFormat}}人<br> 
  累積死者: {{Prefilter[0].ndeaths | numberFormat}}人 対策病床数: {{Number(Prefilter[0].入院患者受入確保病床) + Number(Prefilter[0].宿泊施設受入可能室数) | numberFormat}}床</span><br>
  現在患者数 出典: 
  <a href="https://www.mhlw.go.jp/content/10906000/000947751.pdf">厚生労働省 新型コロナウイルス感染症 各都道府県の検査陽性者の状況</a>
  (更新日: {{allCovidjapandata.lastUpdate}})<br>
<a href="http://www.jibika.or.jp/members/information/info_corona.html">一般社団法人 日本耳鼻咽喉科学会</a>定義におけるハイリスク地域（現在患者数 {{Prefilter[0].ncurrentpatients | numberFormat}}名 &gt;= 10名）<br>
対策病床数 医療機関{{Prefilter[0].入院患者受入確保病床}}床+宿泊施設{{Prefilter[0].宿泊施設受入可能室数}}室 出典: <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html" xhref="https://www.mhlw.go.jp/content/10900000/000947138.xlsx">新型コロナウイルス対策病床数オープンデータ</a>(発表日: 2022-06-01)
</div>
<div id="detailvent"><br>(参考) 臨床工学技士:{{Prefilter[0].Gishi | numberFormat}}人 マスク専用含む人工呼吸器取扱:{{Prefilter[0].Kokyu | numberFormat}}台 ECMO装置取扱:{{Prefilter[0].ECMO | numberFormat}}台<br>2020年2月回答 出典元（
<a href="https://www.ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会</a>）
</div>
<div id="detail_graph" style="display: block; margin-bottom: 0.5em;">
<div class="chartjs-size-monitor">
<div class="chartjs-size-monitor-expand">
<div class=""></div>
</div>
<div class="chartjs-size-monitor-shrink">
<div class=""></div>
</div>
</div>
<BarChart :chartData="chartItems" :options="chartOptions" height="height"/>
<!-- 線グラフのところ -->

</div>
<div id="detail_areamap"></div>
<div id="detailbtns">
<router-link to="/" ><button id="btnclose">戻る</button></router-link>
<router-link to="/graph" ><button id="btnapp" >全国グラフへ</button></router-link>

</div>
</div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import BarChart from '../../barchart'
import MaruChart from '../../maruchart'
export default { 
name: 'PagePrefectureInfo',
amespaced: true,
components: {
BarChart,
MaruChart
},
data() {
return {
height:200,
info: this.$store.state.products,
chartItems: {
labels: this.$store.getters.Graphday,
datasets: [
{
type: 'line', // 追加
label: '入院治療を要する者',
data:this.$store.getters.PreNyuin,
borderColor : "RGB(0,51,204)",
yAxisID: 'y2'
},
{
type: 'bubble', // 追加
label: '累計死亡者数',
data: [],
//オープデータがない
borderColor : "RGB(0,0,0)",
backgroundColor : "RGB(255,51,0)",
spanGaps: true,
yAxisID: 'y1' 
},
],
},
chartOptions: {
scales: {
yAxes: [{
id: 'y1', // set unique name of axis on the left
position: 'left',
scaleLabel: {
display: true,
labelString: 'PCR検査陽性者・累計死亡者数',

},
}, 
{
id: 'y2', // set unique name of axis on the right
position: 'right',
scaleLabel: {
display: true,
labelString: '入院治療を要する者',

},

}]
}
},

maruItems: {
type: 'pie',
labels: ["現在患者数:"+(this.$store.getters.Prefilter[0].ncurrentpatients),"想定病床残数:" + (Number(this.$store.getters.Prefilter[0].入院患者受入確保病床) + Number(this.$store.getters.Prefilter[0].宿泊施設受入可能室数) - this.$store.getters.Prefilter[0].ncurrentpatients)],
datasets: [{
backgroundColor: ["#fa8072", "#00ff7f"],
data: [this.$store.getters.Prefilter[0].ncurrentpatients, this.$store.getters.getSoutei,]
}],
},

maruchartOptions: {
ticks: {                       
min: 0,                        
fontSize: 14                   
}
}
}
},


computed: {
...mapGetters([
'allCovidjapandata',
'allNumberofbeds',
'getJapancovidData',
'getNumberofBeds',
'saleBeds',
'getPreData',
'ketugou',
'kendake',
'zerorenketu',
'sansyou',
'Allbeds',
'Prefilter',
'PreNyuin',
'getSoutei'
]),

},

methods: {
...mapActions([
'reducePrice',
'fetchCovidjapandata',
'fetchNumberofbeds'
]),
},

created() {
this.fetchCovidjapandata()
this.fetchNumberofbeds()
console.log(this.$store.state)
console.log(this.$store.getters)
},

}
</script>


<style lang="scss" type="text/css">
#detail {
left: 0vw;
top: 0vh;
margin-top: 5%;
margin-bottom: 5%;
width: 100vw;
text-align: center;
#detailtitle {
font-size: 8vmin;
text-align: center;
margin: 0.5vmin;
}
#chart {
width: 100%;
vertical-align: middle;
}
#detaildesc, #detailvent  {
font-size: 3vmin;
text-align: center;
margin: 0.5vmin;
.sum {
font-size: 5vmin;
}
a {
color: #555 !important;
}
}
#detailbtns {
text-align: center;
margin: 2vmin;
button {
margin: 1vmin;
font-size : 2.5vmin;
padding: 1vmin;
}
}
}

</style>