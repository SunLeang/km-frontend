import { browser } from '$app/env'
import { APIs } from '$lib/statics/apis'

export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
            const base64String = reader.result;
            // .replace("data:", "")
            // .replace(/^.+,/, "");
            resolve(base64String);
        };
        reader.onerror = function () {
            reject();
        };
        reader.readAsDataURL(file);
    });
}

export function getBase64ImageSize(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            return resolve({
                width: img.width,
                height: img.height,
            })
        }
        img.src = base64;
    })
}

export const uploadSticker = {
    load: async ({ name, base64, onComplete, onError, onProgress }) => {

        // const covertFile = new convertToBase64(file)
        const calWidthHeight = await getBase64ImageSize(base64)

        handleXMLHttpRequest(
            'sticker/single-upload', // uri
            {
                name,
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                base64,
                animated: false
            }, // params
            onComplete,
            onError,
            onProgress
            // ({ params, loaded, total }) => {
            //     console.log(loaded / total);
            // }
        )
    }
}


export const deleteStickerOnS3 = {
    load: async ({ id, onComplete, onError, onProgress }) => {

        handleXMLHttpRequest(
            'sticker/delete-sticker', // uri
            {
                id,
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}




// XMLHttpRequest
const handleXMLHttpRequest = (url, params, onComplete, onError, onUploadProgress, onDLProgress) => {
    

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", browser ? `${APIs.KSTORAGE.csr_uri}/${url}` : `${APIs.KSTORAGE.ssr_uri}/${url}`);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function (_) {
        // Error response
        if (xmlhttp?.status > 300) {
            onError(xmlhttp);
        }
    }
    xmlhttp.onload = function () {
        if (xmlhttp?.status >= 200 && xmlhttp?.status < 300)
            onComplete?.({ status: xmlhttp?.status, response: JSON.parse(xmlhttp?.response) })
    };

    // Download
    xmlhttp.onprogress = (evt) => {
        onDLProgress?.({ params, loaded: evt?.loaded, total: evt?.total })
    }

    // Upload
    xmlhttp.upload.onprogress = (evt) => {
        onUploadProgress?.({ params, loaded: evt?.loaded, total: evt?.total })
    }
    xmlhttp.onerror = (err) => {
        onError('Upload error: ', err);
    }
    // console.log("params",params);
    xmlhttp.send(JSON.stringify(params));
}