import React, { useEffect } from "react";
import FormMenu from "../../components/private/contacts/formMenu";
import FormContacts from "../../components/private/contacts/formContacts";
import { listContactsSlice, requestListContacts } from "../../../services/redux/contacts/listContactsSlice";
import { useAppDispatch } from "../../../services/hooks";

function Contacts () {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(requestListContacts(""));
    }, []);
    
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