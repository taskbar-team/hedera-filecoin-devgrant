import React, { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { Web3File } from 'web3.storage/dist/src/lib/interface';
import { LoadingSpinner, PrimaryButton } from '../../globalStyle.style';
import Web3StorageService from '../../services/web3storage.service';
import utils from '../../utils';
import {
    Web3StorageContainer,
    FilesTableWrapper,
    FileUploadWrapper
} from './web3storage.style';

const CID_KEY = "web3s_cid";

let client: any;

const Web3StorageSample: React.FC = () => {
    const [files, setFiles] = useState<JSX.Element[]>();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        client = new Web3Storage({ token: process.env.REACT_APP_WEB3_API_KEY })

        if (client) {
            const cid = localStorage.getItem(CID_KEY);

            if (cid) {
                getFiles(cid);
            }
        }
    }, [])

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;

        if (!files || files.length === 0)
            return;

        setLoading(true);

        await Web3StorageService.uploadFiles(client, files, (cid) => {
            localStorage.setItem(CID_KEY, cid);
            getFiles(cid);
        })
    }

    const getIpfsUrl = (_cid: string) => `https://${_cid}.ipfs.dweb.link/`

    const composeFileElements = (files: Web3File[]) => {
        return Object.keys(files)
            .map((key, index) => {
                const file: Web3File = files[key];

                return <tr key={`file-${index}]`}>
                    <td className="cell"><a target="_blank" href={getIpfsUrl(file.cid)}>{file.cid}</a></td>
                    <td className="cell">{file.name}</td>
                    <td className="cell">{utils.bytesToSize(file.size)}</td>
                    <td className="cell">
                        <PrimaryButton onClick={() => utils.downloadImage(getIpfsUrl(file.cid), file.name)}>
                            Download
                        </PrimaryButton>
                    </td>
                </tr>
            })
    }

    const getFiles = async (cid: string) => {
        try {
            const files: Web3File[] = await Web3StorageService.loadFiles(client, cid);

            setFiles(composeFileElements(files));
            setLoading(false);
        } catch (error) {
            throw new Error('Something went wrong')
        }
    }

    return (
        <Web3StorageContainer>
            <FileUploadWrapper>
                <input type="file" onChange={handleOnChange} multiple />
                Upload
            </FileUploadWrapper>
            {isLoading ?
                <LoadingSpinner>
                    <div />
                    <div />
                    <div />
                    <div />
                </LoadingSpinner> :
                files && files.length > 0 && <FilesTable files={files} />
            }
        </Web3StorageContainer>
    );
}

const FilesTable = ({ files }: any) => {
    return <FilesTableWrapper>
        <thead>
            <tr>
                <th className="col-0">Cid</th>
                <th className="col-1" >Name</th>
                <th className="col-2">Size</th>
                <th className="col-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {files.map((file: JSX.Element) => file)}
        </tbody>
    </FilesTableWrapper>
}

export default Web3StorageSample;
