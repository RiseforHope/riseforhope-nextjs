import * as React from 'react';

interface SubmissionEmailProps {
    name: string;
    email: string;
    phone: string;
    type: string;
    message: string;
}

export const SubmissionEmail: React.FC<SubmissionEmailProps> = ({
                                                                    name,
                                                                    email,
                                                                    phone,
                                                                    type,
                                                                    message,
                                                                }) => {
    const containerStyle = {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        padding: '40px 20px',
        color: '#333',
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        maxWidth: '600px',
        margin: '0 auto',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#1a1a1a',
        borderBottom: '2px solid #eee',
        paddingBottom: '20px',
        textTransform: 'capitalize' as const,
    };

    const fieldStyle = {
        marginBottom: '16px',
    };

    const labelStyle = {
        fontSize: '12px',
        color: '#888',
        textTransform: 'uppercase' as const,
        fontWeight: 'bold',
        marginBottom: '4px',
        display: 'block',
    };

    const valueStyle = {
        fontSize: '16px',
        color: '#333',
        lineHeight: '1.5',
    };

    const messageBoxStyle = {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        whiteSpace: 'pre-wrap' as const,
        fontSize: '14px',
        color: '#333',
        borderLeft: '4px solid #333',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={headerStyle}>New {type} Submission</h1>

                <div style={fieldStyle}>
                    <span style={labelStyle}>Name</span>
                    <div style={valueStyle}>{name}</div>
                </div>

                <div style={fieldStyle}>
                    <span style={labelStyle}>Email</span>
                    <div style={valueStyle}>
                        <a href={`mailto:${email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                            {email}
                        </a>
                    </div>
                </div>

                <div style={fieldStyle}>
                    <span style={labelStyle}>Phone</span>
                    <div style={valueStyle}>{phone}</div>
                </div>

                <div style={messageBoxStyle}>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>Submission Details:</strong>
                    {message}
                </div>

                <div style={{ marginTop: '40px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
                    Sent via Rise for Hope Website
                </div>
            </div>
        </div>
    );
};

export default SubmissionEmail;