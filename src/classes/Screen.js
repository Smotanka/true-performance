import React from 'react';

import Silhouette from '../images/silhuette.svg';
import arrow from '../images/arrow_up.svg';
import wizard from '../images/screen_wizard.svg';


class Screen extends React.Component{
    constructor(props) {
        super(props);
        this.state = { rows: 4, columns: 5, showD:false, hover:false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showDetails=this.showDetails.bind(this);
        this.hoverMouse=this.hoverMouse.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    silhouette(numColumns,numRows){
        let height=12;
        numColumns=Number(numColumns);
        numRows=Number(numRows);
        if(numColumns<5 && numRows<4 ){
            height=15;
        }
        else if(numRows>numColumns ){
            height=(height/(numRows*0.5))*3;
        }else{
            height=(height/(numColumns*0.5))*3;
        }


        return(
            <div style={{verticalAlign: "sub",height:"inherit"}}>
                <img src={Silhouette} alt="silhouette" style={{height:`${height}vw`,margin:"0",top:"inherit"}}/>
            </div>
        );
    }

    cabinet(numRows,numColumns){
        let width=10;

        numColumns=Number(numColumns);
        numRows=Number(numRows);

        if(numColumns<5 && numRows<4 ){
            width=5;
        }else if(numRows>numColumns){
            width=width/(numRows*0.5);
        }else{
            width=width/(numColumns*0.5);
        }

        return (
            <div  style={{display:"block",border: "0.025em solid", height:`${width/1.8}vw`, width:`${width}vw`}}>
                <div style={{height:`${width/1.8}vw`,width:`${width}vw`,boxShadow:"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"}}>
                </div>
            </div>
        );
    };

    renderRow(numRows,numColumns){
        let rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(this.cabinet(numRows,numColumns));
        }
        return <div style={{display:"flex"}}>{rows}</div>;

    }

    cabinetControl(numColumns,numRows){
        numColumns=Number(numColumns);
        numRows=Number(numRows);
        const cabinetMax=300;
        const cabinetMin=1;
        if(numColumns>cabinetMax){
            this.setState({columns:300});
        }
        if(numColumns<cabinetMin){
            this.setState({columns:1});
        }
        if(numRows>cabinetMax){
            this.setState({rows:300});
        }
        if(numRows<cabinetMin){
            this.setState({rows:1});
        }
        return {columns:numColumns,rows:numRows}
    }

    renderColumn(numColumns,numRows){

        numColumns=this.cabinetControl(numColumns,numRows).columns;
        numRows=this.cabinetControl(numColumns,numRows).rows;
        let columns=[];
        for (let i=0;i<numColumns;i++){
           columns.push(this.renderRow(numRows,numColumns));
        }
        return columns;
    }


    details(numColumns,numRows){
        const cabinetWidth_m=0.6;
        const cabinetHeight_m=0.3375;
        const cabinetResHoriz_px=384;
        const cabinetResVert_px=216;


        const meters2feet=3.2808;
        const meters2inch_divider=0.0254;


        let screenWidth_m=cabinetWidth_m*numRows;
        let screenHeight_m=cabinetHeight_m*numColumns;

        let screenWidth_ft=cabinetWidth_m*numRows*meters2feet;
        let screenHeight_ft=cabinetHeight_m*numColumns*meters2feet;

        let screenWidth_inch=(cabinetWidth_m*numRows)/meters2inch_divider;
        let screenHeight_inch=(cabinetHeight_m*numColumns)/meters2inch_divider;

        let screenArea_m2=screenWidth_m*screenHeight_m;
        let screenArea_ft2=screenWidth_ft*screenHeight_ft;

        let diagonalDisplaySize_m=Math.sqrt(Math.pow(screenWidth_m,2)+Math.pow(screenHeight_m,2))
        let diagonalDisplaySize_inch=Math.sqrt(Math.pow(screenWidth_inch,2)+Math.pow(screenHeight_inch,2))

        let screenResHoriz=numRows*cabinetResHoriz_px;
        let screenResVert=numColumns*cabinetResVert_px;
        const aspectRatio_const=screenResHoriz/screenResVert;
        let aspectRatio_Height=screenResVert*aspectRatio_const;
        let aspectRatio_Width=screenResHoriz*aspectRatio_const;
        let aspectRatio=`${aspectRatio_Height}:${aspectRatio_Width}`;

        let screenHorizontalResolution=cabinetResHoriz_px*numRows;
        let screenVerticalResolution=cabinetResVert_px*numColumns;
        let totalResolution=screenVerticalResolution*screenHorizontalResolution;
        return {
            screenWidth_m:screenWidth_m.toFixed(2),
            screenHeight_m:screenHeight_m.toFixed(2),
            screenWidth_ft:screenWidth_ft.toFixed(2),
            screenHeight_ft:screenHeight_ft.toFixed(2),
            screenWidth_inch:screenWidth_inch.toFixed(2),
            screenHeight_inch:screenHeight_inch.toFixed(2),
            screenArea_m2:screenArea_m2.toFixed(2),
            screenArea_ft2:screenArea_ft2.toFixed(2),
            diagonalDisplaySize_m:diagonalDisplaySize_m.toFixed(2),
            diagonalDisplaySize_inch:diagonalDisplaySize_inch.toFixed(2),
            aspectRatio:aspectRatio,
            aspectRatio_const:aspectRatio_const.toFixed(2),
            screenHorizontalResolution:screenHorizontalResolution.toFixed(2),
            screenVerticalResolution:screenVerticalResolution.toFixed(2),
            totalResolution:totalResolution


        };
    }
    showDetails(event){
        this.state.showD ? this.setState({showD:false}): this.setState({showD:true})
    }
    hoverMouse(event){
        this.state.hover ? this.setState({hover:false}): this.setState({hover:true})

    }
    render(){
        const show={

            display:"grid",
            background:"whitesmoke"
        }
        const hide={
            visibility:"hidden",
            display:"none"
        }
        const clicked={
            display:"block",
            width:"50%",
            height:"6rem",
            marginLeft:"auto",
            marginRight:"auto",
            cursor:"pointer",


        }
        const closed={
            display:"block",
            width:"50%",
            height:"7rem",
            marginLeft:"auto",
            marginRight:"auto",
            cursor:"pointer",
            transform:"rotate(180deg)"
        }
        const divStyle={
            borderRadius:"50%",
            background:"whitesmoke",
            height:"7rem",
            border:"0.25rem #000033 dashed",
            width:"7rem",
            justifySelf:"center",
            marginTop:"1rem",
            marginBottom:"1rem"


        }

        return (
            <div style={{display:"grid"}}>
                <header style={{width:"100%",padding:"2rem"}}>
                    <img src={wizard} alt={"wizard"} style={{height:"10rem",margin:"auto"}}/>
                </header>
                <div  style={{margin:"auto"}}>
            <div style={{display:"grid",marginBottom:"2rem"}}>
                <div style={{display:"grid",justifyContent:"space-between",margin:"auto",padding:"1rem"}}>
                    <h3>Cabinets</h3>
                <label style={{display:"flex",justifyContent:"space-evenly",margin:"0.5rem"}}>
                    <div style={{width:"50%"}}>
                        <h5 style={{justifySelf:"center"}}>Vertically</h5>
                    </div>

                    <input
                        className="w3-input"
                        name="columns"
                        type="number"
                        value={this.state.columns}
                        onChange={this.handleInputChange}
                        style={{width:"50%",textAlign:"center"}}

                        />
                </label>
                <label style={{display:"flex",justifyContent:"space-evenly",margin:"0.5rem"}}>
                    <div style={{width:"50%"}}>
                        <h5 style={{justifySelf:"center"}}>Horizontally</h5>
                    </div>


                    <input
                        className="w3-input"
                        name="rows"
                        type="number"
                        value={this.state.rows}
                        onChange={this.handleInputChange}
                        style={{width:"50%",textAlign:"center"}}

                    />
                </label>
                    <div  style={divStyle}  >
                        <img  src={arrow} alt={"arrow"} style={this.state.showD ? clicked:closed} onClick={this.showDetails} />
                    </div>
                    <div className={this.state.showD ? "w3-animate-bottom":"w3-animate-top"} style={this.state.showD ? show : hide }  >
                        <div className={"w3-row"}>
                            <table className={"w3-table"}>
                                <tr>
                                    <th>Screen Width (m)</th>
                                    <th>Screen Height (m)</th>
                                    <th>Screen Width (ft)</th>
                                    <th>Screen Height (ft)</th>
                                    <th>Screen Width (in)</th>
                                    <th>Screen Height (in)</th>
                                    <th>Screen Area (m2)</th>
                                    <th>Screen Area (ft2)</th>
                                </tr>
                                <tr>
                                    <td>{this.details(this.state.columns,this.state.rows).screenWidth_m}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenHeight_m}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenWidth_ft}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenHeight_ft}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenWidth_inch}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenHeight_inch}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenArea_m2}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenArea_ft2}</td>
                                </tr>
                            </table>
                            <hr/>
                            <table className={"w3-table"}>
                                <tr>
                                    <th>Diagonal Display size (m)</th>
                                    <th>Diagonal Display size (in)</th>
                                    <th>Aspect ratio</th>
                                    <th>Cabinets horizontally (pcs)</th>
                                    <th>Cabinets vertically (pcs)</th>
                                    <th>Total Cabinets for screen (pcs)</th>
                                    <th>Screen Horizontal Resolution (pcs)</th>
                                    <th>Screen Vertical Resolution (pcs)</th>
                                </tr>
                                <tr>
                                    <td>{this.details(this.state.columns,this.state.rows).diagonalDisplaySize_m}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).diagonalDisplaySize_inch}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).aspectRatio_const}</td>
                                    <td>{this.state.rows}</td>
                                    <td>{this.state.columns}</td>
                                    <td>{this.state.columns*this.state.rows}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenHorizontalResolution}</td>
                                    <td>{this.details(this.state.columns,this.state.rows).screenVerticalResolution}</td>
                                </tr>
                            </table>
                            <hr/>
                            <table className={"w3-table"}>
                                <tr>
                                    <th>Screen Total Resolution (pcs)</th>
                                </tr>
                                <tr>
                                    <td>{this.details(this.state.columns,this.state.rows).totalResolution}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <hr/>
                <div style={{margin:"auto",padding:"1rem",width:"100vw"}}>
                    <div style={{margin:"5rem",width:"100%",display:"flex",justifyContent:"space-evenly"}}>
                        <div style={{display:"flex",justifyContent:"space-evenly",height:"20rem"}}>
                            <div style={{display:"grid"}}>
                                {this.silhouette(this.state.columns,this.state.rows)}
                            </div>
                            <div style={{width:"inherit"}} >{this.renderColumn(this.state.columns,this.state.rows)}</div>
                        </div>
                    </div>

                </div>

            </div>

                </div>



                <footer  style={{marginTop:"1rem",marginBottom:"0"}}>
                    <div className={"details"} style={{display:"grid",width:"100%",height:"15rem"}}>
                    </div>
                </footer>

        </div>
        );


    }


}
export default Screen;