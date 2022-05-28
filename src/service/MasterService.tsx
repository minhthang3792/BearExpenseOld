import { ApiCall } from "../common/ApiCall";
import { ModalService } from "@ui-kitten/components";
import { ApiConstModel } from "../common/constant/ApiConst";

const demo = async () => {
  ModalService;
  return await ApiCall.get("https://tempapi.proj.me/api/egiY4K3eh");
};

const demoLich = async (apiConst: ApiConstModel, params: object) => {
  return await ApiCall.request(apiConst, params);
};

export const MasterService = {
  demo,
  demoLich,
};
