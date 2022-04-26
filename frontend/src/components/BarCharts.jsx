class Barcharts extends Component {
    componentDidMount(){  
        var myChart = echarts.init(document.getElementById('bar'));
        const option = {
            title: {
                text: 'Test for Assignment2',
                subtext: 'Melbourn live search',
                left: 'center',
                top: '5%'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                right: '5%',
                top: '20%'
            },
            series: [{
                
                type: 'pie',
                radius: '60%',
                stillShowZeroSum: false,
                label: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        option && myChart.setOption(option)
    }
    render(){
        return(
            <div id='pie' style={{width:'100%',height:'600pt'}}>
            </div>
        )
    }
}

export default Piecharts;