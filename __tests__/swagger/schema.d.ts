interface IRootObject {
    swagger: string;
    info: IInfo;
    host: string;
    basePath: string;
    schemes: string[];
    tags: ITagsItem[];
    paths: IPaths;
    definitions: IDefinitions;
}

interface IInfo {
    version: string;
    title: string;
}

interface ITagsItem {
    name: string;
    description: string;
}

interface IPaths {
    '/V1/store/storeViews': {
        get: IGet;
    };
    '/V1/store/storeGroups': {
        get: IGet;
    };
    '/V1/store/websites': {
        get: IGet;
    };
    '/V1/store/storeConfigs': {
        get: IGet;
    };
    '/V1/directory/currency': {
        get: IGet;
    };
    '/V1/directory/countries': {
        get: IGet;
    };
    '/V1/directory/countries/{countryId}': {
        get: IGet;
    };
    '/V1/customers': {
        post: IPost;
    };
    '/V1/customers/{customerId}/password/resetLinkToken/{resetPasswordLinkToken}': {
        get: IGet;
    };
    '/V1/customers/password': {
        put: IPut;
    };
    '/V1/customers/isEmailAvailable': {
        post: IPost;
    };
    '/V1/cmsPage/{pageId}': {
        get: IGet;
    };
    '/V1/cmsBlock/{blockId}': {
        get: IGet;
    };
    '/V1/products': {
        get: IGet;
    };
    '/V1/products/{sku}': {
        get: IGet;
    };
    '/V1/products/attributes/{attributeCode}': {
        get: IGet;
    };
    '/V1/products/types': {
        get: IGet;
    };
    '/V1/products/attribute-sets/sets/list': {
        get: IGet;
    };
    '/V1/products/attribute-sets/{attributeSetId}': {
        get: IGet;
    };
    '/V1/products/attribute-sets/{attributeSetId}/attributes': {
        get: IGet;
    };
    '/V1/products/attribute-sets/groups/list': {
        get: IGet;
    };
    '/V1/products/attributes/{attributeCode}/options': {
        get: IGet;
    };
    '/V1/products/media/types/{attributeSetName}': {
        get: IGet;
    };
    '/V1/products/{sku}/media/{entryId}': {
        get: IGet;
    };
    '/V1/products/{sku}/media': {
        get: IGet;
    };
    '/V1/products/{sku}/group-prices/{customerGroupId}/tiers': {
        get: IGet;
    };
    '/V1/categories/{categoryId}': {
        get: IGet;
    };
    '/V1/categories': {
        get: IGet;
    };
    '/V1/products/{sku}/options': {
        get: IGet;
    };
    '/V1/products/{sku}/options/{optionId}': {
        get: IGet;
    };
    '/V1/products/links/types': {
        get: IGet;
    };
    '/V1/products/links/{type}/attributes': {
        get: IGet;
    };
    '/V1/products/{sku}/links/{type}': {
        get: IGet;
    };
    '/V1/categories/{categoryId}/products': {
        get: IGet;
    };
    '/V1/stockStatuses/{productSku}': {
        get: IGet;
    };
    '/V1/search': {
        get: IGet;
    };
    '/V1/guest-carts/{cartId}': {
        get: IGet;
    };
    '/V1/guest-carts': {
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/order': {
        put: IPut;
    };
    '/V1/guest-carts/{cartId}/shipping-methods': {
        get: IGet;
    };
    '/V1/guest-carts/{cartId}/estimate-shipping-methods': {
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/items': {
        get: IGet;
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/items/{itemId}': {
        put: IPut;
        'delete': {
            tags: string[];
            description: string;
            operationId: string;
            parameters: IParametersItem[];
            responses: IResponses;
        };
    };
    '/V1/guest-carts/{cartId}/selected-payment-method': {
        get: IGet;
        put: IPut;
    };
    '/V1/guest-carts/{cartId}/payment-methods': {
        get: IGet;
    };
    '/V1/guest-carts/{cartId}/billing-address': {
        get: IGet;
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/coupons': {
        get: IGet;
        'delete': {
            tags: string[];
            description: string;
            operationId: string;
            parameters: IParametersItem[];
            responses: IResponses;
        };
    };
    '/V1/guest-carts/{cartId}/coupons/{couponCode}': {
        put: IPut;
    };
    '/V1/guest-carts/{cartId}/collect-totals': {
        put: IPut;
    };
    '/V1/guest-carts/{cartId}/totals': {
        get: IGet;
    };
    '/V1/guest-carts/{cartId}/shipping-information': {
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/totals-information': {
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/payment-information': {
        post: IPost;
        get: IGet;
    };
    '/V1/guest-carts/{cartId}/set-payment-information': {
        post: IPost;
    };
    '/V1/configurable-products/{sku}/children': {
        get: IGet;
    };
    '/V1/configurable-products/{sku}/options/{id}': {
        get: IGet;
    };
    '/V1/configurable-products/{sku}/options/all': {
        get: IGet;
    };
    '/V1/carts/guest-carts/{cartId}/giftCards/{giftCardCode}': {
        'delete': {
            tags: string[];
            description: string;
            operationId: string;
            parameters: IParametersItem[];
            responses: IResponses;
        };
    };
    '/V1/carts/guest-carts/{cartId}/giftCards': {
        post: IPost;
    };
    '/V1/carts/guest-carts/{cartId}/checkGiftCard/{giftCardCode}': {
        get: IGet;
    };
    '/V1/guest-giftregistry/{cartId}/estimate-shipping-methods': {
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/gift-message': {
        get: IGet;
        post: IPost;
    };
    '/V1/guest-carts/{cartId}/gift-message/{itemId}': {
        get: IGet;
        post: IPost;
    };
    '/V1/integration/admin/token': {
        post: IPost;
    };
    '/V1/integration/customer/token': {
        post: IPost;
    };
    '/V1/worldpay-guest-carts/{cartId}/payment-information': {
        post: IPost;
    };
}

interface IGet {
    tags: string[];
    description: string;
    operationId: string;
    responses: IResponses;
    parameters?: IParametersItem[];
}

interface IResponses {
    200: I200;
    'default': {
        description: string;
        schema: ISchema;
    };
    400?: I400;
    500?: I500;
}

interface I200 {
    description: string;
    schema: ISchema;
}

interface ISchema {
    type?: string;
    items?: IItems;
    $ref?: string;
    required?: string[];
    properties?: IProperties;
    description?: string;
}

interface IItems {
    $ref?: string;
    type?: string;
    description?: string;
    items?: IItems;
}

interface IParametersItem {
    name: string;
    'in': string;
    type?: string;
    items?: IItems;
    required?: boolean;
    schema?: ISchema;
    description?: string;
}

interface I400 {
    description: string;
    schema: ISchema;
}

interface IPost {
    tags: string[];
    description: string;
    operationId: string;
    parameters?: IParametersItem[];
    responses: IResponses;
}

interface IProperties {
    customer?: ICustomer;
    password?: IPassword;
    redirectUrl?: IRedirectUrl;
    email?: IEmail;
    template?: ITemplate;
    websiteId?: IWebsiteId;
    customerEmail?: ICustomerEmail;
    paymentMethod?: IPaymentMethod;
    address?: IAddress;
    cartItem?: ICartItem;
    method?: IMethod;
    shippingCarrierCode?: IShippingCarrierCode;
    shippingMethodCode?: IShippingMethodCode;
    additionalData?: IAdditionalData;
    addressInformation?: IAddressInformation;
    billingAddress?: IBillingAddress;
    giftCardAccountData?: IGiftCardAccountData;
    registryId?: IRegistryId;
    giftMessage?: IGiftMessage;
    username?: IUsername;
    message?: IMessage;
    errors?: IErrors;
    code?: ICode;
    parameters?: IParameters;
    trace?: ITrace;
    resources?: IResources;
    fieldName?: IFieldName;
    fieldValue?: IFieldValue;
    id?: IId;
    name?: IName;
    website_id?: IWebsite_id;
    store_group_id?: IStore_group_id;
    extension_attributes?: IExtension_attributes;
    root_category_id?: IRoot_category_id;
    default_store_id?: IDefault_store_id;
    default_group_id?: IDefault_group_id;
    locale?: ILocale;
    base_currency_code?: IBase_currency_code;
    default_display_currency_code?: IDefault_display_currency_code;
    timezone?: ITimezone;
    weight_unit?: IWeight_unit;
    base_url?: IBase_url;
    base_link_url?: IBase_link_url;
    base_static_url?: IBase_static_url;
    base_media_url?: IBase_media_url;
    secure_base_url?: ISecure_base_url;
    secure_base_link_url?: ISecure_base_link_url;
    secure_base_static_url?: ISecure_base_static_url;
    secure_base_media_url?: ISecure_base_media_url;
    base_currency_symbol?: IBase_currency_symbol;
    default_display_currency_symbol?: IDefault_display_currency_symbol;
    available_currency_codes?: IAvailable_currency_codes;
    exchange_rates?: IExchange_rates;
    currency_to?: ICurrency_to;
    rate?: IRate;
    two_letter_abbreviation?: ITwo_letter_abbreviation;
    three_letter_abbreviation?: IThree_letter_abbreviation;
    full_name_locale?: IFull_name_locale;
    full_name_english?: IFull_name_english;
    available_regions?: IAvailable_regions;
    group_id?: IGroup_id;
    default_billing?: IDefault_billing;
    default_shipping?: IDefault_shipping;
    confirmation?: IConfirmation;
    created_at?: ICreated_at;
    updated_at?: IUpdated_at;
    created_in?: ICreated_in;
    dob?: IDob;
    firstname?: IFirstname;
    lastname?: ILastname;
    middlename?: IMiddlename;
    prefix?: IPrefix;
    suffix?: ISuffix;
    gender?: IGender;
    store_id?: IStore_id;
    taxvat?: ITaxvat;
    addresses?: IAddresses;
    disable_auto_group_change?: IDisable_auto_group_change;
    custom_attributes?: ICustom_attributes;
    customer_id?: ICustomer_id;
    region?: IRegion;
    region_id?: IRegion_id;
    country_id?: ICountry_id;
    street?: IStreet;
    company?: ICompany;
    telephone?: ITelephone;
    fax?: IFax;
    postcode?: IPostcode;
    city?: ICity;
    vat_id?: IVat_id;
    region_code?: IRegion_code;
    attribute_code?: IAttribute_code;
    value?: IValue;
    is_subscribed?: IIs_subscribed;
    identifier?: IIdentifier;
    title?: ITitle;
    page_layout?: IPage_layout;
    meta_title?: IMeta_title;
    meta_keywords?: IMeta_keywords;
    meta_description?: IMeta_description;
    content_heading?: IContent_heading;
    content?: IContent;
    creation_time?: ICreation_time;
    update_time?: IUpdate_time;
    sort_order?: ISort_order;
    layout_update_xml?: ILayout_update_xml;
    custom_theme?: ICustom_theme;
    custom_root_template?: ICustom_root_template;
    custom_layout_update_xml?: ICustom_layout_update_xml;
    custom_theme_from?: ICustom_theme_from;
    custom_theme_to?: ICustom_theme_to;
    active?: IActive;
    items?: IItems;
    search_criteria?: ISearch_criteria;
    total_count?: ITotal_count;
    sku?: ISku;
    attribute_set_id?: IAttribute_set_id;
    price?: IPrice;
    status?: IStatus;
    visibility?: IVisibility;
    type_id?: IType_id;
    weight?: IWeight;
    product_links?: IProduct_links;
    options?: IOptions;
    media_gallery_entries?: IMedia_gallery_entries;
    tier_prices?: ITier_prices;
    stock_item?: IStock_item;
    bundle_product_options?: IBundle_product_options;
    downloadable_product_links?: IDownloadable_product_links;
    downloadable_product_samples?: IDownloadable_product_samples;
    giftcard_amounts?: IGiftcard_amounts;
    configurable_product_options?: IConfigurable_product_options;
    configurable_product_links?: IConfigurable_product_links;
    item_id?: IItem_id;
    product_id?: IProduct_id;
    stock_id?: IStock_id;
    qty?: IQty;
    is_in_stock?: IIs_in_stock;
    is_qty_decimal?: IIs_qty_decimal;
    show_default_notification_message?: IShow_default_notification_message;
    use_config_min_qty?: IUse_config_min_qty;
    min_qty?: IMin_qty;
    use_config_min_sale_qty?: IUse_config_min_sale_qty;
    min_sale_qty?: IMin_sale_qty;
    use_config_max_sale_qty?: IUse_config_max_sale_qty;
    max_sale_qty?: IMax_sale_qty;
    use_config_backorders?: IUse_config_backorders;
    backorders?: IBackorders;
    use_config_notify_stock_qty?: IUse_config_notify_stock_qty;
    notify_stock_qty?: INotify_stock_qty;
    use_config_qty_increments?: IUse_config_qty_increments;
    qty_increments?: IQty_increments;
    use_config_enable_qty_inc?: IUse_config_enable_qty_inc;
    enable_qty_increments?: IEnable_qty_increments;
    use_config_manage_stock?: IUse_config_manage_stock;
    manage_stock?: IManage_stock;
    low_stock_date?: ILow_stock_date;
    is_decimal_divided?: IIs_decimal_divided;
    stock_status_changed_auto?: IStock_status_changed_auto;
    option_id?: IOption_id;
    required?: IRequired;
    type?: IType;
    position?: IPosition;
    is_default?: IIs_default;
    price_type?: IPrice_type;
    can_change_quantity?: ICan_change_quantity;
    is_shareable?: IIs_shareable;
    number_of_downloads?: INumber_of_downloads;
    link_type?: ILink_type;
    link_file?: ILink_file;
    link_file_content?: ILink_file_content;
    link_url?: ILink_url;
    sample_type?: ISample_type;
    sample_file?: ISample_file;
    sample_file_content?: ISample_file_content;
    sample_url?: ISample_url;
    file_data?: IFile_data;
    attribute_id?: IAttribute_id;
    website_value?: IWebsite_value;
    label?: ILabel;
    is_use_default?: IIs_use_default;
    values?: IValues;
    value_index?: IValue_index;
    linked_product_sku?: ILinked_product_sku;
    linked_product_type?: ILinked_product_type;
    product_sku?: IProduct_sku;
    is_require?: IIs_require;
    file_extension?: IFile_extension;
    max_characters?: IMax_characters;
    image_size_x?: IImage_size_x;
    image_size_y?: IImage_size_y;
    option_type_id?: IOption_type_id;
    media_type?: IMedia_type;
    disabled?: IDisabled;
    types?: ITypes;
    file?: IFile;
    base64_encoded_data?: IBase64_encoded_data;
    video_content?: IVideo_content;
    video_provider?: IVideo_provider;
    video_url?: IVideo_url;
    video_title?: IVideo_title;
    video_description?: IVideo_description;
    video_metadata?: IVideo_metadata;
    customer_group_id?: ICustomer_group_id;
    filter_groups?: IFilter_groups;
    sort_orders?: ISort_orders;
    page_size?: IPage_size;
    current_page?: ICurrent_page;
    filters?: IFilters;
    field?: IField;
    condition_type?: ICondition_type;
    direction?: IDirection;
    is_wysiwyg_enabled?: IIs_wysiwyg_enabled;
    is_html_allowed_on_front?: IIs_html_allowed_on_front;
    used_for_sort_by?: IUsed_for_sort_by;
    is_filterable?: IIs_filterable;
    is_filterable_in_search?: IIs_filterable_in_search;
    is_used_in_grid?: IIs_used_in_grid;
    is_visible_in_grid?: IIs_visible_in_grid;
    is_filterable_in_grid?: IIs_filterable_in_grid;
    apply_to?: IApply_to;
    is_searchable?: IIs_searchable;
    is_visible_in_advanced_search?: IIs_visible_in_advanced_search;
    is_comparable?: IIs_comparable;
    is_used_for_promo_rules?: IIs_used_for_promo_rules;
    is_visible_on_front?: IIs_visible_on_front;
    used_in_product_listing?: IUsed_in_product_listing;
    is_visible?: IIs_visible;
    scope?: IScope;
    frontend_input?: IFrontend_input;
    entity_type_id?: IEntity_type_id;
    is_required?: IIs_required;
    is_user_defined?: IIs_user_defined;
    default_frontend_label?: IDefault_frontend_label;
    frontend_labels?: IFrontend_labels;
    note?: INote;
    backend_type?: IBackend_type;
    backend_model?: IBackend_model;
    source_model?: ISource_model;
    default_value?: IDefault_value;
    is_unique?: IIs_unique;
    frontend_class?: IFrontend_class;
    validation_rules?: IValidation_rules;
    store_labels?: IStore_labels;
    key?: IKey;
    attribute_set_name?: IAttribute_set_name;
    attribute_group_id?: IAttribute_group_id;
    attribute_group_name?: IAttribute_group_name;
    attribute_group_code?: IAttribute_group_code;
    parent_id?: IParent_id;
    is_active?: IIs_active;
    level?: ILevel;
    children?: IChildren;
    path?: IPath;
    available_sort_by?: IAvailable_sort_by;
    include_in_menu?: IInclude_in_menu;
    product_count?: IProduct_count;
    children_data?: IChildren_data;
    category_id?: ICategory_id;
    stock_status?: IStock_status;
    aggregations?: IAggregations;
    buckets?: IBuckets;
    bucket_names?: IBucket_names;
    metrics?: IMetrics;
    request_name?: IRequest_name;
    converted_at?: IConverted_at;
    is_virtual?: IIs_virtual;
    items_count?: IItems_count;
    items_qty?: IItems_qty;
    billing_address?: IBilling_address;
    reserved_order_id?: IReserved_order_id;
    orig_order_id?: IOrig_order_id;
    currency?: ICurrency;
    customer_is_guest?: ICustomer_is_guest;
    customer_note?: ICustomer_note;
    customer_note_notify?: ICustomer_note_notify;
    customer_tax_class_id?: ICustomer_tax_class_id;
    product_type?: IProduct_type;
    quote_id?: IQuote_id;
    product_option?: IProduct_option;
    custom_options?: ICustom_options;
    bundle_options?: IBundle_options;
    downloadable_option?: IDownloadable_option;
    giftcard_item_option?: IGiftcard_item_option;
    configurable_item_options?: IConfigurable_item_options;
    option_value?: IOption_value;
    file_info?: IFile_info;
    option_qty?: IOption_qty;
    option_selections?: IOption_selections;
    downloadable_links?: IDownloadable_links;
    giftcard_amount?: IGiftcard_amount;
    custom_giftcard_amount?: ICustom_giftcard_amount;
    giftcard_sender_name?: IGiftcard_sender_name;
    giftcard_recipient_name?: IGiftcard_recipient_name;
    giftcard_sender_email?: IGiftcard_sender_email;
    giftcard_recipient_email?: IGiftcard_recipient_email;
    giftcard_message?: IGiftcard_message;
    same_as_billing?: ISame_as_billing;
    customer_address_id?: ICustomer_address_id;
    save_in_address_book?: ISave_in_address_book;
    gift_registry_id?: IGift_registry_id;
    global_currency_code?: IGlobal_currency_code;
    store_currency_code?: IStore_currency_code;
    quote_currency_code?: IQuote_currency_code;
    store_to_base_rate?: IStore_to_base_rate;
    store_to_quote_rate?: IStore_to_quote_rate;
    base_to_global_rate?: IBase_to_global_rate;
    base_to_quote_rate?: IBase_to_quote_rate;
    shipping_assignments?: IShipping_assignments;
    shipping?: IShipping;
    po_number?: IPo_number;
    additional_data?: IAdditional_data;
    agreement_ids?: IAgreement_ids;
    carrier_code?: ICarrier_code;
    method_code?: IMethod_code;
    carrier_title?: ICarrier_title;
    method_title?: IMethod_title;
    amount?: IAmount;
    base_amount?: IBase_amount;
    available?: IAvailable;
    error_message?: IError_message;
    price_excl_tax?: IPrice_excl_tax;
    price_incl_tax?: IPrice_incl_tax;
    gift_messages?: IGift_messages;
    gift_message_id?: IGift_message_id;
    sender?: ISender;
    recipient?: IRecipient;
    entity_id?: IEntity_id;
    entity_type?: IEntity_type;
    wrapping_id?: IWrapping_id;
    wrapping_allow_gift_receipt?: IWrapping_allow_gift_receipt;
    wrapping_add_printed_card?: IWrapping_add_printed_card;
    grand_total?: IGrand_total;
    base_grand_total?: IBase_grand_total;
    subtotal?: ISubtotal;
    base_subtotal?: IBase_subtotal;
    discount_amount?: IDiscount_amount;
    base_discount_amount?: IBase_discount_amount;
    subtotal_with_discount?: ISubtotal_with_discount;
    base_subtotal_with_discount?: IBase_subtotal_with_discount;
    shipping_amount?: IShipping_amount;
    base_shipping_amount?: IBase_shipping_amount;
    shipping_discount_amount?: IShipping_discount_amount;
    base_shipping_discount_amount?: IBase_shipping_discount_amount;
    tax_amount?: ITax_amount;
    base_tax_amount?: IBase_tax_amount;
    weee_tax_applied_amount?: IWeee_tax_applied_amount;
    shipping_tax_amount?: IShipping_tax_amount;
    base_shipping_tax_amount?: IBase_shipping_tax_amount;
    subtotal_incl_tax?: ISubtotal_incl_tax;
    base_subtotal_incl_tax?: IBase_subtotal_incl_tax;
    shipping_incl_tax?: IShipping_incl_tax;
    base_shipping_incl_tax?: IBase_shipping_incl_tax;
    coupon_code?: ICoupon_code;
    total_segments?: ITotal_segments;
    base_price?: IBase_price;
    row_total?: IRow_total;
    base_row_total?: IBase_row_total;
    row_total_with_discount?: IRow_total_with_discount;
    tax_percent?: ITax_percent;
    discount_percent?: IDiscount_percent;
    base_price_incl_tax?: IBase_price_incl_tax;
    row_total_incl_tax?: IRow_total_incl_tax;
    base_row_total_incl_tax?: IBase_row_total_incl_tax;
    weee_tax_applied?: IWeee_tax_applied;
    area?: IArea;
    tax_grandtotal_details?: ITax_grandtotal_details;
    gift_cards?: IGift_cards;
    gw_order_id?: IGw_order_id;
    gw_item_ids?: IGw_item_ids;
    gw_allow_gift_receipt?: IGw_allow_gift_receipt;
    gw_add_card?: IGw_add_card;
    gw_price?: IGw_price;
    gw_base_price?: IGw_base_price;
    gw_items_price?: IGw_items_price;
    gw_items_base_price?: IGw_items_base_price;
    gw_card_price?: IGw_card_price;
    gw_card_base_price?: IGw_card_base_price;
    gw_base_tax_amount?: IGw_base_tax_amount;
    gw_tax_amount?: IGw_tax_amount;
    gw_items_base_tax_amount?: IGw_items_base_tax_amount;
    gw_items_tax_amount?: IGw_items_tax_amount;
    gw_card_base_tax_amount?: IGw_card_base_tax_amount;
    gw_card_tax_amount?: IGw_card_tax_amount;
    gw_price_incl_tax?: IGw_price_incl_tax;
    gw_base_price_incl_tax?: IGw_base_price_incl_tax;
    gw_card_price_incl_tax?: IGw_card_price_incl_tax;
    gw_card_base_price_incl_tax?: IGw_card_base_price_incl_tax;
    gw_items_price_incl_tax?: IGw_items_price_incl_tax;
    gw_items_base_price_incl_tax?: IGw_items_base_price_incl_tax;
    rates?: IRates;
    percent?: IPercent;
    base_customer_balance_amount?: IBase_customer_balance_amount;
    customer_balance_amount?: ICustomer_balance_amount;
    reward_points_balance?: IReward_points_balance;
    reward_currency_amount?: IReward_currency_amount;
    base_reward_currency_amount?: IBase_reward_currency_amount;
    shipping_address?: IShipping_address;
    shipping_method_code?: IShipping_method_code;
    shipping_carrier_code?: IShipping_carrier_code;
    payment_methods?: IPayment_methods;
    totals?: ITotals;
    gift_cards_amount?: IGift_cards_amount;
    base_gift_cards_amount?: IBase_gift_cards_amount;
    gift_cards_amount_used?: IGift_cards_amount_used;
    base_gift_cards_amount_used?: IBase_gift_cards_amount_used;
}

interface ICustomer {
    $ref: string;
}

interface IPassword {
    type: string;
}

interface IRedirectUrl {
    type: string;
}

interface I500 {
    description: string;
    schema: ISchema;
}

interface IPut {
    tags: string[];
    description: string;
    operationId: string;
    parameters: IParametersItem[];
    responses: IResponses;
}

interface IEmail {
    type: string;
    description?: string;
}

interface ITemplate {
    type: string;
}

interface IWebsiteId {
    type: string;
    description?: string;
}

interface ICustomerEmail {
    type: string;
}

interface IPaymentMethod {
    $ref: string;
}

interface IAddress {
    $ref: string;
}

interface ICartItem {
    $ref: string;
}

interface IMethod {
    $ref?: string;
    type?: string;
    description?: string;
}

interface IShippingCarrierCode {
    type: string;
    description: string;
}

interface IShippingMethodCode {
    type: string;
    description: string;
}

interface IAdditionalData {
    $ref: string;
}

interface IAddressInformation {
    $ref: string;
}

interface IBillingAddress {
    $ref: string;
}

interface IGiftCardAccountData {
    $ref: string;
}

interface IRegistryId {
    type: string;
    description: string;
}

interface IGiftMessage {
    $ref: string;
}

interface IUsername {
    type: string;
}

interface IDefinitions {
    'error-response': {
        type: string;
        properties: IProperties;
        required: string[];
    };
    'error-errors': {
        type: string;
        description: string;
        items: IItems;
    };
    'error-errors-item': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'error-parameters': {
        type: string;
        description: string;
        items: IItems;
    };
    'error-parameters-item': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'store-data-store-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'store-data-store-extension-interface': {
        type: string;
        description: string;
    };
    'store-data-group-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'store-data-group-extension-interface': {
        type: string;
        description: string;
    };
    'store-data-website-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'store-data-website-extension-interface': {
        type: string;
        description: string;
    };
    'store-data-store-config-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'store-data-store-config-extension-interface': {
        type: string;
        description: string;
    };
    'directory-data-currency-information-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'directory-data-exchange-rate-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'directory-data-exchange-rate-extension-interface': {
        type: string;
        description: string;
    };
    'directory-data-currency-information-extension-interface': {
        type: string;
        description: string;
    };
    'directory-data-country-information-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'directory-data-region-information-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'directory-data-region-information-extension-interface': {
        type: string;
        description: string;
    };
    'directory-data-country-information-extension-interface': {
        type: string;
        description: string;
    };
    'customer-data-customer-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'customer-data-address-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'customer-data-region-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'customer-data-region-extension-interface': {
        type: string;
        description: string;
    };
    'customer-data-address-extension-interface': {
        type: string;
        description: string;
    };
    'framework-attribute-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'customer-data-customer-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'cms-data-page-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'cms-data-block-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-search-results-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'catalog-inventory-data-stock-item-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-inventory-data-stock-item-extension-interface': {
        type: string;
        description: string;
    };
    'bundle-data-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'bundle-data-link-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'bundle-data-link-extension-interface': {
        type: string;
        description: string;
    };
    'bundle-data-option-extension-interface': {
        type: string;
        description: string;
    };
    'downloadable-data-link-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'downloadable-data-file-content-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'downloadable-data-file-content-extension-interface': {
        type: string;
        description: string;
    };
    'downloadable-data-link-extension-interface': {
        type: string;
        description: string;
    };
    'downloadable-data-sample-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'downloadable-data-sample-extension-interface': {
        type: string;
        description: string;
    };
    'gift-card-data-giftcard-amount-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'gift-card-data-giftcard-amount-extension-interface': {
        type: string;
        description: string;
    };
    'configurable-product-data-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'configurable-product-data-option-value-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'configurable-product-data-option-value-extension-interface': {
        type: string;
        description: string;
    };
    'configurable-product-data-option-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-data-product-link-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-link-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'catalog-data-product-custom-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-custom-option-values-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-custom-option-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-data-product-attribute-media-gallery-entry-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-data-image-content-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-attribute-media-gallery-entry-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'framework-data-video-content-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-tier-price-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-tier-price-extension-interface': {
        type: string;
        description: string;
    };
    'framework-search-criteria-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-filter-group': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'framework-filter': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-sort-order': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-attribute-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-eav-attribute-extension-interface': {
        type: string;
        description: string;
    };
    'eav-data-attribute-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'eav-data-attribute-option-label-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'eav-data-attribute-frontend-label-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'eav-data-attribute-validation-rule-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-type-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-type-extension-interface': {
        type: string;
        description: string;
    };
    'eav-data-attribute-set-search-results-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'eav-data-attribute-set-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'eav-data-attribute-set-extension-interface': {
        type: string;
        description: string;
    };
    'eav-data-attribute-group-search-results-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'eav-data-attribute-group-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'eav-data-attribute-group-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'catalog-data-category-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-category-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-data-category-tree-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-link-type-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-link-type-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-data-product-link-attribute-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-product-link-attribute-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-data-category-product-link-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-category-product-link-extension-interface': {
        type: string;
        description: string;
    };
    'catalog-inventory-data-stock-status-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-inventory-data-stock-status-extension-interface': {
        type: string;
        description: string;
    };
    'framework-search-search-result-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-document-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-aggregation-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-bucket-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-aggregation-value-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'framework-search-search-criteria-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-cart-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-cart-item-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-product-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-product-option-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'catalog-data-custom-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'catalog-data-custom-option-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'bundle-data-bundle-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'bundle-data-bundle-option-extension-interface': {
        type: string;
        description: string;
    };
    'downloadable-data-downloadable-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'gift-card-data-gift-card-option-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'gift-card-data-gift-card-option-extension-interface': {
        type: string;
        description: string;
    };
    'configurable-product-data-configurable-item-option-value-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'configurable-product-data-configurable-item-option-value-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-cart-item-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-address-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-address-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-currency-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-currency-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-cart-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-shipping-assignment-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-shipping-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-shipping-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-shipping-assignment-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-payment-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-payment-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-shipping-method-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-shipping-method-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-payment-method-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-totals-additional-data-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-totals-additional-data-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'gift-message-data-message-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'gift-message-data-message-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'quote-data-totals-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-totals-item-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-totals-item-extension-interface': {
        type: string;
        description: string;
    };
    'quote-data-total-segment-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-total-segment-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'tax-data-grand-total-details-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'tax-data-grand-total-rates-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'quote-data-totals-extension-interface': {
        type: string;
        description: string;
        properties: IProperties;
    };
    'checkout-data-shipping-information-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'checkout-data-shipping-information-extension-interface': {
        type: string;
        description: string;
    };
    'checkout-data-payment-details-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'checkout-data-payment-details-extension-interface': {
        type: string;
        description: string;
    };
    'checkout-data-totals-information-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'checkout-data-totals-information-extension-interface': {
        type: string;
        description: string;
    };
    'gift-card-account-data-gift-card-account-interface': {
        type: string;
        description: string;
        properties: IProperties;
        required: string[];
    };
    'gift-card-account-data-gift-card-account-extension-interface': {
        type: string;
        description: string;
    };
}

interface IMessage {
    type: string;
    description: string;
}

interface IErrors {
    $ref: string;
}

interface ICode {
    type: string;
    description?: string;
}

interface IParameters {
    $ref: string;
}

interface ITrace {
    type: string;
    description: string;
}

interface IResources {
    type: string;
    description: string;
}

interface IFieldName {
    type: string;
    description: string;
}

interface IFieldValue {
    type: string;
    description: string;
}

interface IId {
    type: string;
    description?: string;
}

interface IName {
    type: string;
    description?: string;
}

interface IWebsite_id {
    type: string;
    description?: string;
}

interface IStore_group_id {
    type: string;
}

interface IExtension_attributes {
    $ref: string;
}

interface IRoot_category_id {
    type: string;
}

interface IDefault_store_id {
    type: string;
}

interface IDefault_group_id {
    type: string;
}

interface ILocale {
    type: string;
    description: string;
}

interface IBase_currency_code {
    type: string;
    description: string;
}

interface IDefault_display_currency_code {
    type: string;
    description: string;
}

interface ITimezone {
    type: string;
    description: string;
}

interface IWeight_unit {
    type: string;
    description: string;
}

interface IBase_url {
    type: string;
    description: string;
}

interface IBase_link_url {
    type: string;
    description: string;
}

interface IBase_static_url {
    type: string;
    description: string;
}

interface IBase_media_url {
    type: string;
    description: string;
}

interface ISecure_base_url {
    type: string;
    description: string;
}

interface ISecure_base_link_url {
    type: string;
    description: string;
}

interface ISecure_base_static_url {
    type: string;
    description: string;
}

interface ISecure_base_media_url {
    type: string;
    description: string;
}

interface IBase_currency_symbol {
    type: string;
    description: string;
}

interface IDefault_display_currency_symbol {
    type: string;
    description: string;
}

interface IAvailable_currency_codes {
    type: string;
    description: string;
    items: IItems;
}

interface IExchange_rates {
    type: string;
    description: string;
    items: IItems;
}

interface ICurrency_to {
    type: string;
    description: string;
}

interface IRate {
    type: string;
    description: string;
}

interface ITwo_letter_abbreviation {
    type: string;
    description: string;
}

interface IThree_letter_abbreviation {
    type: string;
    description: string;
}

interface IFull_name_locale {
    type: string;
    description: string;
}

interface IFull_name_english {
    type: string;
    description: string;
}

interface IAvailable_regions {
    type: string;
    description: string;
    items: IItems;
}

interface IGroup_id {
    type: string;
    description: string;
}

interface IDefault_billing {
    type: string;
    description: string;
}

interface IDefault_shipping {
    type: string;
    description: string;
}

interface IConfirmation {
    type: string;
    description: string;
}

interface ICreated_at {
    type: string;
    description?: string;
}

interface IUpdated_at {
    type: string;
    description?: string;
}

interface ICreated_in {
    type: string;
    description: string;
}

interface IDob {
    type: string;
    description: string;
}

interface IFirstname {
    type: string;
    description: string;
}

interface ILastname {
    type: string;
    description: string;
}

interface IMiddlename {
    type: string;
    description: string;
}

interface IPrefix {
    type: string;
    description: string;
}

interface ISuffix {
    type: string;
    description: string;
}

interface IGender {
    type: string;
    description: string;
}

interface IStore_id {
    type: string;
    description: string;
}

interface ITaxvat {
    type: string;
    description: string;
}

interface IAddresses {
    type: string;
    description: string;
    items: IItems;
}

interface IDisable_auto_group_change {
    type: string;
    description: string;
}

interface ICustom_attributes {
    type: string;
    description: string;
    items: IItems;
}

interface ICustomer_id {
    type: string;
    description: string;
}

interface IRegion {
    $ref?: string;
    type?: string;
    description?: string;
}

interface IRegion_id {
    type: string;
    description: string;
}

interface ICountry_id {
    type: string;
    description: string;
}

interface IStreet {
    type: string;
    description: string;
    items: IItems;
}

interface ICompany {
    type: string;
    description: string;
}

interface ITelephone {
    type: string;
    description: string;
}

interface IFax {
    type: string;
    description: string;
}

interface IPostcode {
    type: string;
    description: string;
}

interface ICity {
    type: string;
    description: string;
}

interface IVat_id {
    type: string;
    description: string;
}

interface IRegion_code {
    type: string;
    description: string;
}

interface IAttribute_code {
    type: string;
    description: string;
}

interface IValue {
    type: string;
    description?: string;
}

interface IIs_subscribed {
    type: string;
}

interface IIdentifier {
    type: string;
    description: string;
}

interface ITitle {
    type: string;
    description?: string;
}

interface IPage_layout {
    type: string;
    description: string;
}

interface IMeta_title {
    type: string;
    description: string;
}

interface IMeta_keywords {
    type: string;
    description: string;
}

interface IMeta_description {
    type: string;
    description: string;
}

interface IContent_heading {
    type: string;
    description: string;
}

interface IContent {
    type?: string;
    description?: string;
    $ref?: string;
}

interface ICreation_time {
    type: string;
    description: string;
}

interface IUpdate_time {
    type: string;
    description: string;
}

interface ISort_order {
    type: string;
    description?: string;
}

interface ILayout_update_xml {
    type: string;
    description: string;
}

interface ICustom_theme {
    type: string;
    description: string;
}

interface ICustom_root_template {
    type: string;
    description: string;
}

interface ICustom_layout_update_xml {
    type: string;
    description: string;
}

interface ICustom_theme_from {
    type: string;
    description: string;
}

interface ICustom_theme_to {
    type: string;
    description: string;
}

interface IActive {
    type: string;
    description: string;
}

interface ISearch_criteria {
    $ref: string;
}

interface ITotal_count {
    type: string;
    description: string;
}

interface ISku {
    type: string;
    description?: string;
}

interface IAttribute_set_id {
    type: string;
    description: string;
}

interface IPrice {
    type: string;
    description: string;
}

interface IStatus {
    type: string;
    description: string;
}

interface IVisibility {
    type: string;
    description: string;
}

interface IType_id {
    type: string;
    description: string;
}

interface IWeight {
    type: string;
    description: string;
}

interface IProduct_links {
    type: string;
    description: string;
    items: IItems;
}

interface IOptions {
    type: string;
    description: string;
    items?: IItems;
}

interface IMedia_gallery_entries {
    type: string;
    description: string;
    items: IItems;
}

interface ITier_prices {
    type: string;
    description: string;
    items: IItems;
}

interface IStock_item {
    $ref: string;
}

interface IBundle_product_options {
    type: string;
    items: IItems;
}

interface IDownloadable_product_links {
    type: string;
    items: IItems;
}

interface IDownloadable_product_samples {
    type: string;
    items: IItems;
}

interface IGiftcard_amounts {
    type: string;
    items: IItems;
}

interface IConfigurable_product_options {
    type: string;
    items: IItems;
}

interface IConfigurable_product_links {
    type: string;
    items: IItems;
}

interface IItem_id {
    type: string;
    description?: string;
}

interface IProduct_id {
    type: string;
}

interface IStock_id {
    type: string;
    description?: string;
}

interface IQty {
    type: string;
    description?: string;
}

interface IIs_in_stock {
    type: string;
    description: string;
}

interface IIs_qty_decimal {
    type: string;
}

interface IShow_default_notification_message {
    type: string;
}

interface IUse_config_min_qty {
    type: string;
}

interface IMin_qty {
    type: string;
    description: string;
}

interface IUse_config_min_sale_qty {
    type: string;
}

interface IMin_sale_qty {
    type: string;
    description: string;
}

interface IUse_config_max_sale_qty {
    type: string;
}

interface IMax_sale_qty {
    type: string;
    description: string;
}

interface IUse_config_backorders {
    type: string;
}

interface IBackorders {
    type: string;
    description: string;
}

interface IUse_config_notify_stock_qty {
    type: string;
}

interface INotify_stock_qty {
    type: string;
    description: string;
}

interface IUse_config_qty_increments {
    type: string;
}

interface IQty_increments {
    type: string;
    description: string;
}

interface IUse_config_enable_qty_inc {
    type: string;
}

interface IEnable_qty_increments {
    type: string;
    description: string;
}

interface IUse_config_manage_stock {
    type: string;
}

interface IManage_stock {
    type: string;
    description: string;
}

interface ILow_stock_date {
    type: string;
}

interface IIs_decimal_divided {
    type: string;
}

interface IStock_status_changed_auto {
    type: string;
}

interface IOption_id {
    type: string;
    description: string;
}

interface IRequired {
    type: string;
    description: string;
}

interface IType {
    type: string;
    description: string;
}

interface IPosition {
    type: string;
    description?: string;
}

interface IIs_default {
    type: string;
    description: string;
}

interface IPrice_type {
    type: string;
    description: string;
}

interface ICan_change_quantity {
    type: string;
    description: string;
}

interface IIs_shareable {
    type: string;
    description: string;
}

interface INumber_of_downloads {
    type: string;
    description: string;
}

interface ILink_type {
    type: string;
    description?: string;
}

interface ILink_file {
    type: string;
    description: string;
}

interface ILink_file_content {
    $ref: string;
}

interface ILink_url {
    type: string;
    description: string;
}

interface ISample_type {
    type: string;
}

interface ISample_file {
    type: string;
    description: string;
}

interface ISample_file_content {
    $ref: string;
}

interface ISample_url {
    type: string;
    description: string;
}

interface IFile_data {
    type: string;
    description: string;
}

interface IAttribute_id {
    type: string;
    description?: string;
}

interface IWebsite_value {
    type: string;
}

interface ILabel {
    type: string;
    description?: string;
}

interface IIs_use_default {
    type: string;
}

interface IValues {
    type: string;
    items: IItems;
    description?: string;
}

interface IValue_index {
    type: string;
}

interface ILinked_product_sku {
    type: string;
    description: string;
}

interface ILinked_product_type {
    type: string;
    description: string;
}

interface IProduct_sku {
    type: string;
    description: string;
}

interface IIs_require {
    type: string;
    description: string;
}

interface IFile_extension {
    type: string;
}

interface IMax_characters {
    type: string;
}

interface IImage_size_x {
    type: string;
}

interface IImage_size_y {
    type: string;
}

interface IOption_type_id {
    type: string;
    description: string;
}

interface IMedia_type {
    type: string;
    description: string;
}

interface IDisabled {
    type: string;
    description: string;
}

interface ITypes {
    type: string;
    description: string;
    items: IItems;
}

interface IFile {
    type: string;
    description: string;
}

interface IBase64_encoded_data {
    type: string;
    description: string;
}

interface IVideo_content {
    $ref: string;
}

interface IVideo_provider {
    type: string;
    description: string;
}

interface IVideo_url {
    type: string;
    description: string;
}

interface IVideo_title {
    type: string;
    description: string;
}

interface IVideo_description {
    type: string;
    description: string;
}

interface IVideo_metadata {
    type: string;
    description: string;
}

interface ICustomer_group_id {
    type: string;
    description: string;
}

interface IFilter_groups {
    type: string;
    description: string;
    items: IItems;
}

interface ISort_orders {
    type: string;
    description: string;
    items: IItems;
}

interface IPage_size {
    type: string;
    description: string;
}

interface ICurrent_page {
    type: string;
    description: string;
}

interface IFilters {
    type: string;
    description: string;
    items: IItems;
}

interface IField {
    type: string;
    description: string;
}

interface ICondition_type {
    type: string;
    description: string;
}

interface IDirection {
    type: string;
    description: string;
}

interface IIs_wysiwyg_enabled {
    type: string;
    description: string;
}

interface IIs_html_allowed_on_front {
    type: string;
    description: string;
}

interface IUsed_for_sort_by {
    type: string;
    description: string;
}

interface IIs_filterable {
    type: string;
    description: string;
}

interface IIs_filterable_in_search {
    type: string;
    description: string;
}

interface IIs_used_in_grid {
    type: string;
    description: string;
}

interface IIs_visible_in_grid {
    type: string;
    description: string;
}

interface IIs_filterable_in_grid {
    type: string;
    description: string;
}

interface IApply_to {
    type: string;
    description: string;
    items: IItems;
}

interface IIs_searchable {
    type: string;
    description: string;
}

interface IIs_visible_in_advanced_search {
    type: string;
    description: string;
}

interface IIs_comparable {
    type: string;
    description: string;
}

interface IIs_used_for_promo_rules {
    type: string;
    description: string;
}

interface IIs_visible_on_front {
    type: string;
    description: string;
}

interface IUsed_in_product_listing {
    type: string;
    description: string;
}

interface IIs_visible {
    type: string;
    description: string;
}

interface IScope {
    type: string;
    description: string;
}

interface IFrontend_input {
    type: string;
    description: string;
}

interface IEntity_type_id {
    type: string;
    description: string;
}

interface IIs_required {
    type: string;
    description: string;
}

interface IIs_user_defined {
    type: string;
    description: string;
}

interface IDefault_frontend_label {
    type: string;
    description: string;
}

interface IFrontend_labels {
    type: string;
    description: string;
    items: IItems;
}

interface INote {
    type: string;
    description: string;
}

interface IBackend_type {
    type: string;
    description: string;
}

interface IBackend_model {
    type: string;
    description: string;
}

interface ISource_model {
    type: string;
    description: string;
}

interface IDefault_value {
    type: string;
    description: string;
}

interface IIs_unique {
    type: string;
    description: string;
}

interface IFrontend_class {
    type: string;
    description: string;
}

interface IValidation_rules {
    type: string;
    description: string;
    items: IItems;
}

interface IStore_labels {
    type: string;
    description: string;
    items: IItems;
}

interface IKey {
    type: string;
    description: string;
}

interface IAttribute_set_name {
    type: string;
    description: string;
}

interface IAttribute_group_id {
    type: string;
    description: string;
}

interface IAttribute_group_name {
    type: string;
    description: string;
}

interface IAttribute_group_code {
    type: string;
}

interface IParent_id {
    type: string;
    description: string;
}

interface IIs_active {
    type: string;
    description: string;
}

interface ILevel {
    type: string;
    description: string;
}

interface IChildren {
    type: string;
}

interface IPath {
    type: string;
}

interface IAvailable_sort_by {
    type: string;
    items: IItems;
}

interface IInclude_in_menu {
    type: string;
}

interface IProduct_count {
    type: string;
    description: string;
}

interface IChildren_data {
    type: string;
    items: IItems;
}

interface ICategory_id {
    type: string;
    description: string;
}

interface IStock_status {
    type: string;
}

interface IAggregations {
    $ref: string;
}

interface IBuckets {
    type: string;
    description: string;
    items: IItems;
}

interface IBucket_names {
    type: string;
    description: string;
    items: IItems;
}

interface IMetrics {
    type: string;
    description: string;
    items: IItems;
}

interface IRequest_name {
    type: string;
}

interface IConverted_at {
    type: string;
    description: string;
}

interface IIs_virtual {
    type: string;
    description: string;
}

interface IItems_count {
    type: string;
    description: string;
}

interface IItems_qty {
    type: string;
    description: string;
}

interface IBilling_address {
    $ref: string;
}

interface IReserved_order_id {
    type: string;
    description: string;
}

interface IOrig_order_id {
    type: string;
    description: string;
}

interface ICurrency {
    $ref: string;
}

interface ICustomer_is_guest {
    type: string;
    description: string;
}

interface ICustomer_note {
    type: string;
    description: string;
}

interface ICustomer_note_notify {
    type: string;
    description: string;
}

interface ICustomer_tax_class_id {
    type: string;
    description: string;
}

interface IProduct_type {
    type: string;
    description: string;
}

interface IQuote_id {
    type: string;
    description: string;
}

interface IProduct_option {
    $ref: string;
}

interface ICustom_options {
    type: string;
    items: IItems;
}

interface IBundle_options {
    type: string;
    items: IItems;
}

interface IDownloadable_option {
    $ref: string;
}

interface IGiftcard_item_option {
    $ref: string;
}

interface IConfigurable_item_options {
    type: string;
    items: IItems;
}

interface IOption_value {
    type: string;
    description: string;
}

interface IFile_info {
    $ref: string;
}

interface IOption_qty {
    type: string;
    description: string;
}

interface IOption_selections {
    type: string;
    description: string;
    items: IItems;
}

interface IDownloadable_links {
    type: string;
    description: string;
    items: IItems;
}

interface IGiftcard_amount {
    type: string;
    description: string;
}

interface ICustom_giftcard_amount {
    type: string;
    description: string;
}

interface IGiftcard_sender_name {
    type: string;
    description: string;
}

interface IGiftcard_recipient_name {
    type: string;
    description: string;
}

interface IGiftcard_sender_email {
    type: string;
    description: string;
}

interface IGiftcard_recipient_email {
    type: string;
    description: string;
}

interface IGiftcard_message {
    type: string;
    description: string;
}

interface ISame_as_billing {
    type: string;
    description: string;
}

interface ICustomer_address_id {
    type: string;
    description: string;
}

interface ISave_in_address_book {
    type: string;
    description: string;
}

interface IGift_registry_id {
    type: string;
}

interface IGlobal_currency_code {
    type: string;
    description: string;
}

interface IStore_currency_code {
    type: string;
    description: string;
}

interface IQuote_currency_code {
    type: string;
    description: string;
}

interface IStore_to_base_rate {
    type: string;
    description: string;
}

interface IStore_to_quote_rate {
    type: string;
    description: string;
}

interface IBase_to_global_rate {
    type: string;
    description: string;
}

interface IBase_to_quote_rate {
    type: string;
    description: string;
}

interface IShipping_assignments {
    type: string;
    items: IItems;
}

interface IShipping {
    $ref: string;
}

interface IPo_number {
    type: string;
    description: string;
}

interface IAdditional_data {
    type: string;
    description: string;
    items: IItems;
}

interface IAgreement_ids {
    type: string;
    items: IItems;
}

interface ICarrier_code {
    type: string;
    description: string;
}

interface IMethod_code {
    type: string;
    description: string;
}

interface ICarrier_title {
    type: string;
    description: string;
}

interface IMethod_title {
    type: string;
    description: string;
}

interface IAmount {
    type: string;
    description: string;
}

interface IBase_amount {
    type: string;
    description: string;
}

interface IAvailable {
    type: string;
    description: string;
}

interface IError_message {
    type: string;
    description: string;
}

interface IPrice_excl_tax {
    type: string;
    description: string;
}

interface IPrice_incl_tax {
    type: string;
    description: string;
}

interface IGift_messages {
    type: string;
    items: IItems;
}

interface IGift_message_id {
    type: string;
    description: string;
}

interface ISender {
    type: string;
    description: string;
}

interface IRecipient {
    type: string;
    description: string;
}

interface IEntity_id {
    type: string;
}

interface IEntity_type {
    type: string;
}

interface IWrapping_id {
    type: string;
}

interface IWrapping_allow_gift_receipt {
    type: string;
}

interface IWrapping_add_printed_card {
    type: string;
}

interface IGrand_total {
    type: string;
    description: string;
}

interface IBase_grand_total {
    type: string;
    description: string;
}

interface ISubtotal {
    type: string;
    description: string;
}

interface IBase_subtotal {
    type: string;
    description: string;
}

interface IDiscount_amount {
    type: string;
    description: string;
}

interface IBase_discount_amount {
    type: string;
    description: string;
}

interface ISubtotal_with_discount {
    type: string;
    description: string;
}

interface IBase_subtotal_with_discount {
    type: string;
    description: string;
}

interface IShipping_amount {
    type: string;
    description: string;
}

interface IBase_shipping_amount {
    type: string;
    description: string;
}

interface IShipping_discount_amount {
    type: string;
    description: string;
}

interface IBase_shipping_discount_amount {
    type: string;
    description: string;
}

interface ITax_amount {
    type: string;
    description: string;
}

interface IBase_tax_amount {
    type: string;
    description: string;
}

interface IWeee_tax_applied_amount {
    type: string;
    description: string;
}

interface IShipping_tax_amount {
    type: string;
    description: string;
}

interface IBase_shipping_tax_amount {
    type: string;
    description: string;
}

interface ISubtotal_incl_tax {
    type: string;
    description: string;
}

interface IBase_subtotal_incl_tax {
    type: string;
    description: string;
}

interface IShipping_incl_tax {
    type: string;
    description: string;
}

interface IBase_shipping_incl_tax {
    type: string;
    description: string;
}

interface ICoupon_code {
    type: string;
    description: string;
}

interface ITotal_segments {
    type: string;
    description: string;
    items: IItems;
}

interface IBase_price {
    type: string;
    description: string;
}

interface IRow_total {
    type: string;
    description: string;
}

interface IBase_row_total {
    type: string;
    description: string;
}

interface IRow_total_with_discount {
    type: string;
    description: string;
}

interface ITax_percent {
    type: string;
    description: string;
}

interface IDiscount_percent {
    type: string;
    description: string;
}

interface IBase_price_incl_tax {
    type: string;
    description: string;
}

interface IRow_total_incl_tax {
    type: string;
    description: string;
}

interface IBase_row_total_incl_tax {
    type: string;
    description: string;
}

interface IWeee_tax_applied {
    type: string;
    description: string;
}

interface IArea {
    type: string;
    description: string;
}

interface ITax_grandtotal_details {
    type: string;
    items: IItems;
}

interface IGift_cards {
    type: string;
    description?: string;
    items?: IItems;
}

interface IGw_order_id {
    type: string;
}

interface IGw_item_ids {
    type: string;
    items: IItems;
}

interface IGw_allow_gift_receipt {
    type: string;
}

interface IGw_add_card {
    type: string;
}

interface IGw_price {
    type: string;
}

interface IGw_base_price {
    type: string;
}

interface IGw_items_price {
    type: string;
}

interface IGw_items_base_price {
    type: string;
}

interface IGw_card_price {
    type: string;
}

interface IGw_card_base_price {
    type: string;
}

interface IGw_base_tax_amount {
    type: string;
}

interface IGw_tax_amount {
    type: string;
}

interface IGw_items_base_tax_amount {
    type: string;
}

interface IGw_items_tax_amount {
    type: string;
}

interface IGw_card_base_tax_amount {
    type: string;
}

interface IGw_card_tax_amount {
    type: string;
}

interface IGw_price_incl_tax {
    type: string;
}

interface IGw_base_price_incl_tax {
    type: string;
}

interface IGw_card_price_incl_tax {
    type: string;
}

interface IGw_card_base_price_incl_tax {
    type: string;
}

interface IGw_items_price_incl_tax {
    type: string;
}

interface IGw_items_base_price_incl_tax {
    type: string;
}

interface IRates {
    type: string;
    description: string;
    items: IItems;
}

interface IPercent {
    type: string;
    description: string;
}

interface IBase_customer_balance_amount {
    type: string;
}

interface ICustomer_balance_amount {
    type: string;
}

interface IReward_points_balance {
    type: string;
}

interface IReward_currency_amount {
    type: string;
}

interface IBase_reward_currency_amount {
    type: string;
}

interface IShipping_address {
    $ref: string;
}

interface IShipping_method_code {
    type: string;
    description: string;
}

interface IShipping_carrier_code {
    type: string;
    description: string;
}

interface IPayment_methods {
    type: string;
    items: IItems;
}

interface ITotals {
    $ref: string;
}

interface IGift_cards_amount {
    type: string;
    description: string;
}

interface IBase_gift_cards_amount {
    type: string;
    description: string;
}

interface IGift_cards_amount_used {
    type: string;
    description: string;
}

interface IBase_gift_cards_amount_used {
    type: string;
    description: string;
}

