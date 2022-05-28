export const ApiConst = {
  hopKhongGiay: {
    dsLich: {
      functionUrl: "Mobile_LH_LICHHOP_COLICH_List",
      service: "/MobileServices/HopKhongGiayToService.svc/HKGT/",
      method: "POST",
    },
  },
  notification: {
    fetchList: {
      functionUrl: "Mobile_LH_LOGTHONGBAONGUOIDUNG_FIREBASE_ByUserID",
      service: "/MobileServices/HopKhongGiayToService.svc/HKGT/",
      method: "POST",
    },
  },
};

export interface ApiConstModel {
  functionUrl: string;
  service: string;
  method: string;
}
