import React from 'react';

import Silhouette from '../images/silhuette.svg';
import arrow from '../images/arrow_up.svg';
import wizard from '../images/screen_wizard.svg';
import style from '../css/styles.module.css';
import logo from '../images/logo_white.png'
import logoFooter from '../images/logo_cyan.png';
import facebook from '../images/facebook.svg';
import instagram from '../images/instagram.svg';
import linkedin from '../images/linkedin.svg';
import twitter from '../images/twitter.svg';
import pinterest from '../images/pinterest.svg';
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
        }else if(numRows>numColumns ){
            height=(height/(numRows*0.5))*3;
        }else{
            height=(height/(numColumns*0.5))*3;
        }

        const silhouetteStyle={

            height:`${height}vw`,
            margin:"0",
            verticalAlign:"bottom"
        }


        return(

                <img src={Silhouette} alt="silhouette" style={silhouetteStyle}/>

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

        const cabinetWrapper={
            display:"block",
            border: "0.025em solid",
            height:`${width/1.8}vw`,
            width:`${width}vw`
        }

        return (
            <td  style={cabinetWrapper}>

            </td>
        );
    };


    renderRow(numRows,numColumns){

        let rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(this.cabinet(numRows,numColumns));
        }
        return <tr style={{display:"flex"}}>{rows}</tr>;

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
        if(numRows>=100||numColumns>=100){
            let width=10;

            if(numRows>numColumns){
                width=width/(numRows*0.5);

            }else{
                width=width/(numColumns*0.5);
            }
            const cabinetWrapper={
                display:"block",
                border: "0.025em solid",
                height:`${(width/1.8)*numColumns}vw`,
                width:`${(width*numRows)}vw`,
                background:"black"
            }
            return <div style={cabinetWrapper}></div>;
        }

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
    showDetails(){
        this.state.showD ? this.setState({showD:false}): this.setState({showD:true})
    }
    hoverMouse(){
        this.state.hover ? this.setState({hover:false}): this.setState({hover:true})

    }



    render(){
        const show={

            display:"grid",
            margin:"auto",
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


        return (
            <div style={{display:"grid"}}>
                <div style={{background:"#000033",padding:"2rem"}}>
                    <img src={logo} alt={"logo"} style={{height:"5rem",marginLeft:"5rem"}}/>
                </div>
                <div className={"w3-row-padding"} style={{background:"whitesmoke",paddingBottom:"2rem"}}>
                    <div >
                        <header style={{width:"100%",marginRight:"auto",marginLeft:"auto",justifyContent:"center",display:"flex"}}>
                            <img src={wizard} alt={"wizard"} style={{height:"10rem",margin:"auto"}}/>
                        </header>
                    </div>
                </div>
                <div  style={{margin:"auto"}}>
                    <span className={"w3-center "}>
                        <h3>Screen Wizard is tool to customize your screen to your liking. Choose how many screens you want vertically and horizontally.</h3>
                    </span>
                    <div style={{display:"grid",marginBottom:"2rem"}}>

                        <div style={{display:"grid",justifyContent:"space-between",margin:"auto",padding:"1rem"}}>

                            <h1 style={{fontSize:"xxx-large"}}>Cabinets</h1>
                            <label style={{display:"flex",justifyContent:"space-evenly",margin:"0.5rem"}}>
                                <div style={{width:"50%"}}>
                                    <h2 style={{justifySelf:"center"}}>Vertically</h2>
                                </div>
                                <input
                                    className="w3-input"
                                    name="columns"
                                    type="number"
                                    value={this.state.columns}
                                    onChange={this.handleInputChange}
                                    style={{width:"50%",textAlign:"center",fontSize:"2rem"}}

                                />
                            </label>
                            <label style={{display:"flex",justifyContent:"space-evenly",margin:"0.5rem"}}>
                                <div style={{width:"50%"}}>
                                    <h2 style={{justifySelf:"center"}}>Horizontally</h2>
                                </div>
                                <input
                                    className="w3-input"
                                    name="rows"
                                    type="number"
                                    value={this.state.rows}
                                    onChange={this.handleInputChange}
                                    style={{width:"50%",textAlign:"center",fontSize:"2rem"}}
                                />
                            </label>
                            <div  className={style.button}>

                                <img  src={arrow} alt={"arrow"} style={this.state.showD ? clicked:closed} onClick={this.showDetails} />
                            </div>

                        </div>
                        <div className={this.state.showD ? "w3-animate-bottom ":""} style={this.state.showD ? show : hide }  >
                            <div style={style.detailsText && style.detailsTextSmall}>
                                <div className={"w3-row w3-content"} >
                                    <div className={"w3-col m8 l12"}>
                                        <table className={"w3-table w3-centered "}>
                                            <thead>
                                                <tr>
                                                    <th >Screen Width (m)</th>
                                                    <th>Screen Height (m)</th>
                                                    <th>Screen Width (ft)</th>
                                                    <th>Screen Height (ft)</th>
                                                    <th>Screen Width (in)</th>
                                                    <th>Screen Height (in)</th>
                                                    <th>Screen Area (m2)</th>
                                                    <th>Screen Area (ft2)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
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
                                            </tbody>
                                        </table>
                                        <hr style={{marginTop:"2rem"}}/>
                                        <table className={"w3-table w3-centered"}>
                                            <thead>
                                                <tr>
                                                    <th>Diagonal Display size (m)</th>
                                                    <th>Diagonal Display size (in)</th>
                                                    <th>Aspect ratio</th>
                                                    <th>Cabinets horizontally (pcs)</th>
                                                    <th>Cabinets vertically (pcs)</th>
                                                    <th>Total Cabinets for screen (pcs)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.details(this.state.columns,this.state.rows).diagonalDisplaySize_m}</td>
                                                    <td>{this.details(this.state.columns,this.state.rows).diagonalDisplaySize_inch}</td>
                                                    <td>{this.details(this.state.columns,this.state.rows).aspectRatio_const}</td>
                                                    <td>{this.state.rows}</td>
                                                    <td>{this.state.columns}</td>
                                                    <td>{this.state.columns*this.state.rows}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr style={{marginTop:"2rem"}} />
                                        <table className={"w3-table w3-centered"}>
                                            <thead>
                                                <tr>
                                                    <th>Screen Horizontal Resolution (pcs)</th>
                                                    <th>Screen Vertical Resolution (pcs)</th>
                                                    <th>Screen Total Resolution (pcs)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.details(this.state.columns,this.state.rows).screenHorizontalResolution}</td>
                                                    <td>{this.details(this.state.columns,this.state.rows).screenVerticalResolution}</td>
                                                    <td>{this.details(this.state.columns,this.state.rows).totalResolution}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <hr />
                    <div style={{margin:"auto",padding:"1rem",width:"100vw",height:'35vh',display:"flex"}}>
                        <div style={{width:"100%",display:"flex",marginLeft:"auto",position:"absolute",justifyContent:"center"}}>
                            <div style={{display:"flex",position:"relative",height:"inherit",alignItems:"flex-end"}}>
                                {this.silhouette(this.state.columns,this.state.rows)}
                            </div>
                            <div style={{display:"flex",justifyContent:"space-evenly",height:"inherit",}}>

                                <div style={{width:"inherit"}} >{this.renderColumn(this.state.columns,this.state.rows)}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <footer style={{marginTop:"5rem"}}>
                    <div style={{background:"whitesmoke",height:"20rem",display:"flex",justifyContent:"space-around"}}>
                        <div style={{paddingLeft:"10vw",width:"85%",display:"grid",paddingTop:"2rem"}}>
                            <img src={logoFooter} alt={"logo_cyan"} style={{height:"2rem"}}/>
                            <span>Johanna-Waescher-Str. 5, 34131 Kassel, Germany</span>
                            <span>+49 561 986 806 70</span>
                            <span>  +421 915 788 389</span>
                            <span>info@trueperformance.eu</span>
                        </div>
                        <div style={{paddingRight:"10vw",width:"15%",paddingTop:"2rem"}}>
                            <div style={{display:"flex",justifyContent:"space-evenly"}}>
                                <div><img src={facebook} alt={"facebook"} style={{height:"2rem"}}/></div>
                                <div><img src={instagram} alt={"instagram"} style={{height:"2rem"}}/></div>
                                <div><img src={linkedin} alt={"linkedin"} style={{height:"2rem"}}/></div>
                                <div><img src={pinterest} alt={"pinterest"} style={{height:"2rem"}}/></div>
                                <div><img src={twitter} alt={"twitter"} style={{height:"2rem"}}/></div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        );


    }


}
export default Screen;