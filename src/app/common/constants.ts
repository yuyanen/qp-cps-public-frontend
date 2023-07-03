import { environment } from '../../environments/environment';

export const apiBaseUrl = environment.apiBaseUrl;

export const maxLengthStr = 255;
export const maxLengthNumerals = 16;
export const maxLengthRemarks = 4000;
export const maxRichTextChar = 8000; //non-html characters
export const MAX_FILE_SIZE = 10485760;
export const MIN_FILE_SIZE = 92165;
export const SQUARE_FEET_CONVERSION = 10.7639;

/* session time out configuration */
export const COUNTDOWN_INIT_SEC = 9; // 60 secs before session expired,
export const SESSION_EXPIRING: number = 0;
export const SESSION_EXPIRED: number = 1;

/* HDB IAM PARAM (TESTING ONLY, TO BE REMOVED)*/
export class IAMConfig {
    public static CLIENT_ID = 'CLIENT_ID';
    public static CLIENT_SECRET = 'CLIENT_SECRET';
    public static NONCE = 'a2ghskf1234las';
    public static STATE = 'af0ifjsldkj';
    public static CODE = 'SplxlOBeZQQYbYS6WxSbIABxRs12FartTNFSr5GaF34MVbGsbnThswbR5Yl';
}

export const DASHBOARD = '/landing-page';

export class Environments {
    public static DEV = "DEV";
    public static SIT = "SIT";
    public static UAT = "UAT";
    public static PROD = "PROD";
}

export class HttpStatus {
    public static BAD_REQUEST = 400;
    public static UNAUTHORIZED = 401;
    public static FORBIDDEN = 403;
    public static UNAVAILABLE = 503;
    public static CONFLICT = 409;
    public static INTERNAL_SERVER_ERROR = 505;
}

export class SgdrmAddressFieldsSize {
    public static BLOCK = 5;
    public static STREET = 32;
    public static FLOOR = 3;
    public static UNIT = 7;
    public static BUILDING = 65;
    public static POSTAL = 6;
    public static LEVEL = 2
}

export class SgdrmEmailFieldsSize {
    public static LOCAL = 64;
    public static ATSIGN = 1;
    public static DOMAIN = 255;
    public static FULL = 320;
}
export class SgdrmPhoneFieldsSize {
    public static FULL = 16;
}

export const showDebugError = true;

export let SystemParameters = {
    TA_SHORTFALL_DEFAULT_NO_OF_DAYS: 'TA_SHORTFALL_DEFAULT_NO_OF_DAYS',
}

export let yesNoOptionsDropDown = [{ key: '', label: '' }, { key: true, label: 'Yes' }, { key: false, label: 'No' }];

export let yesNoOptionsRadio = [{ key: true, label: 'Yes' }, { key: false, label: 'No' }];

export class Messages {
    public static ERR_MSG_GENERIC = "System error occurred. Please contact administrator.";
    public static GENERIC_CONFIRM = "Are you sure you want to proceed?";
    public static APPROVAL_CONFIRM = "Action: Approve";
    public static FORWARD_CONFIRM = "Action: Forward for Approval";
    public static RFA_CONFIRM = "Action: Return for Action";
    public static REJECTION_CONFIRM = "Action: Reject";
    public static GENERIC_SUCCCESS = "Changes saved successfully. ";
    public static PASSWORD_RESET_SUCCESS = 'Password successfully reset.';
    public static NOTE_SAVED_SUCCESS = 'Note successfully saved.';
    public static ACTION_DEFAULT = "Application successfully ";
    public static ACTION_DEFAULT_SUBMISSION = "Changes will be saved and submitted.";
    public static ACTION_REASSIGN_DEFAULT = "Successfully re-assigned.";
    public static SHORTFALL_DUEDATE_DEFAULT = 'Rectification due dates are projected as +' + SystemParameters.TA_SHORTFALL_DEFAULT_NO_OF_DAYS + ' days from today\'s date except for Edited Due Date.';
    public static MANAGE_SHORTFALL_REDIRECT_TITLE = 'Redirect to Manage Net Value Shortfall';
    public static MANAGE_SHORTFALL_REDIRECT_MSG = 'The %applicationType% submission has shortfall amount of <u>%shortfallAmount%</u>.<br/>Click on Confirm to be redirected to manage net value shortfall.'
    public static MSG_OTHER_DOC = "Please name your documents clearly before uploading";
    public static DECLARATION_CHECK = "Please check the acknowledgement and declaration to proceed.";
    public static NO_RECORDS_FOUND = "No records found.";
    public static MYINFO_ERROR = "MyInfo is currently unavailable, please fill in your details manually.";
    public static EDH_ERROR = "MyInfo Business is currently unavailable, please fill in your details manually.";
    public static POSTAL_CODE_ERROR = "Unable to retrieve postal code details, please manually input the details."
}

export class FormErrorMessages {
    public static UPDATE_ACCOUNT_REQUIRED = "Please update your account details before bidding";
    public static INVALID_BIDDING = "You previously submitted the current highest bid. You are not allowed to outbid yourself.";
    public static REQUIRED = "Input required";
    public static MAX_LENGTH_GENERAL = "Input too long";
    public static MAX_LENGTH = "Input too long (Max. " + maxLengthStr + ")";
    public static MAX_LENGTH_REMARKS = "Input too long (Max. " + maxLengthRemarks + ")";
    public static MIN_VALUE = "Input too small (Min. 0)";
    public static REQUIRED_MSG = "Mandatory Field";
    public static MAX_LENGTH_NUMERALS = "Input too long (Max. " + maxLengthNumerals + ")";
    public static MSG_INCOMPLETE_FORM = "Please fill in all mandatory fields";
    public static MSG_MIN_SELECTION = "Please select at least one option";
    public static SELECT_SAME_STATUS_APP = "Please select applications with same status.";
    public static DATA_BEFORE_MIN = "Date input is before the minimum date allowed.";
    public static DATA_AFTER_MAX = "Date input is after the maximum date allowed.";
    public static PENDING_APPROVAL_ONLY = "Please select application which is pending approval.";
    public static CAN_DEACTIVATE = "Changes you made may not be saved.";
    public static TOTAL_MAX_FILE_SIZE = "Total max file size exceeded.";
    public static maxBlockLength = "Input too long (Max. " + SgdrmAddressFieldsSize.BLOCK + ")";
    public static maxStreetLength = "Input too long (Max. " + SgdrmAddressFieldsSize.STREET + ")";
    public static maxFloorLength = "Input too long (Max. " + SgdrmAddressFieldsSize.FLOOR + ")";
    public static maxUnitLength = "Input too long (Max. " + SgdrmAddressFieldsSize.UNIT + ")";
    public static maxPostalLength = "Input too long (Max. " + SgdrmAddressFieldsSize.POSTAL + ")";
    public static maxBuildingLength = "Input too long (Max. " + SgdrmAddressFieldsSize.BUILDING + ")";
    public static invalidEmailFormat = "Email is not in the correct format";
    public static invalidHanyuPinyin = "Hanyu Pinyin cannot contain special characters";
    public static invalidEmailLength = "Email length is wrong (Max. Local: " + SgdrmEmailFieldsSize.LOCAL + ", At Sign: " + SgdrmEmailFieldsSize.ATSIGN + ", Domain: " + SgdrmEmailFieldsSize.DOMAIN + ")";
    public static maxEmailLength = "Input too long (Max. " + SgdrmEmailFieldsSize.FULL + ")";
    public static onlyAlphaNumericPattern = "Input cannot contain special characters";
    public static onlyNumericPattern = "Input cannot contain alphabet characters and must be 6 digits";
    public static invalidMobileFormat = "Mobile number should start with 8 or 9";
    public static invalidTelFormat = "Telephone number should start with 6, 8 or 9";
    public static invalidGenderFormat = "Input only allow 'Male' or 'Female'";
    public static invalidPostalFormat = "Postal code should be 6 digit";
    public static maxPhoneLength = "Input too long (Max. " + SgdrmPhoneFieldsSize.FULL + ")";
    public static INPUT_LENGTH_8 = "Input only allowed 8 characters";
    public static INVALID_MOBILE_NO = "Invalid mobile no.";
    public static MIN_PERCENT = "Minimum value is 0";
    public static MAX_PERCENT = "Maximum value is 100";
    public static THE_FOLLOWING_CONTACTS_NOT_DELETED = "The following contacts were not deleted";
}

export class FrontEndUrl {
    public static VIEW_PRODUCTS = "/view-products/true";
    public static UPCOMING_UNITS = "/upcoming-units";
    public static FAQ = "/faq";
    public static USER_GUIDE = "/user-guides";
    public static PRIVACY_STATE = "/privacy-statement";
    public static USER_AGREEMENT = "/user-agreement";
    public static CONTACT_US = "/contact-us";
    public static BULLETIN_LIST = "/bulletin-listing";
    public static BULLETIN_VIEW = FrontEndUrl.BULLETIN_LIST + "/bulletin-view";
    public static MESSAGE_LIST = "/message-listing";
    public static MESSAGE_VIEW = FrontEndUrl.MESSAGE_LIST + "/message-view";

    // public static TENDERUNIT_EBID = FrontEndUrl.VIEW_PROPERTIES + "/ebid-unit-details";
    // public static TENDERUNIT_PQM = FrontEndUrl.VIEW_PROPERTIES + "/unit-details";
    public static TENDERUNIT_PQM_FORM = "/unit-tender-form";
    public static TENDERUNIT_PQM_ACK = "/submission-acknowledgement";
    public static EBID_RESULT_LIST = "/real-time-listing";
    public static PQM_RESULT_LIST = "/pqm-result-listing";
    public static SELECTIVE_RESULT_LIST = "/account/selective-tenders";
    public static PQM_VIEW_RESULT = FrontEndUrl.PQM_RESULT_LIST + "/pqm-result-view";
    public static EBID_VIEW_RESULT = FrontEndUrl.EBID_RESULT_LIST + "/ebid-result-view";


    public static MY_ACCOUNT = "/account";
    public static ALERT_ME = "/account/alert-me";
    public static WATCHLIST = "/account/watchlist";
    public static MY_TENDER_LISTING = "/account/my-tenders";
    public static SELECTIVE_TENDERS = "/account/selective-tenders";
    public static LOGIN = "/login";
    public static PROFILE = "/profile";

    public static MY_TENDER_VIEW = "/my-tender";
    public static SITEMAP = "/sitemap";
}

export class ApiUrl {
    public static COMMON = "/common/public"
    public static EBID_TENDER_UNITS = "/ebid-tender-units"
    public static EBID_TENDER_UNITS_PUBLIC = "/ebid-tender-units/public"
    public static BULLETIN_BOARD = "/announcements/public/search-bulletin-board";
    public static TENDER_UNITS = "/tender-units"
    public static TENDER_UNITS_PUBLIC = "/tender-units/public"
    public static TOP_BANNERS = "/announcements/public/top-banners";
    public static SEARCH_TENDER_UNITS = "/tender-units/public/search-tender-units";
    public static PQM_TENDER_SUBMISSION = "/pqm-tender-submission";
    public static WATCHLIST = "/watchlist";
    public static SEARCH_RESULTS = "/results/public";
    public static SEARCH_RESULTS_SELECTIVE = "/results";
    public static ALERT_ME = "/alert-me";
    public static ACCOUNT = "/account";
    public static MY_TENDERS = "/my-tenders";
    public static TICKER_TAPES = "/ticker-tapes/public";
    public static TICKER_TAPES_JSONP = "/ticker-tapes-jsonp/public";
    public static MAP_STATS = "/map-stats/public";
}

export class Statuses {
    public static PAYREQ_NOT_PAID = "PAYREQ_N";
}

export class SubmissionStatuses {
    public static APP_PENDING_APPROVAL = "APP_PA";
    public static APP_PENDING_PO = "APP_PEND_PO";
    public static APP_PENDING_VO = "APP_PEND_VO";
    public static APP_PEND_CNE_CO = "APP_PEND_CNE_CO";
    public static APP_PENDING_AO = "APP_PEND_AO";
    public static APP_PENDING_HOD = "APP_PEND_HOD";
    public static APP_PENDING_HODIV = "APP_PEND_HODIV";
    public static APP_APPROVED = "APP_APPR";
    public static APP_RFA = "APP_RFA";
    public static APP_REJECTED = "APP_REJ";
    public static APP_DRAFT = "APP_DRAFT";
    public static APP_SAVE = "APP_SAVE";
    public static APP_NEW = "APP_NEW";

}

export class WorkflowStatuses {
    public static WKFLW_NEW = "WKFLW_NEW"
    public static WKFLW_PEND_PO = "WKFLW_PEND_PO"
    public static WKFLW_PEND_VO = "WKFLW_PEND_VO"
    public static WKFLW_PEND_AO = "WKFLW_PEND_AO"
    public static WKFLW_PEND_HOD = "WKFLW_PEND_HOD"
    public static WKFLW_PEND_HODIV = "WKFLW_PEND_HODIV"
    public static WKFLW_APPR = "WKFLW_APPR"
    public static WKFLW_REJ = "WKFLW_REJ"
}

export class Roles {
    public static AE = "AE";
    public static TO = "TO";
    public static DD = "DD";
    public static DIR = "DIR";
    public static TEC = "TEC";
    public static SA = "SA";
    public static UA = "UA";
    public static AUDIT = "AUDIT";
    public static CORPPASS = "CP";
    public static SINGPASS = "SP";
}


export class Pagination {
    public static SIZE_OPTIONS = [5, 10, 20, 50, 100];
    public static DEFAULT_PAGE_SIZE = 10;
}

export class DocumentTypes {
    public static TENDERER_DOC_OTHERS = "DOC_TENDERER_BID_OTHER";
    public static TENDERER_DOC_CLARIFICATION = "DOC_TENDERER_CLARIFICATION_QN";
    public static TENDERER_BID_MANDATORY = "DOC_TENDERER_BID_MANDATORY";
    public static TENDERER_BID_SUBMISSION = "DOC_TENDERER_BID_SUBMISSION";
}


export class AddressTypes {
    public static ADDR_FOREIGN = "ADDR_F";
    public static ADDR_LOCAL = "ADDR_L";
}

export let InfinityRepresent = {
    NEG_INFINIY: { decimal: '-999999999999999', string: 'Negative Infinity' },
    POS_INFINIY_: { decimal: '999999999999999', string: 'Positive Infinity' },
}

export class MasterDataSelection {
    public static TYPES = "TYPES";
    public static STATUSES = "STATUSES";
    public static EMAIL = "EMAIL";
    public static SMS = "SMS";
    public static SYSTEM_PARAMETERS = "SYSTEM_PARAMETERS";
}

export class DataType {
    public static DATA_DT = "DATA_DT";
    public static DATA_NUM = "DATA_NUM";
    public static DATA_STR = "DATA_STR";
}

export let workflowAction = {
    approve: { name: 'approve', label: 'Approve', message: 'approved.' },
    forward: { name: 'approve', label: 'Forward for Approval', message: 'forwarded for approval.' },
    rfa: { name: 'rfa', label: 'Return for Action', message: 'returned to [TATG] for action.' },
    reject: { name: 'reject', label: 'Reject', message: 'rejected.' },
    save: { name: 'update', label: 'Save Changes', message: 'saved changes.' },
    route: { name: 'route', label: 'Route Back to...', message: ' routed back.' },
    rescind: { name: 'rescind', label: 'Rescind', message: 'rescinded.' },
    edit: { name: 'edit', label: 'Route back for edit', message: 'routed back for edit.' },
    submit: { name: 'submit', label: 'Forward for Approval', message: 'submitted for approval.' },
    routeOic: { name: 'route', label: 'Route Back to OIC', message: ' routed back to OIC.' },
    support: { name: 'approve', label: 'Support', message: 'supported.' },
    email: { name: 'email', label: 'Send Email', message: 'emailed.' },
    followup: { name: 'follow-up', label: 'Follow Up', message: 'returned to TG for action.' },
}


export const PENDING_STATUS = [
    SubmissionStatuses.APP_PENDING_APPROVAL,
];

export class DepositCalculationTypes {
    public static BY_FLOOR_AREA = "DPST_BY_FLOOR_AREA";
    public static BY_FLAT_RATE = "DPST_BY_FLAT_RATE";
    public static BY_PERCENT_OF_RENT = "DPST_BY_PERCENT_OF_RENT";
    public static BY_NOMINAL_RENT = "DPST_BY_NOMINAL_RENT";
}

export class TradeTypes {
    public static OPEN = "OPEN";
}

export class TradeLabel {
    public static OPEN = "Open Trade";
    public static SPECIFIC = "Specific Trade";
}

export class MediaTypes {
    public static MEDIA_360 = "MEDIA_360";
    public static FLOOR_PLAN = "MEDIA_FLOOR_PLAN";
    public static IMAGE = "MEDIA_IMAGE";
    public static VIDEO = "MEDIA_VIDEO";
    public static OTHER = "MEDIA_O";
}

export class TouTypes {
    public static USER = "TOU_USER";
    public static BIDDING = "TOU_BIDDING";
    public static PRIVACY = "TOU_PRIVACY";
}

export class TenderTypes {
    public static O_EBD = "TNDR_O_EBD";
    public static O_PRC = "TNDR_O_PRC";
    public static O_PQM = "TNDR_O_PQM";
    public static S_EBD = "TNDR_S_EBD";
    public static S_PRC = "TNDR_S_PRC";
    public static S_PQM = "TNDR_S_PQM";
}

export class AnnouncementType {
    public static BULLETIN = "ANNC_BULLETIN";
    public static TOP_BANNER = "ANNC_TOP_BANNER";
}

export class RentalSchemeTypes {
    public static FIXED = "RENT_FIXED";
    public static GTO = "RENT_GTO";
}

export class ScorePublishingTypes {
    public static P = "PUB_SCORE_P";
    public static Q = "PUB_SCORE_Q";
    public static OVERALL = "PUB_SCORE_OVERALL";
}

export class RentPublishingTypes {
    public static DO_NOT_PUBLISH = "PUB_RENT_DO_NOT_PUBLISH";
}

export class ResultPublishingTypes {
    public static SUCCESS_ONLY = "PUB_RESULT_SUCCESS_ONLY";
    public static ALL = "PUB_RESULT_ALL";
}
export class BiddingStatuses {
    public static BID_NOT_OPENED = "BID_NOT_OPENED";
    public static BID_OPENED = "BID_OPENED";
    public static BID_CLOSED = "BID_CLOSED";
    public static BID_SUSPENDED = "BID_SUSPENDED";
    public static BID_WITHDRAWN = "BID_WITHDRAWN";
}

export class StageStatuses {
    public static PENDING_POSTING = "TNDR_PENDING_POSTING";
    public static PENDING_BID_OPENING = "TNDR_PENDING_BID_OPENING";
    public static PENDING_BID_CLOSING = "TNDR_PENDING_BID_CLOSING";
    public static PENDING_WITHDRAWAL = "TNDR_PENDING_WITHDRAWAL";
    public static PENDING_CORRIGENDUM = "TNDR_PENDING_CORRIGENDUM";
    public static PENDING_EVALUATION = "TNDR_PENDING_EVALUATION";
    public static PENDING_PQM_SCORING = "TNDR_PENDING_PQM_SCORING";
    public static PENDING_RECOMMENDATION = "TNDR_PENDING_RECOMMENDATION";
    public static PENDING_PUBLISH = "TNDR_PENDING_PUBLISH";
    public static PENDING_REFUND = "TNDR_PENDING_REFUND";
    public static CLOSED = "TNDR_CLOSED";
}

export class RecommendationStatuses {
    public static REC_AWARD = "REC_AWARD";
    public static REC_REJECT = "REC_REJECT";
    public static REC_REJECT_FORFEIT = "REC_REJECT_FORFEIT";
    public static REC_DISQUALIFIED = "REC_DISQUALIFIED";
}

export const maxFloorAreaMaximum = 999999;

export const floorAreaArray = [
    { key: 25, label: '25 sqm (269 sqft)' },
    { key: 50, label: '50 sqm (538 sqft)' },
    { key: 100, label: '100 sqm (1,076 sqft)' },
    { key: 125, label: '125 sqm (1,345 sqft)' },
    { key: 150, label: '150 sqm (1,614 sqft)' },
    { key: 200, label: '200 sqm (2,152 sqft)' },
    { key: 225, label: '225 sqm (2,421 sqft)' },
    { key: 350, label: '350 sqm (3,767 sqft)' },
    { key: 450, label: '450 sqm (4,843 sqft)' },
    { key: 650, label: '650 sqm (6,996 sqft)' },
    { key: 950, label: '950 sqm (10,225 sqft)' },
];

export class FileExt {
    public static IMAGES = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'jfif'];
}

