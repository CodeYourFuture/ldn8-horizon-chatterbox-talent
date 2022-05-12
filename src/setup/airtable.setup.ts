import Airtable from 'airtable';

Airtable.configure({
    apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    endpointUrl: `${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}`,
});

export const base = Airtable.base('appj4O1yUc8g5mth9');
