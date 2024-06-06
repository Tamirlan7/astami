export default function convertFromBase64ToBlob(base64String: string): Blob | null {
    const byteCharacters = atob(base64String);
    const byteArrays: number[] = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const match = base64String.match(/^data:(.+);base64,/);
    const contentType = match ? match[1] : null;

    if (contentType === null) {
        return null
    }

    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], {type: contentType});
}