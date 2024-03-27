import axiosHelper from "../Utilities/axiosHelper";
import {
  GET_PROFILES,
  PROFILE_ERROR,
  GET_BROKERINFO
} from "./types";
import { API_ENDPOINTS } from '../apiConfig'; 

export const getBrokerInfo = () => async (dispatch) => {
  try{
    var brokerInfo = (await axiosHelper.get(API_ENDPOINTS.profileEndpoints.brokerInfo)).data;
    console.log(brokerInfo);
    let brokerOption = [];
    // setBrokerInfo(response.data);
    brokerOption.length = 0;
    brokerInfo.map((broker) => {
      brokerOption.push({label: broker.name, value: broker.id})
      return null;
    });
    dispatch({
      type: GET_BROKERINFO,
      payload: brokerOption,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

export const getCurrentProfile = () => async (dispatch) => {
  try {
    var brokerInfo = (await axiosHelper.get(API_ENDPOINTS.profileEndpoints.brokerInfo)).data;
  // setBrokerInfo(response.data);
    var response = await axiosHelper.get(API_ENDPOINTS.profileEndpoints.getProfiles);
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