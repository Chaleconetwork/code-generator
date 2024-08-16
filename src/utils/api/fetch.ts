const HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const TypeHeader = {
    json: 'json',
    stream: 'octet-stream'
}

export const Fetch = {
    async get(url: string) {
        return await this.handleRequest(url, HTTP.GET)
    },

    async post(url: string, body: any) {
        return await this.handleRequest(url, HTTP.POST, body);
    },

    async download(url: string, body: any, filename: string) {
        return await this.handleRequest(url, HTTP.POST, body, filename);
    },

    async handleRequest(url: string, method: string, body: any | null = null, filename: string | null = null) {
        const headers = {
            'Accept': `application/${filename ? TypeHeader.stream : TypeHeader.json}`,
            'Content-Type': `application/${TypeHeader.json}`,
            // 'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }

            if (filename) {
                const blob = await response.blob();
                const urlObject = window.URL.createObjectURL(blob);
                const a = document.createElement('a')
                a.href = urlObject;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(urlObject);
            }

            const jsonResponse = await response.json();
            return jsonResponse;

        } catch (error: any) {
            console.log("Se ha producido un error", error)
            return null;
        }
    }
}

// async handleRequestAPI(url: string, method: typeof HTTP[keyof typeof HTTP], body: any | null = null, customToken: string | null, blobExportName: string = '') {
//     if (!url) {
//         return;
//     }

//     const headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'Authorization': Bearer ${token}
//     };

//     const abortController = new AbortController();
//     const { signal } = abortController;

//     try {
//         const response = await fetch(url, {
//             method: method,
//             headers: headers,
//             body: body ? JSON.stringify(body) : undefined,
//             signal: signal
//         });

//         if (signal.aborted) {
//             return null;
//         }

//         if (blobExportName) {
//             const blob = await response.blob() as Blob;
//             // console.log(blob);

//             if (!blob.size) {
//                 throw new Error('Null blob');
//             }

//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = blobExportName;
//             document.body.appendChild(a);
//             a.click();
//             a.remove();

//             return blob;
//         }

//         // console.log(response?.status);

//         if (response?.status === 400 || response?.status === 500) {
//             const responseError = await response.json();
//             throw new Error(responseError?.messages[0] ?? response?.statusText);
//         } else if (response?.status === 204) { // 204 No Content
//             abortController.abort();
//             return;
//         } else if (response?.status === 401) { // Unauthorized
//             abortController.abort();
//             return;
//         }

//         const responseJson = await response.json();
//         // console.log('responseJson', responseJson);

//         if (!response.ok) {
//             // console.log(Fail ${responseJson.status} in ${url}. Type: ${responseJson.title});
//             // toast({ content: responseJson.title, ms: 7500 });
//         }

//         return responseJson;
//     } catch (error: any) {
//         console.table(error);
//     } finally {
//         abortController.abort();
//     }
// },