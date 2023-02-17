export const ActionTypes = {
    IS_FIRST_LAUNCH_REQUEST: 'IS_FIRST_LAUNCH_REQUEST',
    IS_FIRST_LAUNCH_RESPONSE: 'IS_FIRST_LAUNCH_RESPONSE',

    IS_LOGGED_IN_REQUEST: 'IS_LOGGED_IN_REQUEST',
    IS_LOGGED_IN_RESPONSE: 'IS_LOGGED_IN_RESPONSE',

    //login 
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_RESPONSE: 'LOGIN_RESPONSE',
    LOGIN_RESET: 'LOGIN_RESET',

    //forgot mpin 
    FORGOT_PIN_REQUEST: 'FORGOT_PIN_REQUEST',
    FORGOT_PIN_RESPONSE: 'FORGOT_PIN_RESPONSE',
    FORGOT_PIN_RESET: 'FORGOT_PIN_RESET',

    //get email address
    GET_EMAIL_REQUEST: 'GET_EMAIL_REQUEST',
    GET_EMAIL_RESPONSE: 'GET_EMAIL_RESPONSE',

    //offers 
    Get_OFFERS_REQUEST: 'Get_OFFERS_REQUEST',
    Get_OFFERS_RESPONSE: 'Get_OFFERS_RESPONSE',
    Get_OFFERS_RESET: 'Get_OFFERS_RESET',

    // getAllOffer
    Get_ALL_OFFER_Request : "Get_ALL_OFFER_Request",
    Get_All_OFFER_RESONSE : "Get_All_OFFER_RESONSE",
    GET_OTHER_50_OFFERS : "GET_OTHER_50_OFFERS",


    GetAggMerchantsByCat_REQUEST : "GetAggMerchantsByCat_REQUEST",
GetAggMerchantsByCat_RESPONSE : "GetAggMerchantsByCat_RESPONSE",
    //save offers 
    SAVE_OFFERS_REQUEST: 'SAVE_OFFERS_REQUEST',
    SAVE_OFFERS_RESPONSE: 'SAVE_OFFERS_RESPONSE',
    SAVE_OFFERS_RESET: 'SAVE_OFFERS_RESET',

    //shop clicked 
    SHOP_CLICKED_REQUEST: 'SHOP_CLICKED_REQUEST',
    SHOP_CLICKED_RESPONSE: 'SHOP_CLICKED_RESPONSE',
    SHOP_CLICKED_RESET: 'SHOP_CLICKED_RESET',

    //save offers 
    GET_SAVE_OFFERS_REQUEST: 'GET_SAVE_OFFERS_REQUEST',
    GET_SAVE_OFFERS_RESPONSE: 'GET_SAVE_OFFERS_RESPONSE',
    GET_SAVE_OFFERS_RESET: 'GET_SAVE_OFFERS_RESET',

    //get reward categories 
    GET_REWARD_CAT_REQUEST: 'GET_REWARD_CAT_REQUEST',
    GET_REWARD_CAT_RESPONSE: 'GET_REWARD_CAT_RESPONSE',
    GET_REWARD_CAT_RESET: 'GET_REWARD_CAT_RESET',

    //get reward details 
    GET_REWARD_DETAILS_REQUEST: 'GET_REWARD_DETAILS_REQUEST',
    GET_REWARD_DETAILS_RESPONSE: 'GET_REWARD_DETAILS_RESPONSE',
    GET_REWARD_DETAILS_RESET: 'GET_REWARD_DETAILS_RESET',

    //get matched contacts 
    GET_MATCHED_CONTACTS_REQUEST: 'GET_MATCHED_CONTACTS_REQUEST',
    GET_MATCHED_CONTACTS_RESPONSE: 'GET_MATCHED_CONTACTS_RESPONSE',
    GET_MATCHED_CONTACTS_RESET: 'GET_MATCHED_CONTACTS_RESET',

    //get points balance 
    GET_POINTS_BALANCE_REQUEST: 'GET_POINTS_BALANCE_REQUEST',
    GET_POINTS_BALANCE_RESPONSE: 'GET_POINTS_BALANCE_RESPONSE',
    GET_POINTS_BALANCE_RESET: 'GET_POINTS_BALANCE_RESET',

    //redeem gift card 
    REDEEM_GIFT_CARD_REQUEST: 'REDEEM_GIFT_CARD_REQUEST',
    REDEEM_GIFT_CARD_RESPONSE: 'REDEEM_GIFT_CARD_RESPONSE',
    REDEEM_GIFT_CARD_RESET: 'REDEEM_GIFT_CARD_RESET',

    //get profile 
    GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
    GET_PROFILE_REPONSE: 'GET_PROFILE_RESPONSE',
    GET_PROFILE_RESET: 'GET_PROFILE_RESET',

    //edit profile 
    EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST',
    EDIT_PROFILE_REPONSE: 'EDIT_PROFILE_RESPONSE',
    EDIT_PROFILE_RESET: 'EDIT_PROFILE_RESET',

    //get fav brands 
    GET_FAV_BRANDS_REQUEST: 'GET_FAV_BRANDS_REQUEST',
    GET_FAV_BRANDS_REPONSE: 'GET_FAV_BRANDS_RESPONSE',
    GET_FAV_BRANDS_RESET: 'GET_FAV_BRANDS_RESET',

    //get gifts and rewards 
    GET_GIFTS_REWARDS_REQUEST: 'GET_GIFTS_REWARDS_REQUEST',
    GET_GIFTS_REWARDS_REPONSE: 'GET_GIFTS_REWARDS_RESPONSE',
    GET_GIFTS_REWARDS_RESET: 'GET_GIFTS_REWARDS_RESET',

    //get food and wine 
    GET_FOOD_AND_WINE_REQUEST: 'GET_FOOD_AND_WINEREQUEST',
    GET_FOOD_AND_WINE_REPONSE: 'GET_FOOD_AND_WINE_RESPONSE',
    GET_FOOD_AND_WINE_RESET: 'GET_FOOD_AND_WINE_RESET',

    //purchase menu 
    PURCHASE_FOOD_POS_REQUEST: 'PURCHASE_FOOD_POS_REQUEST',
    PURCHASE_FOOD_POS_REPONSE: 'PURCHASE_FOOD_POS_RESPONSE',
    PURCHASE_FOOD_POS_RESET: 'PURCHASE_FOOD_POS_RESET',

    //get bank details 
    GET_BANK_DETAILS_REQUEST: 'GET_BANK_DETAILS_REQUEST',
    GET_BANK_DETAILS_REPONSE: 'GET_BANK_DETAILS_RESPONSE',
    GET_BANK_DETAILS_RESET: 'GET_BANK_DETAILS_RESET',

    //send money 
    SEND_MONEY_REQUEST: 'SEND_MONEY_REQUEST',
    SEND_MONEY_REPONSE: 'SEND_MONEY_RESPONSE',
    SEND_MONEY_RESET: 'SEND_MONEY_RESET',

    //request money 
    REQUEST_MONEY_REQUEST: 'REQUEST_MONEY_REQUEST',
    REQUEST_MONEY_REPONSE: 'REQUEST_MONEY_RESPONSE',
    REQUEST_MONEY_RESET: 'REQUEST_MONEY_RESET',

    //notifications 
    NOTIFICATIONS_REQUEST: 'NOTIFICATIONS_REQUEST',
    NOTIFICATIONS_REPONSE: 'NOTIFICATIONS_RESPONSE',
    NOTIFICATIONS_RESET: 'NOTIFICATIONS_RESET',

    //approve money request 
    APPROVE_MONEY_REQUEST_REQUEST: 'APPROVE_MONEY_REQUEST_REQUEST',
    APPROVE_MONEY_REQUEST_REPONSE: 'APPROVE_MONEY_REQUEST_RESPONSE',
    APPROVE_MONEY_REQUEST_RESET: 'APPROVE_MONEY_REQUEST_RESET',

    //make payment 
    MAKE_PAYMENT_REQUEST: 'MAKE_PAYMENT_REQUEST',
    MAKE_PAYMENT_REPONSE: 'MAKE_PAYMENT_RESPONSE',
    MAKE_PAYMENT_RESET: 'MAKE_PAYMENT_RESET',

    //history points
    GET_HISTORY_POINTS_REQUEST: 'GET_HISTORY_POINTS_REQUEST',
    GET_HISTORY_POINTS_REPONSE: 'GET_HISTORY_POINTS_RESPONSE',
    GET_HISTORY_POINTS_RESET: 'GET_HISTORY_POINTS_RESET',

    //history money
    GET_HISTORY_MONEY_REQUEST: 'GET_HISTORY_MONEY_REQUEST',
    GET_HISTORY_MONEY_REPONSE: 'GET_HISTORY_MONEY_RESPONSE',
    GET_HISTORY_MONEY_RESET: 'GET_HISTORY_MONEY_RESET',

    //points transfer
    POINTS_TRANSFER_REQUEST: 'POINTS_TRANSFER_REQUEST',
    POINTS_TRANSFER_REPONSE: 'POINTS_TRANSFER_RESPONSE',
    POINTS_TRANSFER_RESET: 'POINTS_TRANSFER_RESET',

    //update fcm token
    UPDATE_FCM_TOKEN_REQUEST: 'UPDATE_FCM_TOKEN_REQUEST',
    UPDATE_FCM_TOKEN_REPONSE: 'UPDATE_FCM_TOKEN_RESPONSE',
    UPDATE_FCM_TOKEN_RESET: 'UPDATE_FCM_TOKEN_RESET',

    //force update
    FORCE_UPDATE_REQUEST: 'FORCE_UPDATE_REQUEST',
    FORCE_UPDATE_REPONSE: 'FORCE_UPDATE_RESPONSE',
    FORCE_UPDATE_RESET: 'FORCE_UPDATE_RESET',

    //get notification
    GET_NOTIFICATION_REQUEST: 'GET_NOTIFICATION__REQUEST',
    GET_NOTIFICATION__REPONSE: 'GET_NOTIFICATION__RESPONSE',
    GET_NOTIFICATION__RESET: 'GET_NOTIFICATION__RESET',

    //update notification seen status
    NOTIFICATION_SEEN_REQUEST: 'NOTIFICATION_SEEN_REQUEST',
    NOTIFICATION_SEEN_REPONSE: 'NOTIFICATION_SEEN_RESPONSE',
    NOTIFICATION_SEEN_RESET: 'NOTIFICATION_SEEN_RESET',

    //delete notification
    NOTIFICATION_DELETE_REQUEST: 'NOTIFICATION_DELETE_REQUEST',
    NOTIFICATION_DELETE_REPONSE: 'NOTIFICATION_DELETE_RESPONSE',
    NOTIFICATION_DELETE_RESET: 'NOTIFICATION_DELETE_RESET',

    //get maintainance
    GET_MAINTAINANCE_REQUEST: 'GET_MAINTAINANCE_REQUEST',
    GET_MAINTAINANCE_REPONSE: 'GET_MAINTAINANCE_RESPONSE',
    GET_MAINTAINANCE_RESET: 'GET_MAINTAINANCE_RESET',

    //woolworth's 
    GET_WOOLWORTH_REQUEST: 'GET_WOOLWORTH_REQUEST',
    GET_WOOLWORTH_REPONSE: 'GET_WOOLWORTH_RESPONSE',
    GET_WOOLWORTH_RESET: 'GET_WOOLWORTH_RESET',

    //get devices 
    GET_DEVICES_REQUEST: 'GET_DEVICES_REQUEST',
    GET_DEVICES_REPONSE: 'GET_DEVICES_RESPONSE',
    GET_DEVICES_RESET: 'GET_DEVICES_RESET',

    //get accessories 
    GET_ACCESSORIES_REQUEST: 'GET_ACCESSORIES_REQUEST',
    GET_ACCESSORIES_REPONSE: 'GET_ACCESSORIES_RESPONSE',
    GET_ACCESSORIES_RESET: 'GET_ACCESSORIES_RESET',

    //create community 
    CREATE_COMMUNITY_REQUEST: 'CREATE_COMMUNITY_REQUEST',
    CREATE_COMMUNITY_REPONSE: 'CREATE_COMMUNITY_RESPONSE',
    CREATE_COMMUNITY_RESET: 'CREATE_COMMUNITY_RESET',

    //get communities by user
    GET_COMMUNITIES_BY_USER_REQUEST: 'GET_COMMUNITIES_BY_USER_REQUEST',
    GET_COMMUNITIES_BY_USER_REPONSE: 'GET_COMMUNITIES_BY_USER_RESPONSE',
    GET_COMMUNITIES_BY_USER_RESET: 'GET_COMMUNITIES_BY_USER_RESET',

    //get all communities
    GET_ALL_COMMUNITIES_REQUEST: 'GET_ALL_COMMUNITIES_REQUEST',
    GET_ALL_COMMUNITIES_REPONSE: 'GET_ALL_COMMUNITIES_RESPONSE',
    GET_ALL_COMMUNITIES_RESET: 'GET_ALL_COMMUNITIES_RESET',

    //get alert status
    GET_ALERT_STATUS_REQUEST: 'GET_ALERT_STATUS_REQUEST',
    GET_ALERT_STATUS_REPONSE: 'GET_ALERT_STATUS_RESPONSE',
    GET_ALERT_STATUS_RESET: 'GET_ALERT_STATUS_RESET',

    //save alert status
    SAVE_ALERT_STATUS_REQUEST: 'SAVE_ALERT_STATUS_REQUEST',
    SAVE_ALERT_STATUS_REPONSE: 'SAVE_ALERT_STATUS_RESPONSE',
    SAVE_ALERT_STATUS_RESET: 'SAVE_ALERT_STATUS_RESET',

    //request time consent
    REQUEST_TIME_CONSENT_REQUEST: 'REQUEST_TIME_CONSENT_REQUEST',
    REQUEST_TIME_CONSENT_REPONSE: 'REQUEST_TIME_CONSENT_RESPONSE',
    REQUEST_TIME_CONSENT_RESET: 'REQUEST_TIME_CONSENT_RESET',

    //get location services status
    GET_LOCATION_SERVICES_STATUS_REQUEST: 'GET_LOCATION_SERVICES_STATUS_REQUEST',
    GET_LOCATION_SERVICES_STATUS_REPONSE: 'GET_LOCATION_SERVICES_STATUS_RESPONSE',
    GET_LOCATION_SERVICES_STATUS_RESET: 'GET_LOCATION_SERVICES_STATUS_RESET',

    //get user status
    GET_USER_STATUS_REQUEST: 'GET_USER_STATUS_REQUEST',
    GET_USER_STATUS_RESPONSE: 'GET_USER_STATUS_RESPONSE',
    GET_USER_STATUS_RESET: 'GET_USER_STATUS_RESET',

    //post comments
    POST_COMMENTS_REQUEST: 'POST_COMMENTS_REQUEST',
    POST_COMMENTS_REPONSE: 'POST_COMMENTS_RESPONSE',
    POST_COMMENTS_RESET: 'POST_COMMENTS_RESET',

    //join community
    JOIN_COMMUNITY_REQUEST: 'JOIN_COMMUNITY_REQUEST',
    JOIN_COMMUNITY_REPONSE: 'JOIN_COMMUNITY_RESPONSE',
    JOIN_COMMUNITY_RESET: 'JOIN_COMMUNITY_RESET',

    //edit community
    EDIT_COMMUNITY_REQUEST: 'EDIT_COMMUNITY_REQUEST',
    EDIT_COMMUNITY_REPONSE: 'EDIT_COMMUNITY_RESPONSE',
    EDIT_COMMUNITY_RESET: 'EDIT_COMMUNITY_RESET',

    //get time
    GET_TIME_REQUEST: 'GET_TIME_REQUEST',
    GET_TIME_REPONSE: 'GET_TIME_RESPONSE',
    GET_TIME_RESET: 'GET_TIME_RESET',

    //get timeConsent
    GET_TIME_CONSENT_REQUEST: 'GET_TIME_CONSENT_REQUEST',
    GET_TIME_CONSENT_REPONSE: 'GET_TIME_CONSENT_RESPONSE',
    GET_TIME_CONSENT_RESET: 'GET_TIME_CONSENT_RESET',

    //set time
    SET_TIME_CONSENT_REQUEST: 'SET_TIME_CONSENT_REQUEST',
    SET_TIME_CONSENT_REPONSE: 'SET_TIME_CONSENT_RESPONSE',
    SET_TIME_CONSENT_RESET: 'SET_TIME_CONSENT_RESET',

    //chat: send message
    SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
    SEND_MESSAGE_REPONSE: 'SEND_MESSAGE_RESPONSE',
    SEND_MESSAGE_RESET: 'SEND_MESSAGE_RESET',

    //chat: get message
    GET_MESSAGE_REQUEST: 'GET_MESSAGE_REQUEST',
    GET_MESSAGE_REPONSE: 'GET_MESSAGE_RESPONSE',
    GET_MESSAGE_RESET: 'GET_MESSAGE_RESET',

    //chat: get chat id
    GET_CHAT_ID_REQUEST: 'GET_CHAT_ID_REQUEST',
    GET_CHAT_ID_REPONSE: 'GET_CHAT_ID_RESPONSE',
    GET_CHAT_ID_RESET: 'GET_CHAT_ID_RESET',

    //chat: get chat thread
    GET_CHAT_THREAD_REQUEST: 'GET_CHAT_THREAD_REQUEST',
    GET_CHAT_THREAD_REPONSE: 'GET_CHAT_THREAD_RESPONSE',
    GET_CHAT_THREAD_RESET: 'GET_CHAT_THREAD_RESET',

    //CCS: Is Primary user
    IS_PRIMARY_REQUEST: 'IS_PRIMARY_REQUEST',
    IS_PRIMARY_REPONSE: 'IS_PRIMARY_RESPONSE',
    IS_PRIMARY_RESET: 'IS_PRIMARY_RESET',

    //CCS: Set Target
    SET_TARGET_REQUEST: 'SET_TARGET_REQUEST',
    SET_TARGET_REPONSE: 'SET_TARGET_RESPONSE',
    SET_TARGET_RESET: 'SET_TARGET_RESET',

    //CCS: Get Secondary users
    GET_SECONDARY_USERS_REQUEST: 'GET_SECONDARY_USERS_REQUEST',
    GET_SECONDARY_USERS_REPONSE: 'GET_SECONDARY_USERS_RESPONSE',
    GET_SECONDARY_USERS_RESET: 'GET_SECONDARY_USERS_RESET',

    //CCS: Add Secondary users
    ADD_SECONDARY_USERS_REQUEST: 'ADD_SECONDARY_USERS_REQUEST',
    ADD_SECONDARY_USERS_REPONSE: 'ADD_SECONDARY_USERS_RESPONSE',
    ADD_SECONDARY_USERS_RESET: 'ADD_SECONDARY_USERS_RESET',

    //CCS: Remove Secondary users
    REMOVE_SECONDARY_USERS_REQUEST: 'REMOVE_SECONDARY_USERS_REQUEST',
    REMOVE_SECONDARY_USERS_REPONSE: 'REMOVE_SECONDARY_USERS_RESPONSE',
    REMOVE_SECONDARY_USERS_RESET: 'REMOVE_SECONDARY_USERS_RESET',

    //CCS: Get feedback titles
    GET_FEEDBACK_TITLES_REQUEST: 'GET_FEEDBACK_TITLES_REQUEST',
    GET_FEEDBACK_TITLES_REPONSE: 'GET_FEEDBACK_TITLES_RESPONSE',
    GET_FEEDBACK_TITLES_RESET: 'GET_FEEDBACK_TITLES_RESET',

    //CCS: Submit feedback
    SUBMIT_FEEDBACK_REQUEST: 'SUBMIT_FEEDBACK_REQUEST',
    SUBMIT_FEEDBACK_REPONSE: 'SUBMIT_FEEDBACK_RESPONSE',
    SUBMIT_FEEDBACK_RESET: 'SUBMIT_FEEDBACK_RESET',

    //CCS: Get Call details
    GET_CALL_DETAILS_REQUEST: 'GET_CALL_DETAILS_REQUEST',
    GET_CALL_DETAILS_REPONSE: 'GET_CALL_DETAILS_RESPONSE',
    GET_CALL_DETAILS_RESET: 'GET_CALL_DETAILS_RESET',

    //Get daily offers
    GET_DAILY_OFFERS_REQUEST: 'GET_DAILY_OFFERS_REQUEST',
    GET_DAILY_OFFERS_REPONSE: 'GET_DAILY_OFFERS_RESPONSE',
    GET_DAILY_OFFERS_RESET: 'GET_DAILY_OFFERS_RESET',

    //Get popular offers
    GET_POPULAR_OFFERS_REQUEST: 'GET_POPULAR_OFFERS_REQUEST',
    GET_POPULAR_OFFERS_REPONSE: 'GET_POPULAR_OFFERS_RESPONSE',
    GET_POPULAR_OFFERS_RESET: 'GET_POPULAR_OFFERS_RESET',

    //Get challenges
    GET_CHALLENGES_REQUEST: 'GET_CHALLENGES_REQUEST',
    GET_CHALLENGES_REPONSE: 'GET_CHALLENGES_RESPONSE',
    GET_CHALLENGES_RESET: 'GET_CHALLENGES_RESET',

    //Get hero tiles
    GET_HERO_TILES_REQUEST: 'GET_HERO_TILES_REQUEST',
    GET_HERO_TILES_REPONSE: 'GET_HERO_TILES_RESPONSE',
    GET_HERO_TILES_RESET: 'GET_HERO_TILES_RESET',

    //Get hero tiles offers
    GET_HERO_TILES_OFFERS_REQUEST: 'GET_HERO_TILES_OFFERS_REQUEST',
    GET_HERO_TILES_OFFERS_REPONSE: 'GET_HERO_TILES_OFFERS_RESPONSE',
    GET_HERO_TILES_OFFERS_RESET: 'GET_HERO_TILES_OFFERS_RESET',

    //Get click history
    GET_CLICK_HISTORY_REQUEST: 'GET_CLICK_HISTORY_REQUEST',
    GET_CLICK_HISTORY_REPONSE: 'GET_CLICK_HISTORY_RESPONSE',
    GET_CLICK_HISTORY_RESET: 'GET_CLICK_HISTORY_RESET',

    //Submit reward claim
    SUBMIT_REWARD_CLAIM_REQUEST: 'SUBMIT_REWARD_CLAIM_REQUEST',
    SUBMIT_REWARD_CLAIM_REPONSE: 'SUBMIT_REWARD_CLAIM_RESPONSE',
    SUBMIT_REWARD_CLAIM_RESET: 'SUBMIT_REWARD_CLAIM_RESET',

    //Transfer to bank
    TRANSFER_TO_BANK_REQUEST: 'TRANSFER_TO_BANK_REQUEST',
    TRANSFER_TO_BANK_REPONSE: 'TRANSFER_TO_BANK_RESPONSE',
    TRANSFER_TO_BANK_RESET: 'TRANSFER_TO_BANK_RESET',

    //forgot mpin 
    CHANGE_PIN_REQUEST: 'CHANGE_PIN_REQUEST',
    CHANGE_PIN_RESPONSE: 'CHANGE_PIN_RESPONSE',
    CHANGE_PIN_RESET: 'CHANGE_PIN_RESET',

    //referral code verification
    REFERRAL_CODE_VERIFICATION_REQUEST: 'REFERRAL_CODE_VERIFICATION_REQUEST',
    REFERRAL_CODE_VERIFICATION_RESPONSE: 'REFERRAL_CODE_VERIFICATION_RESPONSE',
    REFERRAL_CODE_VERIFICATION_RESET: 'REFERRAL_CODE_VERIFICATION_RESET',

    //referral code generation
    REFERRAL_CODE_GENERATE_REQUEST: 'REFERRAL_CODE_GENERATE_REQUEST',
    REFERRAL_CODE_GENERATE_RESPONSE: 'REFERRAL_CODE_GENERATE_RESPONSE',
    REFERRAL_CODE_GENERATE_RESET: 'REFERRAL_CODE_GENERATE_RESET',

    //get referral code
    GET_REFERRAL_CODE_REQUEST: 'GET_REFERRAL_CODE_REQUEST',
    GET_REFERRAL_CODE_RESPONSE: 'GET_REFERRAL_CODE_RESPONSE',
    GET_REFERRAL_CODE_RESET: 'GET_REFERRAL_CODE_RESET',

    //Add or update Bank
    ADD_UPDATE_BANK_DETAILS_REQUEST: 'ADD_UPDATE_BANK_DETAILS_REQUEST',
    ADD_UPDATE_BANK_DETAILS_RESPONSE: 'ADD_UPDATE_BANK_DETAILS_RESPONSE',
    ADD_UPDATE_BANK_DETAILS_RESET: 'ADD_UPDATE_BANK_DETAILS_RESET',

    //Delete Bank details
    DELETE_BANK_DETAILS_REQUEST: 'DELETE_BANK_DETAILS_REQUEST',
    DELETE_BANK_DETAILS_RESPONSE: 'DELETE_BANK_DETAILS_RESPONSE',
    DELETE_BANK_DETAILS_RESET: 'DELETE_BANK_DETAILS_RESET',

    //Edit email
    EDIT_EMAIL_REQUEST: 'EDIT_EMAIL_REQUEST',
    EDIT_EMAIL_RESPONSE: 'EDIT_EMAIL_RESPONSE',
    EDIT_EMAIL_RESET: 'EDIT_EMAIL_RESET',

    //Edit mobile
    EDIT_MOBILE_REQUEST: 'EDIT_MOBILE_REQUEST',
    EDIT_MOBILE_RESPONSE: 'EDIT_MOBILE_RESPONSE',
    EDIT_MOBILE_RESET: 'EDIT_MOBILE_RESET',

    //Delete user
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_RESPONSE: 'DELETE_USER_RESPONSE',
    DELETE_USER_RESET: 'DELETE_USER_RESET',

    //Transfer to master card
    TRANSFER_TO_MASTER_CARD_REQUEST: 'TRANSFER_TO_MASTER_CARD_REQUEST',
    TRANSFER_TO_MASTER_CARD_RESPONSE: 'TRANSFER_TO_MASTER_CARD_RESPONSE',
    TRANSFER_TO_MASTER_CARD_RESET: 'TRANSFER_TO_MASTER_CARD_RESET',

    //Offers with retailer name 
    OFFER_WITH_RETAILER_NAME_REQUEST: 'OFFER_WITH_RETAILER_NAME_REQUEST',
    OFFER_WITH_RETAILER_NAME_RESPONSE: 'OFFER_WITH_RETAILER_NAME_RESPONSE',
    OFFER_WITH_RETAILER_NAME_RESET: 'OFFER_WITH_RETAILER_NAME_RESET',

    //Offers with category name 
    OFFER_WITH_CATEGORY_NAME_REQUEST: 'OFFER_WITH_CATEGORY_NAME_REQUEST',
    OFFER_WITH_CATEGORY_NAME_RESPONSE: 'OFFER_WITH_CATEGORY_NAME_RESPONSE',
    OFFER_WITH_CATEGORY_NAME_RESET: 'OFFER_WITH_CATEGORY_NAME_RESET',

    //should navigate to help 
    SHOULD_NAVIGATE_TO_HELP_REQUEST: 'SHOULD_NAVIGATE_TO_HELP_REQUEST',
    SHOULD_NAVIGATE_TO_HELP_RESPONSE: 'SHOULD_NAVIGATE_TO_HELP_RESPONSE',
    SHOULD_NAVIGATE_TO_HELP_RESET: 'SHOULD_NAVIGATE_TO_HELP_RESET',

    //should navigate to rewards 
    SHOULD_NAVIGATE_TO_REWARDS_REQUEST: 'SHOULD_NAVIGATE_TO_REWARDS_REQUEST',
    SHOULD_NAVIGATE_TO_REWARDS_RESPONSE: 'SHOULD_NAVIGATE_TO_REWARDS_RESPONSE',
    SHOULD_NAVIGATE_TO_REWARDS_RESET: 'SHOULD_NAVIGATE_TO_REWARDS_RESET',

    //should navigate to digital mastercard 
    SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_REQUEST: 'SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_REQUEST',
    SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_RESPONSE: 'SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_RESPONSE',
    SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_RESET: 'SHOULD_NAVIGATE_TO_DIGITAL_MASTER_CARD_RESET',

    //should navigate to history 
    SHOULD_NAVIGATE_TO_HISTORY_REQUEST: 'SHOULD_NAVIGATE_TO_HISTORY_REQUEST',
    SHOULD_NAVIGATE_TO_HISTORY_RESPONSE: 'SHOULD_NAVIGATE_TO_HISTORY_RESPONSE',
    SHOULD_NAVIGATE_TO_HISTORY_RESET: 'SHOULD_NAVIGATE_TO_HISTORY_RESET',

    //should navigate to settings 
    SHOULD_NAVIGATE_TO_SETTINGS_REQUEST: 'SHOULD_NAVIGATE_TO_SETTINGS_REQUEST',
    SHOULD_NAVIGATE_TO_SETTINGS_RESPONSE: 'SHOULD_NAVIGATE_TO_SETTINGS_RESPONSE',
    SHOULD_NAVIGATE_TO_SETTINGS_RESET: 'SHOULD_NAVIGATE_TO_SETTINGS_RESET',

    //should navigate to privacy policy 
    SHOULD_NAVIGATE_TO_PRIVACY_POLICY_REQUEST: 'SHOULD_NAVIGATE_TO_PRIVACY_POLICY_REQUEST',
    SHOULD_NAVIGATE_TO_PRIVACY_POLICY_RESPONSE: 'SHOULD_NAVIGATE_TO_PRIVACY_POLICY_RESPONSE',
    SHOULD_NAVIGATE_TO_PRIVACY_POLICY_RESET: 'SHOULD_NAVIGATE_TO_PRIVACY_POLICY_RESET',

    //should navigate to terms and conditions 
    SHOULD_NAVIGATE_TO_TERMS_REQUEST: 'SHOULD_NAVIGATE_TO_TERMS_REQUEST',
    SHOULD_NAVIGATE_TO_TERMS_RESPONSE: 'SHOULD_NAVIGATE_TO_TERMS_RESPONSE',
    SHOULD_NAVIGATE_TO_TERMS_RESET: 'SHOULD_NAVIGATE_TO_TERMS_RESET',

    //should navigate to profile 
    SHOULD_NAVIGATE_TO_PROFILE_REQUEST: 'SHOULD_NAVIGATE_TO_PROFILE_REQUEST',
    SHOULD_NAVIGATE_TO_PROFILE_RESPONSE: 'SHOULD_NAVIGATE_TO_PROFILE_RESPONSE',
    SHOULD_NAVIGATE_TO_PROFILE_RESET: 'SHOULD_NAVIGATE_TO_PROFILE_RESET',

    //has app switched to foreground after specified time
    HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_REQUEST: 'HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_REQUEST',
    HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_RESPONSE: 'HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_RESPONSE',
    HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_RESET: 'HAS_APP_SWITCHED_TO_FOREGROUND_AFTER_SPECIFIED_TIME_RESET',

    //time when last api call made
    IS_APP_INACTIVE_FOR_SPECIFIED_TIME_REQUEST: 'IS_APP_INACTIVE_FOR_SPECIFIED_TIME_REQUEST',
    IS_APP_INACTIVE_FOR_SPECIFIED_TIME_RESPONSE: 'IS_APP_INACTIVE_FOR_SPECIFIED_TIME_RESPONSE',
    IS_APP_INACTIVE_FOR_SPECIFIED_TIME_RESET: 'IS_APP_INACTIVE_FOR_SPECIFIED_TIME_RESET',


}