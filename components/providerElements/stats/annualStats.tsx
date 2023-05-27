'use client'

import { store } from "@/store/store";
import { Provider } from "react-redux";
import AnnuallyRecipeChart from "../../home_page/charts/annualy";

function AnnuallyStatsProvider() {
    return ( 
        <Provider store={store}>
            <AnnuallyRecipeChart />
        </Provider>
     );
}

export default AnnuallyStatsProvider;