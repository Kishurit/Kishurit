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
            <span className="list-group-item active text-right" 
            style = {{ fontWeight: "lighter", fontSize: 'large', padding: '3% 1% 0% 1%', borderRadius: '0',
            color: 'black', backgroundColor: 'transparent', border: 'none'}}>
                { props.AdjustNum(i) + ". " + e1.cat }
            </span>

            {
                props.soryByAtrr(e1.links).map ((e2, j) => {
                  return <span key={'links'+j} className="list-group-item text-right" 
                  style={{border:'none', margin: '0', marginTop: "1%", padding: '1% 5% 1% 5%'}}>

                        { props.AdjustNum(j) + ". "}<a href={e2.link}>{e2.site_name}</a>  

                        { (e2.link2 !== undefined && e2.link2.trim() !== '') &&
                        <a className="text-right" href={e2.link2} >קישור 2</a> 
                        }

                        { (e2.link3 !== undefined && e2.link3.trim() !== '') 
                            && <a className="text-right" href={e2.link3} >קישור 3</a> 
                        }

                        { (e2.facebook_link1 !== undefined && e2.facebook_link1.trim() !== '') &&
                        <a className="text-right" href={e2.facebook_link1} >דף פייסבוק</a>
                        }

                        { (e2.facebook_link2 !== undefined && e2.facebook_link2.trim() !== '') && 
                        <a className="text-right" href={e2.facebook_link2} >דף פייסבוק2</a>
                        }

                        { (e2.linkedIn_link !== undefined && e2.linkedIn_link.trim() !== '') &&
                        <a className="text-right" href={e2.linkedIn_link} >לינקדאין</a>
                        }

                        { (e2.instagram_link !== undefined && e2.instagram_link.trim() !== '') &&
                        <a className="text-right" href={e2.instagram_link} >דף אינסטגרם</a>
                        }

                    </span>
                })
            }
            
            </div>)
        })

    }

    </div>)
}
