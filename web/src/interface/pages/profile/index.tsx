import React, { useEffect } from "react";
import FormMenu from "../../components/shared/formMenu/formMenu";
import FormProfile from "../../components/private/profile/formProfile";
import { requestGetProfile } from "../../../services/redux/profile/getProfileSlice";
import { useAppDispatch } from "../../../services/hooks";

function Profile () {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(requestGetProfile());
    }, []);

    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{ marginRight: '40px', marginBottom: '30px' }}>
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