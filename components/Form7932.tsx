import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { TaskStatus } from '../types/index.ts';
import { FORM_STRUCTURE_7932, AUTOMATIC_FAILURES_7932 } from '../constants/formStructure7932.ts';
import { FORM_7932_COORDS } from '../constants/form7932Coordinates.ts';
import InfoInput from './InfoInput.tsx';
import EvaluationSection from './EvaluationSection.tsx';
import SignatureModal from './SignatureModal.tsx';
import { EvaluatorInfo } from '../App.tsx';

type Form7932TaskState = {
    status: TaskStatus.GO | TaskStatus.NO_GO | TaskStatus.UNGRADED;
    retested: boolean;
};

const Form7932: React.FC<{ evaluatorInfo: EvaluatorInfo }> = ({ evaluatorInfo }) => {
    const [infoData, setInfoData] = useState({
        operatorName: '',
        dodId: '',
        unit: '',
        date: new Date().toISOString().slice(0, 10),
        examinerName: '',
    });

    const [taskStatuses, setTaskStatuses] = useState<Record<string, Form7932TaskState>>(() => {
        const initialState: Record<string, Form7932TaskState> = {};
        FORM_STRUCTURE_7932.forEach(section => {
            section.tasks.forEach(task => {
                initialState[task.id] = { status: TaskStatus.UNGRADED, retested: false };
            });
        });
        return initialState;
    });
    
    const [autoFailureReasons, setAutoFailureReasons] = useState<string[]>([]);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const [signatures, setSignatures] = useState({
        operatorSignature: '',
        examinerSignature: ''
    });
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [activeSignatureField, setActiveSignatureField] = useState<'operatorSignature' | 'examinerSignature' | null>(null);

    useEffect(() => {
        if (evaluatorInfo) {
            const evaluatorFullName = [evaluatorInfo.rank, evaluatorInfo.name].filter(Boolean).join(' ');
            setInfoData(prev => ({...prev, examinerName: evaluatorFullName }));
        }
    }, [evaluatorInfo]);

    const handleOpenSignatureModal = (field: 'operatorSignature' | 'examinerSignature') => {
        setActiveSignatureField(field);
        setIsSignatureModalOpen(true);
    };

    const handleSaveSignature = (dataUrl: string) => {
        if (activeSignatureField) {
            setSignatures(prev => ({ ...prev, [activeSignatureField]: dataUrl }));
        }
        setActiveSignatureField(null);
        setIsSignatureModalOpen(false);
    };

    const evaluationCounts = useMemo(() => {
        let goCount = 0;
        let noGoCount = 0;
        Object.values(taskStatuses).forEach(task => {
            if (task.status === TaskStatus.NO_GO) {
                if (task.retested) goCount++;
                else noGoCount++;
            } else if (task.status === TaskStatus.GO) {
                goCount++;
            }
        });
        return { goCount, noGoCount };
    }, [taskStatuses]);

    const overallRating = useMemo(() => {
        if (autoFailureReasons.length > 0) return 'NO-GO';
        if (evaluationCounts.noGoCount > 0) return 'NO-GO';
        if (Object.values(taskStatuses).some(s => s.status === TaskStatus.UNGRADED)) return 'INCOMPLETE';
        return 'GO';
    }, [taskStatuses, autoFailureReasons, evaluationCounts]);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStatusChange = useCallback((taskId: string, newStatus: TaskStatus) => {
        if (newStatus === TaskStatus.GO || newStatus === TaskStatus.NO_GO || newStatus === TaskStatus.UNGRADED) {
            setTaskStatuses(prev => ({ ...prev, [taskId]: { ...prev[taskId], status: newStatus, retested: newStatus === TaskStatus.NO_GO ? prev[taskId].retested : false }}));
        }
    }, []);

    const handleRetestChange = useCallback((taskId: string, retested: boolean) => {
        setTaskStatuses(prev => ({ ...prev, [taskId]: { ...prev[taskId], retested: retested }}));
    }, []);
    
    const toggleAutoFailure = (reason: string) => {
        setAutoFailureReasons(prev => prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]);
    };

    const handleGeneratePdf = async () => {
        if (!window.PDFLib) {
            alert('PDF generation library not found. Please refresh and try again.');
            return;
        }
        setIsGeneratingPdf(true);
        try {
            const { PDFDocument, rgb } = window.PDFLib;
            const formUrl = './assets/DA-Form-7932.pdf';
            const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const page = pdfDoc.getPages()[0];
            const black = rgb(0, 0, 0);

            // Text fields
            page.drawText(infoData.operatorName, { ...FORM_7932_COORDS.operatorName, size: 10, color: black });
            page.drawText(infoData.dodId, { ...FORM_7932_COORDS.dodId, size: 10, color: black });
            page.drawText(infoData.date.replace(/-/g, ''), { ...FORM_7932_COORDS.date, size: 10, color: black });
            page.drawText(infoData.unit, { ...FORM_7932_COORDS.unit, size: 10, color: black });
            page.drawText(infoData.examinerName, { ...FORM_7932_COORDS.examinerName, size: 10, color: black });
            
            // Overall Rating
            page.drawText(overallRating, { ...FORM_7932_COORDS.overallRating, size: 12, color: black });
            page.drawText(evaluationCounts.goCount.toString(), { ...FORM_7932_COORDS.goCount, size: 12, color: black });
            page.drawText(evaluationCounts.noGoCount.toString(), { ...FORM_7932_COORDS.noGoCount, size: 12, color: black });

            // Automatic Failures
            if (autoFailureReasons.length > 0) {
                 page.drawText(`Failures: ${autoFailureReasons.join(', ')}`, { ...FORM_7932_COORDS.autoFailures, size: 8, color: black, maxWidth: 500 });
            }

            // Task checkboxes
            for (const taskId in taskStatuses) {
                const task = taskStatuses[taskId];
                const coords = FORM_7932_COORDS.tasks[taskId];
                if (coords) {
                    if (task.status === TaskStatus.GO) page.drawText('X', { ...coords.GO, size: 12, color: black });
                    if (task.status === TaskStatus.NO_GO) page.drawText('X', { ...coords.NO_GO, size: 12, color: black });
                    if (task.retested) page.drawText('X', { ...coords.RETEST, size: 12, color: black });
                }
            }

            // Signatures
            if (signatures.operatorSignature) {
                const pngImageBytes = await fetch(signatures.operatorSignature).then(res => res.arrayBuffer());
                const pngImage = await pdfDoc.embedPng(pngImageBytes);
                page.drawImage(pngImage, { ...FORM_7932_COORDS.operatorSignature, width: 150, height: 30 });
            }
            if (signatures.examinerSignature) {
                const pngImageBytes = await fetch(signatures.examinerSignature).then(res => res.arrayBuffer());
                const pngImage = await pdfDoc.embedPng(pngImageBytes);
                page.drawImage(pngImage, { ...FORM_7932_COORDS.examinerSignature, width: 150, height: 30 });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `DA_Form_7932_${infoData.operatorName.replace(/ /g, '_') || 'Evaluation'}.pdf`;
            link.click();
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. See console for details.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };
    
    const ratingColor = overallRating === 'GO' ? 'text-green-500' : (overallRating === 'NO-GO' ? 'text-red-500' : 'text-gray-500');

    const SignatureBox: React.FC<{label: string; signature: string; onClick: () => void}> = ({ label, signature, onClick }) => (
        <div className="mt-4">
            <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">{label}</p>
            <div onClick={onClick} className="mt-1 h-20 border-b-2 border-gray-400 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-t-md flex items-center justify-center">
                {signature ? <img src={signature} alt={`${label} signature`} className="h-full object-contain" /> : <span className="text-gray-400 text-sm">Click to Sign</span>}
            </div>
        </div>
    );

    return (
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-2xl">
            <header className="text-center mb-6 border-b-2 border-black pb-4">
                <h1 className="text-xl sm:text-2xl font-bold">ARMY TRACKED VEHICLE (ATV) OPERATORS EVALUATION SCORE SHEET</h1>
            </header>

            <div className="border-2 border-black p-2 mb-6">
                <h2 className="text-center font-bold bg-gray-200 -m-2 mb-2 p-1">OPERATOR / UNIT INFORMATION</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <InfoInput label="Name of Operator" name="operatorName" value={infoData.operatorName} onChange={handleInfoChange} placeholder="e.g., SGT John Doe" />
                    <InfoInput label="DOD ID Number" name="dodId" value={infoData.dodId} onChange={handleInfoChange} placeholder="e.g., 1234567890" />
                    <InfoInput label="Date (YYYY-MM-DD)" name="date" type="date" value={infoData.date} onChange={handleInfoChange} />
                    <InfoInput label="Unit" name="unit" value={infoData.unit} onChange={handleInfoChange} placeholder="e.g., A Co 1-23 IN" />
                </div>
            </div>
            
            <div className="mb-6 bg-white rounded-lg p-4 border-2 border-red-300 shadow-md">
                <h3 className="text-lg font-bold text-red-800 bg-red-100 -mx-4 -mt-4 mb-4 px-4 py-2 rounded-t-md">AUTOMATIC FAILURES</h3>
                 <div className="flex flex-wrap gap-2">
                    {AUTOMATIC_FAILURES_7932.map(reason => {
                        const isActive = autoFailureReasons.includes(reason);
                        return <button key={reason} onClick={() => toggleAutoFailure(reason)} className={`text-xs font-semibold px-3 py-2 rounded-full transition-colors duration-200 border ${isActive ? 'bg-red-600 text-white border-red-700' : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'}`}>{reason}</button>
                    })}
                </div>
            </div>

            <div className="space-y-4">
                {FORM_STRUCTURE_7932.map(section => (
                    <EvaluationSection key={section.title} section={section} statuses={taskStatuses} onStatusChange={handleStatusChange} onRetestChange={handleRetestChange} />
                ))}
            </div>

            <div className="mt-8 border-t-2 border-black pt-4">
                <h2 className="text-lg font-bold">OVERALL RATING AND OPERATOR/EXAMINER SIGNATURES</h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 items-end">
                    <div className="space-y-2">
                      <p className="font-bold">OVERALL RATING (GO/NO-GO): <span className={`text-2xl font-bold ${ratingColor}`}>{overallRating}</span></p>
                      <div className="flex space-x-4 pt-1">
                          <p className="font-semibold text-gray-700">Total GOs: <span className="text-green-600 font-bold text-lg">{evaluationCounts.goCount}</span></p>
                          <p className="font-semibold text-gray-700">Total NO-GOs: <span className="text-red-600 font-bold text-lg">{evaluationCounts.noGoCount}</span></p>
                      </div>
                    </div>
                     <InfoInput label="Examiner Name" name="examinerName" value={infoData.examinerName} onChange={handleInfoChange} placeholder="e.g., SSG Jane Smith" />
                    
                    <SignatureBox label="Operator Signature" signature={signatures.operatorSignature} onClick={() => handleOpenSignatureModal('operatorSignature')} />
                    <SignatureBox label="Examiner Signature" signature={signatures.examinerSignature} onClick={() => handleOpenSignatureModal('examinerSignature')} />
                </div>
                 {autoFailureReasons.length > 0 && <p className="text-sm text-red-600 mt-2 font-semibold">Failure Reason(s): {autoFailureReasons.join(', ')}</p>}
            </div>
             <p className="text-right text-xs text-gray-500 mt-4">DA FORM 7932, APR 2025</p>
        </div>

        <SignatureModal show={isSignatureModalOpen} onClose={() => setIsSignatureModalOpen(false)} onSave={handleSaveSignature} />

        <div className="max-w-4xl mx-auto mt-6 text-center">
            <button onClick={handleGeneratePdf} disabled={isGeneratingPdf} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isGeneratingPdf ? 'Generating PDF...' : 'Download Completed Form as PDF'}
            </button>
        </div>
      </div>
    );
};

export default Form7932;
