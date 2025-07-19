import React from 'react';
import { EvaluatorInfo } from '../App.tsx';
import InfoInput from './InfoInput.tsx';

interface SettingsProps {
    evaluatorInfo: EvaluatorInfo;
    setEvaluatorInfo: (info: EvaluatorInfo) => void;
}

const Settings: React.FC<SettingsProps> = ({ evaluatorInfo, setEvaluatorInfo }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvaluatorInfo({
            ...evaluatorInfo,
            [name]: value,
        });
    };

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8 w-full">
                    <h1 className="block text-2xl leading-tight font-bold text-black">Settings</h1>
                    <p className="mt-2 text-gray-500">
                        Enter your information here to automatically populate the evaluator fields on the forms. 
                        Your data is saved locally on your device.
                    </p>

                    <div className="mt-6 space-y-4">
                        <InfoInput 
                            label="Rank"
                            name="rank"
                            value={evaluatorInfo.rank}
                            onChange={handleChange}
                            placeholder="e.g., SSG"
                        />
                        <InfoInput 
                            label="Name"
                            name="name"
                            value={evaluatorInfo.name}
                            onChange={handleChange}
                            placeholder="e.g., Jane Smith"
                        />
                        <InfoInput 
                            label="Unit"
                            name="unit"
                            value={evaluatorInfo.unit}
                            onChange={handleChange}
                            placeholder="e.g., A Co 1-23 IN"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
