import React, { useState, useMemo } from 'react';
import { TOTAL_TASKS } from '../constants/formStructure.ts';

const Calculator: React.FC = () => {
    const [goCount, setGoCount] = useState<string>('');
    const [noGoCount, setNoGoCount] = useState<string>('');

    const { score, gradedTasks, error } = useMemo(() => {
        if (goCount === '' && noGoCount === '') {
            return { score: null, gradedTasks: null, error: null };
        }

        const go = parseInt(goCount, 10);
        const noGo = parseInt(noGoCount, 10);

        const goVal = isNaN(go) ? 0 : go;
        const noGoVal = isNaN(noGo) ? 0 : noGo;

        if (goVal < 0 || noGoVal < 0) {
            return { score: null, gradedTasks: null, error: "Counts cannot be negative." };
        }

        const totalGraded = goVal + noGoVal;
        
        if (totalGraded > TOTAL_TASKS) {
            return { score: null, gradedTasks: totalGraded, error: `The total number of graded tasks (${totalGraded}) cannot exceed the ${TOTAL_TASKS} tasks on DA Form 7931.` };
        }
        
        if (totalGraded === 0) {
            return { score: 0, gradedTasks: 0, error: null };
        }

        const calculatedScore = (goVal / totalGraded) * 100;
        return { score: calculatedScore, gradedTasks: totalGraded, error: null };
    }, [goCount, noGoCount]);

    const scoreColor = score !== null && score >= 80 ? 'text-green-500' : 'text-red-500';
    const passFailText = score !== null ? (score >= 80 ? 'PASS' : 'FAIL') : '';

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-sky-600 font-semibold">DA FORM 7931</div>
                        <h1 className="block mt-1 text-2xl leading-tight font-bold text-black">Paper Score Calculator</h1>
                        <p className="mt-2 text-gray-500">
                            Enter the number of 'GO' and 'NO-GO' tasks from a paper DA Form 7931 to quickly calculate the final score. 
                            The maximum number of tasks is based on the official form.
                        </p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="go-count" className="block text-sm font-medium text-gray-700">Number of 'GO' Tasks</label>
                                <input
                                    type="number"
                                    id="go-count"
                                    value={goCount}
                                    onChange={(e) => setGoCount(e.target.value)}
                                    placeholder="e.g., 68"
                                    min="0"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="no-go-count" className="block text-sm font-medium text-gray-700">Number of 'NO-GO' Tasks</label>
                                <input
                                    type="number"
                                    id="no-go-count"
                                    value={noGoCount}
                                    onChange={(e) => setNoGoCount(e.target.value)}
                                    placeholder="e.g., 10"
                                    min="0"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                                />
                            </div>
                        </div>

                        {error && (
                             <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        {score !== null && !error && (
                            <div className="mt-8 pt-6 border-t">
                                <h2 className="text-lg font-bold text-gray-800">Calculation Result</h2>
                                {gradedTasks !== null && gradedTasks > 0 && <p className="text-sm text-gray-600">Based on <span className="font-bold">{parseInt(goCount,10) || 0} GOs</span> out of <span className="font-bold">{gradedTasks} graded tasks</span>.</p>}
                                <p className="mt-2 text-5xl font-bold text-center">
                                    <span className={scoreColor}>{score.toFixed(2)}%</span>
                                </p>
                                <p className={`text-center font-semibold text-2xl ${scoreColor}`}>{passFailText}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
