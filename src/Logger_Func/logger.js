import axios from "axios";
import api from "../utils/api";

const makeActivityLog = async (msg) => {
  try {
    await axios.post(`${api}/log/`, {
      logDetail: msg,
    });
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

export default makeActivityLog;
