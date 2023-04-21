import './mobileStyle.css'
const MobileOrgForm = ({handleSubmit}) => {
    return (
    <form className="text-right" onSubmit={handleSubmit}>
        <h3 className="text-center">להגיש עסק חדש</h3>

        <div className="form-group form-group-sm">
        <label forhtml="link1"><span className="astrix">*</span>קישור1:</label>
        <input type="text" className="form-control" id="link1" name="link1" required />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="name"><span className="astrix">*</span>שם:</label>
            <input type="text" className="form-control" id="name" name="name" required />
        </div>


        <div className="form-group form-group-sm">
            <label forhtml="link2">קישור2:</label>
            <input type="text" className="form-control" id="link2" name="link2" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="link3">קישור3:</label>
            <input type="text" className="form-control" id="link3" name="link3" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="facebook_link1">קישור פייסבוק1:</label>
            <input type="text" className="form-control" id="facebook_link1" name="facebook_link1" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="facebook_link2">קישור פייסבוק2:</label>
            <input type="text" className="form-control" id="facebook_link2" name="facebook_link2" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="linkedIn_link">קישור לינקדאין:</label>
            <input type="text" className="form-control" id="linkedIn_link" name="linkedIn_link" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="instagram_link">קישור אינסטגרם:</label>
            <input type="text" className="form-control" id="instagram_link" name="instagram_link" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="email1">כתובת מייל1:</label>
            <input type="email" className="form-control" id="email1" name="email1" />
        </div>


        <div className="form-group form-group-sm">
            <label forhtml="email2">כתובת מייל2:</label>
            <input type="email" className="form-control" id="email2" name="email2" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="tel1">מספר טלפון1:</label>
            <input type="tel" className="form-control" id="tel1" name="tel1" />           
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="tel2">מספר טלפון2:</label>
            <input type="tel" className="form-control" id="tel2" name="tel2" />
        </div>

        <div className="form-group form-group-sm">
            <label forhtml="whatsapp">מספר ווטסאפ:</label>
            <input type="tel" className="form-control" id="whatsapp" name="whatsapp" />
        </div>           

        <div className="form-group form-group-sm">
        <label forhtml="tel2">אזור גאוגרפי:</label>
        <select className="form-control" id="region" name="region">
            <option value="">הכל</option>
            <option value="north">צפון</option>
            <option value="center">מרכז</option>
            <option value="south">דרום</option>
            <option value="south">יו"ש</option>
        </select>
        </div>

        <div className="newRow form-group form-group-sm">
            <label forhtml="message"><span className="astrix">*</span>הודעה:</label>
            <textarea className="form-control" id="message" name="message" rows="5" />
        </div>

        <div className="col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3">
        <button className="btn btn-primary btn-sm" type="submit" style={{marginTop: "0", width: "100%"}}>לשלוח</button>
        </div>
    </form>
    )
}

export default MobileOrgForm