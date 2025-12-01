'use client';

import { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

export default function GetInvolvedModal({ isOpen, onClose, topic }: ModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // SCROLL LOCK EFFECT
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsSent(false);
            setIsSubmitting(false);
            setErrorMessage('');
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        // 1. Gather Standard Fields
        const baseData = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        };

        // 2. Construct Custom Message based on Topic
        let compiledMessage = '';
        let submissionType = 'general';

        if (topic.includes('family')) {
            submissionType = 'family';
            compiledMessage = `
--- PATIENT INFORMATION ---
Patient Name: ${formData.get('patientName')}
Age: ${formData.get('patientAge')}
Hospital/Center: ${formData.get('hospital')}
Social Worker: ${formData.get('socialWorker') || 'N/A'}

--- STATEMENT OF NEED ---
${formData.get('needDescription')}
            `;
        } else if (topic.includes('volunteering')) {
            submissionType = 'volunteer';
            compiledMessage = `
Role Interested: ${formData.get('role')}
Availability: ${formData.get('availability')}

--- MOTIVATION ---
${formData.get('motivation')}
            `;
        } else if (topic.includes('partnering')) {
            submissionType = 'partnering';
            compiledMessage = `
Organization: ${formData.get('orgName')}
Partnership Type: ${formData.get('partnershipType')}

--- MESSAGE ---
${formData.get('partnerMessage')}
            `;
        }

        // 3. Send to API
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...baseData,
                    message: compiledMessage.trim(),
                    type: submissionType
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSent(true);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please verify your connection.');
        }
        setIsSubmitting(false);
    };

    // --- Render Logic ---
    let modalTitle = 'Let\'s Connect';
    if (topic.includes('family')) modalTitle = 'Support Form';
    if (topic.includes('volunteering')) modalTitle = 'Join the Team';
    if (topic.includes('partnering')) modalTitle = 'Partner With Us';

    const renderSpecificFields = () => {
        if (topic.includes('family')) {
            return (
                <>
                    <div style={{ margin: '20px 0', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#888', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                            <div>
                                <label className="form-label">Child's Name</label>
                                <input name="patientName" type="text" className="form-input" placeholder="Patient Name" required />
                            </div>
                            <div>
                                <label className="form-label">Child's Age</label>
                                <input name="patientAge" type="text" className="form-input" placeholder="Age" required />
                            </div>
                        </div>
                        <label className="form-label">Treatment Center / Hospital</label>
                        <input name="hospital" type="text" className="form-input" placeholder="Where is the child receiving care?" required />

                        <label className="form-label">Social Worker / Care Team Contact</label>
                        <input name="socialWorker" type="text" className="form-input" placeholder="Name (Optional)" />
                    </div>
                    <div style={{ margin: '20px 0', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#888', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statement of Need</h4>
                        <label className="form-label">How can we help?</label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px', fontFamily: 'var(--font-sans)' }}>Please briefly describe the specific financial or material support you are seeking.</p>
                        <textarea name="needDescription" className="form-textarea" rows={4} placeholder="Describe your need..." required></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <input type="checkbox" required style={{ marginTop: '4px' }} />
                        <p style={{ fontSize: '0.8rem', color: '#555', fontFamily: 'var(--font-sans)' }}>I certify that the information provided is true and accurate. I understand that Rise for Hope may contact the medical facility to verify the diagnosis.</p>
                    </div>
                </>
            );
        }
        if (topic.includes('volunteering')) {
            return (
                <>
                    <label className="form-label">Interested Role</label>
                    <div className="select-wrapper">
                        <select name="role" className="form-input">
                            <option>General Support</option>
                            <option>Event Staff</option>
                            <option>Hospital Visits</option>
                            <option>Professional Skills (Legal/Admin)</option>
                        </select>
                    </div>
                    <label className="form-label">Availability</label>
                    <input name="availability" type="text" className="form-input" placeholder="e.g. Weekends, Evenings" />

                    <label className="form-label">Why do you want to volunteer?</label>
                    <textarea name="motivation" className="form-textarea" rows={3} required></textarea>
                </>
            );
        }
        if (topic.includes('partnering')) {
            return (
                <>
                    <label className="form-label">Organization / Company Name</label>
                    <input name="orgName" type="text" className="form-input" placeholder="Your Organization" required />

                    <label className="form-label">Partnership Type</label>
                    <div className="select-wrapper">
                        <select name="partnershipType" className="form-input">
                            <option>Corporate Sponsorship</option>
                            <option>Event Hosting</option>
                            <option>Service Donation</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <label className="form-label">Message</label>
                    <textarea name="partnerMessage" className="form-textarea" rows={3} placeholder="Tell us about your idea..." required></textarea>
                </>
            );
        }
        return null;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ fontFamily: 'var(--font-sans)' }}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                {!isSent ? (
                    <>
                        <h2 className="mission-title" style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>{modalTitle}</h2>
                        <p className="mission-text" style={{ fontSize: '1rem', marginBottom: '30px', fontFamily: 'var(--font-sans)' }}>Please fill out the details below.</p>

                        <form onSubmit={handleSubmit}>
                            {errorMessage && <p style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</p>}

                            <label className="form-label">Full Name</label>
                            <input name="fullName" type="text" className="form-input" placeholder="Your Name" required />

                            <label className="form-label">Email Address</label>
                            <input name="email" type="email" className="form-input" placeholder="email@example.com" required />

                            <label className="form-label">Phone Number</label>
                            <input name="phone" type="tel" className="form-input" placeholder="(555) 123-4567" required />

                            {renderSpecificFields()}

                            <button type="submit" className="btn-donate" style={{ width: '100%', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✨</div>
                        <h3 className="mission-title" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#333' }}>Request Received</h3>
                        <p className="mission-text" style={{ fontFamily: 'var(--font-sans)', color: '#666', marginBottom: '20px' }}>
                            Thank you. We will review your information and get in touch shortly.
                        </p>
                        <button onClick={onClose} className="btn-donate" style={{ padding: '10px 30px' }}>Close</button>
                    </div>
                )}
            </div>

            {/* INLINE STYLES FOR MODAL ELEMENTS */}
            <style jsx>{`
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5); z-index: 9999;
                    display: flex; align-items: center; justify-content: center;
                    padding: 20px;
                }
                .modal-content {
                    background: white; width: 100%; max-width: 600px;
                    max-height: 90vh; overflow-y: auto;
                    border-radius: 20px; padding: 40px; position: relative;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                }
                .close-btn {
                    position: absolute; top: 20px; right: 20px;
                    font-size: 2rem; border: none; background: none;
                    cursor: pointer; color: #888;
                }
                .form-label { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: bold; color: #444; }
                .form-input, .form-textarea, .select-wrapper select {
                    width: 100%; padding: 12px; border: 1px solid #ddd;
                    border-radius: 8px; font-size: 1rem; margin-bottom: 20px;
                    font-family: var(--font-sans);
                }
                .select-wrapper { position: relative; }
            `}</style>
        </div>
    );
}