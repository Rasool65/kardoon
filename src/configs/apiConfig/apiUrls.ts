// Authentication
export const APIURL_LOGIN = '/account/login';
export const APIURL_GET_COUNTRY_DIVISION = '/CountryDivision/GetCountryDivision';
export const APIURL_REGISTER = '/Account/RegisterUser';
export const APIURL_SEND_PASSWORD = '/Account/SendPassword';

//profile
export const APIURL_UPDATE_PROFILE = '/UserManagement/UpdateUserProfile';
export const APIURL_GET_INTRODUCTIONS = '/Introduction/GetIntroductionMethodList';

export const APIURL_GET_SERVICES = '/ProductCategory/GetServiceTypeList';
export const APIURL_GET_ADVERTISE = '/Slider/GetSliders';
export const APIURL_GET_CATEGORIES = '/ProductCategory/GetCategoryList';
export const APIURL_GET_HIERARCHICAL_DEVICE_TYPE = '/ProductCategory/GetHierarchicalDeviceTypes';
export const APIURL_GET_PRODUCTS_BRAND = '/ProductCategory/GetProductBrandList';
export const APIURL_GET_DEVICE_TYPE = '/ProductCategory/GetDeviceTypes';
export const APIURL_GET_Cities = '/CountryDivision/GetCountryDivision';
export const APIURL_UPDATE_RESIDENCE_CITY = '/UserManagement/UserResidenceCity';
export const APIURL_GET_BRANDS = '/ProductCategory/GetProductBrandList';
export const APIURL_GET_ADDRESSES = '/UserManagement/GetUserAddress';
export const APIURL_POST_CREATE_REQUEST = '/Request/CreateConsumerRequest';

//ADD ADDRESS
export const APIURL_GET_COUNTRIES = '/CountryDivision/GetCountries';
export const APIURL_GET_CITIES = '/CountryDivision/GetCities';
export const APIURL_GET_PROVINES = '/CountryDivision/GetProvinces';
export const APIURL_GET_REGIONES = '/CountryDivision/GetRegiones';
export const APIURL_GET_DISTRICTS = '/CountryDivision/GetDistricts';
export const APIURL_POST_ADD_USER_ADDRESS = '/UserManagement/AddUserAddress';
export const APIURL_POST_DELETE_USER_ADDRESS = '/UserManagement/DeleteUserAddress';
export const APIURL_PUT_UPDATE_USER_ADDRESS = '/UserManagement/UpdateUserAddress';

//REQUEST DETAIL
export const APIURL_GET_PROBLEM_LIST = '/ProductCategory/GetProductCategoryProblemList';
export const APIURL_GET_PRODUCTS_ATTRIBUTES = '/ProductCategory/GetProductAttributes';

//ORDERS
export const APIURL_GET_CURRENT_CONSUMER_REQUEST = '/Request/GetCurrentConsumerRequestList';
export const APIURL_GET_PREVIOUS_CONSUMER_REQUEST = '/Request/GetPreviousConsumerRequestList';

//ORDER DETAIL
export const APIURL_GET_ORDER_DETAILS = '/Request/GetConsumerRequest';

//TECHNICIAN
export const APIURL_GET_TECHNICIAN_PROFILE = 'http://127.0.0.1:2500/getTechnicianProfile';
export const APIURL_GET_PRODUCT_TYPES = '/ProductCategory/GetAllProductListValue';
export const APIURL_GET_TECHNICIAN_CONSUMERS = '/Order/GetTechnicianConsumerList';
export const APIURL_GET_TECHNICIAN_MISSIONS = '/Order/GetTechnicianMissions';
export const APIURL_GET_MISSION_DETAILS = '/Order/GetTechnicianRequestDetail';
export const APIURL_GET_MISSION_ATTRIBUTES_DETAILS = '/Request/GetRequestDetailAttributeValues';
export const APIURL_UPDATE_REQUEST_DETAIL_STATUS = '/Order/EditRequestDetailStatus';
export const APIURL_GET_SERVICES_TYPES = '/BaseInformation/ServiceTypeList';
export const APIURL_GET_SERVICES_TITLE = '/ProductCategory/ProductCategoryActionInfoList';
export const APIURL_POST_REQUEST_DETAIL_ACTION = '/Order/AddAction';
export const APIURL_GET_SOURCE_OF_COST = '/BaseInformation/GetSourceCostList';
export const APIURL_GET_TECHNICIAN_INVOICE = '/Order/GetTechnicianInvoiceList';
export const APIURL_POST_TECHNICIAN_INVOICE_CHECKOUT = '/Financial/TechnicianOrderDetailCashCheckout';
export const APIURL_POST_INVOICE_CHECKOUT = '/Financial/OrderDetailCashCheckout';
export const APIURL_POST_INVOICE_CHECKOUT_ALL = '/Financial/RequestCashCheckout';
