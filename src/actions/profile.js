import axiosHelper from "../Utilities/axiosHelper";
import {
  GET_PROFILES,
  PROFILE_ERROR
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    var brokerInfo = (await axiosHelper.get('https://app.copiercat.com/api/brokers')).data;
  // setBrokerInfo(response.data);
    var response = await axiosHelper.get('https://app.copiercat.com/api/Account/brokerAccount/info');
    var data = response.data;
    var brokerAccount = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < brokerInfo.length; j++) {
        if (data[i].brokerId === brokerInfo[j].id) {
          data[i].brokerName = brokerInfo[j].name;
          brokerAccount.push(data[i]);
        }
      }
    }

    dispatch({
      type: GET_PROFILES,
      payload: brokerAccount,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};