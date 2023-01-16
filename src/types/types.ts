export interface requestType {
    source_id: string;
    email: string;
    customer_id: string;
    session_id: string;
    session_data: Object;
}

export interface responseType {
    found: boolean;
    email: string;
    customer_id: string;
    latest_session_data: Object;
}

export interface dbDataType {
    source_id: string;
    email: string;
    customer_id: string;
    session_id: string;
    session_data: Object[];
}