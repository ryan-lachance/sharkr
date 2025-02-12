import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function RemoveBorrowerPage() {
    const { loan_id, borrower_id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:2000/api/loans/${loan_id}/borrowers/${borrower_id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, [loan_id, borrower_id]);

    return <p>Removing borrower...</p>;
}

export default RemoveBorrowerPage