<template>
  

  <div class="content">

    


    <div id="summary">
      <div class="summarygrid">
        <div class="sga">現在患者数/対策病床数</div>
        <div class="sgb">
          <span id="useratio" v-if="checked === false">{{Math.floor((allCovidjapandata.ncurrentpatients / $store.state.Allbeds) * 100) | numberFormat}}</span>
          <span id="useratio" v-else-if="checked === true">{{Math.floor(((Math.floor(allCovidjapandata.ncurrentpatients)+ TokyoData.患者数) / $store.state.Allbeds) * 100) | numberFormat}}</span>
          <span class="fontsmaller">%</span>
        </div>
        <div class="sgc" id="labelcurrent">現在患者数</div>
        <div class="sgd">
          <span id="ncurrentpatients"  v-if="checked === false">{{allCovidjapandata.ncurrentpatients | numberFormat}}</span>
          <span id="ncurrentpatients"  v-else-if="checked === true">{{allCovidjapandata.ncurrentpatients + TokyoData.患者数 | numberFormat}}</span>
          <span class="fontsmaller">人</span>
        </div>
        <div class="sge">累積退院者</div>
        <div class="sgf">
          <span id="nexits" v-if="checked === false">{{allCovidjapandata.nexits | numberFormat}}</span>
          <span id="nexits" v-else-if="checked === true">{{allCovidjapandata.nexits + TokyoData.累積退院者 | numberFormat}}</span>
          <span class="fontsmaller">人</span>
        </div>
        <div class="sgg">死亡者</div>
        <div class="sgh">
          <span id="ndeaths" v-if="checked === false">{{allCovidjapandata.ndeaths | numberFormat}}</span>
          <span id="ndeaths" v-else-if="checked === true">{{allCovidjapandata.ndeaths + TokyoData.死亡者数| numberFormat}}</span>
          <span class="fontsmaller">人</span>
        </div>
        <div class="sgi">対策病床数 
          <span id="sumc">{{Allbeds | numberFormat}}</span>床
        </div>
        <div class="sgj">PCR検査陽性者数 
          <span id="npatients" v-if="checked === false">{{allCovidjapandata.npatients | numberFormat}}人</span>
          <span id="npatients" v-else-if="checked === true">{{allCovidjapandata.npatients + TokyoData.PCR検査陽性者 | numberFormat}}人</span>
        </div>
        <div class="sgk">
          <div class="summaryvent">
            臨床工学技士 
            <span id="ventce">14,378</span>
            人 / 人工呼吸器 
            <span id="ventvent">28,197</span>
            台 / ECMO <span id="ventecmo">1,412</span>
            台
          </div>
        <div id="ventsrc">
          2020年2月回答 出典元（<a href="https://www.ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会</a>
          ）
        </div>
        </div>
      </div>

      <div id="lastupdatebox">
        現在患者数 更新日: <span v-if="checked === false"><span id="lastUpdate" >{{allCovidjapandata.lastUpdate}}</span><span id="lastUpdateNow" style="display: inline;"></span></span>
                          <span v-else-if="checked === true"><span id="lastUpdate" >{{allCovidjapandata.lastUpdate}}({{getSokuhoudata[0].lastUpdate}})</span><span id="lastUpdateNow" style="display: inline;"></span></span><br>
        対策病床数 発表日: <span id="lastUpdateBed">{{$store.state.numberofbeds[0].更新日}}</span><br>
      </div>

      <div id="bedtypesbox">
        <div id="beddescription">
          <!--<div class=bedformula>* 対策病床使用率(参考) = 現在患者数 / 新型コロナ対策病床数</div>-->
          新型コロナ対策病床数は「<a href="https://www.mhlw.go.jp/bunya/kenkou/kekkaku-kansenshou15/02-02.html">感染症指定医療機関の指定状況</a>」の下記合計と仮定<br>
          <div id="bedtypes">
            <!-- 使わない？ -->
            <label><input type="checkbox" id="bedt" checked="">特定</label>
            <label><input type="checkbox" id="bed1" checked="">一種</label>
            <label><input type="checkbox" id="bed2" checked="">二種(感染)</label>
            <label><input type="checkbox" id="bedk">二種(結核)</label>
            <label><input type="checkbox" id="beds">二種(一般/精神)</label>
          </div>
          <label>「<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html" xhref="https://docs.google.com/spreadsheets/d/1u0Ul8TgJDqoZMnqFrILyXzTHvuHMht1El7wDZeVrpp8/edit?usp=sharing">新型コロナウイルス対策病床数オープンデータ</a>」を使用</label><br>
          <label><input type="checkbox" id="usepatientsnow" v-model="checked" v-on:change="onChange(checked)">「<a href="https://docs.google.com/spreadsheets/d/1SPqnO0yLn8ubax96sDJZVDcjAH8QT1suLCIgroPGVHY/edit?usp=sharing">新型コロナウイルス患者数オープンデータ</a>」を使用(速報)</label><br>
          <!--<label><input type=checkbox id='usepatientspeek'><a href=https://www.jmari.med.or.jp/>日本医師会総合政策研究機構</a>「<a href=https://www.jmari.med.or.jp/research/research/wr_697.html>ピーク時予測患者数</a>」を表示</label><label><input type=checkbox id=usepatientspeekh>（重症患者のみ）</label></label><br>-->
          <div style="margin-top: 5%; margin-bottom: 5%;"><router-link to="/graph" id="graphroot">COVID-19 日本の新型コロナウイルス概況 グラフ</router-link></div>
        </div>
      </div>
    </div>

    <div id="cmap">
      <div id="japan">
        <table id="jp0">
          <tbody>
            <!-- trは7行 -->
            <tr> 
              <td v-if="checked === false" class="pref" id="jpall" colspan="2" style="background: black; color: white;"><div class="jpalllabel">{{allCovidjapandata.ncurrentpatients | numberFormat}} / {{Allbeds | numberFormat}}<div class="pcrsum">(全国) 現在患者数 / 対策病床数</div></div></td>
              <td v-else-if="checked === true" class="pref" id="jpall" colspan="2" style="background: black; color: white;"><div class="jpalllabel">{{allCovidjapandata.ncurrentpatients + TokyoData.患者数 | numberFormat}} / {{Allbeds | numberFormat}}<div class="pcrsum">(全国) 現在患者数 / 対策病床数</div></div></td>
              <td v-for="prefec in firstline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured : classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
              <td v-for="prefec in secondline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured : classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
              <td v-for="prefec in sardline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured :  classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
               <td v-for="prefec in forthline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured : classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
              <td v-for="prefec in fifthline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured :classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
              <td v-for="prefec in sixline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured : classred]" id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
            <tr>
              <td v-for="prefec in sevenline" :key="prefec.id" :class="[ 100 < prefec.colorchnage ? classblack : 80 < prefec.colorchnage  ?  classmorered : 40 < prefec.colorchange ? classusured : classred]"  id="jp31" ><router-link :to="{ name: 'prefectureinfo', params: { id: prefec.name }}"><div class="prefname">{{prefec.都道府県名}}<img :class="[prefec.hantei === hantei ? classuparrow : classdownarrow]"  :src="[prefec.hantei === hantei ? uparrow : downarrow]"></div><div>{{Math.floor(prefec.ncurrentpatients / (Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数)) * 100)}}%</div><span class="npatients">{{prefec.ncurrentpatients | numberFormat}}</span><span class="nbed">/{{Number(prefec.入院患者受入確保病床) + Number(prefec.宿泊施設受入可能室数) | numberFormat}}</span></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="description">
      <div id="description"></div>
      <div id="description2">
        新型コロナウイルス感染症（国内事例） 現在患者数 / 対策病床数 ※軽症者等は自宅療養など、病床を使用しないことがあります（<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html">詳細</a>）
        <!--現在患者数や現在新型コロナ対策病床数が確認できるデータを<a href=https://fukuno.jig.jp/2799>募集</a>しております--><br>
        <!--（現在患者数 <img class=trendarrow src=img/trendarrow01.svg> 前日より5%以上増加 <img class=trendarrow src=img/trendarrow03.svg style='transform:scale(1,-1)'> 前日より5%以上減少）<br>-->
        （現在患者数 <img class="uptrendarrow" src="https://www.stopcovid19.jp/img/trendarrow01.svg"> 前日より増加 <img class="downtrendarrow" src="https://www.stopcovid19.jp/img/trendarrow03.svg" style="transform:scale(1,-1)"> 前日より減少）<br>
      </div>
    </div>

  </div>


</template>

<script>
import {mapActions, mapGetters} from 'vuex'



export default {
  name: 'PageHome',
  data(){
    return{     
      checked: false,
      classblack:'black',
      classred:'red',
      classusured:'usured',
      classmorered:'morered',
      hantei:"up",
      uparrow:"https://www.stopcovid19.jp/img/trendarrow01.svg",
      downarrow:"https://www.stopcovid19.jp/img/trendarrow03.svg",
      classdownarrow:"downtrendarrow",
      classuparrow :"uptrendarrow"
    
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
      'Allbeds',
      'firstline',
      'secondline',
      'sardline',
      'forthline',
      'fifthline',
      'sixline',
      'sevenline',
      'allCSV',
      'getSokuhoudata',
      'TokyoData'
        ]),

  },
  
  methods: {
    ...mapActions([
      'fetchCovidjapandata',
      'fetchNumberofbeds',
      'fetchCSV',
      'fetchSokuhoudata'
    ]),

    onChange: function(checked) {
      console.log(checked);
    },

    
    
    
    
    },
    
    created() {
        console.log(this.$store.state)
        console.log(this.$store.getters)
        this.fetchCovidjapandata()
        this.fetchNumberofbeds()
        this.fetchCSV()
        this.fetchSokuhoudata()
    },
  
}
</script>


<style lang="scss" type="text/css">
  .content{
    position: relative;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
    
    #summary{
      display: inline-block;
      vertical-align: middle;
      max-width: 40vw;
      margin-top: 0.3vw;
      margin-right: 2vw;
      margin-left: 2vw;
      a{
        color: #555 !important;
      }
      .summarygrid{
        display: inline-grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(7);
        grid-gap: 0;
        grid-template-areas:
          "a c"
          "b d"
          "e g"
          "f h"
          "i j"
          "k k";
          margin-bottom: 0.5vh;
          font-size: 1.2vw;
          
          div {
          border: 0.3vw solid var(--main-color);
          margin: 0 -0.3vw -0.3vw 0;
          padding: 0.1vh 0.5vw;
          
          
          }
          .sga{
            grid-area: a;
          }
          .sgb{
            grid-area: b;
            background-color: var(--main-color);
            color: white;
            font-size: 300%;
            .fontsmaller {
            font-size: 60%;
            }
          }
          .sgc{
            grid-area: c;
            }
          .sgd{
            grid-area: d;
            background-color: var(--main-color);
            color: white;
            font-size: 300%;
            .fontsmaller{
              font-size: 60%;
            }
          }
          .sge{
            grid-area: e;
          }
          .sgf{
            grid-area: f;
            background-color: var(--main-color);
            color: white;
            font-size: 300%;
            .fontsmaller{
              font-size: 60%;
            }
          }
          .sgg{
            grid-area: g;
          }
          .sgh{
            grid-area: h;
            background-color: var(--main-color);
            color: white;
            font-size: 300%;
            .fontsmaller{
              font-size: 60%;
            }
          }
          .sgi{
            grid-area: i;
            border: 0.3vw solid var(--main-color);
            margin: 0 -0.3vw -0.3vw 0;
            padding: 0.1vh 0.5vw;
          }
          .sgj{
            grid-area: j;
            border: 0.3vw solid var(--main-color);
            margin: 0 -0.3vw -0.3vw 0;
            padding: 0.1vh 0.5vw;
          }
          .sgk{
            grid-area: k;
            .summaryvent {
            font-size: 70%;
            border: 0ch;
            }
            #ventsrc{
              font-size: 60%;
              font-weight: normal;
              border: 0ch;
            }
          }
          
          
      }
      #beddescription {
        font-size: 100%;
        margin: 0.2em 0 0.5em 0;
        #bedtypes {
        margin: 0.1em 0 0.5em 0;
        }
      }
      #graphroot{
        background-color: rgba(173, 35, 47, 0.792);
        color: white;
        width: 80%;
        padding: 0.5rem;
        cursor: pointer;
      }
    }

    #cmap {
      display: inline-block;
      vertical-align: top;
      #japan {
        display: inline-block;
        width: 100%;
        position: relative;
        #jp0 {
          border-collapse: separate;
          border-spacing: 0.4vw;
          margin: auto;
            tbody {
              display: table-row-group;
              vertical-align: middle;
              border-color: inherit;
              tr {
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
              }
              .black{
                background-color: black;
                color: white;
              }
              .red{
                background-color:rgba(173, 35, 47, 0.792);
                color: white;
              }
              .usured{
                background-color:rgba(173, 35, 47, 0.55);
                color:black;
              }
              .morered{
                background-color:rgb(173, 35, 47);
                color: white;
              }
              td {
                font-size: 1.0vw;
                width: 6vw;
                height: 4em;
                vertical-align: middle;
                text-align: center;
                x-border-radius: .5vw;
                x-padding: vmin 0vw;
                border: 0.25vmin solid #333;
                cursor: pointer;
                
                .up{
                  background-image: url("https://www.stopcovid19.jp/img/trendarrow01.svg");
                }
                
                a {
                  text-decoration: none;
                  color: inherit; 
                }
                .jpalllabel {
                  font-size: 125%;
                }
                .pcrsum {
                  font-size: 45%;
                }
                .prefname {
                  font-size: 100%;
                  .uptrendarrow {
                    top: 0.15em;
                    margin-left: 0.2em;
                    width: 1em;
                    transform:scale(1,1)
                  }
                  .downtrendarrow {
                    top: 0.15em;
                    margin-left: 0.2em;
                    width: 1em;
                    transform:scale(1,-1)
                  }
                }
                .npatients {
                  font-weight: bold;
                }
                .nbed {
                  font-size: 80%;
                }
              }
              
              
            }
        }
      }
    }
    .description {
      margin: 1em;
        .uptrendarrow {
          top: 0.15em;
          margin-left: 0.2em;
          width: 1em;
          transform:scale(1,1)
        }
        .downtrendarrow {
          top: 0.15em;
          margin-left: 0.2em;
          width: 1em;
          transform:scale(1,-1)
        }
    }
  }

  
  
  
</style>