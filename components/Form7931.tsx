
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { TaskStatus } from '../types/index';
import { FORM_STRUCTURE, AUTOMATIC_FAILURES } from '../constants/formStructure';
import { FORM_7931_COORDS } from '../constants/form7931Coordinates';
import InfoInput from './InfoInput';
import EvaluationSection from './EvaluationSection';
import { EvaluatorInfo } from '../App';

const Form7931: React.FC<{ evaluatorInfo: EvaluatorInfo }> = ({ evaluatorInfo }) => {
    const [infoData, setInfoData] = useState({
        operatorName: '',
        evaluatorName: '',
        vehicleModel: '',
        trailerModel: '',
        evaluationType: 'INITIAL',
        evaluationDate: new Date().toISOString().slice(0, 10),
        notes: '',
    });

    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() => {
        const initialState: Record<string, TaskStatus> = {};
        FORM_STRUCTURE.forEach(section => {
            section.tasks.forEach(task => {
                initialState[task.id] = TaskStatus.UNGRADED;
            });
        });
        return initialState;
    });
    
    const [autoFailureReasons, setAutoFailureReasons] = useState<string[]>([]);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    
    useEffect(() => {
        if (evaluatorInfo) {
            const evaluatorFullName = [evaluatorInfo.rank, evaluatorInfo.name, evaluatorInfo.unit].filter(Boolean).join(' ');
            setInfoData(prev => ({...prev, evaluatorName: evaluatorFullName }));
        }
    }, [evaluatorInfo]);

    useEffect(() => {
        const newStatuses = { ...taskStatuses };
        let statusChanged = false;

        FORM_STRUCTURE.forEach(section => {
            let isSectionVisible = true;
            if (infoData.evaluationType === 'VALIDATION') {
                 if(section.title === 'VEHICLE CONTROL LANES EVALUATION') isSectionVisible = false;
            } else if (infoData.evaluationType === 'SUSTAINMENT') {
                if(section.title === 'PMCS EVALUATION' || section.title === 'VEHICLE CONTROL LANES EVALUATION') isSectionVisible = false;
            }

            section.tasks.forEach(task => {
                let isTaskVisible = isSectionVisible;
                const hasTrailer = infoData.trailerModel.trim() !== '';
                if (section.title === 'VEHICLE CONTROL LANES EVALUATION') {
                    if (hasTrailer) {
                        if (['vcl1', 'vcl2', 'vcl3', 'vcl4'].includes(task.id)) isTaskVisible = false;
                    } else {
                        if (task.id === 'vcl5') isTaskVisible = false;
                    }
                }

                if (!isTaskVisible && newStatuses[task.id] !== TaskStatus.UNGRADED) {
                    newStatuses[task.id] = TaskStatus.UNGRADED;
                    statusChanged = true;
                }
            });
        });

        if (statusChanged) {
            setTaskStatuses(newStatuses);
        }
    }, [infoData.evaluationType, infoData.trailerModel, taskStatuses]);

    const visibleSections = useMemo(() => {
        let sections = [...FORM_STRUCTURE];
        if (infoData.evaluationType === 'VALIDATION') {
            sections = sections.filter(sec => sec.title !== 'VEHICLE CONTROL LANES EVALUATION');
        } else if (infoData.evaluationType === 'SUSTAINMENT') {
            sections = sections.filter(sec => sec.title !== 'PMCS EVALUATION' && sec.title !== 'VEHICLE CONTROL LANES EVALUATION');
        }

        return sections.map(section => {
            if (section.title === 'VEHICLE CONTROL LANES EVALUATION') {
                const hasTrailer = infoData.trailerModel.trim() !== '';
                const tasks = section.tasks.filter(task => hasTrailer ? task.id === 'vcl5' : task.id !== 'vcl5');
                return { ...section, tasks };
            }
            return section;
        }).filter(section => section.tasks.length > 0);
    }, [infoData.evaluationType, infoData.trailerModel]);

    const finalScoreData = useMemo(() => {
        if (autoFailureReasons.length > 0) return { score: 0, status: 'FAIL' };
        const goCount = Object.values(taskStatuses).filter(status => status === TaskStatus.GO).length;
        const noGoCount = Object.values(taskStatuses).filter(status => status === TaskStatus.NO_GO).length;
        const gradedTasks = goCount + noGoCount;
        if (gradedTasks === 0) return { score: 0, status: 'FAIL' };
        const score = (goCount / gradedTasks) * 100;
        return { score, status: score >= 80 ? 'PASS' : 'FAIL' };
    }, [taskStatuses, autoFailureReasons]);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInfoData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = useCallback((taskId: string, status: TaskStatus) => {
        setTaskStatuses(prev => ({ ...prev, [taskId]: status }));
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
            const formUrl = '/assets/DA-Form-7931.pdf';
            const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const pages = pdfDoc.getPages();
            const black = rgb(0, 0, 0);

            // Page 1
            const p1 = pages[0];
            p1.drawText(infoData.operatorName, { x: FORM_7931_COORDS.operatorName.x, y: FORM_7931_COORDS.operatorName.y, size: 10, color: black });
            p1.drawText(infoData.evaluatorName, { x: FORM_7931_COORDS.evaluatorName.x, y: FORM_7931_COORDS.evaluatorName.y, size: 10, color: black });
            p1.drawText(infoData.vehicleModel, { x: FORM_7931_COORDS.vehicleModel.x, y: FORM_7931_COORDS.vehicleModel.y, size: 10, color: black });
            p1.drawText(infoData.trailerModel, { x: FORM_7931_COORDS.trailerModel.x, y: FORM_7931_COORDS.trailerModel.y, size: 10, color: black });
            p1.drawText(infoData.evaluationType, { x: FORM_7931_COORDS.evaluationType.x, y: FORM_7931_COORDS.evaluationType.y, size: 10, color: black });
            p1.drawText(infoData.evaluationDate.replace(/-/g, ''), { x: FORM_7931_COORDS.evaluationDate.x, y: FORM_7931_COORDS.evaluationDate.y, size: 10, color: black });
            p1.drawText(infoData.notes, { x: FORM_7931_COORDS.notes.x, y: FORM_7931_COORDS.notes.y, size: 10, color: black });

            // All Tasks
            for (const taskId in taskStatuses) {
                const status = taskStatuses[taskId];
                if (status !== TaskStatus.UNGRADED && FORM_7931_COORDS.tasks[taskId]) {
                    const coords = FORM_7931_COORDS.tasks[taskId][status];
                    if(coords) {
                        const page = pages[coords.page];
                        page.drawText('X', { x: coords.x, y: coords.y, size: 12, color: black });
                    }
                }
            }

            // Page 3 - Final Score
            const p3 = pages[2];
            const scoreText = `${finalScoreData.score.toFixed(2)}%`;
            p3.drawText(scoreText, { x: FORM_7931_COORDS.finalScore.x, y: FORM_7931_COORDS.finalScore.y, size: 12, color: black });

            if (autoFailureReasons.length > 0) {
                const failureText = `Automatic Failure(s): ${autoFailureReasons.join(', ')}`;
                p3.drawText(failureText, { x: FORM_7931_COORDS.autoFailures.x, y: FORM_7931_COORDS.autoFailures.y, size: 8, color: black, maxWidth: 400 });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `DA_Form_7931_${infoData.operatorName.replace(/ /g, '_') || 'Evaluation'}.pdf`;
            link.click();
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. See console for details.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };
    
    const scoreColor = finalScoreData.status === 'PASS' ? 'text-green-500' : 'text-red-500';
    
    return (
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-2xl">
            <header className="text-center mb-6 border-b-2 border-black pb-4">
                <h1 className="text-xl sm:text-2xl font-bold">ARMY WHEELED VEHICLE (AWV) OPERATOR EVALUATION SCORE SHEET</h1>
            </header>

            <div className="border-2 border-black p-2 mb-6">
                <h2 className="text-center font-bold bg-gray-200 -m-2 mb-2 p-1">OPERATOR/UNIT AND EVALUATOR/UNIT INFORMATION</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <InfoInput label="Rank/Name of Operator/Unit" name="operatorName" value={infoData.operatorName} onChange={handleInfoChange} placeholder="e.g., SGT John Doe / A Co 1-23 IN" />
                    <InfoInput label="Rank/Name of Evaluator/Unit" name="evaluatorName" value={infoData.evaluatorName} onChange={handleInfoChange} placeholder="e.g., SSG Jane Smith / A Co 1-23 IN" />
                </div>
            </div>

            <div className="border-2 border-black p-2 mb-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <InfoInput label="Vehicle Type / Model" name="vehicleModel" value={infoData.vehicleModel} onChange={handleInfoChange} placeholder="e.g., M1083A2" />
                    <InfoInput label="Trailer Type / Model" name="trailerModel" value={infoData.trailerModel} onChange={handleInfoChange} placeholder="e.g., M105" />
                     <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Evaluation</label>
                        <select name="evaluationType" value={infoData.evaluationType} onChange={handleInfoChange} className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900">
                            <option value="INITIAL">INITIAL</option>
                            <option value="VALIDATION">VALIDATION</option>
                            <option value="SUSTAINMENT">SUSTAINMENT</option>
                        </select>
                    </div>
                    <InfoInput label="Date (YYYY-MM-DD)" name="evaluationDate" type="date" value={infoData.evaluationDate} onChange={handleInfoChange} />
                </div>
            </div>

            <div className="mb-6 bg-white rounded-lg p-4 border-2 border-red-300 shadow-md">
                <h3 className="text-lg font-bold text-red-800 bg-red-100 -mx-4 -mt-4 mb-4 px-4 py-2 rounded-t-md">AUTOMATIC FAILURES</h3>
                <div className="flex flex-wrap gap-2">
                    {AUTOMATIC_FAILURES.map(reason => {
                        const isActive = autoFailureReasons.includes(reason);
                        return <button key={reason} onClick={() => toggleAutoFailure(reason)} className={`text-xs font-semibold px-3 py-2 rounded-full transition-colors duration-200 border ${isActive ? 'bg-red-600 text-white border-red-700' : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'}`}>{reason}</button>
                    })}
                </div>
            </div>
            
            {visibleSections.map(section => (
                <EvaluationSection key={section.title} section={section} statuses={taskStatuses} onStatusChange={handleStatusChange} />
            ))}

            <div className="mt-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">NOTES</label>
                <textarea id="notes" name="notes" rows={3} value={infoData.notes} onChange={handleInfoChange} className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900" />
            </div>

            <div className="mt-8 border-t-2 border-black pt-4">
                <h2 className="text-lg font-bold">LICENSE EXAMINER/FIRST LINE SUPERVISOR EVALUATION OUTCOME REPORT</h2>
                <p className="mt-2 text-2xl font-bold">Final Score: <span className={scoreColor}>{finalScoreData.score.toFixed(2)}%</span></p>
                <p className={`mt-1 font-semibold ${scoreColor}`}>{finalScoreData.status}</p>
                {autoFailureReasons.length > 0 && <p className="text-sm text-red-600 mt-1 font-semibold">Reason(s): {autoFailureReasons.join(', ')}</p>}
                <p className="text-xs text-gray-600 mt-1">A score of 80% or higher is required to pass.</p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 text-center">
            <button onClick={handleGeneratePdf} disabled={isGeneratingPdf} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isGeneratingPdf ? 'Generating PDF...' : 'Download Completed Form as PDF'}
            </button>
        </div>
      </div>
    );
};

export default Form7931;