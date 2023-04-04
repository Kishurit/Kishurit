import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css'
import "../style.css"


export default function DataTable(props) {

/*const linkSubmit = (e) => {
    e.preventDefault();
    var arr = String(e.target).split("http");
    //alert ("http" + arr[arr.length - 1]);
    window.location.href = "http" + arr[arr.length - 1];
}*/
    
return (
    <div className="list-group" id="list2">
    {
        props.data.links.map ((e1, i) => {
            return ( 
            <div key={'subCat'+i} className="text-right">
            <span className="list-group-item active text-center" 
            style = {{ fontWeight: "lighter", margin: '0', padding: '1px 0 1px 0', borderRadius: '0'}}>
                <h4 style={{ marginLeft: "1%", marginRight: "1%"}}>{ e1.cat }</h4>
            </span>

            {
                props.soryByAtrr(e1.links).map ((e2, j) => {
                  return  <span key={'links'+j} className="list-group-item text-right links" 
                  style={{border:'none'}}>

                    { props.AdjustNum(j) + ". "}<a onClick={e =>  { e.preventDefault(); window.location.href = e.target; } } href={e2.link}>{e2.site_name}</a>  

                    { (e2.link2.trim() !== '')? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.link2} >קישור 2</a> 
                        : ''}

                        { (e2.link3 !== undefined && e2.link3.trim() !== '')? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.link3} >קישור 3</a> 
                        : ''}

                        { (e2.facebook_link1.trim() !== '') ? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.facebook_link1} >דף פייסבוק</a>
                        : '' }

                        { (e2.facebook_link2.trim() !== '') ? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.facebook_link2} >דף פייסבוק2</a>
                        : '' }

                        { (e2.linkedIn_link.trim() !== '') ? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.linkedIn_link} >לינקדאין</a>
                        : ''}

                        { (e2.instagram_link !== undefined && e2.instagram_link.trim() !== '') ? 
                        <a onClick={e => window.location.href = e.target} className="text-right" href={e2.instagram_link} >דף אינסטגרם</a>
                        : '' }

                    </span>
                })
            }
            
            </div>)
        })

    }

    </div>)
}
