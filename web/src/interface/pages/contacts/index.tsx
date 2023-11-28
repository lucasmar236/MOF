import React from "react";
import FormMenu from "../../components/private/contacts/formMenu";
import FormContacts from "../../components/private/contacts/formContacts";
function Contacts () {

    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{ marginRight: '40px', marginBottom: '30px' }}>
                    <FormMenu/> 
                </div>
                <div>
                    <FormContacts/>
                </div>
            </div>
        </>
    )
}

export default Contacts