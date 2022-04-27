import React, { Component } from 'react'
import * as echarts from 'echarts';

class Barcharts extends Component {
    componentDidMount(){  
        var myChart = echarts.init(document.getElementById('bar'));
        const option = {
            title: {
                text: 'World Population',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 'center',
                top: '5%'
            },
            grid: {
                top: '10%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                },
            series: [
                {
                    name: '2011',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        };
        option && myChart.setOption(option)
    }
    render(){
        return(
            <div id='bar' style={{width:'100%',height:'600pt'}}>
            </div>
        )
    }
}

export default Barcharts;