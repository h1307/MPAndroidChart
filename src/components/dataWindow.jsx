import React, { Component } from "react";

class DataWindow extends Component {
  state = {
    dwname: "dw_test",
    rows: ["r1", "r2", "treti radek"],
    datajson: null,
  };

  // constructor() {
  //   super(); // musi byt prvni
  //   // vola-li se metoda(tj. v JS funkce jinak nez instance.metoda() tj apr externe z onclick, pak this ukazuje na window objec nebo use strict je undefined)
  // //kazda fce/metoda je objekt, ten ma metodu bind ktera nastavi obsah this a vrati instanci tohoto objektu a pak uz bude this fungovat i y externiho kontextu
  //   this.retrieveClicked = this.retrieveClicked.bind(this);
  //   }

  async fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log("fetch async");
    console.log(data);
    return data;
  }

  // retrieveClicked() {
  retrieveClicked = () => {
    // reseni this v novejsich verzich JS lze definovat metodu/fci primo takto pres arrow function misto bind
    console.log("Retriev clicked");
    console.log("Retriev clicked");
    //this.fetchAsync('https://localhost:44355/WF2/loc=34').then(data=>console.log(data));
    this.fetchAsync(
      // "http://localhost:16561/api/product/WinOpen"
      "http://localhost:16561/api/product/Retrieve/d_product/1"
    ).then((jsondata) => this.setState({ datajson: jsondata }));
  };

  componentDidMount() {}

  render() {
    console.log("render");

    const items = [];

    let dwcontent = "";
    if (this.state.datajson != null) {
      let json = this.state.datajson.Product;
      let j = json.length;

      // json.forEach(([key, value]) => {
      //   console.log(key);
      //   console.log(value);
      // });

      console.log("json parse");
      console.log(j);
      //   for(var i = 0; i < json.length; i++) {
      //     let obj = json[i];

      //     console.log(obj.Productid);
      //     console.log(obj.Name);
      // }
      for (let i = 0; i < json.length; i++) {
        dwcontent += `<li key=${json[i].Productid}>${json[i].Name}</li>`; // string templates
      
   
      
      }

      dwcontent = `<ul> ${dwcontent} </ul>`;

      //       <ul>
      //       {
      //         this.state.rows.map((row) => (
      //           <li key={row}>{row}</li>
      //         )) /* zde musi byt row ve vnorene {},
      //       kazdy  item listu musi byt v reactu jednoznacne identifikovan, proto key, jinak je v Consoe error msg*
      //       btw.v javascript je true && "hi" && 1 = 1 - vse lze porovnavat a vysledek je posledni operand
      // */
      //       }
      //     </ul>
    

      
  for (const [index, value] of json.entries()) {
    // items.push(<li key={index}>{value.Name}</li>)
    let columns = Object.keys(value);
    let dwRow = "";
    columns.map((column) => dwRow+=column+":"+value[column]+" ");
    items.push(<li key={index}>{dwRow}</li>)
    // items.push(<li key={index}>{value["Name"]}</li>)
  }
    
    }

              /* {json.map((value, index) => {
            <li key={index}>{value}</li>;
          })} */

    return (
      // ragment jako div ale nebudou 2div za sebou
      <React.Fragment>
        <span className="badge badge-primary m-2">
          Testovací DW {this.state.dwname}{" "}
        </span>
        <button
          onClick={this.retrieveClicked}
          className="btn btn-secondary btn-sm"
        >
          Retrieve
        </button>
        <ul>
          {items}
        </ul>
      </React.Fragment>
);
  }
}

export default DataWindow;
