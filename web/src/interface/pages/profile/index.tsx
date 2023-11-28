import React from "react";
import FormMenu from "../../components/private/profile/formMenu";
import FormProfile from "../../components/private/profile/formProfile";
function Profile () {

    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{ marginRight: '30px', marginBottom: '30px' }}>
                    <FormMenu/> 
                </div>
                <div>
                    <FormProfile/>
                </div>
            </div>
        </>
    )
}

export default Profile