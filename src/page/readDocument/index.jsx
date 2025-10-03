import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentReader from '../../components/documentReader';

const ReadDocument = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/dashboard');
    };

    // In real app, fetch document by ID from API
    const document = {
        id: documentId,
        title: "Học tiếng Việt cơ bản",
        author: "Talkademy Team"
    };

    return (
        <DocumentReader
            document={document}
            onClose={handleClose}
        />
    );
};

export default ReadDocument;
