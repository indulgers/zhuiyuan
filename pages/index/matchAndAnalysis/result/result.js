import * as echarts from '../../../../components/ec-canvas/echarts';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ec: {
            onInit: initChart,
            lazyload: true
        },
        themeArr: {
            Element: '成分名字',
            Effect: '主要效果',
            Risk: '安全风险',
            Taboo: '禁忌情况'
        },
        itemArr: [{
                Element: '胆钙化醇=维生素D3',
                Effect: '增加钙，磷吸收；促进骨骼牙齿发育',
                Risk: '../../images/index/safe.png',
                Taboo: ''
            },
            {
                Element: '碳酸钙',
                Effect: '增加钙的摄入',
                Risk: '../../images/index/safe.png',
                Taboo: '胃酸过多者禁食'
            },
            {
                Element: '碳酸镁',
                Effect: '中和胃酸；补充镁元素',
                Risk: '../../images/index/risk.png',
                Taboo: '不可食用过多'
            },
            {
                Element: '硫酸铜',
                Effect: '补充铜元素',
                Risk: '../../images/index/risk.png',
                Taboo: '不可食用过多'
            },
            {
                Element: '氧化锌',
                Effect: '补充锌元素；促进成长发育成熟',
                Risk: '../../images/index/risk.png',
                Taboo: '不可食用过多'
            },
            {
                Element: '微晶纤维素',
                Effect: '食品添加剂，乳化、稳定、增稠',
                Risk: '../../images/index/add.png',
                Taboo: ''
            },
        ],
        "good_image_url": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fjkcdn.pajk.com.cn%2FT1swblBgh_1RCvBVdK.jpg&refer=http%3A%2F%2Fjkcdn.pajk.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637657528&t=7f95ded601ceb8cf42969ada1a91055c',
        "good_name": "金钙尔奇R钙镁铜维生素D片",
        "good_des": "实际钙含量：280.8mg/粒",
        "match_suitability": "78%",
        "your_disease": "高血压",
        "disease_describe": "高血压药可以与钙片一起食用，且对降高血压和心血管疾病有辅助作用。",
        "your_products": "甲硝锉",
        "products_describe": "甲硝锉属于消炎药，和钙片一起服用会影响其吸收，建议错开半小时服用。"
    },
})


//Echarts初始化
let Chart = null;
const option = {
    series: [{
        type: 'pie',
        radius: '80%',
        data: [{
                value: 20,
                name: '20% 无效/有害',
                label: {
                    fontSize: 14
                },
                itemStyle:{
                    color: 'rgb(126, 211, 244)'
                }
            },
            {
                value: 80,
                name: '80% 有效成分',
                label: {
                    fontSize: 14
                },
            },
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}

function initChart(canvas, width, height, dpr) {
    Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    });
    canvas.setChart(Chart);
    Chart.setOption(option);
    return Chart;
}