const IS_STOREPAGE_ACTIVE = "IS_STOREPAGE_ACTIVE";
const IS_STOREPAGE_NOT_ACTIVE = "IS_STOREPAGE_NOT_ACTIVE";
const servicesReducer = (
  state = { storePageActive: false },
  action
) => {
  switch (action.type) {
    case IS_STOREPAGE_ACTIVE:
      return { ...state, storePageActive: true };
    case IS_STOREPAGE_NOT_ACTIVE:
      return { ...state, storePageActive: false };
    default:
      return { ...state };
  }
};

export default servicesReducer;
