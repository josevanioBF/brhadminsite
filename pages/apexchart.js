// import Chart from 'react-apexcharts'
// import dynamic from 'next/dynamic';
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// class App extends Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//         options: {
//           chart: {
//             id: 'apexchart-example'
//           },
//           xaxis: {
//             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
//           }
//         },
//         series: [{
//           name: 'series-1',
//           data: [30, 40, 45, 50, 49, 60, 70, 91]
//         }]
//       }
//     }
//     render() {
//       return (
//         // <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
//         <ReactApexChart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
//       )
//     }
//   }

import React from 'react'

export default function apexchart() {
  return (
    <div>apexchart</div>
  )
}
