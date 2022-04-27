import Piecharts from "./PieCharts"
import Barcharts from "./BarCharts"

const Charts = () => {
    return (
        <div>
        <div style={{display:'inline-block',width:'30%'}}>
        <p id="chartsinfo">introduction of data </p>
        </div>
        <div style={{display:'inline-block',width:'70%'}}>
        <Piecharts />
        </div>
        <div>
        <Barcharts />
        </div>
        </div>
        );
}
 
export default Charts;

    