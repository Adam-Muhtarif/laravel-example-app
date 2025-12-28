export async function apiFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const combinedHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers && typeof options.headers === 'object' ? (options.headers as Record<string, string>) : {}),
    };

    const response = await fetch(url, {
        ...options,
        headers: combinedHeaders,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthenticated');
    }

    return response;
}
