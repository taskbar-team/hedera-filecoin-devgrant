import styled from 'styled-components';

export const Web3StorageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FileUploadWrapper = styled.label`
    min-width: 5rem;
    border-radius: 4px;
    background-color: #071522;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 1rem;
    text-align: center;

    &:hover {
        background-color: #0f2d48;
    }

    input[type="file"] {
        display: none;
    }
`;

export const FilesTableWrapper = styled.table`
    width: 100%;
    table-layout: fixed;
    margin: 2rem 0 1rem 0;

    thead {
        .col-0 {
            width: 40%;
        }

        .col-1 {
            width: 25%;
        }

        .col-2 {
            width: 15%;
        }

        .col-3 {
            width: 20%;
        }
    }

    .cell {
        border: 1px solid gainsboro;
        padding: 0rem 0.5rem;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
`;