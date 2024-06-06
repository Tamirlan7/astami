import {useEffect, useState} from "react";
import client from "@services/client.ts";
import {useAppSelector} from "@hooks/reduxHooks.ts";
import {IUseAuthorizedFileConfig} from "@/types/types.ts";

interface UseAuthorizedFileResponse {
    fileBase64: string | null
}

export default function useAuthorizedFile(url: string, config?: IUseAuthorizedFileConfig): UseAuthorizedFileResponse {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const {currentCompany} = useAppSelector(state => state.company)

    useEffect(() => {
        if (currentCompany) {
            const getImg = async () => {
                try {
                    let uri = url;

                    if (config?.replaceCompanyIdInURI && currentCompany.id) {
                        uri = uri.replace(':companyId', currentCompany.id.toString());
                    }

                    if (config?.replaceBranchIdInURI && currentCompany.currentBranch.id) {
                        uri = uri.replace(':branchId', currentCompany.currentBranch.id.toString());
                    }

                    const res = await client.get(uri, {responseType: 'blob'});
                    const imgURL = URL.createObjectURL(res.data);
                    setImgSrc(imgURL);
                } catch (e: unknown) {
                    // Handle the error as needed (e.g., set a fallback image)
                }
            };

            getImg();
        }

        // Clean up the object URL to avoid memory leaks
        return () => {
            if (imgSrc) {
                URL.revokeObjectURL(imgSrc);
            }
        };
    }, [config?.replaceBranchIdInURI, config?.replaceCompanyIdInURI, currentCompany, url]);

    return {
        fileBase64: imgSrc
    }
}