'use client'

import AnnualStatsForm from "@/components/home_page/form/annualForm";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function AnnualForm() {
    return ( 
        <Provider store={store}>
            <AnnualStatsForm />
        </Provider>
     );
}

export default AnnualForm;