

<template>
<div id="graphcomp">

  <div>
    <Chart :chartData="chartItems" :options="chartOptions" :height="height"/>
  </div>

</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Chart from '../../barchart'

export default { 
  name: 'PageGraph', 
  namespaced: true,
  components: {
   Chart
  },
    data() {
        return {
          height:200,
          chartItems: {
            labels: this.$store.getters.Graphday,
            datasets: [
              {
                yAxisID: "y-axis-1",
                type: 'line', // 追加
                label: '入院治療を要する者',
                data:this.$store.getters.Graphblueitem,
                borderColor : "RGB(0,51,204)",
              },
              {
                yAxisID: "y-axis-2", // 追加
                type: 'bubble', // 追加
                label: '緊急搬送困難事案数',
                data:this.$store.getters.TransGraphitem,
                borderColor : "RGB(0,0,0)",
                backgroundColor : "RGB(255,51,0)",
                spanGaps: true,
              },{
       
                type: 'bubble', // 追加
                label: '累計死亡者数',
                data:[],
                borderColor : "RGB(0,0,0)",
                backgroundColor : "RGB(0,0,0)",
                spanGaps: true,
              },{
                type: 'bubble', // 追加
                label: 'PCR検査陽性者数',
                data:[],
                borderColor : "RGB(255,102,153)",
                backgroundColor : "RGB(255,102,153)",
                spanGaps: true,
              },{
                type: 'bubble', // 追加
                label: 'PCR検査実施件数',
                data:[],
                borderColor : "RGB(153,255,102)",
                backgroundColor : "RGB(153,255,102)",
                spanGaps: true,
              },
            ],
          },
      // 後程オプションを記述
          chartOptions: {
            responsive: true,
            legend: {
                display: true
            },
            scales: {                          
              xAxes: [                           
                    
              ],
              yAxes: [                           // Ｙ軸設定
                {
                  id: "y-axis-1",
                  position: "right",
                  scaleLabel: {                  // 軸ラベル
                    display: true,                 // 表示の有無
                    labelString: 'PCR検査実施件数・現在入院治療を要する物',     // ラベル
                    fontFamily: "sans-serif",
                    ontSize: 16                   // フォントサイズ
                  },
                  gridLines: {                   // 補助線
                    zeroLineColor: "black"         // y=0（Ｘ軸の色）
                  },
                  ticks: {                       // 目盛り
                    min: 0,                        // 最小値
                    max:900000,                       // 最大値
                    stepSize: 100000,                   // 軸間隔
                    fontSize: 14                   // フォントサイズ
                  }
                },
                {
                  id: "y-axis-2",
                  position: "left",
                  scaleLabel: {                  // 軸ラベル
                    display: true,                 // 表示の有無
                    labelString: 'PCR検査陽性者・累計死亡者数・救急搬送困難事案数',     // ラベル
                    fontFamily: "sans-serif",
                    fontSize: 16                   // フォントサイズ
                  },
                  gridLines: {                   // 補助線
                    zeroLineColor: "black"         // y=0（Ｘ軸の色）
                  },
                  ticks: {                       // 目盛り
                    min: 0,                        // 最小値
                    max:7000,                       // 最大値
                    stepSize: 1000,                   // 軸間隔
                    fontSize: 14                   // フォントサイズ
                  }
                }
              ]
            }
          }
      }
    },

    computed: {
      ...mapGetters([
        'Graphday', //グラフ横軸で使用
        'Graphblueitem', //グラフ入院を要する者で使用
        'TransGraphitem' //グラフ救急搬送困難で使用
      ]),
    },
    
    methods: {
      ...mapActions([
        'fetchCSV',
        'fetchDifficultTranCSV'
      ]),
    },
    
    created() {
      console.log(this.$store.state)
      console.log(this.$store.getters)
        
      this.fetchCSV()
      this.fetchDifficultTranCSV()   
    },

}
</script>


<style lang="scss">

</style>
