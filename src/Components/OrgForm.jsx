import '../style/OrgForm.css'
const OrgForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.clear();

        const { name, link1, link2, link3, facebook_link1, facebook_link2,
        linkedIn_link, instagram_link, email1, email2, tel1, tel2, whatsapp, region } = e.target.elements;
        
        let details = {
          name: name.value,
          link1: link1.value,
          ...(link2 && {link2: link2.value}),
          ...(link3 && {link3: link3.value}),
          ...(facebook_link1 && {facebook_link1: facebook_link1.value}),
          ...(facebook_link2 && {facebook_link2: facebook_link2.value}),
          ...(linkedIn_link && {linkedIn_link: linkedIn_link.value}),
          ...(instagram_link && {instagram_link: instagram_link.value}),
          ...(email1 && {email1: email1.value}),
          ...(email2 && {email2: email2.value}),
          ...(tel1 && {tel1: tel1.value}),
          ...(tel2 && {tel2: tel2.value}),
          ...(whatsapp && {whatsapp: whatsapp.value}),
          ...(region && {tel2: region.value}),
          
        };
        console.log (details);
    };
    
    return (
    <form className="well text-right" onSubmit={handleSubmit} style={{ paddingTop: '0'}}>
        <h3 className="text-center">להגיש עסק חדש</h3>

        <div className="row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="name"><span className="astrix">*</span>שם:</label>
                <input type="text" className="form-control" id="name" name="name" required />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="link1"><span className="astrix">*</span>קישור1:</label>
                <input type="text" className="form-control" id="link1" name="link1" required />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="link2">קישור2:</label>
                <input type="text" className="form-control" id="link2" name="link2" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="link3">קישור3:</label>
                <input type="text" className="form-control" id="link3" name="link3" />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="facebook_link1">קישור פייסבוק1:</label>
                <input type="text" className="form-control" id="facebook_link1" name="facebook_link1" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="facebook_link2">קישור פייסבוק2:</label>
                <input type="text" className="form-control" id="facebook_link2" name="facebook_link2" />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="linkedIn_link">קישור לינקדאין:</label>
                <input type="text" className="form-control" id="linkedIn_link" name="linkedIn_link" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="instagram_link">קישור אינסטגרם:</label>
                <input type="text" className="form-control" id="instagram_link" name="instagram_link" />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="email1">כתובת מייל1:</label>
                <input type="email" className="form-control" id="email1" name="email1" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="email2">כתובת מייל2:</label>
                <input type="email" className="form-control" id="email2" name="email2" />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="tel1">מספר טלפון1:</label>
                <input type="tel" className="form-control" id="tel1" name="tel1" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="tel2">מספר טלפון2:</label>
                <input type="tel" className="form-control" id="tel2" name="tel2" />
            </div>
        </div>
        </div>

        <div className="newRow row">
        <div className="form-group form-group-sm">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="whatsapp">מספר וטסאפ:</label>
                <input type="tel" className="form-control" id="whatsapp" name="whatsapp" />
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label forhtml="tel2">אזור גאוגרפי:</label>
                <select className="form-control" id="region" name="region">
                    <option value="">הכל</option>
                    <option value="north">צפון</option>
                    <option value="center">מרכז</option>
                    <option value="south">דרום</option>
                    <option value="south">יו"ש</option>
            </select>
            </div>
        </div>
        </div>

        <div class="newRow form-group form-group-sm">
        <label forhtml="message"><span className="astrix">*</span>הודעה:</label>
        <textarea class="form-control" id="message" name="message" rows="5" required ></textarea>
        </div>

        <button class="btn btn-primary btn-sm" type="submit" style={{marginTop: "0"}}>לשלוח</button>
    </form>
    );
};

export default OrgForm;