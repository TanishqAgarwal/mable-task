import client from '../dbconfig/dbconnector';
import { requestType, responseType, dbDataType } from '../types/types';

const handleUser = async (req: any, res: any) => {
    const body: requestType = req.body;

    const getQuery = `Select * from identify_calls where email = '${body.email}' or customer_id = '${body.customer_id}' or session_id = '${body.session_id}'`;

    try {
        if(body.session_data === null || body.session_data === undefined) {
            throw new Error('session_data is required');
        }
        
        const initialQuery = await client.query(getQuery);

        var response : responseType = {
            found: false,
            email: '',
            customer_id: '',
            latest_session_data: ''
        };

        var dbData : dbDataType = {
            source_id: body.source_id,
            email: body.email,
            customer_id: body.customer_id,
            session_id: body.session_id,
            session_data: []
        }

        if (initialQuery.rows.length > 0) {
            dbData.session_data = JSON.parse(initialQuery.rows[0].session_data);
            dbData.session_data.push(body.session_data);
            const updateQuery = `Update identify_calls set source_id = '${dbData.source_id}', email = '${dbData.email}', customer_id = '${dbData.customer_id}', session_id = '${dbData.session_id}', session_data = '${JSON.stringify(dbData.session_data)}' where email = '${dbData.email}' or customer_id = '${dbData.customer_id}' or session_id = '${dbData.session_id}'`;
            await client.query(updateQuery);
            response.found = true;
        } else {
            dbData.session_data.push(body.session_data);
            const insertQuery = `Insert into identify_calls (source_id, email, customer_id, session_id, session_data) values ('${dbData.source_id}', '${dbData.email}', '${dbData.customer_id}', '${dbData.session_id}', '${JSON.stringify(dbData.session_data)}')`;
            await client.query(insertQuery);
            response.found = false;
        }

        const result = await client.query(getQuery);
        var session_data = JSON.parse(result.rows[0].session_data);
        
        response.email = result.rows[0].email;
        response.customer_id = result.rows[0].customer_id;
        response.latest_session_data = session_data[session_data.length - 1];
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

export default handleUser;