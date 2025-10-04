import { apiUrl } from "../../constants";

export async function generateResponse(prompt , file_id , mode) {
    const response = await fetch(`${apiUrl}/generate_answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, file_id, mode }),
    });

    const data = await response.json();
    return data;
}

export async function similaritySearch(query, k, filter) {
    if (!query || query.trim() === "") {
        return [];
    }
    const response = await fetch(`${apiUrl}/similarity_search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, k, filter }),
    });
    const data = await response.json();
    return data;
}
