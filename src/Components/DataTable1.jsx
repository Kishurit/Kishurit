import React from 'react'
import '../App.css'
import "../style.css"

export default function DataTable(props) {
   
return (
    <table className="panel-body table table-bordered table-striped table-hover table-condensed text-center" id="testTable">
    <thead>
      <tr style={{backgroundColor: "yellow" }}>
        <th className="numberCell">#</th>
        <th className="nameCell">שם</th>
        <th>קישור 2</th>
        <th>דף פייסבוק</th>
        <th>2דף פייסבוק</th>
        <th>לינקדאין</th>
      </tr>
    </thead>
    <tbody id="dataTable">
    {
        props.data.links.map ((e1, i) => {
            return props.soryByAtrr(e1.links).map ((e2, j) => {
            return (
                <React.Fragment key={j}>
                { (j === 0) && 
                    <tr className="borderCat">
                        <td colSpan="100">
                            <h4 className="cat">{ e1.cat }</h4>
                        </td>
                    </tr> 
                }
                
                <tr className={ (j === 0) ? "borderTop": ''}> 
                    <td className="numberCell">{ props.AdjustNum(j)}</td>
                    <td className="nameCell">
                    { (e2.link !== '') ? <a href={e2.link} >{e2.site_name}</a> : e2.site_name }
                    </td>
                    <td>
                    { (e2.link2 !== '') ? <a href={e2.link2} >קישור 2</a> : 'קישור 2' }
                    </td>
                    <td>
                    { (e2.facebook_link1 !== '') ? <a href={e2.facebook_link1} >דף פייסבוק</a> : 'דף פייסבוק' }
                    </td>
                    <td>
                    { (e2.facebook_link2 !== '' && e2.facebook_link2 !== undefined) ? <a href={e2.facebook_link2}
                    >דף פייסבוק 2</a> : 'דף פייסבוק 2' }
                    </td>
                    <td>
                    { (e2.linkedIn_link !== '') ? <a href={e2.linkedIn_link}>לינקדאין</a> : 'לינקדאין' }
                    </td>

                </tr>
                </React.Fragment>
                )
            })
        }) 
    }
    </tbody>
    </table>
    )
}
