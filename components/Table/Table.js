// components/Table.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tableThemes: {
            type: Object, // 因此处的thead是json格式，故将数据类型设置为object
            // value: '' //默认值
            },
        tableItems: {
            type: Array,
            Element: Object,
            Effect: Object,
            Risk: Object, 
            Taboo: Object
            },
    },

    /**
     * 组件的初始数据
     */
    data: {
        someData: {} 
    },

    /**
     * 组件的方法列表
     */
    methods: {
        customerMethod:function name(params) {
            
        }
    }
})
