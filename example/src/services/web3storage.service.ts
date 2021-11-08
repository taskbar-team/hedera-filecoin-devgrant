
export default {
    loadFiles: async (_client: any, _cid: string) => {
        try {
            const res = await _client.get(_cid);
            if (!res) throw new Error("Cannot Fetch the Content Addressed Archive by its root CID.")

            return await res.files();

        } catch (error) {
            throw new Error("Someting went wrong");
        }
    },

    uploadFiles: async (_client: any, _files: FileList, callback: (_cid: string) => void) => {
        const rootCid = await _client.put(_files)
        
        callback(rootCid);
    }
}