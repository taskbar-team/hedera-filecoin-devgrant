/**
 * Represents a Hedera, HFS-managed Json object
 *
 * TODO: add SDK methods to make this trully live
 */
export class LiveJson {
    constructor({ client, id, data }: {
        client: any;
        id: any;
        data: any;
    });
    _client: any;
    _id: any;
    get id(): any;
}
