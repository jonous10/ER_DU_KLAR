const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_IP || "http://localhost:4000";
const apiBase = `${BASE_URL}/api/v1/language`;

interface ApiCallOptions {
    method?: string;
    body?: object;
    query?: Record<string, string | number | undefined | null>;
    headers?: Record<string, string>;
}

async function apiCall(endpoint: string, { method = 'GET', body, query, headers }: ApiCallOptions = {}) {
    let url = `${apiBase}/${endpoint}`;

    if (query && Object.keys(query).length > 0) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        }
        url += `?${queryParams.toString()}`;
    }

    let fetchOptions: RequestInit = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {})
        }
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    return response.json();
}


export async function GetLanguageSup(seg: string, lan: string) {
    return apiCall('get_language', {
        method: 'GET',
        query: { seg, lan }
    })
}

export async function SaveToRedis(key: string, data: string) {
    console.log("savedtoredis")
  return apiCall('save-to-redis', {
    method: 'POST',
    body: { key, data },
  });
}

export async function GetFromRedis(key: string) {
    console.log("getfromredis")
  return apiCall('get-from-redis', {
    method: 'GET',
    query: { key },
  });
}
