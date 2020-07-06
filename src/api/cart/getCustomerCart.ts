import { APIGatewayEvent, ScheduledEvent, Callback, Context, Handler } from 'aws-lambda';
import { errorHandler, successHandler } from "../../utils/apiResponse";
import {getCustomerItems} from "../../services/db/getCustomerCartUtils";

export const getCustomerCart: Handler = async (event: APIGatewayEvent | ScheduledEvent, context: Context, callBack: Callback) => {

    try {
        const data = JSON.parse((event as APIGatewayEvent).body);

        const items = await getCustomerItems(data.customerId);

        return successHandler(
            callBack,
            items,
        );
    }catch(error) {
        return errorHandler(
            callBack,
            'Error: getCustomerCart failed with an exception',
            error
        );
    }
};